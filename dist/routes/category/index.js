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

// src/routes/category/index.ts
var category_exports = {};
__export(category_exports, {
  categoryRouters: () => categoryRouters
});
module.exports = __toCommonJS(category_exports);
var import_express = require("express");

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/CategoryTableUtils/index.ts
var getAllCategory = async () => {
  try {
    const categories = await prismaClientDatabase.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return categories;
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
var getCategoryByName = async (name, allInformation = false) => {
  try {
    const categorie = await prismaClientDatabase.category.findFirst({
      where: {
        name
      },
      include: {
        revenues: allInformation
      }
    });
    return { categorie };
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
var createCategoryInDB = async (name) => {
  try {
    const findCategory = await getCategoryByName(name, false);
    if (findCategory?.categorie) {
      return { message: "Categoria existente" };
    }
    const categorie = await prismaClientDatabase.category.create({
      data: {
        name
      }
    });
    return { categorie };
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/category/index.ts
var categoryRouters = (0, import_express.Router)();
categoryRouters.get("/getByName", async (req, res) => {
  const { name } = req.body;
  const categorie = await getCategoryByName(
    name.toLocaleUpperCase().trim(),
    true
  );
  if (categorie?.categorie) {
    return res.send({ categorie: categorie.categorie }).status(200);
  }
  return res.status(404).send({ message: "not found" });
});
categoryRouters.post("/", async (req, res) => {
  const { name } = req.body;
  const categorie = await createCategoryInDB(name.toLocaleUpperCase().trim());
  if (categorie?.categorie) {
    return res.send({ categorie: categorie.categorie }).status(200);
  }
  return res.status(400).send({ message: categorie?.message });
});
categoryRouters.get("/", async (req, res) => {
  const categories = await getAllCategory();
  return res.send({ categories }).status(200);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  categoryRouters
});
