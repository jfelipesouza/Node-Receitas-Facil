"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/config/server.ts
var server_exports = {};
__export(server_exports, {
  app: () => app
});
module.exports = __toCommonJS(server_exports);
var import_express_async_errors = require("express-async-errors");
var import_express6 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_morgan = __toESM(require("morgan"));

// src/services/config/cors.ts
var corsConfig = {
  origin: "*"
};

// src/routes/index.ts
var import_express5 = require("express");

// src/routes/users/index.ts
var import_express = require("express");

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

// src/routes/users/register/index.ts
var import_bcryptjs = require("bcryptjs");
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

// src/routes/users/login/index.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var DECODE_TOKEN = process.env.JWT_CODE;
var singINUser = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await getUserByEmail(email, true);
  if (!findUser) {
    return res.status(404).send("Usuario n\xE3o encontrado");
  }
  const passwordMatch = await (0, import_bcryptjs2.compare)(password, findUser.user.password);
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

// src/routes/users/deleteAccount/index.ts
var deleteAccount = async (req, res) => {
  const { id } = req.body;
  const deleteUser = await deleteUserById(id);
  if (deleteUser) {
    return res.status(deleteUser.message === "User not found" ? 404 : 200).send({ message: deleteUser?.message });
  }
  return res.status(500).send({ message: "Falha ao deletar" });
};

// src/routes/users/index.ts
var usersRouters = (0, import_express.Router)();
usersRouters.get("/", async (req, res) => {
  const { allInformation, initialElement, lastElement } = req.body;
  const findUsers = await getAllUsers(
    allInformation,
    initialElement,
    lastElement
  );
  if (findUsers != null) {
    console.log({ users: findUsers.users });
    return res.status(200).send({ ...findUsers });
  } else {
    return res.status(404).send({ message: "ERROR! Users not found" });
  }
});
usersRouters.post("/singIN", singINUser);
usersRouters.post("/register", userRegister);
usersRouters.put("/profile", updateProfileInformation2);
usersRouters.delete("/", deleteAccount);

// src/routes/upload/index.ts
var import_express2 = require("express");
var import_multer2 = __toESM(require("multer"));

// src/services/database/ImageTableUtils/index.ts
var getImageById = async (id) => {
  try {
    const image = await prismaClientDatabase.image.findFirst({
      where: { id },
      select: { file: true, mimeType: true }
    });
    console.log(image);
    return image;
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
var uploadImageDB = async ({ mimeType, originalName, file }) => {
  try {
    const image = await prismaClientDatabase.image.create({
      data: { file, originalName, mimeType }
    });
    console.log(image);
    return { image };
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/upload/image/uploadImage/index.ts
var uploadImage = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Tipo de arquivo incorreto" });
  } else {
    const fileBase64 = Buffer.from(file.buffer).toString("base64");
    const originalName = file.originalname;
    const mimeType = file.mimetype;
    const imageUpload = await uploadImageDB({
      file: fileBase64,
      mimeType,
      originalName
    });
    if (imageUpload) {
      return res.status(200).send({ image: imageUpload.image });
    }
    return res.status(500).send({ message: "error" });
  }
};

// src/services/config/multer.ts
var import_multer = require("multer");
var import_path = require("path");
var import_crypto = require("crypto");
var uploadDir = (0, import_path.resolve)(__dirname, "..", "..", "uploads");
var storage = {
  disk: (0, import_multer.diskStorage)({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      (0, import_crypto.randomBytes)(16, (err, hash2) => {
        if (err)
          cb(err, err.message);
        file.key = `${hash2.toString("hex")}-${file.originalname}`;
        cb(null, file.key);
      });
    }
  }),
  memory: (0, import_multer.memoryStorage)()
};
var multerConfig = {
  dest: uploadDir,
  storage: storage.disk,
  limits: {
    fileSize: 2 * 1024 * 1024
    // 2mb
  },
  fileFilter: (req, file, cb) => {
    const allowFormat = [
      "image/pjpeg",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
      "image/webp"
    ];
    if (allowFormat.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid type"));
    }
  }
};

// src/routes/upload/index.ts
var uploadRouters = (0, import_express2.Router)();
uploadRouters.post("/images", (0, import_multer2.default)(multerConfig).single("file"), uploadImage);
uploadRouters.get("/images", async (req, res) => {
  const { id } = await req.body;
  const image = await getImageById(id);
  return res.send({ image });
});

// src/routes/revenue/index.ts
var import_express3 = require("express");

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
var revenueRouters = (0, import_express3.Router)();
revenueRouters.get("/", getAllRevenues);
revenueRouters.get("/information", getRevenueByID);
revenueRouters.post("/create", createRevenue);

// src/routes/category/index.ts
var import_express4 = require("express");

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
var categoryRouters = (0, import_express4.Router)();
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

// src/routes/index.ts
var router = (0, import_express5.Router)();
var port = process.env.PORT || 3001;
router.use("/users", usersRouters);
router.use("/category", categoryRouters);
router.use("/revenues", revenueRouters);
router.use("/files/upload", uploadRouters);
router.get("/", (req, res) => {
  return res.status(200).send({
    status: "Application is Running",
    port
  });
});

// src/services/config/server.ts
var app = (0, import_express6.default)();
app.use(import_express6.default.json());
app.use(import_express6.default.urlencoded({ extended: true }));
app.use((0, import_cors.default)(corsConfig));
app.use((0, import_morgan.default)("dev"));
app.use("/", router);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
