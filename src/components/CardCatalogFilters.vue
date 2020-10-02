<template>
  <div id="catalog-filters">
    <!-- Card Types Filter -->
    <div class="row row-cols-4 l-gutters mb-2">
      <div
        v-for="displayFilter in displayFilters"
        :key="displayFilter.id"
        v-pulse
        class="col"
      >
        <label
          :for="displayFilter.id"
          class="l-btn l-btn-sm"
          :class="{ active: displayFilter.active }"
          :data-testid="displayFilter.id"
        >
          <input
            type="checkbox"
            class="d-none"
            :id="displayFilter.id"
            v-model="displayFilter.active"
            @change="fetchDisplayCards()"
          />
          <img
            class="img-fluid mr-1 l-card-frame"
            :src="displayFilter.src"
            :alt="displayFilter.alt"
          />
          <div
            v-if="displayFilter.text.includes(' ')"
            class="d-flex flex-column"
          >
            <div v-for="word in displayFilter.text.split(' ')" :key="word">
              {{ word }}
            </div>
          </div>
          <span v-else>{{ displayFilter.text }}</span>
        </label>
      </div>
    </div>

    <!-- Search Filter -->
    <form @submit.prevent>
      <div class="row l-gutters mb-2">
        <div class="col-3">
          <button
            type="button"
            class="l-btn w-100"
            :class="{ active: filterBtnActive }"
            data-testid="filter-btn"
            v-pulse
            @click="showModal = true"
          >
            <font-awesome-icon class="mr-1" :icon="faIcons.faFilter" />
            <span class="mr-1 d-none d-sm-block">Filter</span>
            <span v-if="displayCards.length > 0">{{
              `(${displayCards.length})`
            }}</span>
          </button>
        </div>

        <div class="col-9">
          <label class="l-btn" v-pulse>
            <font-awesome-icon class="mr-1" :icon="faIcons.faSearch" />
            <input
              v-model.trim="searchFilters.text"
              id="l-ygo-text-search"
              type="text"
              class="l-form-control"
              placeholder="Text Search"
            />
            <transition
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster"
            >
              <font-awesome-icon
                :icon="faIcons.faTimes"
                fixed-width
                data-testid="clear-text-search-btn"
                v-show="showClearTextSearchBtn"
                @click="clearTextSearch()"
              />
            </transition>
          </label>
        </div>
      </div>

      <div class="row l-gutters mb-1">
        <div class="col">
          <select
            class="l-form-control custom-select"
            v-model="searchFilters.sortField"
            @change="submitForm()"
          >
            <option
              v-for="sortFieldFilter in sortFieldFilters"
              :key="sortFieldFilter.id"
              :value="sortFieldFilter.value"
              >{{ sortFieldFilter.text }}</option
            >
          </select>
        </div>

        <div class="col flex-grow-0">
          <button
            type="button"
            class="l-btn l-icon"
            v-pulse
            @click="
              changeSortOrder();
              submitForm();
            "
          >
            <font-awesome-icon :icon="sortOrderIcon" fixed-width />
          </button>
        </div>
      </div>

      <modal
        name="filters-modal"
        :show="showModal"
        @popstateOpen="showModal = true"
        @popstateClose="
          showModal = false;
          resetPreviousSelectedDetailedFilters();
          resetTabsScroll();
        "
        @outsideClick="
          showModal = false;
          resetPreviousSelectedDetailedFilters();
          resetTabsScroll();
        "
      >
        <div slot="header">Detailed Filter</div>

        <tabs slot="body" ref="tabs">
          <tab
            title="Monsters"
            id="monsters"
            class="l-tab-content"
            :selected="true"
          >
            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-2 l-card-frame"
                  :src="normalFrameIcon"
                  alt="Card Type"
                />
                <span>Card Type</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterCardTypeFilter,
                  index) in monsterCardTypeFilters"
                  :key="monsterCardTypeFilter.id"
                  :id="monsterCardTypeFilter.id"
                  v-model="monsterCardTypeFilter.checked"
                  @input="
                    resetSpellFilters();
                    resetTrapFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (monsterCardTypeFilters.length % 2 === 1
                        ? monsterCardTypeFilters.length - 1
                        : monsterCardTypeFilters.length - 2)
                  }"
                  ><span>{{ monsterCardTypeFilter.text }}</span>
                </filter-checkbox>
              </div>
            </div>

            <hr class="l-filter-group-hr" />

            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-1 l-card-attr"
                  :src="lightAttrIcon"
                  alt="Attribute"
                />
                <span>Attribute</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterAttributeFilter,
                  index) in monsterAttributeFilters"
                  :key="monsterAttributeFilter.id"
                  :id="monsterAttributeFilter.id"
                  v-model="monsterAttributeFilter.checked"
                  @input="
                    resetSpellFilters();
                    resetTrapFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (monsterAttributeFilters.length % 2 === 1
                        ? monsterAttributeFilters.length - 1
                        : monsterAttributeFilters.length - 2)
                  }"
                  ><span>{{
                    monsterAttributeFilter.text
                  }}</span></filter-checkbox
                >
              </div>
            </div>

            <hr class="l-filter-group-hr" />

            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-1 l-monster-type"
                  :src="spellcasterTypeIcon"
                  alt="Type"
                />
                <span>Type</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterTypeFilter, index) in monsterTypeFilters"
                  :key="monsterTypeFilter.id"
                  :id="monsterTypeFilter.id"
                  v-model="monsterTypeFilter.checked"
                  @input="
                    resetSpellFilters();
                    resetTrapFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (monsterTypeFilters.length % 2 === 1
                        ? monsterTypeFilters.length - 1
                        : monsterTypeFilters.length - 2)
                  }"
                  ><span>{{ monsterTypeFilter.text }}</span></filter-checkbox
                >
              </div>
            </div>

            <hr class="l-filter-group-hr" />

            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-1 l-monster-level"
                  :src="monsterLevelIcon"
                  alt="Level"
                />
                <span>Level</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterLevelFilter, index) in monsterLevelFilters"
                  :key="monsterLevelFilter.id"
                  :id="monsterLevelFilter.id"
                  v-model="monsterLevelFilter.checked"
                  @input="
                    resetSpellFilters();
                    resetTrapFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (monsterLevelFilters.length % 2 === 1
                        ? monsterLevelFilters.length - 1
                        : monsterLevelFilters.length - 2)
                  }"
                  ><span>{{ monsterLevelFilter.text }}</span></filter-checkbox
                >
              </div>
            </div>

            <hr class="l-filter-group-hr" />

            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-1 l-monster-card-effect"
                  :src="cardEffectIcon"
                  alt="Card Effect"
                />
                <span>Card Effect</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterCardEffectFilter,
                  index) in monsterCardEffectFilters"
                  :key="monsterCardEffectFilter.id"
                  :id="monsterCardEffectFilter.id"
                  v-model="monsterCardEffectFilter.checked"
                  @input="
                    resetSpellFilters();
                    resetTrapFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (monsterCardEffectFilters.length % 2 === 1
                        ? monsterCardEffectFilters.length - 1
                        : monsterCardEffectFilters.length - 2)
                  }"
                  ><span>{{
                    monsterCardEffectFilter.text
                  }}</span></filter-checkbox
                >
              </div>
            </div>
          </tab>
          <tab title="Spells/Traps" id="spells-traps" class="l-tab-content">
            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-2 l-card-frame"
                  :src="spellFrameIcon"
                  alt="Spell"
                />
                <span>Spell</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(spellFilter, index) in spellFilters"
                  :key="spellFilter.id"
                  :id="spellFilter.id"
                  v-model="spellFilter.checked"
                  @input="
                    resetMonsterCardTypeFilters();
                    resetMonsterAttributeFilters();
                    resetMonsterTypeFilters();
                    resetMonsterLevelFilters();
                    resetMonsterCardEffectFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (spellFilters.length % 2 === 1
                        ? spellFilters.length - 1
                        : spellFilters.length - 2)
                  }"
                  ><span>{{ spellFilter.text }}</span></filter-checkbox
                >
              </div>
            </div>

            <hr class="l-filter-group-hr" />

            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-2 l-card-frame"
                  :src="trapFrameIcon"
                  alt="Trap"
                />
                <span>Trap</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(trapFilter, index) in trapFilters"
                  :key="trapFilter.id"
                  :id="trapFilter.id"
                  v-model="trapFilter.checked"
                  @input="
                    resetMonsterCardTypeFilters();
                    resetMonsterAttributeFilters();
                    resetMonsterTypeFilters();
                    resetMonsterLevelFilters();
                    resetMonsterCardEffectFilters();
                  "
                  :class="{
                    'mb-2':
                      index <
                      (trapFilters.length % 2 === 1
                        ? trapFilters.length - 1
                        : trapFilters.length - 2)
                  }"
                  ><span>{{ trapFilter.text }}</span></filter-checkbox
                >
              </div>
            </div>
          </tab>
        </tabs>

        <button
          slot="footer"
          type="button"
          class="l-btn l-btn-lg mr-2"
          v-pulse
          v-text="anyCheckedDetailedFilters ? 'Filter' : 'Close'"
          @click="
            showModal = false;
            filterBtnActive = anyCheckedDetailedFilters;
            submitForm();
            saveSelectedDetailedFilters();
            resetTabsScroll();
          "
        ></button>
        <button
          slot="footer"
          type="button"
          class="l-btn l-icon l-trash"
          v-pulse
          @click="
            resetMonsterCardTypeFilters();
            resetMonsterAttributeFilters();
            resetMonsterTypeFilters();
            resetMonsterLevelFilters();
            resetMonsterCardEffectFilters();
            resetSpellFilters();
            resetTrapFilters();
          "
        >
          <font-awesome-icon :icon="faIcons.faTrashAlt" fixed-width />
        </button>
      </modal>
    </form>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFilter,
  faSearch,
  faTimes,
  faTrashAlt,
  faSortAmountDownAlt,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";
