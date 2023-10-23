import SQLiteAdapter from "./sqlite-adapter.js";
import Memo from "./memo.js";

export default class MemoDataAccessor {
  static #adapter = new SQLiteAdapter();

  static createTable() {
    return this.#adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)"
    );
  }

  static async all() {
    const memos = await this.#adapter.all(
      "SELECT * FROM memos ORDER BY id ASC"
    );
    return memos.map((memo) => Memo.createMemo(memo.id, memo.content));
  }

  static async count() {
    const result = await this.#adapter.get("SELECT COUNT(*) FROM memos");
    return result["COUNT(*)"];
  }

  static close() {
    return this.#adapter.close();
  }

  static save(memo) {
    return this.#adapter.run(
      "INSERT INTO memos(content) VALUES(?)",
      memo.content
    );
  }

  static destroy(id) {
    return this.#adapter.run("DELETE FROM memos WHERE id = ?", id);
  }
}
