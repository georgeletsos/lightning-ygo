<template>
  <div v-show="show" :id="id">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { required: true, type: String },
    id: { required: true, type: String },
    selected: { default: false, type: Boolean }
  },

  data() {
    return {
      show: this.selected
    };
  }
};
</script>