import { mapGetters } from "vuex";
import {
  FETCH_CATALOG_CARDS,
  FETCH_DISPLAY_CARDS,
  RESET_CATALOG_CARDS,
  RESET_DISPLAY_CARDS
} from "@/store/actions.type";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import FilterCheckbox from "@/components/FilterCheckbox.vue";
import Modal from "@/components/Modal.vue";
import { debounce } from "lodash-es";
import { cloneObject } from "@/common/utilities";
import {
  normalFrameIcon,
  spellFrameIcon,
  trapFrameIcon,
  fusionFrameIcon,
  lightAttrIcon,
  spellcasterTypeIcon,
  monsterLevelIcon,
  cardEffectIcon
} from "@/common/assets";

const displayFilters = [
  {
    id: "main-deck-monsters",
    active: false,
    src: normalFrameIcon,
    alt: "Main Deck Monsters",
    text: "Monsters",
    cardType: "monster",
    excludedTypes: ["fusion", "synchro", "xyz"]
  },
  {
    id: "spells",
    active: false,
    src: spellFrameIcon,
    alt: "Spells",
    text: "Spells",
    cardType: "spell"
  },
  {
    id: "traps",
    active: false,
    src: trapFrameIcon,
    alt: "Traps",
    text: "Traps",
    cardType: "trap"
  },
  {
    id: "extra-deck-monsters",
    active: false,
    src: fusionFrameIcon,
    alt: "Extra Deck Monsters",
    text: "Extra Deck",
    cardType: "monster",
    includedTypes: ["fusion", "synchro", "xyz"]
  }
];

