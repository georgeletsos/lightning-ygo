export const cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

export const isMonsterCard = card => {
  return card.cardType === "monster";
};

export const isTunerMonsterCard = card => {
  return card.types.includes("tuner");
};

export const isSpellCard = card => {
  return card.cardType === "spell";
};

export const isTrapCard = card => {
  return card.cardType === "trap";
};

export const isStNormal = card => {
  return card.types[0] === "normal";
};
