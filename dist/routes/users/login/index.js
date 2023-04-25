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

// src/routes/users/login/index.ts
var login_exports = {};
__export(login_exports, {
  singINUser: () => singINUser
});
module.exports = __toCommonJS(login_exports);

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

// src/routes/users/login/index.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var DECODE_TOKEN = process.env.JWT_CODE;
var singINUser = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await getUserByEmail(email, true);
  if (!findUser) {
    return res.status(404).send("Usuario n\xE3o encontrado");
  }
  const passwordMatch = await (0, import_bcryptjs.compare)(password, findUser.user.password);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  singINUser
});
