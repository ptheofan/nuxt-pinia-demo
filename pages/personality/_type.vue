<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>{{ type.name }}</v-card-title>
        <v-card-text v-html="type.content" />
        <v-card-actions>
          <v-btn
            color="primary"
            nuxt
            to="/"
          >
            Start Over
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "@vue/composition-api/dist/vue-composition-api";
import { usePersonality } from "../../store/personality";

export default defineComponent({
  name: 'PersonalityPage',
  data() {
    const slug = this.$route.params.type;
    const store = usePersonality();
    const type = store.getTypes.find(type => type.slug === slug);

    return {
      type,
    }
  },
});
</script>
