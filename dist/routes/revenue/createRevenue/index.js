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

// src/routes/revenue/createRevenue/index.ts
var createRevenue_exports = {};
__export(createRevenue_exports, {
  createRevenue: () => createRevenue
});
module.exports = __toCommonJS(createRevenue_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/RevenueTableUtils/index.ts
var createRevenueInDB = async ({
  calories,
  foodDescription,
  foodName,
  image,
  ingredients,
  portions,
  preparation,
  preparationTime,
  profile,
  category
}) => {
  try {
    const revenue = await prismaClientDatabase.revenue.create({
      data: {
        calories,
        foodName,
        foodDescription,
        portions,
        preparationTime,
        preparation,
        ingredients,
        image: { connect: { id: image.id } },
        category: { connect: { id: category } },
        profile: { connect: { id: profile.id } }
      }
    });
    console.log(revenue);
    return { revenue };
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/revenue/createRevenue/index.ts
var createRevenue = async (req, res) => {
  const {
    calories,
    category,
    foodDescription,
    foodName,
    image,
    ingredients,
    portions,
    preparation,
    preparationTime,
    profile
  } = req.body;
  const revenue = await createRevenueInDB({
    calories,
    category,
    foodDescription,
    foodName,
    image,
    ingredients,
    portions,
    preparation,
    preparationTime,
    profile
  });
  return res.send({ revenue: revenue?.revenue });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRevenue
});
