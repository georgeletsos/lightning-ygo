<template>
  <div id="app">
    <div class="row no-gutters h-100">
      <modal
        v-if="displayCardOnModal"
        name="card-display-modal"
        :header="false"
        :footer="false"
        :body-padding="false"
        :fullscreen="true"
        :show="showDisplayCardModal"
        @popstateOpen="showDisplayCardModal = true"
        @popstateClose="showDisplayCardModal = false"
        @outsideClick="showDisplayCardModal = false"
      >
        <div slot="body" id="l-card-display">
          <CardDisplay />
        </div>
      </modal>
      <div v-else class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 h-100">
        <div id="l-card-display">
          <CardDisplay />
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 h-100">
        <div id="l-card-catalog">
          <CardCatalogFilters />
          <CardCatalog />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardDisplay from "@/components/CardDisplay.vue";
import CardCatalogFilters from "@/components/CardCatalogFilters.vue";
import CardCatalog from "@/components/CardCatalog.vue";
import Modal from "@/components/Modal.vue";
import { CHANGE_DISPLAY_CARD } from "@/store/actions.type";

export default {
  components: {
    Modal,
    CardDisplay,
    CardCatalogFilters,
    CardCatalog
  },

  data() {
    return {
      displayCardOnModal: true,
      showDisplayCardModal: false
    };
  },

  created() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      this.displayCardOnModal = false;
      return;
    }

    this.$store.subscribeAction(action => {
      if (action.type === CHANGE_DISPLAY_CARD) {
        this.showDisplayCardModal = true;
      }
    });
  }
};
</script>

<style lang="scss">
$black: #000000;
$blue: #2181ff;
$dark-blue-100: #004e9d;
$dark-blue-200: #0b182f;

#app {
  height: 100vh;
  overflow: hidden;
}

// Used in some components
.l-gutters {
  margin-left: -0.25rem;
  margin-right: -0.25rem;

  .col,
  [class*="col-"] {
    padding: 0 0.25rem;
  }
}

#l-card-display {
  height: 100%;
  padding: 0.5rem;
  background-image: url("~@/assets/card_display_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}

#l-card-catalog {
  height: 100%;
  padding: 0.5rem;
  background-color: $dark-blue-200;
  border-left: 2px solid $dark-blue-100;
  border-right: 2px solid $dark-blue-100;
}

::-webkit-scrollbar {
  width: 6px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: $blue;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-track {
  &:hover {
    background-color: $black;
  }

  &:active {
    background-color: $black;
  }
}
</style>
