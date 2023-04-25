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

// src/services/database/UserTableUtils/index.ts
var UserTableUtils_exports = {};
__export(UserTableUtils_exports, {
  createNewUser: () => createNewUser,
  deleteUserById: () => deleteUserById,
  getAllUsers: () => getAllUsers,
  getUserByEmail: () => getUserByEmail,
  updateProfileInformation: () => updateProfileInformation
});
module.exports = __toCommonJS(UserTableUtils_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  updateProfileInformation
});
