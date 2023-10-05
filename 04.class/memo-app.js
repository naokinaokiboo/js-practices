#! /usr/bin/env node
import * as readline from "readline";
import minimist from "minimist";
import enquirer from "enquirer";
import { Memo } from "./memo.js";
import { SQLiteAdapter } from "./sqlite-adapter.js";

class MemoApp {
  #adapter;
  #optList;
  #optReference;
  #optDelete;

  constructor() {
    this.#adapter = new SQLiteAdapter();
    const args = minimist(process.argv.slice(2));
    this.#optList = args.l;
    this.#optReference = args.r;
    this.#optDelete = args.d;
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
    return this.#adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE, content TEXT NOT NULL)"
    );
  }

  async #executeCommand() {
    const args = minimist(process.argv.slice(2));
    if (!this.#optList && !this.#optReference && !this.#optDelete) {
      return this.#saveMemo();
    }

    const numOfMemos = await Memo.count(this.#adapter);
    if (numOfMemos === 0) {
      console.log("No notes have been registered.");
      return;
    }

    if (args.l) {
      return this.#showAllTitles();
    } else if (args.r) {
      return this.#showMemo();
    } else if (args.d) {
      return this.#deleteMemo();
    }
  }

  async #saveMemo() {
    const lines = await this.#readlinePromise();
    const memo = new Memo(lines[0], lines.slice(1).join("\n"));
    return memo.save(this.#adapter);
  }

  #readlinePromise() {
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
    const selectedMemo = await this.#selectMemo();
    console.log(selectedMemo["title"]);
    console.log(selectedMemo["content"]);
  }

  async #deleteMemo() {
    const selectedMemo = await this.#selectMemo();
    return Memo.destroy(this.#adapter, selectedMemo["id"]);
  }

  async #selectMemo() {
    const memos = await Memo.all(this.#adapter);
    const questions = [
      {
        type: "select",
        name: "value",
        message: "Select the memo you want to display.",
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

const memoApp = new MemoApp();
memoApp.execute();
