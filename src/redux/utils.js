export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.Cur_Abbreviation]: item }), {});