const monsterCardTypeFilters = [
  {
    id: "normal-monster",
    type: "normal",
    text: "Normal",
    checked: false
  },
  {
    id: "effect-monster",
    type: "effect",
    text: "Effect",
    checked: false
  },
  {
    id: "ritual-monster",
    type: "ritual",
    text: "Ritual",
    checked: false
  },
  {
    id: "fusion-monster",
    type: "fusion",
    text: "Fusion",
    checked: false
  },
  {
    id: "synchro-monster",
    type: "synchro",
    text: "Synchro",
    checked: false
  },
  {
    id: "xyz-monster",
    type: "xyz",
    text: "Xyz",
    checked: false
  },
  {
    id: "token-monster",
    type: "token",
    text: "Token",
    checked: false
  }
];

const monsterAttributeFilters = [
  {
    id: "light-attr",
    attr: "light",
    text: "LIGHT",
    checked: false
  },
  {
    id: "dark-attr",
    attr: "dark",
    text: "DARK",
    checked: false
  },
  {
    id: "water-attr",
    attr: "water",
    text: "WATER",
    checked: false
  },
  {
    id: "fire-attr",
    attr: "fire",
    text: "FIRE",
    checked: false
  },
  {
    id: "earth-attr",
    attr: "earth",
    text: "EARTH",
    checked: false
  },
  {
    id: "wind-attr",
    attr: "wind",
    text: "WIND",
    checked: false
  },
  {
    id: "divine-attr",
    attr: "divine",
    text: "DIVINE",
    checked: false
  }
];

