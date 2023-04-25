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

// src/routes/users/deleteAccount/index.ts
var deleteAccount_exports = {};
__export(deleteAccount_exports, {
  deleteAccount: () => deleteAccount
});
module.exports = __toCommonJS(deleteAccount_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/UserTableUtils/index.ts
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

// src/routes/users/deleteAccount/index.ts
var deleteAccount = async (req, res) => {
  const { id } = req.body;
  const deleteUser = await deleteUserById(id);
  if (deleteUser) {
    return res.status(deleteUser.message === "User not found" ? 404 : 200).send({ message: deleteUser?.message });
  }
  return res.status(500).send({ message: "Falha ao deletar" });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteAccount
});
