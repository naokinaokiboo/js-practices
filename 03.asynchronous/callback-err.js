import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";
import * as commonErr from "./common-err.js";

const db = new sqlite3.Database(":memory:");

db.run(commonSQL.createBooksTable, () => {
  db.run(commonSQL.insertBookErr, "JavaScript Primer", (err) => {
    if (err) {
      commonErr.handleError(err);
    }
    db.run(commonSQL.selectBookErr, 1, (err) => {
      if (err) {
        commonErr.handleError(err);
      }
      db.run(commonSQL.dropBooksTable);
    });
  });
});
