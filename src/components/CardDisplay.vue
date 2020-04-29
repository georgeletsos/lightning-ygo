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
              <div
                v-if="isMonsterCard(displayCard)"
                class="l-monster-level"
                :class="{
                  'l-tuner-monster-level': isTunerMonsterCard(displayCard)
                }"
              >
                <img class="img-fluid" :src="monsterLevelIcon" alt="Level" />{{
                  displayCard.level
                }}
              </div>
              <div v-else-if="isSpellCard(displayCard)" class="l-st-card-type">
                <img class="img-fluid" :src="spellIcon" alt="Card Type" />{{
                  displayCard.cardType | capitalize
                }}
              </div>
              <div v-else-if="isTrapCard(displayCard)" class="l-st-card-type">
                <img class="img-fluid" :src="trapIcon" alt="Card Type" />{{
                  displayCard.cardType | capitalize
                }}
              </div>

              <div v-if="isMonsterCard(displayCard)" class="l-monster-attr">
                <img
                  class="img-fluid"
                  :src="getMonsterAttributeIcon(displayCard.attribute)"
                  alt="Attribute"
                />{{ displayCard.attribute.toUpperCase() }}
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
  isTunerMonsterCard,
  isSpellCard,
  isTrapCard,
  isStNormal
} from "@/common/utilities";
import {
  spellIcon,
  trapIcon,
  monsterLevelIcon,
  getMonsterAttributeIcon,
  getStTypeIcon
} from "@/common/assets";

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
    spellIcon: () => spellIcon,
    trapIcon: () => trapIcon,
    monsterLevelIcon: () => monsterLevelIcon,
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

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  methods: {
    fetchPrevDisplayCard(displayCard) {
      this.$store.dispatch(FETCH_PREV_DISPLAY_CARD, displayCard);
    },
    fetchNextDisplayCard(displayCard) {
      this.$store.dispatch(FETCH_NEXT_DISPLAY_CARD, displayCard);
    },
    isMonsterCard,
    isTunerMonsterCard,
    isSpellCard,
    isTrapCard,
    isStNormal,
    getMonsterAttributeIcon,
    getStTypeIcon
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

  .l-tuner-monster-level {
    color: $green;
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
