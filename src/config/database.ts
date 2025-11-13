import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();
const DBSOURCE = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    throw err;
  } else {
    console.log('Connected to SQLite database:', DBSOURCE);
  }
});

// Habilitar foreign keys
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON;');

  // Tabla clients
  db.run(
    `CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );`,
    (err) => {
      if (err) console.error('Create clients table error:', err.message);
    }
  );

  // Tabla products
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL DEFAULT 0,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );`,
    (err) => {
      if (err) console.error('Create products table error:', err.message);
    }
  );

  // Tabla sales (encabezado de venta)
  db.run(
    `CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      total INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (client_id) REFERENCES clients(id)
    );`,
    (err) => {
      if (err) console.error('Create sales table error:', err.message);
    }
  );

  // Tabla sale_details (detalle de venta)
  db.run(
    `CREATE TABLE IF NOT EXISTS sale_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      subtotal INTEGER NOT NULL,
      FOREIGN KEY (sale_id) REFERENCES sales(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );`,
    (err) => {
      if (err) console.error('Create sale_details table error:', err.message);
    }
  );
});

export default db;