<template>
  <div v-if="Object.keys(displayCard).length > 0" class="h-100">
    <div id="l-card-image">
      <font-awesome-icon
        v-if="displayCards.length > 1"
        class="l-prev animated infinite bounceLeft faster"
        :icon="faIcons.faCaretLeft"
        size="3x"
        @click="fetchPrevDisplayCard(displayCard)"
      />
      <font-awesome-icon
        v-if="displayCards.length > 1"
        class="l-next animated infinite bounceRight faster"
        :icon="faIcons.faCaretRight"
        size="3x"
        @click="fetchNextDisplayCard(displayCard)"
      />

      <transition :enter-active-class="enterActiveClass" mode="out-in">
        <img
          v-if="showArtImage"
          key="1"
          :src="displayCard.image.art"
          :alt="displayCard.name"
          class="img-fluid l-image-art"
          @click="
            showArtImage = false;
            enterActiveClass = 'animated zoomOut faster';
          "
        />
        <img
          v-else
          key="2"
          :src="displayCard.image.big"
          :alt="displayCard.name"
          class="img-fluid l-image-big"
          @click="
            showArtImage = true;
            enterActiveClass = 'animated zoomIn faster';
          "
        />
      </transition>
    </div>
    <div id="l-card-data">
      <div id="l-card-name-level-attr">
        <div class="l-card-info-box">
          <div class="l-card-info-inner-box">
            <div class="card-name">{{ displayCard.name }}</div>
            <hr />
            <div class="d-flex">
              <div v-if="isMonsterCard(displayCard)" class="l-monster-level">
                <img
                  class="img-fluid"
                  src="@/assets/monster_level.png"
                  alt="Level"
                />{{ displayCard.level }}
              </div>
              <div v-else-if="isSpellCard(displayCard)" class="l-st-card-type">
                <img
                  class="img-fluid"
                  src="@/assets/card_attributes/card_attribute_spell.png"
                  alt="Card Type"
                />{{ displayCard.cardType | capitalize }}
              </div>
              <div v-else-if="isTrapCard(displayCard)" class="l-st-card-type">
                <img
                  class="img-fluid"
                  src="@/assets/card_attributes/card_attribute_trap.png"
                  alt="Card Type"
                />{{ displayCard.cardType | capitalize }}
              </div>

              <div v-if="isMonsterCard(displayCard)" class="l-monster-attr">
                <img
                  class="img-fluid"
                  :src="getMonsterAttributeIcon(displayCard.attribute)"
                  alt="Attribute"
                />{{ displayCard.attribute | capitalize }}
              </div>
              <div
                v-else-if="
                  (isSpellCard(displayCard) || isTrapCard(displayCard)) &&
                    !isStNormal(displayCard)
                "
                class="l-st-type"
              >
                <img
                  class="img-fluid"
                  :src="getStTypeIcon(displayCard.types[0])"
                  alt="Spell/Trap Type"
                />{{ displayCard.types[0] | capitalize }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="l-card-type-text-stats">
        <div class="l-card-info-box">
          <div class="l-card-info-inner-box">
            <div v-if="isMonsterCard(displayCard)" class="l-monster-types">
              [{{ capitalizedDisplayCardMonsterType }}/{{
                displayCard.types
                  .map(t => $options.filters.capitalize(t))
                  .join("/")
              }}]
            </div>
            <div
              ref="cardText"
              class="l-card-text"
              :class="{
                'l-full-height':
                  isSpellCard(displayCard) || isTrapCard(displayCard)
              }"
            >
              {{ displayCard.text }}
            </div>
            <div v-if="isMonsterCard(displayCard)" class="l-monster-stats">
              {{ `ATK/${displayCard.atk} DEF/${displayCard.def}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { mapGetters } from "vuex";
import {
  FETCH_PREV_DISPLAY_CARD,
  FETCH_NEXT_DISPLAY_CARD
} from "@/store/actions.type";
import {
  isMonsterCard,
  isSpellCard,
  isTrapCard,
  isStNormal
} from "@/common/utilities";

export default {
  components: {
    FontAwesomeIcon
  },

  computed: {
    faIcons() {
      return {
        faCaretLeft,
        faCaretRight
      };
    },
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
        waterAttrIcon: require("@/assets/card_attributes/card_attribute_water.png"),
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
    capitalizedDisplayCardMonsterType() {
      const displayCardMonsterType = this.displayCard.monsterType;

      for (const separator of [" ", "-"]) {
        if (displayCardMonsterType.indexOf(separator) > -1) {
          return displayCardMonsterType
            .split(separator)
            .map(word => this.$options.filters.capitalize(word))
            .join(separator);
        }
      }

      return this.$options.filters.capitalize(displayCardMonsterType);
    },
    ...mapGetters(["displayCard", "displayCards"])
  },

  watch: {
    // When the display card changes, reset the card text scroll
    displayCard() {
      if (this.$refs.cardText) {
        this.$refs.cardText.scrollTop = 0;
      }
    }
  },

  data() {
    return {
      showArtImage: false,
      enterActiveClass: ""
    };
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
    },
    fetchPrevDisplayCard(displayCard) {
      this.$store.dispatch(FETCH_PREV_DISPLAY_CARD, displayCard);
    },
    fetchNextDisplayCard(displayCard) {
      this.$store.dispatch(FETCH_NEXT_DISPLAY_CARD, displayCard);
    },
    isMonsterCard,
    isSpellCard,
    isTrapCard,
    isStNormal
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
$blue: #001569;
$green: #6ed96c;
$light-blue-100: #0d659b;
$light-blue-200: #007fb4;
$light-blue-300: #003f89;
$light-blue-400: #003773;
$light-blue-500: #0055b7;
$white: #ffffff;

#l-card-image {
  height: 40%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;

  img {
    max-height: 100%;
    display: block;
    margin: 0 auto;
    padding-bottom: 0.5rem;

    &.l-image-big {
      cursor: zoom-in;
    }

    &.l-image-art {
      cursor: zoom-out;
    }
  }

  .l-prev,
  .l-next {
    cursor: pointer;
    color: $white;
  }

  .l-prev {
    position: absolute;
    left: 5px;
  }

  .l-next {
    position: absolute;
    right: 5px;
  }
}

.zoomIn {
  animation-name: zoomIn;
}

.zoomOut {
  animation-name: zoomOut;
}

.bounceLeft {
  animation-name: bounceLeft;
}

.bounceRight {
  animation-name: bounceRight;
}

@keyframes zoomIn {
  0% {
    transform: scale(0.525) translateY(-26px);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes zoomOut {
  0% {
    transform: scale(1.9) translateY(14px);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounceLeft {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-5px);
  }
}

@keyframes bounceRight {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
  }
}

#l-card-data {
  height: 60%;

  .l-card-info-box {
    height: 100%;
    background-color: $light-blue-300;
    border: 2px solid $light-blue-500;
    padding: 0.25rem;
    color: $white;

    .l-card-info-inner-box {
      height: 100%;
      background-color: $light-blue-400;
      padding: 0.25rem;
    }
  }
}

#l-card-name-level-attr {
  margin-bottom: 0.5rem;

  hr {
    margin: 0.25rem 3rem;
    border: 0;
    border-top: 1px solid $light-blue-100;
  }

  .l-monster-level,
  .l-monster-attr,
  .l-st-card-type,
  .l-st-type {
    display: flex;
    align-items: center;

    img {
      height: 24px;
      margin-right: 0.25rem;
    }
  }

  .l-monster-level,
  .l-st-card-type {
    margin-right: 1rem;
  }
}

#l-card-type-text-stats {
  // #l-card-name-level-attr has 77px height + 0.5rem margin-bottom
  height: calc(100% - (77px + 0.5rem));

  .l-monster-types {
    color: $green;
  }

  .l-card-text {
    // .l-monster-types has 24px height + .l-monster-stats has 40px height
    height: calc(100% - (24px + 40px));
    overflow-y: scroll;
    white-space: pre-line;

    &.l-full-height {
      height: 100%;
    }
  }

  .l-monster-stats {
    border-top: 2px solid $light-blue-200;
    background-color: $blue;
    padding: 0.25rem;
    margin: 0.25rem -0.25rem 0 -0.25rem;
    font-size: 1.25rem;
    text-align: right;
  }
}
</style>
