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
exports.commentsController = void 0;
const database_1 = require("../database");
class CommentsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const pool = yield (0, database_1.connect)();
                const posts = yield pool.query("SELECT * FROM comments WHERE id_recipe = ?", [id]);
                res.json(posts[0]);
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong",
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const pool = yield (0, database_1.connect)();
                const comment = yield pool.query("SELECT * FROM comments WHERE id_comment = ?", [id]);
                if (comment.length > 0) {
                    return res.json(JSON.parse(JSON.stringify(comment[0]).slice(1, -1)));
                }
                res.status(404).json({ text: `The comment ${[id]} doesn't exist` });
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
            try {
                const pool = yield (0, database_1.connect)();
                yield pool.query("INSERT INTO comments set ?", [req.body]);
                res.json({ message: "Comment Saved" });
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
            try {
                const { id } = req.params;
                const pool = yield (0, database_1.connect)();
                yield pool.query("DELETE FROM comments WHERE id_comment = ?", [id]);
                res.json({ message: `The comment ${req.params.id} was deleted` });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong",
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pool = yield (0, database_1.connect)();
                yield pool.query("UPDATE comments SET ? WHERE id_comment = ?", [
                    req.body,
                    id,
                ]);
                res.json({ message: `The comment ${req.params.id} was updated` });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something goes wrong",
                });
            }
        });
    }
}
exports.commentsController = new CommentsController();
