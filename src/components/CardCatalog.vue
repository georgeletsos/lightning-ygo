<template>
  <div id="l-catalog">
    <div v-if="displayCards.length > 0" class="row no-gutters">
      <div v-for="card in displayCards" :key="card.name" class="col-2 p-1">
        <!-- Without .prevent, click would run twice -->
        <div
          class="position-relative l-cursor-pointer"
          @click.prevent="changeDisplayCard(card)"
        >
          <img
            loading="lazy"
            :src="card.image.big"
            :alt="card.name"
            class="img-fluid"
          />
          <img
            v-if="isMonsterCard(card)"
            class="img-fluid l-card-attr"
            :src="getMonsterAttributeIcon(card.attribute)"
            :alt="card.attribute"
          />
          <img
            v-else-if="isSpellCard(card)"
            class="img-fluid l-st-card-type"
            :src="spellIcon"
            alt="spell"
          />
          <img
            v-else-if="isTrapCard(card)"
            class="img-fluid l-st-card-type"
            :src="trapIcon"
            alt="trap"
          />
          <img
            v-if="isMonsterCard(card)"
            class="img-fluid l-monster-type"
            :src="getMonsterTypeIcon(card.monsterType)"
            :alt="card.monsterType"
          />
          <img
            v-else-if="
              (isSpellCard(card) || isTrapCard(card)) && !isStNormal(card)
            "
            class="img-fluid l-st-type"
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
import { CHANGE_DISPLAY_CARD } from "@/store/actions.type";
import {
  isMonsterCard,
  isSpellCard,
  isTrapCard,
  isStNormal
} from "@/common/utilities";
import {
  spellIcon,
  trapIcon,
  getMonsterAttributeIcon,
  getMonsterTypeIcon,
  getStTypeIcon
} from "@/common/assets";

export default {
  computed: {
    spellIcon: () => spellIcon,
    trapIcon: () => trapIcon,
    ...mapGetters(["displayCards"])
  },

  methods: {
    changeDisplayCard(displayCard) {
      this.$store.dispatch(CHANGE_DISPLAY_CARD, displayCard);
    },
    isMonsterCard,
    isSpellCard,
    isTrapCard,
    isStNormal,
    getMonsterAttributeIcon,
    getMonsterTypeIcon,
    getStTypeIcon
  }
};
</script>

<style lang="scss" scoped>
.l-cursor-pointer {
  cursor: pointer;
}

#l-catalog {
  // Correct Height is needed for the scroll
  height: calc(100% - 132px);
  overflow-y: scroll;
  margin-right: -6px; // 100% of scroll width

  .l-card-attr,
  .l-monster-type,
  .l-st-card-type,
  .l-st-type {
    height: 20px !important;
  }

  .l-card-attr,
  .l-st-card-type {
    position: absolute;
    bottom: 1px;
    left: 1px;
  }

  .l-monster-type,
  .l-st-type {
    position: absolute;
    bottom: 1px;
    right: 1px;
  }
}
</style>
