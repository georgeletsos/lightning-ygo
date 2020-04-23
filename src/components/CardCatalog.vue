<template>
  <!-- Card Catalog -->
  <div id="catalog">
    <div v-if="displayCards.length > 0" class="row no-gutters">
      <div v-for="card in displayCards" :key="card.name" class="col-2 p-1">
        <div class="position-relative">
          <img :src="card.image.big" :alt="card.name" class="img-fluid" />
          <img
            v-if="card.cardType === 'monster'"
            class="img-fluid l-card-attr"
            :src="getMonsterAttributeIcon(card.attribute)"
            :alt="card.attribute"
          />
          <img
            v-else-if="card.cardType === 'spell'"
            class="img-fluid l-card-attr"
            :src="icons.spellIcon"
            alt="spell"
          />
          <img
            v-else-if="card.cardType === 'trap'"
            class="img-fluid l-card-attr"
            :src="icons.trapIcon"
            alt="trap"
          />
          <img
            v-if="card.cardType === 'monster'"
            class="img-fluid l-monster-type"
            :src="getMonsterTypeIcon(card.monsterType)"
            :alt="card.monsterType"
          />
          <img
            v-else-if="
              ['spell', 'trap'].includes(card.cardType) &&
                card.types[0] !== 'normal'
            "
            class="img-fluid l-monster-type"
            :src="getStTypeIcon(card.types[0])"
            :alt="card.types[0]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    icons() {
      return {
        spellIcon: require("@/assets/card_attributes/card_attribute_spell.png"),
        equipSpellIcon: require("@/assets/st_types/spell_type_equip.png"),
        fieldSpellIcon: require("@/assets/st_types/spell_type_field.png"),
        quickPlaySpellIcon: require("@/assets/st_types/spell_type_quick_play.png"),
        ritualSpellIcon: require("@/assets/st_types/spell_type_ritual.png"),
        continuousStIcon: require("@/assets/st_types/st_type_continuous.png"),
        trapIcon: require("@/assets/card_attributes/card_attribute_trap.png"),
        counterTrapIcon: require("@/assets/st_types/trap_type_counter.png"),
        darkAttrIcon: require("@/assets/card_attributes/card_attribute_dark.png"),
        divineAttrIcon: require("@/assets/card_attributes/card_attribute_divine.png"),
        earthAttrIcon: require("@/assets/card_attributes/card_attribute_earth.png"),
        fireAttrIcon: require("@/assets/card_attributes/card_attribute_fire.png"),
        lightAttrIcon: require("@/assets/card_attributes/card_attribute_light.png"),
        waterAttrIcon: require("@/assets/card_attributes/card_attribute_wind.png"),
        windAttrIcon: require("@/assets/card_attributes/card_attribute_wind.png"),
        aquaTypeIcon: require("@/assets/monster_types/monster_type_aqua.png"),
        beastTypeIcon: require("@/assets/monster_types/monster_type_beast.png"),
        beastWarriorTypeIcon: require("@/assets/monster_types/monster_type_beast_warrior.png"),
        dinosaurTypeIcon: require("@/assets/monster_types/monster_type_dinosaur.png"),
        divineBeastTypeIcon: require("@/assets/monster_types/monster_type_divine_beast.png"),
        dragonTypeIcon: require("@/assets/monster_types/monster_type_dragon.png"),
        fairyTypeIcon: require("@/assets/monster_types/monster_type_fairy.png"),
        fiendTypeIcon: require("@/assets/monster_types/monster_type_fiend.png"),
        fishTypeIcon: require("@/assets/monster_types/monster_type_fish.png"),
        insectTypeIcon: require("@/assets/monster_types/monster_type_insect.png"),
        machineTypeIcon: require("@/assets/monster_types/monster_type_machine.png"),
        plantTypeIcon: require("@/assets/monster_types/monster_type_plant.png"),
        psychicTypeIcon: require("@/assets/monster_types/monster_type_psychic.png"),
        pyroTypeIcon: require("@/assets/monster_types/monster_type_pyro.png"),
        reptileTypeIcon: require("@/assets/monster_types/monster_type_reptile.png"),
        rockTypeIcon: require("@/assets/monster_types/monster_type_rock.png"),
        seaSerpentTypeIcon: require("@/assets/monster_types/monster_type_sea_serpent.png"),
        spellcasterTypeIcon: require("@/assets/monster_types/monster_type_spellcaster.png"),
        thunderTypeIcon: require("@/assets/monster_types/monster_type_thunder.png"),
        warriorTypeIcon: require("@/assets/monster_types/monster_type_warrior.png"),
        wingedBeastTypeIcon: require("@/assets/monster_types/monster_type_winged_beast.png"),
        wyrmTypeIcon: require("@/assets/monster_types/monster_type_wyrm.png"),
        zombieTypeIcon: require("@/assets/monster_types/monster_type_zombie.png")
      };
    },
    ...mapGetters(["displayCards"])
  },

  methods: {
    getMonsterAttributeIcon(attr) {
      switch (attr) {
        case "dark":
          return this.icons.darkAttrIcon;
        case "divine":
          return this.icons.divineAttrIcon;
        case "earth":
          return this.icons.earthAttrIcon;
        case "fire":
          return this.icons.fireAttrIcon;
        case "light":
          return this.icons.lightAttrIcon;
        case "water":
          return this.icons.waterAttrIcon;
        case "wind":
          return this.icons.windAttrIcon;
      }
    },
    getMonsterTypeIcon(monsterType) {
      switch (monsterType) {
        case "aqua":
          return this.icons.aquaTypeIcon;
        case "beast":
          return this.icons.beastTypeIcon;
        case "beast-warrior":
          return this.icons.beastWarriorTypeIcon;
        case "dinosaur":
          return this.icons.dinosaurTypeIcon;
        case "divine-beast":
          return this.icons.divineBeastTypeIcon;
        case "dragon":
          return this.icons.dragonTypeIcon;
        case "fairy":
          return this.icons.fairyTypeIcon;
        case "fiend":
          return this.icons.fiendTypeIcon;
        case "fish":
          return this.icons.fishTypeIcon;
        case "insect":
          return this.icons.insectTypeIcon;
        case "machine":
          return this.icons.machineTypeIcon;
        case "plant":
          return this.icons.plantTypeIcon;
        case "psychic":
          return this.icons.psychicTypeIcon;
        case "pyro":
          return this.icons.pyroTypeIcon;
        case "reptile":
          return this.icons.reptileTypeIcon;
        case "rock":
          return this.icons.rockTypeIcon;
        case "sea serpent":
          return this.icons.seaSerpentTypeIcon;
        case "spellcaster":
          return this.icons.spellcasterTypeIcon;
        case "thunder":
          return this.icons.thunderTypeIcon;
        case "warrior":
          return this.icons.warriorTypeIcon;
        case "winged beast":
          return this.icons.wingedBeastTypeIcon;
        case "wyrm":
          return this.icons.wyrmTypeIcon;
        case "zombie":
          return this.icons.zombieTypeIcon;
      }
    },
    getStTypeIcon(stType) {
      switch (stType) {
        case "equip":
          return this.icons.equipSpellIcon;
        case "field":
          return this.icons.fieldSpellIcon;
        case "quick-play":
          return this.icons.quickPlaySpellIcon;
        case "ritual":
          return this.icons.ritualSpellIcon;
        case "continuous":
          return this.icons.continuousStIcon;
        case "counter":
          return this.icons.counterTrapIcon;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#catalog {
  // Correct Height is needed for the scroll
  height: calc(100% - 132px);
  overflow-y: scroll;
  margin-right: -6px; // 100% of scroll width

  .l-card-attr,
  .l-monster-type {
    height: 20px !important;
  }

  .l-card-attr {
    position: absolute;
    bottom: 1px;
    left: 1px;
  }

  .l-monster-type {
    position: absolute;
    bottom: 1px;
    right: 1px;
  }
}
</style>
