<template>
  <div id="app" class="h-100vh overflow-hidden">
    <div class="row no-gutters h-100">
      <div class="col-12 h-100">
        <CardCatalog />
      </div>
    </div>
  </div>
</template>

<script>
// import CardDisplay from "@/components/CardDisplay.vue";
import CardCatalog from "@/components/CardCatalog.vue";

export default {
  components: {
    // CardDisplay,
    CardCatalog
  }
};
</script>

<style lang="scss">
$bg-scrollbar: #2181ff;
$black: #000000;
$white: #ffffff;

.h-100vh {
  height: 100vh;
}

.l-gutters {
  margin-left: -0.25rem;
  margin-right: -0.25rem;

  .col,
  [class*="col-"] {
    padding: 0 0.25rem;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background: $bg-scrollbar;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-track {
  &:hover {
    background: $black;
  }

  &:active {
    background: $black;
  }
}
</style>
