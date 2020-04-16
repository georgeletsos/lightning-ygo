<template>
  <div id="card-catalog" class="p-2 h-100">
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
        >
          <input
            type="checkbox"
            class="d-none"
            :id="displayFilter.id"
            v-model="displayFilter.active"
            @change="setDisplayCards"
          />
          <img
            loading="lazy"
            class="img-fluid mr-1 l-card-frame"
            :src="displayFilter.src"
            :alt="displayFilter.alt"
          />
          <div
            v-if="displayFilter.text.includes(' ')"
            class="d-flex flex-column"
          >
            <div v-for="word of displayFilter.text.split(' ')" :key="word">
              {{ word }}
            </div>
          </div>
          <span v-else>{{ displayFilter.text }}</span>
        </label>
      </div>
    </div>

    <!-- Search Filter -->
    <form class="mb-1" ref="form">
      <div class="row l-gutters mb-2">
        <div class="col-3">
          <button
            type="button"
            class="l-btn w-100"
            :class="{ active: filterBtnActive }"
            v-pulse
            @click="showModal = true"
          >
            <font-awesome-icon class="mr-1" :icon="faFilter" />
            <span>Filter</span>
          </button>
        </div>

        <div class="col-9">
          <label class="l-btn" v-pulse>
            <font-awesome-icon class="mr-1" :icon="faSearch" />
            <input
              v-model.trim="searchFilters.text"
              id="text-search"
              type="text"
              class="l-form-control"
              placeholder="Text Search"
            />
          </label>
        </div>
      </div>

      <div class="row l-gutters">
        <div class="col">
          <select
            class="l-form-control custom-select"
            v-model="searchFilters.sortField"
            @change="submitForm"
          >
            <option
              v-for="sortFieldFilter of sortFieldFilters"
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
                  src="@/assets/card_frames/card_frame_normal_small.png"
                  alt="Card Type"
                />
                <span>Card Type</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterCardTypeFilter,
                  index) of monsterCardTypeFilters"
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
                  index) of monsterAttributeFilters"
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
                  v-for="(monsterTypeFilter, index) of monsterTypeFilters"
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
                  src="@/assets/monster_level.png"
                  alt="Level"
                />
                <span>Level</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(monsterLevelFilter, index) of monsterLevelFilters"
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
          </tab>
          <tab title="Spells/Traps" id="spells-traps" class="l-tab-content">
            <div class="l-filter-group">
              <div class="l-filter-group-header">
                <img
                  class="img-fluid mr-2 l-card-frame"
                  src="@/assets/card_frames/card_frame_spell_small.png"
                  alt="Spell"
                />
                <span>Spell</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(spellFilter, index) of spellFilters"
                  :key="spellFilter.id"
                  :id="spellFilter.id"
                  v-model="spellFilter.checked"
                  @input="
                    resetMonsterCardTypeFilters();
                    resetMonsterAttributeFilters();
                    resetMonsterTypeFilters();
                    resetMonsterLevelFilters();
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
                  src="@/assets/card_frames/card_frame_trap_small.png"
                  alt="Trap"
                />
                <span>Trap</span>
              </div>

              <div class="l-filter-group-body">
                <filter-checkbox
                  v-for="(trapFilter, index) of trapFilters"
                  :key="trapFilter.id"
                  :id="trapFilter.id"
                  v-model="trapFilter.checked"
                  @input="
                    resetMonsterCardTypeFilters();
                    resetMonsterAttributeFilters();
                    resetMonsterTypeFilters();
                    resetMonsterLevelFilters();
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
            resetSpellFilters();
            resetTrapFilters();
          "
        >
          <font-awesome-icon :icon="faTrashAlt" fixed-width />
        </button>
      </modal>
    </form>

    <!-- Card Catalog -->
    <div id="catalog">
      <div v-if="displayCards.length > 0" class="row no-gutters">
        <div v-for="card in displayCards" :key="card.name" class="col-2 p-1">
          <div class="position-relative">
            <img :src="card.image.big" :alt="card.name" class="img-fluid" />
            <img
              v-if="card.cardType === 'monster'"
              class="img-fluid l-card-attr"
              :src="getMonsterAttributeIcon(card.attribute)"
              :alt="card.attribute"
            />
            <img
              v-else-if="card.cardType === 'spell'"
              class="img-fluid l-card-attr"
              :src="spellIcon"
              alt="spell"
            />
            <img
              v-else-if="card.cardType === 'trap'"
              class="img-fluid l-card-attr"
              :src="trapIcon"
              alt="trap"
            />
            <img
              v-if="card.cardType === 'monster'"
              class="img-fluid l-monster-type"
              :src="getMonsterTypeIcon(card.monsterType)"
              :alt="card.monsterType"
            />
            <img
              v-else
              class="img-fluid l-monster-type"
              :src="getStTypeIcon(card.types[0])"
              :alt="card.monsterType"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFilter,
  faSearch,
  faTrashAlt,
  faSortAmountUp,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { debounce } from "lodash-es";