const monsterTypeFilters = [
  {
    id: "dragon",
    type: "dragon",
    text: "Dragon",
    checked: false
  },
  {
    id: "zombie",
    type: "zombie",
    text: "Zombie",
    checked: false
  },
  {
    id: "fiend",
    type: "fiend",
    text: "Fiend",
    checked: false
  },
  {
    id: "pyro",
    type: "pyro",
    text: "Pyro",
    checked: false
  },
  {
    id: "sea-serpent",
    type: "sea serpent",
    text: "Sea Serpent",
    checked: false
  },
  {
    id: "rock",
    type: "rock",
    text: "Rock",
    checked: false
  },
  {
    id: "machine",
    type: "machine",
    text: "Machine",
    checked: false
  },
  {
    id: "fish",
    type: "fish",
    text: "Fish",
    checked: false
  },
  {
    id: "dinosaur",
    type: "dinosaur",
    text: "Dinosaur",
    checked: false
  },
  {
    id: "insect",
    type: "insect",
    text: "Insect",
    checked: false
  },
  {
    id: "beast",
    type: "beast",
    text: "Beast",
    checked: false
  },
  {
    id: "beast-warrior",
    type: "beast-warrior",
    text: "Beast-Warrior",
    checked: false
  },
  {
    id: "plant",
    type: "plant",
    text: "Plant",
    checked: false
  },
  {
    id: "aqua",
    type: "aqua",
    text: "Aqua",
    checked: false
  },
  {
    id: "warrior",
    type: "warrior",
    text: "Warrior",
    checked: false
  },
  {
    id: "winged-beast",
    type: "winged beast",
    text: "Winged Beast",
    checked: false
  },
  {
    id: "fairy",
    type: "fairy",
    text: "Fairy",
    checked: false
  },
  {
    id: "spellcaster",
    type: "spellcaster",
    text: "Spellcaster",
    checked: false
  },
  {
    id: "thunder",
    type: "thunder",
    text: "Thunder",
    checked: false
  },
  {
    id: "reptile",
    type: "reptile",
    text: "Reptile",
    checked: false
  },
  {
    id: "psychic",
    type: "psychic",
    text: "Psychic",
    checked: false
  },
  {
    id: "wyrm",
    type: "wyrm",
    text: "Wyrm",
    checked: false
  },
  {
    id: "cyberse",
    type: "cyberse",
    text: "Cyberse",
    checked: false
  },
  {
    id: "divine-beast",
    type: "divine-beast",
    text: "Divine-Beast",
    checked: false
  }
];

