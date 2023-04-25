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

// src/routes/revenue/index.ts
var revenue_exports = {};
__export(revenue_exports, {
  revenueRouters: () => revenueRouters
});
module.exports = __toCommonJS(revenue_exports);
var import_express = require("express");

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
var getAllRevenuesInDB = async (allInformation, skip = 0, take = 1) => {
  try {
    const revenues = await prismaClientDatabase.revenue.findMany({
      select: {
        id: true,
        category: { select: { name: true } },
        foodDescription: true,
        foodName: true,
        image: allInformation && { select: { id: allInformation } }
      },
      skip,
      take
    });
    if (revenues) {
      console.log(revenues);
      return revenues;
    }
    return null;
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/revenue/getAllRevenue/index.ts
var getAllRevenues = async (req, res) => {
  const { allInformation, initialElement, lastElement } = req.body;
  const revenues = await getAllRevenuesInDB(
    allInformation,
    initialElement,
    lastElement
  );
  if (revenues)
    return res.send({ revenues, count: revenues.length }).status(200);
  return res.send({ message: "Falha ao buscar" }).status(404);
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

// src/routes/revenue/index.ts
var revenueRouters = (0, import_express.Router)();
revenueRouters.get("/", getAllRevenues);
revenueRouters.get("/information", getRevenueByID);
revenueRouters.post("/create", createRevenue);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  revenueRouters
});
