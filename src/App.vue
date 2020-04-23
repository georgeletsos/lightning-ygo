<template>
  <div id="app">
    <div class="row h-100">
      <div class="col-12 h-100">
        <div id="card-catalog" class="p-2 h-100">
          <CardCatalogFilters />
          <CardCatalog />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CardDisplay from "@/components/CardDisplay.vue";
import CardCatalogFilters from "@/components/CardCatalogFilters.vue";
import CardCatalog from "@/components/CardCatalog.vue";

export default {
  components: {
    // CardDisplay,
    CardCatalogFilters,
    CardCatalog
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

#card-catalog {
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
