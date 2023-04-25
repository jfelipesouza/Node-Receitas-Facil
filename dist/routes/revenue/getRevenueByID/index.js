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

// src/routes/revenue/getRevenueByID/index.ts
var getRevenueByID_exports = {};
__export(getRevenueByID_exports, {
  getRevenueByID: () => getRevenueByID
});
module.exports = __toCommonJS(getRevenueByID_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/RevenueTableUtils/index.ts
var getRevenueById = async (id) => {
  try {
    const revenue = await prismaClientDatabase.revenue.findFirst({
      where: {
        id
      },
      include: { image: true }
    });
    if (revenue) {
      return {
        id: revenue.id,
        foodName: revenue.foodName,
        ingredients: revenue.ingredients,
        preparation: revenue.preparation,
        calories: revenue.calories,
        portions: revenue.portions,
        preparationTime: revenue.preparationTime,
        image: {
          id: revenue.image?.id,
          file: revenue.image?.file,
          mimeType: revenue.image?.mimeType
        }
      };
    }
    return null;
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/revenue/getRevenueByID/index.ts
var getRevenueByID = async (req, res) => {
  const { id } = req.body;
  const revenue = await getRevenueById(id);
  if (revenue) {
    console.log(revenue);
    return res.send({ revenue });
  }
  return res.send({ message: "oi" });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRevenueByID
});
