#! /usr/bin/env node
import readline from "readline";
import minimist from "minimist";
import enquirer from "enquirer";
import { Memo } from "./memo.js";
import { SQLiteAdapter } from "./sqlite-adapter.js";

export default class MemoApp {
  #adapter;
  #optionList;
  #optionReference;
  #optionDelete;

  constructor() {
    this.#adapter = new SQLiteAdapter();
    const args = minimist(process.argv.slice(2));
    this.#optionList = args.l;
    this.#optionReference = args.r;
    this.#optionDelete = args.d;
  }

  async execute() {
    try {
      await this.#prepareDB();
      await this.#executeCommand();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    } finally {
      await this.#adapter.close();
    }
  }

  #prepareDB() {
    Memo.createTable;
  }

  async #executeCommand() {
    if (!this.#optionList && !this.#optionReference && !this.#optionDelete) {
      return this.#saveMemo();
    }

    const numOfMemos = await Memo.count(this.#adapter);
    if (numOfMemos === 0) {
      console.log("No memos have been registered.");
      return;
    }

    if (this.#optionList) {
      return this.#showAllTitles();
    } else if (this.#optionReference) {
      return this.#showMemo();
    } else if (this.#optionDelete) {
      return this.#deleteMemo();
    }
  }

  async #saveMemo() {
    const lines = await this.#readlinePromise();
    const memo = new Memo(lines[0], lines.slice(1).join("\n"));
    return memo
      .save(this.#adapter)
      .then(() => console.log("The memo was successfully saved."));
  }

  #readlinePromise() {
    console.log("Enter your memo. (Press Ctrl+D to finish typing).");
    const reader = readline.createInterface({
      input: process.stdin,
    });

    const lines = [];
    return new Promise((resolve) => {
      reader.on("line", (line) => {
        lines.push(line);
      });
      reader.on("close", () => {
        resolve(lines);
      });
    });
  }

  async #showAllTitles() {
    const memos = await Memo.all(this.#adapter);
    for (const memo of memos) {
      console.log(memo["title"]);
    }
  }

  async #showMemo() {
    const selectedMemo = await this.#selectMemo(
      "Select the memo you want to display."
    );
    console.log(selectedMemo["title"]);
    console.log(selectedMemo["content"]);
  }

  async #deleteMemo() {
    const selectedMemo = await this.#selectMemo(
      "Select the memo you want to delete."
    );
    return Memo.destroy(this.#adapter, selectedMemo["id"]).then(() =>
      console.log("The memo was successfully deleted.")
    );
  }

  async #selectMemo(msg) {
    const memos = await Memo.all(this.#adapter);
    const questions = [
      {
        type: "select",
        name: "value",
        message: msg,
        choices: memos.map((memo) => {
          return {
            name: memo.title,
            message: memo.title,
            value: { id: memo.id, title: memo.title, content: memo.content },
          };
        }),
        result() {
          return this.focused.value;
        },
      },
    ];

    const answer = await enquirer.prompt(questions);
    return answer["value"];
  }
}
