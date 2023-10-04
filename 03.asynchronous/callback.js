import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";

const db = new sqlite3.Database(":memory:");

db.run(commonSQL.createBooksTable, () => {
  db.run(commonSQL.insertBook, "JavaScript Primer", function () {
    console.log(`自動採番されたID:${this.lastID}`);
    db.get(commonSQL.selectBook, this.lastID, (_err, row) => {
      console.log(row);
      db.run(commonSQL.dropBooksTable);
    });
  });
});
