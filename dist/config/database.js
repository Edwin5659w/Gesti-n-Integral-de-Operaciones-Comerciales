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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
sqlite3_1.default.verbose();
const DBSOURCE = path_1.default.resolve(__dirname, '../../database.sqlite');
// Create the raw sqlite3 Database (callback API)
const rawDb = new sqlite3_1.default.Database(DBSOURCE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        throw err;
    }
    else {
        console.log('Connected to SQLite database:', DBSOURCE);
    }
});
// Wrap the callback-based API into a Promise-friendly subset used by the repos
const db = {
    run(sql, params) {
        return new Promise((resolve, reject) => {
            rawDb.run(sql, params || [], function (err) {
                if (err)
                    return reject(err);
                // return lastID and changes similar to sqlite wrapper
                resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    },
    get(sql, params) {
        return new Promise((resolve, reject) => {
            rawDb.get(sql, params || [], (err, row) => {
                if (err)
                    return reject(err);
                resolve(row);
            });
        });
    },
    all(sql, params) {
        return new Promise((resolve, reject) => {
            rawDb.all(sql, params || [], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    },
    exec(sql) {
        return new Promise((resolve, reject) => {
            rawDb.exec(sql, (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    },
    // Expose serialize for compatibility if needed
    serialize(cb) {
        rawDb.serialize(cb);
    },
    // expose close
    close() {
        return new Promise((resolve, reject) => rawDb.close(err => err ? reject(err) : resolve()));
    }
};
// Initialize schema and enable foreign keys using the wrapper
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.exec('PRAGMA foreign_keys = ON;');
        yield db.exec(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );`);
        yield db.exec(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );`);
        yield db.exec(`CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        total INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES clients(id)
      );`);
        yield db.exec(`CREATE TABLE IF NOT EXISTS sale_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        subtotal INTEGER NOT NULL,
        FOREIGN KEY (sale_id) REFERENCES sales(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`);
    }
    catch (err) {
        console.error('Error initializing database schema:', err);
        throw err;
    }
}))();
exports.default = db;
