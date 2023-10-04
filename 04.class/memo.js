export class Memo {
  static all(adapter) {
    return adapter.all("SELECT * FROM memos ORDER BY id ASC");
  }

  static destroy(adapter, id) {
    // TODO:DBから削除
  }

  #title;
  #content;

  constructor(title, content) {
    this.#title = title;
    this.#content = content;
  }

  save(adapter) {
    return adapter.run(
      "INSERT INTO memos(title, content) VALUES(?, ?)",
      this.#title,
      this.#content
    );
  }
}
