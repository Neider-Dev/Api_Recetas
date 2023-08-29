"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipesController_1 = require("../controllers/recipesController");
class RecipeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", recipesController_1.recipesController.list);
        this.router.get("/:id", recipesController_1.recipesController.getOne);
        this.router.post("/", recipesController_1.recipesController.create);
        this.router.put("/:id", recipesController_1.recipesController.update);
        this.router.delete("/:id", recipesController_1.recipesController.delete);
    }
}
const recipeRoutes = new RecipeRoutes();
exports.default = recipeRoutes.router;
