<template>
  <label :for="id" class="l-filter">
    <input
      type="checkbox"
      :id="id"
      class="d-none"
      :checked="checked"
      @input="$emit('input', $event.target.checked)"
    />
    <font-awesome-icon
      class="mr-1"
      :class="{ checked: checked }"
      :icon="checked ? faIcons.faCheckCircle : faIcons.faCircle"
      size="lg"
    />
    <slot></slot>
  </label>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default {
  components: {
    FontAwesomeIcon
  },

  model: {
    prop: "checked",
    event: "input"
  },

  props: {
    id: { required: true, type: String },
    checked: { required: true }
  },

  computed: {
    faIcons() {
      return {
        faCircle,
        faCheckCircle
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$black: #000000;
$gray: #4a5976;
$yellow: #ffcc00;

.l-filter {
  display: flex;
  align-items: center;
  flex: 0 0 50%;
  max-width: 50%;
  margin: 0;
  cursor: pointer;

  svg {
    color: $gray;
    background-color: $black;
    border-radius: 50%;

    &.checked {
      color: $yellow;
    }
  }
}
</style>
