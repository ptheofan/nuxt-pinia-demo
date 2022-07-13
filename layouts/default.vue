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
    <AppNotification />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api/dist/vue-composition-api";
import AppNotification from "~/components/AppNotification.vue";

export default defineComponent({
  name: 'DefaultLayout',
  components: { AppNotification },
  data () {
    return {
      title: 'Personality Test',
    }
  },
});
</script>
