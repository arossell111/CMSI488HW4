const regexes = {
  canadianPostalCode: /^[^DFIOQU1-9][^DFIOQU]{2} [^DFIOQU]{3}$/,
  visa: /^4(\d{12}|\d{15})$/,
  masterCard: /^(5[1-5]\d{14}|2(22[1-9]|2[3-9]\d|[3-6]\d\d|7[01][0-9]|720)\d{12})$/,
  adaFloat: /^(\d+(_\d+)*#((\d|[A-F]|[a-f]))+(_(\d|[A-F]|[a-f])+)*(.(\d|[A-F]|[a-f])+(_(\d|[A-F]|[a-f])+)*)?#([eE][\+\-]?\d+(_\d+)*)?)$|^(\d+(_\d+)*(.\d+(_\d+)*)?([eE][\+\-]?\d+(_\d+)*)?)$/,
  notThreeEndingInOO: /^[A-Za-z]{1,2}$|^[A-Za-z]{3}(?<![oO]{2})$|^[A-Za-z]{4,}$|^$/,
  divisibleBy64: /^[01]*1[01]*(000000)$|^0*$/,
  eightThroughTwentyNine: /^([89]|[12][0-9])(.[0-9]+)?$/,
  mLComment: /^\(\*\s*\S*(?<!\(\*\s*\S*\*\))\*\)$/,
  notDogDoorDenNoLookAround: /^[^d\d][A-Za-z]*$|^d[^eo\s][A-Za-z]*$|^d(?:og|oor|en)[A-Za-z]+$|^doo[^r\s][A-Za-z]*$|^do[^og\s][A-Za-z]*$|^de[^n\s][A-Za-z]*$|^(doo|do|de|d)$|^$/,
  notDogDoorDenWithLookAround: /^[a-zA-Z]*(?<!\bdog\b|\bden\b|\bdoor\b)$/,
};

export function matches(name, string) {
  return regexes[name].test(string) }