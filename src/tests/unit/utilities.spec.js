import {
  cloneObject,
  isMonsterCard,
  isTunerMonsterCard,
  isSpellCard,
  isTrapCard,
  isStNormal
} from "@/common/utilities";

test("|cloneObject| should return the clone of an object", () => {
  const obj = [{ a: 1, b: 2 }, { c: 3 }];
  const clonedObj = cloneObject(obj);
  expect(clonedObj).toEqual(obj);
});

test("|isMonsterCard| should return whether a card is a monster or not", () => {
  const card = { cardType: "monster" };
  expect(isMonsterCard(card)).toBe(true);
});

test("|isTunerMonsterCard| should return whether a card is a tuner monster or not", () => {
  const card = { types: ["tuner"] };
  expect(isTunerMonsterCard(card)).toBe(true);
});

test("|isSpellCard| should return whether a card is a spell or not", () => {
  const card = { cardType: "spell" };
  expect(isSpellCard(card)).toBe(true);
});

test("|isTrapCard| should return whether a card is a trap or not", () => {
  const card = { cardType: "trap" };
  expect(isTrapCard(card)).toBe(true);
});

test("|isStNormal| should return whether a S/T card is normal or not", () => {
  const card = { types: ["normal"] };
  expect(isStNormal(card)).toBe(true);
});
