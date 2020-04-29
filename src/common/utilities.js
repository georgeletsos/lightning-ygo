export const cloneObject = function(object) {
  return JSON.parse(JSON.stringify(object));
};

export const isMonsterCard = function(card) {
  return card.cardType === "monster";
};

export const isTunerMonsterCard = function(card) {
  return card.types.includes("tuner");
};

export const isSpellCard = function(card) {
  return card.cardType === "spell";
};

export const isTrapCard = function(card) {
  return card.cardType === "trap";
};

export const isStNormal = function(card) {
  return card.types[0] === "normal";
};
