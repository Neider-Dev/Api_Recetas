"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = require("../controllers/commentsController");
class CommentsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", commentsController_1.commentsController.list);
        this.router.get("/recipe/:id", commentsController_1.commentsController.getOne);
        this.router.post("/recipe", commentsController_1.commentsController.create);
        this.router.put("/recipe/:id", commentsController_1.commentsController.update);
        this.router.delete("/recipe/:id", commentsController_1.commentsController.delete);
    }
}
const commentsRoutes = new CommentsRoutes();
exports.default = commentsRoutes.router;