import { CardsService } from "@/common/api.service.js";
import { cloneObject } from "@/common/utilities.js";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import FilterCheckbox from "@/components/FilterCheckbox.vue";
import Modal from "@/components/Modal.vue";

const displayFilters = [
  {
    id: 1,
    active: false,
    src: require("@/assets/card_frames/card_frame_normal_small.png"),
    alt: "Main Deck Monsters",
    text: "Monsters",
    cardType: "monster",
    excludedTypes: ["fusion", "synchro"]
  },
  {
    id: 2,
    active: false,
    src: require("@/assets/card_frames/card_frame_spell_small.png"),
    alt: "Spells",
    text: "Spells",
    cardType: "spell"
  },
  {
    id: 3,
    active: false,
    src: require("@/assets/card_frames/card_frame_trap_small.png"),
    alt: "Traps",
    text: "Traps",
    cardType: "trap"
  },
  {
    id: 4,
    active: false,
    src: require("@/assets/card_frames/card_frame_fusion_small.png"),
    alt: "Extra Deck Monsters",
    text: "Extra Deck",
    cardType: "monster",
    includedTypes: ["fusion", "synchro"]
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
    id: "continuous-trap",
    type: "continuous",
    text: "Continuous Trap",
    checked: false
  },
  {
    id: "counter-trap",
    type: "counter",
    text: "Counter Trap",
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
  { value: "asc", icon: faSortAmountUp },
  { value: "desc", icon: faSortAmountDown }
];

export default {
  components: {
    FontAwesomeIcon,
    Tabs,
    Tab,
    FilterCheckbox,
    Modal
  },

  computed: {
    faFilter() {
      return faFilter;
    },
    faSearch() {
      return faSearch;
    },
    faCircle() {
      return faCircle;
    },
    faCheckCircle() {
      return faCheckCircle;
    },
    faTrashAlt() {
      return faTrashAlt;
    },
    spellIcon() {
      return require("@/assets/card_attributes/card_attribute_spell.png");
    },
    trapIcon() {
      return require("@/assets/card_attributes/card_attribute_trap.png");
    },
    darkAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_dark.png");
    },
    divineAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_divine.png");
    },
    earthAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_earth.png");
    },
    fireAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_fire.png");
    },
    lightAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_light.png");
    },
    waterAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_water.png");
    },
    windAttrIcon() {
      return require("@/assets/card_attributes/card_attribute_wind.png");
    },
    aquaTypeIcon() {
      return require("@/assets/monster_types/monster_type_aqua.png");
    },
    beastTypeIcon() {
      return require("@/assets/monster_types/monster_type_beast.png");
    },
    beastWarriorTypeIcon() {
      return require("@/assets/monster_types/monster_type_beast_warrior.png");
    },
    dinosaurTypeIcon() {
      return require("@/assets/monster_types/monster_type_dinosaur.png");
    },
    divineBeastTypeIcon() {
      return require("@/assets/monster_types/monster_type_divine_beast.png");
    },
    dragonTypeIcon() {
      return require("@/assets/monster_types/monster_type_dragon.png");
    },
    fairyTypeIcon() {
      return require("@/assets/monster_types/monster_type_fairy.png");
    },
    fiendTypeIcon() {
      return require("@/assets/monster_types/monster_type_fiend.png");
    },
    fishTypeIcon() {
      return require("@/assets/monster_types/monster_type_fish.png");
    },
    insectTypeIcon() {
      return require("@/assets/monster_types/monster_type_insect.png");
    },
    machineTypeIcon() {
      return require("@/assets/monster_types/monster_type_machine.png");
    },
    plantTypeIcon() {
      return require("@/assets/monster_types/monster_type_plant.png");
    },
    psychicTypeIcon() {
      return require("@/assets/monster_types/monster_type_psychic.png");
    },
    pyroTypeIcon() {
      return require("@/assets/monster_types/monster_type_pyro.png");
    },
    reptileTypeIcon() {
      return require("@/assets/monster_types/monster_type_reptile.png");
    },
    rockTypeIcon() {
      return require("@/assets/monster_types/monster_type_rock.png");
    },
    seaSerpentTypeIcon() {
      return require("@/assets/monster_types/monster_type_sea_serpent.png");
    },
    spellcasterTypeIcon() {
      return require("@/assets/monster_types/monster_type_spellcaster.png");
    },
    thunderTypeIcon() {
      return require("@/assets/monster_types/monster_type_thunder.png");
    },
    warriorTypeIcon() {
      return require("@/assets/monster_types/monster_type_warrior.png");
    },
    wingedBeastTypeIcon() {
      return require("@/assets/monster_types/monster_type_winged_beast.png");
    },
    wyrmTypeIcon() {
      return require("@/assets/monster_types/monster_type_wyrm.png");
    },
    zombieTypeIcon() {
      return require("@/assets/monster_types/monster_type_zombie.png");
    },
    equipSpellIcon() {
      return require("@/assets/st_types/spell_type_equip.png");
    },
    fieldSpellIcon() {
      return require("@/assets/st_types/spell_type_field.png");
    },
    quickPlaySpellIcon() {
      return require("@/assets/st_types/spell_type_quick_play.png");
    },
    ritualSpellIcon() {
      return require("@/assets/st_types/spell_type_ritual.png");
    },
    continuousStIcon() {
      return require("@/assets/st_types/st_type_continuous.png");
    },
    counterTrapIcon() {
      return require("@/assets/st_types/trap_type_counter.png");
    },
    sortFieldFilters() {
      return sortFieldFilters;
    },
    sortOrderFilters() {
      return sortOrderFilters;
    },
    anyCheckedDetailedFilters() {
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
        this.spellFilters.some(spellFilter => spellFilter.checked) ||
        this.trapFilters.some(trapFilter => trapFilter.checked)
      );
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
    }
  },

  data() {
    return {
      displayFilters,
      filterBtnActive: false,
      showModal: false,
      monsterCardTypeFilters,
      monsterAttributeFilters,
      monsterTypeFilters,
      monsterLevelFilters,
      spellFilters,
      trapFilters,
      sortOrderIcon: sortOrderFilters[0].icon,
      searchFilters: {
        text: "",
        sortField: sortFieldFilters[0].value,
        sortOrder: sortOrderFilters[0].value
      },
      catalogCards: [],
      displayCards: []
    };
  },

  watch: {
    "searchFilters.text"() {
      this.submitForm();
    }
  },

  created() {
    this.debouncedGetCatalogCards = debounce(this.getCatalogCards, 500);
    this.saveSelectedDetailedFilters();
  },

  methods: {
    getMonsterAttributeIcon(attr) {
      switch (attr) {
        case "dark":
          return this.darkAttrIcon;
        case "divine":
          return this.divineAttrIcon;
        case "earth":
          return this.earthAttrIcon;
        case "fire":
          return this.fireAttrIcon;
        case "light":
          return this.lightAttrIcon;
        case "water":
          return this.waterAttrIcon;
        case "wind":
          return this.windAttrIcon;
      }
    },
    getMonsterTypeIcon(monsterType) {
      switch (monsterType) {
        case "aqua":
          return this.aquaTypeIcon;
        case "beast":
          return this.beastTypeIcon;
        case "beast-warrior":
          return this.beastWarriorTypeIcon;
        case "dinosaur":
          return this.dinosaurTypeIcon;
        case "divine-beast":
          return this.divineBeastTypeIcon;
        case "dragon":
          return this.dragonTypeIcon;
        case "fairy":
          return this.fairyTypeIcon;
        case "fiend":
          return this.fiendTypeIcon;
        case "fish":
          return this.fishTypeIcon;
        case "insect":
          return this.insectTypeIcon;
        case "machine":
          return this.machineTypeIcon;
        case "plant":
          return this.plantTypeIcon;
        case "psychic":
          return this.psychicTypeIcon;
        case "pyro":
          return this.pyroTypeIcon;
        case "reptile":
          return this.reptileTypeIcon;
        case "rock":
          return this.rockTypeIcon;
        case "sea serpent":
          return this.seaSerpentTypeIcon;
        case "spellcaster":
          return this.spellcasterTypeIcon;
        case "thunder":
          return this.thunderTypeIcon;
        case "warrior":
          return this.warriorTypeIcon;
        case "winged beast":
          return this.wingedBeastTypeIcon;
        case "wyrm":
          return this.wyrmTypeIcon;
        case "zombie":
          return this.zombieTypeIcon;
      }
    },
    getStTypeIcon(stType) {
      switch (stType) {
        case "equip":
          return this.equipSpellIcon;
        case "field":
          return this.fieldSpellIcon;
        case "quick-play":
          return this.quickPlaySpellIcon;
        case "ritual":
          return this.ritualSpellIcon;
        case "continuous":
          return this.continuousStIcon;
        case "counter":
          return this.counterTrapIcon;
      }
    },
    setDisplayCards() {
      const activeDisplayFilters = this.displayFilters.filter(
        displayFilter => displayFilter.active
      );
      if (activeDisplayFilters.length === 0) {
        this.displayCards = this.catalogCards;
        return;
      }

      this.displayCards = this.catalogCards.filter(catalogCard => {
        for (const activeDisplayFilter of activeDisplayFilters) {
          if (activeDisplayFilter.excludedTypes) {
            if (
              catalogCard.cardType === activeDisplayFilter.cardType &&
              activeDisplayFilter.excludedTypes.every(
                excludedType => !catalogCard.types.includes(excludedType)
              )
            ) {
              return catalogCard;
            }
          } else if (activeDisplayFilter.includedTypes) {
            if (
              catalogCard.cardType === activeDisplayFilter.cardType &&
              activeDisplayFilter.includedTypes.some(includedType =>
                catalogCard.types.includes(includedType)
              )
            ) {
              return catalogCard;
            }
          } else {
            if (catalogCard.cardType === activeDisplayFilter.cardType) {
              return catalogCard;
            }
          }
        }
      });
    },
    resetDisplayCards() {
      this.displayCards = [];
    },
    submitForm() {
      this.debouncedGetCatalogCards();
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
    resetCatalogCards() {
      this.catalogCards = [];
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
      this.spellFilters = cloneObject(
        this.selectedDetailedFilters.spellFilters
      );
      this.trapFilters = cloneObject(this.selectedDetailedFilters.trapFilters);
    },
    getCatalogCards() {
      let query = {
        text: this.searchFilters.text.trim(),
        sortField: this.searchFilters.sortField,
        sortOrder: this.searchFilters.sortOrder
      };

      if (this.anyCheckedMonsterFilters) {
        query.cardTypes = ["monster"];
        query.types = this.checkedMonsterCardTypeFilters.map(
          monsterCardTypeFilter => monsterCardTypeFilter.type
        );
        query.attributes = this.checkedMonsterAttributeFilters.map(
          monsterAttributeFilter => monsterAttributeFilter.attr
        );
        query.monsterTypes = this.checkedMonsterTypeFilters.map(
          monsterTypeFilter => monsterTypeFilter.type
        );
        query.levels = this.checkedMonsterLevelFilters.map(
          monsterLevelFilter => monsterLevelFilter.level
        );
      } else if (this.anyCheckedSpellFilters) {
        query.cardTypes = ["spell"];
        query.types = this.checkedSpellFilters.map(
          spellFilter => spellFilter.type
        );

        // Spells + Traps
        if (this.anyCheckedTrapFilters) {
          query.cardTypes.push("trap");
          query.types = query.types.concat(
            this.checkedTrapFilters.map(trapFilter => trapFilter.type)
          );
        }
      } else if (this.anyCheckedTrapFilters) {
        query.cardTypes = ["trap"];
        query.types = this.checkedTrapFilters.map(
          trapFilter => trapFilter.type
        );
      }

      // No filters, just text
      if (typeof query.cardTypes === "undefined") {
        if (query.text) {
          query.cardTypes = ["monster", "spell", "trap"];
        } else {
          // No filters, no text
          this.resetCatalogCards();
          this.resetDisplayCards();
          return;
        }
      }

      CardsService.query(query)
        .then(({ data }) => {
          this.catalogCards = data;
          this.setDisplayCards();
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-main: #0b182f;
$border-main: #004e9d;
$bg-btn: #06235a;
$border-btn: #75d9ee;
$bg-btn-active: #00c5ff;
$border-btn-active: #f4fbfd;
$bg-modal: #112233;
$bg-trash: #830000;

$bg-scrollbar: #2181ff;
$black: #000000;
$blue: #3c8eb4;
$gray: #4a5976;
$white: #ffffff;

#card-catalog {
  background: $bg-main;
  border-left: 2px solid $border-main;
  border-right: 2px solid $border-main;

  .l-btn {
    display: flex;
    align-items: center;
    background: $bg-btn;
    border-width: 2px;
    border-style: solid;
    border-color: $border-btn;
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
      background: $bg-btn-active;
      border-color: $border-btn-active;
    }

    * {
      user-select: none;
    }

    input {
      padding: 0;
      color: $white;
      background: inherit;
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

      .l-card-frame {
        margin-left: 0.12rem;
      }

      .l-card-attr,
      .l-monster-type,
      .l-monster-level {
        margin-left: -0.12rem;
      }
    }

    .l-filter-group-body {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .l-filter-group-hr {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border: 0;
    border-top: 1px dashed $gray;
  }

  .l-trash {
    background: $bg-trash;
  }
}

#catalog {
  // Correct Height is needed for the scroll
  height: calc(100% - 132px);
  overflow-y: scroll;
  margin-right: -6px; // 100% of scroll width

  .l-card-attr,
  .l-monster-type {
    height: 20px !important;
  }

  .l-card-attr {
    position: absolute;
    bottom: 1px;
    left: 1px;
  }

  .l-monster-type {
    position: absolute;
    bottom: 1px;
    right: 1px;
  }
}
</style>
