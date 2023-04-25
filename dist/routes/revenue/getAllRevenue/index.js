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

// src/routes/revenue/getAllRevenue/index.ts
var getAllRevenue_exports = {};
__export(getAllRevenue_exports, {
  getAllRevenues: () => getAllRevenues
});
module.exports = __toCommonJS(getAllRevenue_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/RevenueTableUtils/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllRevenues
});
