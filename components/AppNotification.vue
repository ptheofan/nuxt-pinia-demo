<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="color"
        text
        v-bind="attrs"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api/dist/vue-composition-api";
import { useNotification } from "~/store/notification";
import { mapState } from "pinia";

export default defineComponent({
  name: "AppNotification",
  data: () => ({
    show: false,
    message: '',
    timeout: 5000,
    color: 'success',
  }),
  computed: {
    ...mapState(useNotification, ['getLast'])
  },
  watch: {
    getLast(newValue) {
      if (!newValue) {
        this.show = false;
        return;
      }

      this.show = true;
      this.timeout = newValue.timeout || 5000;
      this.color = newValue.color || newValue.error ? 'error' : 'success';
      this.message = newValue.message;

      if (newValue.error) {
        console.error(newValue.error);
      }
    },
  },
});
</script>
