import SQLiteAdapter from "./sqlite-adapter.js";

export default class Memo {
  static #adapter = new SQLiteAdapter();

  static createTable() {
    return this.#adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)"
    );
  }

  static all() {
    return this.#adapter.all("SELECT * FROM memos ORDER BY id ASC");
  }

  static destroy(id) {
    return this.#adapter.run("DELETE FROM memos WHERE id = ?", id);
  }

  static async count() {
    const result = await this.#adapter.get("SELECT COUNT(*) FROM memos");
    return result["COUNT(*)"];
  }

  static save(title, content) {
    return this.#adapter.run(
      "INSERT INTO memos(title, content) VALUES(?, ?)",
      title,
      content
    );
  }

  static close() {
    return this.#adapter.close();
  }

  #title;
  #content;

  constructor(lines) {
    this.#title = lines[0];
    this.#content = lines.slice(1).join("\n");
  }

  save() {
    return Memo.save(this.#title, this.#content);
  }
}
