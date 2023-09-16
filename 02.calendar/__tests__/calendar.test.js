import * as Calendar from "../calendar";

describe("カレンダー表示のテスト", () => {
  test("1970_01", () => {
    const response = Calendar.generateCalendar(1970, 1);
    const expectCalendar = [
      "      1月 1970",
      "日 月 火 水 木 金 土",
      "             1  2  3 ",
      " 4  5  6  7  8  9 10 ",
      "11 12 13 14 15 16 17 ",
      "18 19 20 21 22 23 24 ",
      "25 26 27 28 29 30 31 ",
      "\n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });

  test("2100_12", () => {
    const response = Calendar.generateCalendar(2100, 12);
    const expectCalendar = [
      "      12月 2100",
      "日 月 火 水 木 金 土",
      "          1  2  3  4 ",
      " 5  6  7  8  9 10 11 ",
      "12 13 14 15 16 17 18 ",
      "19 20 21 22 23 24 25 ",
      "26 27 28 29 30 31 ",
      "\n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });

  test("2023_7", () => {
    const response = Calendar.generateCalendar(2023, 7);
    const expectCalendar = [
      "      7月 2023",
      "日 月 火 水 木 金 土",
      "                   1 ",
      " 2  3  4  5  6  7  8 ",
      " 9 10 11 12 13 14 15 ",
      "16 17 18 19 20 21 22 ",
      "23 24 25 26 27 28 29 ",
      "30 31 \n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });

  test("2023_8", () => {
    const response = Calendar.generateCalendar(2023, 8);
    const expectCalendar = [
      "      8月 2023",
      "日 月 火 水 木 金 土",
      "       1  2  3  4  5 ",
      " 6  7  8  9 10 11 12 ",
      "13 14 15 16 17 18 19 ",
      "20 21 22 23 24 25 26 ",
      "27 28 29 30 31 ",
      "\n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });

  test("2023_9", () => {
    const response = Calendar.generateCalendar(2023, 9);
    const expectCalendar = [
      "      9月 2023",
      "日 月 火 水 木 金 土",
      "                1  2 ",
      " 3  4  5  6  7  8  9 ",
      "10 11 12 13 14 15 16 ",
      "17 18 19 20 21 22 23 ",
      "24 25 26 27 28 29 30 ",
      "\n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });

  test("2023_10", () => {
    const response = Calendar.generateCalendar(2023, 10);
    const expectCalendar = [
      "      10月 2023",
      "日 月 火 水 木 金 土",
      " 1  2  3  4  5  6  7 ",
      " 8  9 10 11 12 13 14 ",
      "15 16 17 18 19 20 21 ",
      "22 23 24 25 26 27 28 ",
      "29 30 31 ",
      "\n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });

  test("2015_2", () => {
    const response = Calendar.generateCalendar(2015, 2);
    const expectCalendar = [
      "      2月 2015",
      "日 月 火 水 木 金 土",
      " 1  2  3  4  5  6  7 ",
      " 8  9 10 11 12 13 14 ",
      "15 16 17 18 19 20 21 ",
      "22 23 24 25 26 27 28 ",
      "",
      "\n",
    ].join("\n");
    expect(response).toEqual(expectCalendar);
  });
});
