import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";

const db = new sqlite3.Database(":memory:");

db.run(commonSQL.createBooksTable, () => {
  db.run(commonSQL.insertBookErr, "JavaScript Primer", (err) => {
    if (err) {
      console.error(err.message);
    }
    db.get(commonSQL.selectBookErr, 1, (err) => {
      if (err) {
        console.error(err.message);
      }
      db.run(commonSQL.dropBooksTable);
    });
  });
});
