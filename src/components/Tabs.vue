<template>
  <div>
    <div class="l-nav l-nav-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="l-nav-tab"
        :class="{ show: tab.show }"
        @click="
          hideAll();
          showTab(tab);
        "
      >
        <div class="l-nav-item">
          <div>
            <span>{{ tab.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return { tabs: [] };
  },

  created() {
    this.tabs = this.$children;
  },

  methods: {
    hideAll() {
      this.tabs.forEach(tab => {
        tab.show = false;
      });
    },

    showTab(selectedTab) {
      for (const tab of this.tabs) {
        if (tab.id === selectedTab.id) {
          tab.show = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-modal: #112233;
$blue: #3c8eb4;
$yellow: #ffcc00;

.l-nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  margin-left: -0.5rem;
  margin-right: -0.5rem;

  &.l-nav-tabs {
    border-bottom: 1px solid $yellow;

    .l-nav-tab {
      flex: 0 0 50%;
      max-width: 50%;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      margin-bottom: -1px;

      .l-nav-item {
        border: 1px solid $blue;
        border-bottom-color: transparent;
        border-radius: 0;
        text-align: center;
        cursor: pointer;

        div {
          padding: 0.25rem;
        }

        span {
          display: block;
          padding: 0.25rem;
        }
      }

      &.show {
        .l-nav-item {
          border-color: $yellow;
          border-bottom-color: $bg-modal;

          span {
            color: $bg-modal;
            background-color: $yellow;
          }
        }
      }
    }
  }
}
</style>
