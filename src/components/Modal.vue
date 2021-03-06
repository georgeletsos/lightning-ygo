<template>
  <div>
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <div class="l-modal-backdrop" v-show="show"></div>
    </transition>

    <transition
      enter-active-class="animated slideInUp faster"
      leave-active-class="animated slideOutDown faster"
    >
      <div
        class="l-modal"
        tabindex="-1"
        role="dialog"
        v-show="show"
        @click.self="$emit('outsideClick')"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          :class="{ 'l-full-screen-modal': fullscreen }"
          role="document"
        >
          <div class="l-modal-content">
            <div v-if="header" class="l-modal-header">
              <slot name="header">Default Header</slot>
            </div>

            <div class="l-modal-body" :class="{ 'p-0': !bodyPadding }">
              <slot name="body">Default Body</slot>
            </div>

            <div v-if="footer" class="l-modal-footer">
              <slot name="footer">Default Footer</slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String },
    show: { default: false, type: Boolean },
    header: { default: true, type: Boolean },
    footer: { default: true, type: Boolean },
    bodyPadding: { default: true, type: Boolean },
    fullscreen: { default: false, type: Boolean }
  },

  data() {
    return {
      hash: `#${this.name}`
    };
  },

  watch: {
    show: function(newShow) {
      if (newShow) {
        // When this modal is shown for the first time (i.e. hash not in the URL), push a history state for this modal
        if (window.location.hash !== this.hash) {
          window.history.pushState(
            null,
            null,
            window.location.pathname + this.hash
          );
        }
      } else {
        // When this modal is hidden and its hash is in the URL, go back an entry in history
        if (window.location.hash === this.hash) {
          window.history.back();
        }
      }
    }
  },

  mounted() {
    this.popstateHandler = () => {
      if (window.location.hash === this.hash) {
        this.$emit("popstateOpen");
      } else {
        this.$emit("popstateClose");
      }
    };

    // When the active history entry changes, EMIT open/close event depending on this modal's hash existence in the URL
    window.addEventListener("popstate", this.popstateHandler);

    // Emit the previous EventListener, so that this modal is shown if its hash is ALREADY in the URL on initial load
    window.dispatchEvent(new Event("popstate"));
  },

  beforeDestroy() {
    window.removeEventListener("popstate", this.popstateHandler);
  }
};
</script>

<style lang="scss" scoped>
$black-opacity-50: rgba(0, 0, 0, 0.5);
$dark-blue: #112233;
$gray: #dee2e6;
$white: #ffffff;

.l-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: $black-opacity-50;
}

.l-full-screen-modal {
  height: calc(100% - 1rem);

  @media (min-width: 576px) {
    height: calc(100% - 3rem);
  }
}

.l-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;

  .l-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    background-color: $dark-blue;
    color: $white;
    border: 1px solid $white;
    border-radius: 0;

    .l-modal-header {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      border-bottom: 1px solid $gray;
      font-size: 1.2rem;
    }

    .l-modal-body {
      height: 100%;
      position: relative;
      flex: 1 1 auto;
      padding: 0.5rem;
    }

    .l-modal-footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      border-top: 1px solid $gray;
      padding: 0.5rem;
    }
  }
}
</style>
