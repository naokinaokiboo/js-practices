export class Memo {
  static all(adapter) {
    // TODO:DBから一覧を取得
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
    // TODO:DBに保存
  }
}
