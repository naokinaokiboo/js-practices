import * as Calendar from "../calendar";

describe("表示するカレンダーの年月のテスト", () => {
  test("指定した年月をカレンダーの表示年月とする", () => {
    const response = Calendar.decideDispYearMonth(1970, 1);
    const expectYearMonth = [1970, 1];
    expect(response).toEqual(expectYearMonth);
  });

  test("月が未指定の場合は、現在の月を表示月とする", () => {
    const response = Calendar.decideDispYearMonth(2100, undefined);
    const expectYearMonth = [2100, new Date().getMonth() + 1];
    expect(response).toEqual(expectYearMonth);
  });

  test("年が未指定の場合は、現在の年を表示年とする", () => {
    const response = Calendar.decideDispYearMonth(undefined, 12);
    const expectYearMonth = [new Date().getFullYear(), 12];
    expect(response).toEqual(expectYearMonth);
  });

  test("年、月共に未指定の場合は、現在の年月を表示年月とする", () => {
    const response = Calendar.decideDispYearMonth(undefined, undefined);
    const now = new Date();
    const expectYearMonth = [now.getFullYear(), now.getMonth() + 1];
    expect(response).toEqual(expectYearMonth);
  });
});

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
