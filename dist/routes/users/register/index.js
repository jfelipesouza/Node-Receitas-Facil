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

// src/routes/users/register/index.ts
var register_exports = {};
__export(register_exports, {
  userRegister: () => userRegister
});
module.exports = __toCommonJS(register_exports);
var import_bcryptjs = require("bcryptjs");

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/UserTableUtils/index.ts
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

// src/routes/users/register/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRegister
});
