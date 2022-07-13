<template>
  <v-row>
    <v-col class="text-center">
      <v-card class="text-left">
        <v-card-text>Question {{ questionNumber }} out of {{ questionsTotal }}</v-card-text>
        <Question
          v-if="questionnaire.questions[current]"
          :question="questionnaire.questions[current]"
          v-model="answers[current]"
        />
        <v-card-actions>
          <v-btn
            :disabled="!canContinue"
            color="primary"
            @click="next"
          >
            {{ current < questionnaire.questions.length - 1 ? 'Next' : 'Find my type' }}
          </v-btn>
          <v-btn
            v-show="current > 0"
            @click="current--"
          >
            Back
          </v-btn>
          <v-spacer />
          <v-btn
            text
            @click="$router.push('/')"
          >
            Back to homepage
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useQuestionnaire } from "~/store/questionnaire";
import { deepCopy } from "deep-copy-ts";
import { defineComponent } from "@vue/composition-api";
import Question from "~/components/Question.vue";
import {mapActions} from "pinia";
import {useNotification} from "~/store/notification";
import {computeType} from "~/questionnaire/questionnaire";

export default defineComponent({
  name: "QuestionnairePage",
  components: { Question },
  data() {
    const store = useQuestionnaire();
    // Questions should not change once the questionnaire is started (even if new set is published).
    const questionnaire = deepCopy(store.getPublished);

    return {
      questionnaire,
      current: 0,
      answers: [],
    };
  },
  computed: {
    questionNumber(): number {
      return this.current + 1;
    },
    questionsTotal(): number {
      return this.questionnaire.questions.length;
    },
    canContinue(): boolean {
      return this.answers[this.current] !== null && this.answers[this.current] !== undefined;
    },
  },
  methods: {
    ...mapActions(useNotification, ['addNotification']),
    next() {
      this.current++;
      if (this.current >= this.questionnaire.questions.length) {
        try {
          const scores: number[] = [];
          for (const [index, answer] of this.answers.entries()) {
            scores.push(this.questionnaire.questions[index].options[answer].score as number);
          }
          const type = computeType(this.questionnaire, scores);
          this.$router.push({ name: 'personality-type', params: { type: type.slug } });
        } catch (e: any) {
          this.addNotification({
            message: e.message,
            error: e,
          });
        }
      }
    },
  },
});
</script>
