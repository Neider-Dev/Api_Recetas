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
            try {
                const pool = yield (0, database_1.connect)();
                const posts = yield pool.query("SELECT * FROM recipes");
                res.json(posts[0]);
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong whit obtain recipes",
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            pool.query("SELECT * FROM recipes WHERE id_recipe = ?", [id])
                .then((response) => {
                if (response.length > 0) {
                    return res.json(JSON.parse(JSON.stringify(response[0]).slice(1, -1)));
                }
            })
                .catch(() => {
                res.status(404).json({
                    text: `The recipe ${[id]} doesn't exist`,
                });
            });
        });
    }
    // public async getOne(req: Request, res: Response): Promise<any> {
    // 	const { id } = req.params;
    // 	try {
    // 		const pool = await connect();
    // 		const recipe = await pool.query(
    // 			"SELECT * FROM recipes WHERE id_recipe = ?",
    // 			[id],
    // 		);
    // 		if (recipe.length > 0) {
    // 			return res.json(
    // 				JSON.parse(JSON.stringify(recipe[0]).slice(1, -1)),
    // 			);
    // 		}
    // 		res.status(404).json({ text: `The recipe ${[id]} doesn't exist` });
    // 	} catch (error) {
    // 		res.status(500).json({
    // 			message: "Something goes wrong",
    // 		});
    // 	}
    // }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connect)();
                yield pool.query("INSERT INTO recipes set ?", [req.body]);
                res.json({ message: "Recipe Saved" });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            yield pool
                .query("DELETE FROM recipes WHERE id_recipe = ?", [id])
                .then(() => res.json({
                message: `The recipe ${req.params.id} was deleted`,
            }))
                .catch((error) => res.json({ message: error }));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pool = yield (0, database_1.connect)();
                yield pool.query("UPDATE recipes SET ? WHERE id_recipe = ?", [
                    req.body,
                    id,
                ]);
                res.json({ message: `The recipe ${req.params.id} was updated` });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong",
                });
            }
        });
    }
}
exports.recipesController = new RecipesController();
