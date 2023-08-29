"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scoresController_1 = require("../controllers/scoresController");
class ScoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", scoresController_1.scoresController.list);
        this.router.get("/recipe/:id", scoresController_1.scoresController.getOne);
        this.router.post("/recipe", scoresController_1.scoresController.create);
        this.router.put("/recipe/:id", scoresController_1.scoresController.update);
        this.router.delete("/recipe/:id", scoresController_1.scoresController.delete);
    }
}
const scoresRoutes = new ScoresRoutes();
exports.default = scoresRoutes.router;
