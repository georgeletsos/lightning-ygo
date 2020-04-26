<template>
  <div v-if="!card.isEmpty()" class="px-2 h-100 card-display">
    <div class="py-2 card-image-wrapper">
      <img :src="card.image" class="img-fluid d-block mx-auto h-100" />
    </div>

    <div class="card-name-type-wrapper">
      <div class="h-100 card-info-wrapper">
        <div class="p-2 h-50 d-flex align-items-center">{{ card.name }}</div>
        <div class="p-2 h-50 d-flex align-items-center">
          <div
            v-if="!isLinkMonsterCard(card)"
            class="h-100 mr-2 d-flex align-items-center"
          >
            <img
              :src="
                isMonsterCard(card)
                  ? getMonsterCardLevelOrRankIcon(card)
                  : getCardFormIcon(card)
              "
              class="mr-2 class-icon"
            />{{ isMonsterCard(card) ? card.level : card.form.toUpperCase() }}
          </div>

          <div class="h-100 d-flex align-items-center">
            <img
              :src="
                isMonsterCard(card)
                  ? getMonsterCardAttrIcon(card)
                  : getCardTypeIcon(card)
              "
              class="mr-2 class-icon"
            />{{
              isMonsterCard(card)
                ? card.attribute.toUpperCase()
                : card.type === "Normal"
                ? ""
                : card.type | capitalize
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="py-2 card-text-stats-wrapper">
      <div class="h-100 card-info-wrapper">
        <div class="pr-2 card-text-wrapper">
          <div ref="cardText" class="p-2 h-100 text-justify card-text">
            <div v-if="isMonsterCard(card)" class="card-types">
              {{ `[${card.types.join("/")}]` }}<br />
            </div>
            <div>{{ card.text }}</div>
          </div>
        </div>
        <div
          v-if="isMonsterCard(card)"
          class="p-2 d-flex align-items-center justify-content-end text-right card-stats-wrapper"
        >
          <div class="mr-2 d-flex align-items-center">
            ATK/{{ card.attack }}
          </div>
          <div
            v-if="!isLinkMonsterCard(card)"
            class="d-flex align-items-center"
          >
            DEF/{{ card.defense }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../classes/cards/Card";
import SpellCard from "../classes/cards/SpellCard";
import TrapCard from "../classes/cards/TrapCard";
import MonsterCard from "../classes/cards/MonsterCard";
import LinkMonsterCard from "../classes/cards/LinkMonsterCard";
import XyzMonsterCard from "../classes/cards/XyzMonsterCard";

export default {
  filters: {
    capitalize: value => {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  props: {
    card: {
      type: Card,
      required: true
    }
  },

  computed: {
    levelStarIcon: () => require("../assets/card_icons/LevelStar.svg"),
    rankStarIcon: () => require("../assets/card_icons/RankStar.svg"),
    spellIcon: () => require("../assets/card_attributes/Spell.png"),
    trapIcon: () => require("../assets/card_attributes/Trap.png"),
    continuousIcon: () => require("../assets/card_icons/Continuous.svg"),
    equipIcon: () => require("../assets/card_icons/Equip.svg"),
    fieldIcon: () => require("../assets/card_icons/Field.svg"),
    quickPlayIcon: () => require("../assets/card_icons/QuickPlay.svg"),
    ritualIcon: () => require("../assets/card_icons/Ritual.svg"),
    counterIcon: () => require("../assets/card_icons/Counter.svg"),
    darkAttrIcon: () => require("../assets/card_attributes/Dark.png"),
    divineAttrIcon: () => require("../assets/card_attributes/Divine.png"),
    earthAttrIcon: () => require("../assets/card_attributes/Earth.png"),
    fireAttrIcon: () => require("../assets/card_attributes/Fire.png"),
    lightAttrIcon: () => require("../assets/card_attributes/Light.png"),
    waterAttrIcon: () => require("../assets/card_attributes/Water.png"),
    windAttrIcon: () => require("../assets/card_attributes/Wind.png")
  },

  watch: {
    /**
     * When a new card is chosen to be displayed; reset the text scroll.
     * In case the text of the previous card had been scrolled while reading it.
     */
    card() {
      if (Object.entries(this.$refs).length === 0) return;

      this.$refs.cardText.scrollTop = 0;
    }
  },

  methods: {
    isMonsterCard(card) {
      return card instanceof MonsterCard;
    },
    isLinkMonsterCard(card) {
      return card instanceof LinkMonsterCard;
    },
    getMonsterCardLevelOrRankIcon(card) {
      if (card instanceof XyzMonsterCard) {
        return this.rankStarIcon;
      }

      return this.levelStarIcon;
    },
    getCardFormIcon(card) {
      if (card instanceof SpellCard) {
        return this.spellIcon;
      }

      if (card instanceof TrapCard) {
        return this.trapIcon;
      }
    },
    getMonsterCardAttrIcon(card) {
      switch (card.attribute.toLowerCase()) {
        case "dark":
          return this.darkAttrIcon;

        case "divine":
          return this.divineAttrIcon;

        case "earth":
          return this.earthAttrIcon;

        case "fire":
          return this.fireAttrIcon;

        case "light":
          return this.lightAttrIcon;

        case "water":
          return this.waterAttrIcon;

        case "wind":
          return this.windAttrIcon;

        default:
          return;
      }
    },
    getCardTypeIcon(card) {
      switch (card.type.toLowerCase()) {
        case "continuous":
          return this.continuousIcon;

        case "counter":
          return this.counterIcon;

        case "equip":
          return this.equipIcon;

        case "field":
          return this.fieldIcon;

        case "quick-play":
          return this.quickPlayIcon;

        case "ritual":
          return this.ritualIcon;

        default:
          return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$card-display-bg-color: #0066d9;
$secondary-bg-color: #003875;
$main-text-color: #dedede;
$scrollbar-color: #0066d9;

.card-display {
  background: $card-display-bg-color;
}
.card-image-wrapper {
  height: 40%;
}
.card-info-wrapper {
  background: $secondary-bg-color;
  border: 3px groove #005dc7;
  color: $main-text-color;
  white-space: pre-line;
  font-size: 1rem;

  @media (min-width: 576px) {
    font-size: 1.2rem;
  }
}
.class-icon {
  width: 20px;
}
.card-name-type-wrapper {
  height: 15%;
}
.card-text-stats-wrapper {
  height: 45%;
}
.card-text-wrapper {
  height: 80%;
}
.card-text {
  overflow: auto;

  &::-webkit-scrollbar-button {
    height: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: $scrollbar-color;
  }

  &::-webkit-scrollbar-thumb {
    &:hover {
      background: $scrollbar-color;
    }

    &:active {
      background: $scrollbar-color;
    }
  }
}
.card-types {
  color: #76e76f;
}
.card-stats-wrapper {
  height: 20%;
  background: #001669;
  font-size: 1.5rem;
  border-top: 2px solid #0092cf;
}
</style>
