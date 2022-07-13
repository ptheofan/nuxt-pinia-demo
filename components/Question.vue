<template>
  <v-card flat>
    <v-card-title>
      {{ question.content }}
    </v-card-title>
    <v-list>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(option, index) in question.options"
          :key="`question-${option.id}`"
        >
          <v-list-item-content class="item-content">
            <div class="item-prefix">
              {{ itemPrefix(index) }}
            </div>
            {{ option.content }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Question',
  props: {
    question: {
      type: Object,
      required: true,
    },
    value: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selectedItem: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.selectedItem = newValue;
    },
    selectedItem(n, o) {
      const dn = n === undefined || n === null ? null : n;
      if (dn !== o) {
        this.$emit('input', dn);
      }
    },
  },
  methods: {
    itemPrefix(idx: number): string {
      return String.fromCharCode(65 + idx);
    },
  },
})
</script>

<style scoped lang="scss">
.item-prefix {
  padding: 4px 8px;
  margin-right: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  // display: inline-block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
}
.item-content {
  padding: 8px 0;
}
</style>