const monsterLevelFilters = [
  {
    id: "level-1",
    level: 1,
    text: "Level 1",
    checked: false
  },
  {
    id: "level-2",
    level: 2,
    text: "Level 2",
    checked: false
  },
  {
    id: "level-3",
    level: 3,
    text: "Level 3",
    checked: false
  },
  {
    id: "level-4",
    level: 4,
    text: "Level 4",
    checked: false
  },
  {
    id: "level-5",
    level: 5,
    text: "Level 5",
    checked: false
  },
  {
    id: "level-6",
    level: 6,
    text: "Level 6",
    checked: false
  },
  {
    id: "level-7",
    level: 7,
    text: "Level 7",
    checked: false
  },
  {
    id: "level-8",
    level: 8,
    text: "Level 8",
    checked: false
  },
  {
    id: "level-9",
    level: 9,
    text: "Level 9",
    checked: false
  },
  {
    id: "level-10",
    level: 10,
    text: "Level 10",
    checked: false
  },
  {
    id: "level-11",
    level: 11,
    text: "Level 11",
    checked: false
  },
  {
    id: "level-12",
    level: 12,
    text: "Level 12",
    checked: false
  }
];

const monsterCardEffectFilters = [
  {
    id: "toon",
    cardEffect: "toon",
    text: "Toon",
    checked: false
  },
  {
    id: "gemini",
    cardEffect: "gemini",
    text: "Gemini",
    checked: false
  },
  {
    id: "union",
    cardEffect: "union",
    text: "Union",
    checked: false
  },
  {
    id: "spirit",
    cardEffect: "spirit",
    text: "Spirit",
    checked: false
  },
  {
    id: "tuner",
    cardEffect: "tuner",
    text: "Tuner",
    checked: false
  },
  {
    id: "flip",
    cardEffect: "flip",
    text: "Flip",
    checked: false
  },
  {
    id: "non-effect",
    cardEffect: "non-effect",
    text: "Non-Effect",
    checked: false
  }
];

const spellFilters = [
  {
    id: "normal-spell",
    type: "normal",
    text: "Normal Spell",
    checked: false
  },
  {
    id: "field-spell",
    type: "field",
    text: "Field Spell",
    checked: false
  },
  {
    id: "equip-spell",
    type: "equip",
    text: "Equip Spell",
    checked: false
  },
  {
    id: "continuous-spell",
    type: "continuous",
    text: "Continuous Spell",
    checked: false
  },
  {
    id: "quick-play-spell",
    type: "quick-play",
    text: "Quick-Play Spell",
    checked: false
  },
  {
    id: "ritual-spell",
    type: "ritual",
    text: "Ritual Spell",
    checked: false
  }
];

const trapFilters = [
  {
    id: "normal-trap",
    type: "normal",
    text: "Normal Trap",
    checked: false
  },
  {
    id: "counter-trap",
    type: "counter",
    text: "Counter Trap",
    checked: false
  },
  {
    id: "continuous-trap",
    type: "continuous",
    text: "Continuous Trap",
    checked: false
  }
];

const sortFieldFilters = [
  { id: 1, value: "name", text: "Sort: Name" },
  { id: 2, value: "level", text: "Sort: Level" },
  { id: 3, value: "atk", text: "Sort: Atk" },
  { id: 4, value: "def", text: "Sort: Def" }
];

const sortOrderFilters = [
  { value: "asc", icon: faSortAmountDownAlt },
  { value: "desc", icon: faSortAmountDown }
];

