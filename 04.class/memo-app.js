#! /usr/bin/env node
import * as readline from "readline";
import minimist from "minimist";
import enquirer from "enquirer";
import { Memo } from "./memo.js";
import { SQLiteAdapter } from "./SQLiteAdapter.js";

const main = async () => {
  const adapter = new SQLiteAdapter();
  try {
    await prepareDB(adapter);
    await receiveCommand(adapter);
  } finally {
    await adapter.close();
  }
};

const prepareDB = (adapter) => {
  return adapter.run(
    "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE, content TEXT NOT NULL)"
  );
};

const receiveCommand = async (adapter) => {
  const args = minimist(process.argv.slice(2));
  if (args.l) {
    return showAllTitles(adapter);
  } else if (args.r) {
    return showMemo(adapter);
  } else if (args.d) {
    // TODO:メモ削除
  } else {
    return saveMemo(adapter);
  }
};

const showMemo = async (adapter) => {
  const memos = await Memo.all(adapter);
  const questions = [
    {
      type: "select",
      name: "value",
      message: "Select the memo you want to display.",
      choices: memos.map((memo) => {
        return {
          name: memo.title,
          message: memo.title,
          value: { title: memo.title, content: memo.content },
        };
      }),
      result() {
        return this.focused.value;
      },
    },
  ];

  const answer = await enquirer.prompt(questions);
  const selectedMemo = answer["value"];
  console.log(selectedMemo["title"]);
  console.log(selectedMemo["content"]);
};

const showAllTitles = async (adapter) => {
  const memos = await Memo.all(adapter);
  for (const memo of memos) {
    console.log(memo["title"]);
  }
};

const saveMemo = async (adapter) => {
  const lines = await readlinePromise();
  const memo = new Memo(lines[0], lines.slice(1).join("\n"));
  return memo.save(adapter);
};

const readlinePromise = () => {
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
};

main();
