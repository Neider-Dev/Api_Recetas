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
exports.scoresController = void 0;
const database_1 = require("../database");
class ScoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            const posts = yield pool.query("SELECT * FROM scores WHERE id_recipe = ?", [id]);
            res.json(posts[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            const score = yield pool.query("SELECT * FROM scores WHERE id_score = ?", [id]);
            if (score.length > 0) {
                return res.json(JSON.parse(JSON.stringify(score[0]).slice(1, -1)));
            }
            res.status(404).json({ text: `The score ${[id]} doesn't exist` });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, database_1.connect)();
            yield pool.query("INSERT INTO scores set ?", [req.body]);
            res.json({ message: "Score Saved" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            yield pool.query("DELETE FROM scores WHERE id_score = ?", [id]);
            res.json({ message: `The score ${req.params.id} was deleted` });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield (0, database_1.connect)();
            yield pool.query("UPDATE scores SET ? WHERE id_score = ?", [
                req.body,
                id,
            ]);
            res.json({ message: `The score ${req.params.id} was updated` });
        });
    }
}
exports.scoresController = new ScoresController();
