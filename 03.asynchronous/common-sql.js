export const createBooksTable =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
export const insertBook = "INSERT INTO books(title) values(?);";
export const selectBook = "SELECT * FROM books WHERE id = ?;";
export const insertBookErr = "INSERT INTO books(noExistsColumn) values(?);";
export const selectBookErr = "SELECT * FROM noExistsTable WHERE id = ?;";
export const dropBooksTable = "DROP TABLE books;";
