<template>
  <div>
    <v-row>
      <v-col class="d-flex">
        <v-btn
          class="mr-4"
          @click="$router.push('/')"
        >
          Back to home
        </v-btn>
        <v-btn
          v-if="hasChanges"
          color="success"
          :disabled="!isValid"
          text
          @click="publishChanges"
        >
          Publish
        </v-btn>
        <v-spacer />
        <div
          v-if="hasChanges && !isValid"
          class="publish-warning d-flex align-center"
        >
          <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
          Cannot publish changes due to errors.
        </div>
        <div
          v-if="hasChanges && isValid"
          class="publish-warning d-flex align-center"
        >
          <v-icon class="mr-2" color="warning">mdi-message-alert</v-icon>
          Unpublished pending changes.
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(question, index) in questions"
        :key="`question-${index}`"
        cols="4"
      >
        <v-card
          :class="['card', 'd-flex', 'flex-column']"
        >
          <v-card-title
            :class="['title', 'text-subtitle-2', { 'has-error': !isQuestionValid(question, false) }]"
          >
            {{ question.content }}
          </v-card-title>
          <v-divider />
          <v-card-text class="grow">
            <v-list>
              <v-list-item
                v-for="(option, index) in question.options"
                :key="`question-${index}`"
                :class="{ 'has-error': !isOptionValid(option) }"
              >
                <v-list-item-icon
                  class="prefix justify-center"
                >
                  <div
                    :class="[ option.score > 0 ? 'success--text' : 'secondary--text' ]"
                  >
                    {{ Number.isInteger(option.score) ? Math.abs(option.score) : '?' }}
                  </div>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ option.content }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="$router.push({ name: 'editor', query: { id: question.id } })"
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              text
              @click="removeQuestion(question.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="card d-flex flex-column justify-center align-center">
          <v-btn
            color="primary"
            x-large
            text
            @click="$router.push({ name: 'editor' })"
          >
            <v-icon>mdi-plus</v-icon>
            Add Question
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia';
import { useQuestionnaire } from '~/store/questionnaire';
import {
  isOptionValid,
  isQuestionValid,
  Question,
  QuestionOption
} from "~/questionnaire/questionnaire";
import { defineComponent } from "@vue/composition-api/dist/vue-composition-api";
import {useNotification} from "~/store/notification";


export default defineComponent({
  name: 'AdminPage',
  computed: {
    ...mapState(useQuestionnaire, ['published', 'hasChanges', 'isValid']),
    ...mapState(useQuestionnaire, { questions: 'getDraftQuestions' }),
  },
  methods: {
    ...mapActions(useQuestionnaire, ['removeQuestion', 'publish']),
    ...mapActions(useNotification, ['addNotification']),
    isQuestionValid(question: Question, checkOptions: boolean): boolean {
      return isQuestionValid(question, checkOptions);
    },
    isOptionValid(option: QuestionOption): boolean {
      return isOptionValid(option);
    },
    publishChanges(): void {
      try {
        this.publish();
        this.addNotification({
          message: 'Changes published successfully',
        });
      } catch (e: any) {
        this.addNotification({
          message: e.message,
          error: e,
        });
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_colors';

.card {
  height: 100%;
  min-height: 260px;
}
.has-error {
  border: 1px solid red;
}
.title {
  word-break: break-word;
}
.prefix {
  padding: 4px 8px;
  margin-right: 18px !important;
  background-color: rgba(255, 255, 255, 0.2);
}
.publish-warning {
  font-size: 0.7rem;
  background-color: rgba(map-get($yellow, 'lighten-4'), 0.1);
  padding: 6px 12px;
}
</style>
