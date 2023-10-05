import sqlite3 from "sqlite3";

export class SQLiteAdapter {
  #db;

  constructor() {
    this.#db = new sqlite3.Database("./memo.sqlite3");
  }

  run(sql, ...params) {
    return new Promise((resolve, reject) => {
      this.#db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          console.log("!!! run() is finished !!!");
          resolve(this);
        }
      });
    });
  }

  get(sql, ...params) {
    return new Promise((resolve, reject) => {
      this.#db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, ...params) {
    return new Promise((resolve, reject) => {
      this.#db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log("!!! all() is finished !!!");
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.#db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("!!! close() is finished !!!");
          resolve();
        }
      });
    });
  }
}
