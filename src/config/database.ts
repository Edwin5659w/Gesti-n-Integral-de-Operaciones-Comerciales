import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();
const DBSOURCE = path.resolve(__dirname, '../../database.sqlite');

// Create the raw sqlite3 Database (callback API)
const rawDb = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    throw err;
  } else {
    console.log('Connected to SQLite database:', DBSOURCE);
  }
});

// Wrap the callback-based API into a Promise-friendly subset used by the repos
const db = {
  run(sql: string, params?: any[]) {
    return new Promise<any>((resolve, reject) => {
      rawDb.run(sql, params || [], function (err: any) {
        if (err) return reject(err);
        // return lastID and changes similar to sqlite wrapper
        resolve({ lastID: (this as any).lastID, changes: (this as any).changes });
      });
    });
  },
  get(sql: string, params?: any[]) {
    return new Promise<any>((resolve, reject) => {
      rawDb.get(sql, params || [], (err: any, row: any) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },
  all(sql: string, params?: any[]) {
    return new Promise<any[]>((resolve, reject) => {
      rawDb.all(sql, params || [], (err: any, rows: any[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
  exec(sql: string) {
    return new Promise<void>((resolve, reject) => {
      rawDb.exec(sql, (err: any) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  // Expose serialize for compatibility if needed
  serialize(cb: () => void) {
    rawDb.serialize(cb);
  },
  // expose close
  close() {
    return new Promise<void>((resolve, reject) => rawDb.close(err => err ? reject(err) : resolve()));
  }
};

// Initialize schema and enable foreign keys using the wrapper
(async () => {
  try {
    await db.exec('PRAGMA foreign_keys = ON;');

    await db.exec(
      `CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );`
    );

    await db.exec(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );`
    );

    await db.exec(
      `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        total INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES clients(id)
      );`
    );

    await db.exec(
      `CREATE TABLE IF NOT EXISTS sale_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        subtotal INTEGER NOT NULL,
        FOREIGN KEY (sale_id) REFERENCES sales(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`
    );
  } catch (err) {
    console.error('Error initializing database schema:', err);
    throw err;
  }
})();

export default db;