export default {
  components: {
    FontAwesomeIcon,
    Modal,
    Tabs,
    Tab,
    FilterCheckbox
  },

  computed: {
    faIcons() {
      return {
        faFilter,
        faSearch,
        faTimes,
        faTrashAlt
      };
    },
    sortFieldFilters() {
      return sortFieldFilters;
    },
    sortOrderFilters() {
      return sortOrderFilters;
    },
    anyCheckedMonsterFilters() {
      return (
        this.monsterCardTypeFilters.some(
          monsterCardTypeFilter => monsterCardTypeFilter.checked
        ) ||
        this.monsterAttributeFilters.some(
          monsterAttributeFilter => monsterAttributeFilter.checked
        ) ||
        this.monsterTypeFilters.some(
          monsterTypeFilter => monsterTypeFilter.checked
        ) ||
        this.monsterLevelFilters.some(
          monsterLevelFilter => monsterLevelFilter.checked
        ) ||
        this.monsterCardEffectFilters.some(
          monsterCardEffectFilter => monsterCardEffectFilter.checked
        )
      );
    },
    checkedMonsterCardTypeFilters() {
      return this.monsterCardTypeFilters.filter(
        monsterCardTypeFilter => monsterCardTypeFilter.checked
      );
    },
    checkedMonsterAttributeFilters() {
      return this.monsterAttributeFilters.filter(
        monsterAttributeFilter => monsterAttributeFilter.checked
      );
    },
    checkedMonsterTypeFilters() {
      return this.monsterTypeFilters.filter(
        monsterTypeFilter => monsterTypeFilter.checked
      );
    },
    checkedMonsterLevelFilters() {
      return this.monsterLevelFilters.filter(
        monsterLevelFilter => monsterLevelFilter.checked
      );
    },
    checkedMonsterCardEffectFilters() {
      return this.monsterCardEffectFilters.filter(
        monsterCardEffectFilter => monsterCardEffectFilter.checked
      );
    },
    anyCheckedSpellFilters() {
      return this.spellFilters.some(spellFilter => spellFilter.checked);
    },
    checkedSpellFilters() {
      return this.spellFilters.filter(spellFilter => spellFilter.checked);
    },
    anyCheckedTrapFilters() {
      return this.trapFilters.some(trapFilter => trapFilter.checked);
    },
    checkedTrapFilters() {
      return this.trapFilters.filter(trapFilter => trapFilter.checked);
    },
    anyCheckedDetailedFilters() {
      return (
        this.anyCheckedMonsterFilters ||
        this.anyCheckedSpellFilters ||
        this.anyCheckedTrapFilters
      );
    },
    normalFrameIcon: () => normalFrameIcon,
    spellFrameIcon: () => spellFrameIcon,
    trapFrameIcon: () => trapFrameIcon,
    lightAttrIcon: () => lightAttrIcon,
    spellcasterTypeIcon: () => spellcasterTypeIcon,
    monsterLevelIcon: () => monsterLevelIcon,
    cardEffectIcon: () => cardEffectIcon,
    ...mapGetters(["displayCards"])
  },

  data() {
    return {
      displayFilters,
      filterBtnActive: false,
      showModal: false,
      monsterCardTypeFilters,
      monsterAttributeFilters,
      monsterTypeFilters,
      monsterCardEffectFilters,
      monsterLevelFilters,
      spellFilters,
      trapFilters,
      sortOrderIcon: sortOrderFilters[0].icon,
      searchFilters: {
        text: "",
        sortField: sortFieldFilters[0].value,
        sortOrder: sortOrderFilters[0].value
      },
      showClearTextSearchBtn: false
    };
  },

  watch: {
    "searchFilters.text"(newTextSearch) {
      this.showClearTextSearchBtn = newTextSearch.length > 0;
      this.submitForm();
    }
  },

  created() {
    this.debouncedFetchCatalogCards = debounce(this.fetchCatalogCards, 500);
    this.saveSelectedDetailedFilters();
  },

  methods: {
    clearTextSearch() {
      this.searchFilters.text = "";
    },
    changeSortOrder() {
      for (const [index, sortOrderFilter] of this.sortOrderFilters.entries()) {
        if (sortOrderFilter.value === this.searchFilters.sortOrder) {
          if (index === this.sortOrderFilters.length - 1) {
            this.searchFilters.sortOrder = this.sortOrderFilters[0].value;
            this.sortOrderIcon = this.sortOrderFilters[0].icon;
          } else {
            this.searchFilters.sortOrder = this.sortOrderFilters[
              index + 1
            ].value;
            this.sortOrderIcon = this.sortOrderFilters[index + 1].icon;
          }

          return;
        }
      }
    },
    resetTabsScroll() {
      for (const tabContent of this.$refs.tabs.$el.children) {
        tabContent.scrollTop = 0;
      }
    },
    resetMonsterCardTypeFilters() {
      this.monsterCardTypeFilters.forEach(monsterCardTypeFilter => {
        monsterCardTypeFilter.checked = false;
      });
    },
    resetMonsterAttributeFilters() {
      this.monsterAttributeFilters.forEach(monsterAttributeFilter => {
        monsterAttributeFilter.checked = false;
      });
    },
    resetMonsterTypeFilters() {
      this.monsterTypeFilters.forEach(monsterTypeFilter => {
        monsterTypeFilter.checked = false;
      });
    },
    resetMonsterLevelFilters() {
      this.monsterLevelFilters.forEach(monsterLevelFilter => {
        monsterLevelFilter.checked = false;
      });
    },
    resetMonsterCardEffectFilters() {
      this.monsterCardEffectFilters.forEach(monsterCardEffectFilter => {
        monsterCardEffectFilter.checked = false;
      });
    },
    resetSpellFilters() {
      this.spellFilters.forEach(spellFilter => {
        spellFilter.checked = false;
      });
    },
    resetTrapFilters() {
      this.trapFilters.forEach(trapFilter => {
        trapFilter.checked = false;
      });
    },
    saveSelectedDetailedFilters() {
      this.selectedDetailedFilters = {
        monsterCardTypeFilters: cloneObject(this.monsterCardTypeFilters),
        monsterAttributeFilters: cloneObject(this.monsterAttributeFilters),
        monsterTypeFilters: cloneObject(this.monsterTypeFilters),
        monsterLevelFilters: cloneObject(this.monsterLevelFilters),
        monsterCardEffectFilters: cloneObject(this.monsterCardEffectFilters),
        spellFilters: cloneObject(this.spellFilters),
        trapFilters: cloneObject(this.trapFilters)
      };
    },
    resetPreviousSelectedDetailedFilters() {
      this.monsterCardTypeFilters = cloneObject(
        this.selectedDetailedFilters.monsterCardTypeFilters
      );
      this.monsterAttributeFilters = cloneObject(
        this.selectedDetailedFilters.monsterAttributeFilters
      );
      this.monsterTypeFilters = cloneObject(
        this.selectedDetailedFilters.monsterTypeFilters
      );
      this.monsterLevelFilters = cloneObject(
        this.selectedDetailedFilters.monsterLevelFilters
      );
      this.monsterCardEffectFilters = cloneObject(
        this.selectedDetailedFilters.monsterCardEffectFilters
      );
      this.spellFilters = cloneObject(
        this.selectedDetailedFilters.spellFilters
      );
      this.trapFilters = cloneObject(this.selectedDetailedFilters.trapFilters);
    },
    submitForm() {
      this.debouncedFetchCatalogCards();
    },
    fetchCatalogCards() {
      const filters = {
        sortField: this.searchFilters.sortField,
        sortOrder: this.searchFilters.sortOrder
      };

      const text = this.searchFilters.text.trim();
      if (text.length >= 2) {
        filters.text = text;
      }

      if (this.anyCheckedMonsterFilters) {
        filters.cardTypes = ["monster"];
        filters.types = this.checkedMonsterCardTypeFilters.map(
          monsterCardTypeFilter => monsterCardTypeFilter.type
        );
        filters.attributes = this.checkedMonsterAttributeFilters.map(
          monsterAttributeFilter => monsterAttributeFilter.attr
        );
        filters.monsterTypes = this.checkedMonsterTypeFilters.map(
          monsterTypeFilter => monsterTypeFilter.type
        );
        filters.levels = this.checkedMonsterLevelFilters.map(
          monsterLevelFilter => monsterLevelFilter.level
        );
        filters.cardEffects = this.checkedMonsterCardEffectFilters.map(
          monsterCardEffectFilter => monsterCardEffectFilter.cardEffect
        );
      } else if (this.anyCheckedSpellFilters) {
        filters.cardTypes = ["spell"];
        filters.types = this.checkedSpellFilters.map(
          spellFilter => spellFilter.type
        );

        // Spells + Traps
        if (this.anyCheckedTrapFilters) {
          filters.cardTypes.push("trap");
          filters.types = filters.types.concat(
            this.checkedTrapFilters.map(trapFilter => trapFilter.type)
          );
        }
      } else if (this.anyCheckedTrapFilters) {
        filters.cardTypes = ["trap"];
        filters.types = this.checkedTrapFilters.map(
          trapFilter => trapFilter.type
        );
      }

      // No filters, just text
      // eslint-disable-next-line
      if (!filters.hasOwnProperty("cardTypes")) {
        // eslint-disable-next-line
        if (filters.hasOwnProperty("text")) {
          filters.cardTypes = ["monster", "spell", "trap"];
        } else {
          // No filters, no text
          this.$store.dispatch(RESET_CATALOG_CARDS);
          this.$store.dispatch(RESET_DISPLAY_CARDS);
          return;
        }
      }

      this.$store
        .dispatch(FETCH_CATALOG_CARDS, filters)
        .then(() => this.fetchDisplayCards());
    },
    fetchDisplayCards() {
      const activeDisplayFilters = this.displayFilters.filter(
        displayFilter => displayFilter.active
      );
      this.$store.dispatch(FETCH_DISPLAY_CARDS, activeDisplayFilters);
    }
  }
};
</script>

