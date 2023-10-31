export default class Memo {
  #id;
  #content;

  constructor({ id, content }) {
    this.#id = id;
    this.#content = content;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#content.split("\n")[0];
  }

  get content() {
    return this.#content;
  }
}
