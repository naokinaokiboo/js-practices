import SQLiteAdapter from "./sqlite-adapter.js";

export default class Memo {
  static #adapter = new SQLiteAdapter();

  static createTable() {
    return this.#adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)"
    );
  }

  static async all() {
    const memos = await this.#adapter.all(
      "SELECT * FROM memos ORDER BY id ASC"
    );
    return memos.map((memo) => new Memo(memo.content, memo.id));
  }

  static async count() {
    const result = await this.#adapter.get("SELECT COUNT(*) FROM memos");
    return result["COUNT(*)"];
  }

  static close() {
    return this.#adapter.close();
  }

  static #save(title, content) {
    return this.#adapter.run(
      "INSERT INTO memos(title, content) VALUES(?, ?)",
      title,
      content
    );
  }

  static #destroy(id) {
    return this.#adapter.run("DELETE FROM memos WHERE id = ?", id);
  }

  #id;
  #title;
  #content;

  constructor(content, id = null) {
    this.#id = id;
    if (id === null) {
      this.#title = content[0];
      this.#content = content.join("\n");
    } else {
      const firstNewlineIndex = content.indexOf("\n");
      this.#title =
        firstNewlineIndex === -1
          ? content
          : content.slice(0, firstNewlineIndex);
      this.#content = content;
    }
  }

  save() {
    return Memo.#save(this.#title, this.#content);
  }

  destroy() {
    return Memo.#destroy(this.#id);
  }

  get title() {
    return this.#title;
  }

  get content() {
    return this.#content;
  }
}
