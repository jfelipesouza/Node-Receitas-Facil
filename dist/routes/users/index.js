"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/users/index.ts
var users_exports = {};
__export(users_exports, {
  usersRouters: () => usersRouters
});
module.exports = __toCommonJS(users_exports);
var import_express = require("express");

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/UserTableUtils/index.ts
var getAllUsers = async (allInformation, skip = 0, take = 1) => {
  try {
    const [users, total] = await prismaClientDatabase.$transaction([
      prismaClientDatabase.user.findMany({
        select: {
          id: true,
          email: true,
          profile: {
            include: {
              Revenue: allInformation,
              image: allInformation
            }
          },
          createAt: true,
          updatedAt: true
        },
        skip,
        take
      }),
      prismaClientDatabase.user.count()
    ]);
    return { total, users };
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
  return null;
};
var getUserByEmail = async (email, allInformation) => {
  try {
    const findUser = await prismaClientDatabase.user.findFirst({
      where: {
        email
      },
      select: { profile: allInformation, password: allInformation, id: true }
    });
    if (findUser) {
      return { user: findUser };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
  return null;
};
var createNewUser = async ({ email, password }) => {
  try {
    const user = await prismaClientDatabase.user.create({
      data: {
        email,
        password,
        profile: {
          create: {
            nickname: "Desconhecido",
            description: "Ol\xE1! Sou novo aqui"
          }
        }
      }
    });
    return { user };
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
  return null;
};
var updateProfileInformation = async ({
  description,
  id,
  nickname
}) => {
  try {
    const profile = await prismaClientDatabase.profile.update({
      where: {
        id
      },
      data: {
        description,
        nickname
      }
    });
    return { profile };
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
  return null;
};
var deleteUserById = async (id) => {
  try {
    const findUser = await prismaClientDatabase.user.findFirst({
      where: { id }
    });
    if (findUser) {
      await prismaClientDatabase.user.delete({
        where: { id },
        include: {
          profile: {
            include: {
              image: true,
              Revenue: true
            }
          }
        }
      });
      return { message: "Success" };
    }
    return { message: "User not found" };
  } catch (e) {
    console.log(e);
    return { message: "Failed" };
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/users/register/index.ts
var import_bcryptjs = require("bcryptjs");
var userRegister = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const findUser = await getUserByEmail(email, false);
    if (findUser?.user) {
      return res.status(400).send({ message: "Usuario existente" });
    }
    const passwordHash = await (0, import_bcryptjs.hash)(password, 10);
    const user = await createNewUser({ email, password: passwordHash });
    return res.status(201).send({ message: "created", user });
  }
  return res.status(400).send({ message: "Requisi\xE7\xE3o invalida" });
};

// src/routes/users/updateProfileInformations/index.ts
var updateProfileInformation2 = async (req, res) => {
  const { description, id, image, nickname } = req.body;
  const profileUpdated = await updateProfileInformation({
    description,
    id,
    image,
    nickname
  });
  if (profileUpdated != null) {
    return res.status(200).send({ message: "success", profile: profileUpdated.profile });
  } else {
    return res.status(400).send({ message: "Not possibility updated informations" });
  }
};

// src/routes/users/login/index.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var DECODE_TOKEN = process.env.JWT_CODE;
var singINUser = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await getUserByEmail(email, true);
  if (!findUser) {
    return res.status(404).send("Usuario n\xE3o encontrado");
  }
  const passwordMatch = await (0, import_bcryptjs2.compare)(password, findUser.user.password);
  if (!passwordMatch) {
    return res.status(404).send("E-mail ou senha incorretos");
  }
  const token = (0, import_jsonwebtoken.sign)(findUser, DECODE_TOKEN, {
    subject: findUser.user.id,
    expiresIn: "1h"
  });
  return res.status(200).send({
    message: "Success",
    token
  });
};

// src/routes/users/deleteAccount/index.ts
var deleteAccount = async (req, res) => {
  const { id } = req.body;
  const deleteUser = await deleteUserById(id);
  if (deleteUser) {
    return res.status(deleteUser.message === "User not found" ? 404 : 200).send({ message: deleteUser?.message });
  }
  return res.status(500).send({ message: "Falha ao deletar" });
};

// src/routes/users/index.ts
var usersRouters = (0, import_express.Router)();
usersRouters.get("/", async (req, res) => {
  const { allInformation, initialElement, lastElement } = req.body;
  const findUsers = await getAllUsers(
    allInformation,
    initialElement,
    lastElement
  );
  if (findUsers != null) {
    console.log({ users: findUsers.users });
    return res.status(200).send({ ...findUsers });
  } else {
    return res.status(404).send({ message: "ERROR! Users not found" });
  }
});
usersRouters.post("/singIN", singINUser);
usersRouters.post("/register", userRegister);
usersRouters.put("/profile", updateProfileInformation2);
usersRouters.delete("/", deleteAccount);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usersRouters
});
