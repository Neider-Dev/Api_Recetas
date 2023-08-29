"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesController = void 0;
const database_1 = require("../database");
class RecipesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, database_1.connect)();
            const posts = yield pool.query("SELECT * FROM recipes");
            res.json(posts[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const pool = yield (0, database_1.connect)();
                const recipe = yield pool.query("SELECT * FROM recipes WHERE id_recipe = ?", [id]);
                if (recipe.length > 0) {
                    return res.json(JSON.parse(JSON.stringify(recipe[0]).slice(1, -1)));
                }
                res.status(404).json({ text: `The recipe ${[id]} doesn't exist` });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong",
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, database_1.connect)();
            yield pool.query("INSERT INTO recipes set ?", [req.body]);
            res.json({ message: "Recipe Saved" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            yield pool.query("DELETE FROM recipes WHERE id_recipe = ?", [id]);
            res.json({ message: `The recipe ${req.params.id} was deleted` });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            yield pool.query("UPDATE recipes SET ? WHERE id_recipe = ?", [
                req.body,
                id,
            ]);
            res.json({ message: `The recipe ${req.params.id} was updated` });
        });
    }
}
exports.recipesController = new RecipesController();
