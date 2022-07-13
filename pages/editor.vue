<template>
  <v-form v-if="question">
    <p>
      All items are validated <strong>however</strong> to demonstrate overall error capture on the draft questionnaire
      I have allowed to leave the score input empty. This is not a valid input and as such the admin screen
      will not allow you to publish until all errors are cleared.
    </p>

    <validation-observer v-slot="{ invalid, touched, dirty }">
      <v-row>
        <v-col>
          <validation-provider>
            <v-text-field
              v-model="question.content"
              label="Question"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        v-for="(option, index) in question.options"
        :key="`option-${index}`"
      >
        <v-col class="flex-grow-0 score-col">
          <validation-provider rules="" v-slot="{ errors }">
            <v-text-field
              v-model="option.score"
              :error-messages="errors"
              type="number"
              label="Score"
              class="centered-text-input"
            />
          </validation-provider>
        </v-col>
        <v-col
          class="flex-grow-1"
        >
          <validation-provider rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="option.content"
              :error-messages="errors"
              label="Option"
            />
          </validation-provider>
        </v-col>
        <v-col class="d-flex flex-grow-0 flex-shrink-1 trash-button-col">
          <v-btn
            icon
            x-small
            @click="removeOption(index)"
            class="align-baseline"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex">
          <v-btn
            @click="addOption"
          >
            <v-icon>mdi-plus</v-icon>
            Add Option
          </v-btn>
          <v-spacer />
          <v-btn
            text
            @click="$router.go(-1)"
            class="mr-4"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!allowSaveOverride && (invalid || !(touched || dirty))"
            @click="saveChanges"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </validation-observer>
  </v-form>
  <div v-else>
    Not Found
  </div>
</template>

<script lang="ts">
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { v4 as uuidv4 } from 'uuid';
import { useQuestionnaire } from "~/store/questionnaire";
import { deepCopy } from "deep-copy-ts";
import { defineComponent } from '@vue/composition-api'
import { Question } from "~/questionnaire/questionnaire";
import {mapActions} from "pinia";
import {useNotification} from "~/store/notification";

export default defineComponent({
  name: 'EditorPage',
  components: { ValidationProvider, ValidationObserver },
  data() {
    let questionData: Question;
    const id = this.$route.query.id;
    if (!id) {
      // create a new question
      questionData = {
        content: '',
        options: [
          {
            id: uuidv4(),
            content: '',
            score: null,
          },
          {
            id: uuidv4(),
            content: '',
            score: null,
          },
          {
            id: uuidv4(),
            content: '',
            score: null,
          },
          {
            id: uuidv4(),
            content: '',
            score: null,
          },
        ],
      };
    } else {
      const store = useQuestionnaire();
      const question = store.getDraftQuestions.find(question => question.id === id) as Question;
      if (!question) {
        this.$router.push({name: 'admin'});
      }

      questionData = deepCopy<Question>(question)
    }

    return {
      allowSaveOverride: false,
      question: questionData,
    }
  },
  methods: {
    ...mapActions(useQuestionnaire, ['addQuestion', 'setQuestion']),
    ...mapActions(useNotification, ['addNotification']),
    addOption(): void {
      this.question.options.push({
        id: uuidv4(),
        content: null,
        score: null,
      });
    },
    removeOption(index: number): void {
      this.allowSaveOverride = true;
      this.question.options.splice(index, 1);
    },
    saveChanges(): void {
      try {
        // convert all scores to numbers
        this.question.options.forEach(option => {
          if (Number.isInteger(option.score)) {
            return;
          }

          const n = parseInt(option.score as any);
          if (!isNaN(n)) {
            option.score = n;
            return;
          }
        });

        if (typeof this.question.id === 'undefined') {
          this.question.id = uuidv4();
          this.addQuestion(this.question);
        } else {
          this.setQuestion(this.question);
        }
        this.$router.push({ name: 'admin' });
      } catch (e: any) {
        this.addNotification({
          error: e,
          message: e.message,
        });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.score-col {
  min-width: 56px;
}

.centered-text-input {
  //noinspection CssInvalidPseudoSelector
  :deep(input) {
    text-align: center
  }
}

.trash-button-col {
  padding-top: 36px;
}
</style>
