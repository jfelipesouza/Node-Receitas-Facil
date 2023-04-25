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

// src/routes/users/updateProfileInformations/index.ts
var updateProfileInformations_exports = {};
__export(updateProfileInformations_exports, {
  updateProfileInformation: () => updateProfileInformation2
});
module.exports = __toCommonJS(updateProfileInformations_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/UserTableUtils/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateProfileInformation
});
