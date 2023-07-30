import { Router } from "express";
import "/Users/luis_/OneDrive/Documents/Areadne/Backend/Primera-pre-entrega/src/data/products.json" assert { type: "json" };
import { MongoDBProductManager } from "../dao/mongo-manager/product.manager.js";

const router = Router();

const managerDB = new MongoDBProductManager()

router.get("/", async (request, response) => {
  response.send(await managerDB.limitHandler(request, response))
});

router.get("/:pid", async (request, response) => {
  const id = Number(request.params.pid);
  await managerDB.getProductById(id, response);
});

router.post("/", async (request, response) => {
  await managerDB.addProduct(request, response)
});

router.put("/:pid", async (request, response) => {
  await managerDB.updateProduct(request, response);
});

router.delete("/:pid", async (request, response) => {
  await managerDB.deleteProduct(request, response);
});

export default router;
