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
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("./config");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = (0, promise_1.createPool)({
            host: config_1.DB_HOST,
            user: config_1.DB_USER,
            password: config_1.DB_PASSWORD,
            database: config_1.DB_DATABASE,
            port: parseInt(`${config_1.DB_PORT}`),
        });
        pool.getConnection().then((connection) => {
            pool.releaseConnection(connection);
            console.log("DB is connected");
        });
        return pool;
    });
}
exports.connect = connect;
