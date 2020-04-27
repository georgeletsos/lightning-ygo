// Card Frame Icons
export const effectFrameIcon = require("@/assets/card_frames/card_frame_effect_small.png");
export const fusionFrameIcon = require("@/assets/card_frames/card_frame_fusion_small.png");
export const normalFrameIcon = require("@/assets/card_frames/card_frame_normal_small.png");
export const ritualFrameIcon = require("@/assets/card_frames/card_frame_ritual_small.png");
export const spellFrameIcon = require("@/assets/card_frames/card_frame_spell_small.png");
export const synchroFrameIcon = require("@/assets/card_frames/card_frame_synchro_small.png");
export const tokenFrameIcon = require("@/assets/card_frames/card_frame_token_small.png");
export const trapFrameIcon = require("@/assets/card_frames/card_frame_trap_small.png");

// Card Type Icons (Spell/Trap)
export const spellIcon = require("@/assets/card_types/card_type_spell.png");
export const trapIcon = require("@/assets/card_types/card_type_trap.png");

// Monster Level Icons
export const monsterLevelIcon = require("@/assets/monster_level.png");

// Monster Attribute Icons
export const darkAttrIcon = require("@/assets/card_attributes/card_attribute_dark.png");
export const divineAttrIcon = require("@/assets/card_attributes/card_attribute_divine.png");
export const earthAttrIcon = require("@/assets/card_attributes/card_attribute_earth.png");
export const fireAttrIcon = require("@/assets/card_attributes/card_attribute_fire.png");
export const lightAttrIcon = require("@/assets/card_attributes/card_attribute_light.png");
export const waterAttrIcon = require("@/assets/card_attributes/card_attribute_water.png");
export const windAttrIcon = require("@/assets/card_attributes/card_attribute_wind.png");

export const getMonsterAttributeIcon = function(attr) {
  switch (attr) {
    case "dark":
      return darkAttrIcon;
    case "divine":
      return divineAttrIcon;
    case "earth":
      return earthAttrIcon;
    case "fire":
      return fireAttrIcon;
    case "light":
      return lightAttrIcon;
    case "water":
      return waterAttrIcon;
    case "wind":
      return windAttrIcon;
    default:
      throw Error("Not an existing attribute");
  }
};

// Monster Type Icons
export const aquaTypeIcon = require("@/assets/monster_types/monster_type_aqua.png");
export const beastTypeIcon = require("@/assets/monster_types/monster_type_beast.png");
export const beastWarriorTypeIcon = require("@/assets/monster_types/monster_type_beast_warrior.png");
export const dinosaurTypeIcon = require("@/assets/monster_types/monster_type_dinosaur.png");
export const divineBeastTypeIcon = require("@/assets/monster_types/monster_type_divine_beast.png");
export const dragonTypeIcon = require("@/assets/monster_types/monster_type_dragon.png");
export const fairyTypeIcon = require("@/assets/monster_types/monster_type_fairy.png");
export const fiendTypeIcon = require("@/assets/monster_types/monster_type_fiend.png");
export const fishTypeIcon = require("@/assets/monster_types/monster_type_fish.png");
export const insectTypeIcon = require("@/assets/monster_types/monster_type_insect.png");
export const machineTypeIcon = require("@/assets/monster_types/monster_type_machine.png");
export const plantTypeIcon = require("@/assets/monster_types/monster_type_plant.png");
export const psychicTypeIcon = require("@/assets/monster_types/monster_type_psychic.png");
export const pyroTypeIcon = require("@/assets/monster_types/monster_type_pyro.png");
export const reptileTypeIcon = require("@/assets/monster_types/monster_type_reptile.png");
export const rockTypeIcon = require("@/assets/monster_types/monster_type_rock.png");
export const seaSerpentTypeIcon = require("@/assets/monster_types/monster_type_sea_serpent.png");
export const spellcasterTypeIcon = require("@/assets/monster_types/monster_type_spellcaster.png");
export const thunderTypeIcon = require("@/assets/monster_types/monster_type_thunder.png");
export const warriorTypeIcon = require("@/assets/monster_types/monster_type_warrior.png");
export const wingedBeastTypeIcon = require("@/assets/monster_types/monster_type_winged_beast.png");
export const wyrmTypeIcon = require("@/assets/monster_types/monster_type_wyrm.png");
export const zombieTypeIcon = require("@/assets/monster_types/monster_type_zombie.png");

export const getMonsterTypeIcon = function(monsterType) {
  switch (monsterType) {
    case "aqua":
      return aquaTypeIcon;
    case "beast":
      return beastTypeIcon;
    case "beast-warrior":
      return beastWarriorTypeIcon;
    case "dinosaur":
      return dinosaurTypeIcon;
    case "divine-beast":
      return divineBeastTypeIcon;
    case "dragon":
      return dragonTypeIcon;
    case "fairy":
      return fairyTypeIcon;
    case "fiend":
      return fiendTypeIcon;
    case "fish":
      return fishTypeIcon;
    case "insect":
      return insectTypeIcon;
    case "machine":
      return machineTypeIcon;
    case "plant":
      return plantTypeIcon;
    case "psychic":
      return psychicTypeIcon;
    case "pyro":
      return pyroTypeIcon;
    case "reptile":
      return reptileTypeIcon;
    case "rock":
      return rockTypeIcon;
    case "sea serpent":
      return seaSerpentTypeIcon;
    case "spellcaster":
      return spellcasterTypeIcon;
    case "thunder":
      return thunderTypeIcon;
    case "warrior":
      return warriorTypeIcon;
    case "winged beast":
      return wingedBeastTypeIcon;
    case "wyrm":
      return wyrmTypeIcon;
    case "zombie":
      return zombieTypeIcon;
    default:
      throw Error("Not an existing monster type");
  }
};

// Spell/Trap Type Icons
export const equipSpellIcon = require("@/assets/st_types/spell_type_equip.png");
export const fieldSpellIcon = require("@/assets/st_types/spell_type_field.png");
export const quickPlaySpellIcon = require("@/assets/st_types/spell_type_quick_play.png");
export const ritualSpellIcon = require("@/assets/st_types/spell_type_ritual.png");
export const continuousStIcon = require("@/assets/st_types/st_type_continuous.png");
export const counterTrapIcon = require("@/assets/st_types/trap_type_counter.png");

export const getStTypeIcon = function(stType) {
  switch (stType) {
    case "equip":
      return equipSpellIcon;
    case "field":
      return fieldSpellIcon;
    case "quick-play":
      return quickPlaySpellIcon;
    case "ritual":
      return ritualSpellIcon;
    case "continuous":
      return continuousStIcon;
    case "counter":
      return counterTrapIcon;
    default:
      throw Error("Not an existing st type");
  }
};
