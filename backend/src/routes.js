const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("URL Base da API");
});

const NinjaController = require("./controllers/NinjaController");
routes.get("/ninjas", NinjaController.index);
//routes.get("/getNinjas", NinjaController.getNinjas);
routes.get("/ninjas/:id", NinjaController.show);
routes.post("/ninjas", NinjaController.store);
routes.put("/ninjas/:id", NinjaController.update);
routes.delete("/ninjas/:id", NinjaController.destroy);

module.exports = routes;