<style lang="scss" scoped>
$dark-blue: #06235a;
$gray-100: #f4fbfd;
$gray-200: #4a5976;
$light-blue-100: #75d9ee;
$light-blue-200: #00c5ff;
$red: #830000;
$white: #ffffff;

.l-btn {
  min-height: 36px;
  display: flex;
  align-items: center;
  background-color: $dark-blue;
  border-width: 2px;
  border-style: solid;
  border-color: $light-blue-100;
  outline: none;
  cursor: pointer;
  padding: 0.25rem 0.375rem;
  margin: 0;
  color: $white;

  &.l-btn-sm {
    font-size: 0.75rem;
    line-height: 1;
  }

  &.l-btn-lg {
    padding: 0.25rem 1.25rem;
  }

  &.active {
    background-color: $light-blue-200;
    border-color: $gray-100;
  }

  * {
    user-select: none;
  }

  input {
    width: 100%;
    padding: 0;
    color: $white;
    background-color: inherit;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      box-shadow: 0 0 0 30px $dark-blue inset !important;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: $white !important;
    }
  }

  &.l-icon {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}

img {
  &.l-card-frame {
    width: 16px;
    height: 24px;
  }

  &.l-card-attr,
  &.l-monster-type,
  &.l-monster-level {
    height: 24px;
  }

  &.l-monster-card-effect {
    width: 24px;
    height: 24px;
  }
}

.l-form-control {
  height: auto;
  border: none;
  border-radius: 0;
  box-shadow: none;
  outline: 0;
}

.l-tab-content {
  overflow-y: scroll;
  height: 300px;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  margin-right: -6px; // 100% of scroll width
}

.l-filter-group {
  .l-filter-group-header {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .l-card-frame {
    margin-left: 4px;
  }

  .l-filter-group-body {
    display: flex;
    flex-wrap: wrap;
    padding-left: 1px;
  }
}

.l-filter-group-hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: 0;
  border-top: 1px dashed $gray-200;
}

.l-trash {
  background-color: $red;
}
</style>
