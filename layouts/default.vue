<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useNotification } from "~/store/notification";
import { defineComponent } from "@vue/composition-api/dist/vue-composition-api";

export default defineComponent({
  name: 'DefaultLayout',
  data () {
    return {
      title: 'Personality Test',
      snackbar: {
        show: false,
        message: '',
        timeout: 5000,
        color: 'success'
      }
    }
  },
  computed: {
    ...mapState(useNotification, ['getLast'])
  },
  watch: {
    getLast(newValue) {
      if (!newValue) {
        this.snackbar.show = false;
        return;
      }

      this.snackbar = {
        show: true,
        timeout: newValue.timeout || 5000,
        color: newValue.color || newValue.error ? 'error' : 'success',
        message: newValue.message,
      };

      if (newValue.error) {
        console.error(newValue.error);
      }
    },
  },
});
</script>
