#! /usr/bin/env node

import minimist from "minimist";

const args = minimist(process.argv.slice(2));
let year = args.y;
let month = args.m;
const now = new Date();
if (year === undefined || month === undefined) {
  year = now.getFullYear();
  month = now.getMonth() + 1;
}

const firstDate = new Date(year, month - 1, 1);
const firstDayOfWeek = firstDate.getDay();
const lastDay = new Date(year, month, 0).getDate();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (const blank of new Array(firstDayOfWeek).fill("   ")) {
  process.stdout.write(blank);
}

const dates = [...Array(lastDay)].map(
  (_, day) => new Date(year, month - 1, day + 1)
);

let weekIndex = 0;
for (const date of dates) {
  let day = ("  " + date.getDate().toString() + " ").slice(-3);
  process.stdout.write(day);
  if (date.getDay() === 6) {
    process.stdout.write("\n");
    weekIndex++;
  }
}
if (weekIndex === 4) {
  console.log("");
  weekIndex++;
}

if (weekIndex === 5) {
  console.log("");
}
