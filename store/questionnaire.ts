import { defineStore } from "pinia";
import {isQuestionnaireValid, Question, Questionnaire} from "~/questionnaire/questionnaire";
import { v4 as uuidv4 } from 'uuid';
import { deepCopy } from "deep-copy-ts";
import {diff} from "deep-object-diff";

interface State {
  published: Questionnaire;
  draft: Questionnaire;
}

const questionnaireFromDatabase: Questionnaire = {
  id: uuidv4(),
  questions: [
      {
        id: uuidv4(),
        content: 'You’re really busy at work and a colleague is telling you their life story and personal woes. You:',
        options: [
          {
            id: uuidv4(),
            content: 'Don’t dare to interrupt them',
            score: 1,
          },
          {
            id: uuidv4(),
            content: 'Think it’s more important to give them some of your time; work can wait',
            score: 2,
          },
          {
            id: uuidv4(),
            content: 'Listen, but with only with half an ear',
            score: 3,
          },
          {
            id: uuidv4(),
            content: 'Interrupt and explain that you are really busy at the moment',
            score: 4,
          },
        ],
      },
      {
        id: uuidv4(),
        content: 'You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:',
        options: [
          {
            id: uuidv4(),
            content: 'Look at your watch every two minutes',
            score: 1,
          },
          {
            id: uuidv4(),
            content: 'Bubble with inner anger, but keep quiet',
            score: 2,
          },
          {
            id: uuidv4(),
            content: 'Explain to other equally impatient people in the room that the doctor is always running late',
            score: 3,
          },
          {
            id: uuidv4(),
            content: 'Complain in a loud voice, while tapping your foot impatiently',
            score: 4,
          },
        ],
      },
      {
        id: uuidv4(),
        content: 'You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:',
        options: [
          {
            id: uuidv4(),
            content: 'Don’t dare contradict them',
            score: 1,
          },
          {
            id: uuidv4(),
            content: 'Think that they are obviously right',
            score: 2,
          },
          {
            id: uuidv4(),
            content: 'Defend your own point of view, tooth and nail',
            score: 3,
          },
          {
            id: uuidv4(),
            content: 'Continuously interrupt your colleague',
            score: 4,
          },
        ],
      },
      {
        id: uuidv4(),
        content: 'You are taking part in a guided tour of a museum. You:',
        options: [
          {
            id: uuidv4(),
            content: 'Are a bit too far towards the back so don’t really hear what the guide is saying',
            score: 1,
          },
          {
            id: uuidv4(),
            content: 'Follow the group without question',
            score: 2,
          },
          {
            id: uuidv4(),
            content: 'Make sure that everyone is able to hear properly',
            score: 3,
          },
          {
            id: uuidv4(),
            content: 'Are right up the front, adding your own comments in a loud voice',
            score: 4,
          },
        ],
      },
    ],
  criteria: [
    { id: 'typeA', score: 1 },
    { id: 'typeB', score: 2 },
    { id: 'typeC', score: 3 },
    { id: 'typeD', score: 4 },
  ],
};

export const useQuestionnaire = defineStore('questionnaire', {
  state: (): State => ({
    published: deepCopy(questionnaireFromDatabase),
    draft: deepCopy(questionnaireFromDatabase),
  }),
  getters: {
    getPublished: (state) => state.published,
    getDraft: (state) => state.draft,
    getPublishedQuestions: (state) => state.published.questions,
    getDraftQuestions: (state) => state.draft.questions,
    hasChanges: (state) => Object.keys(diff(state.published, state.draft)).length > 0,
    isValid: (state) => isQuestionnaireValid(state.draft),
  },
  actions: {
    publish() {
      this.published = deepCopy(this.draft);
    },
    addQuestion(question: Question) {
      this.draft.questions.push(question);
    },
    setQuestion(question: Question) {
      const idx = this.draft.questions.findIndex(q => q.id === question.id);
      if (idx === -1) {
        throw new Error(`Question ${question.id} not found`);
      }

      this.draft.questions.splice(idx, 1, question);
    },
    removeQuestion(id: string) {
      const idx = this.draft.questions.findIndex(q => q.id === id);
      if (idx === -1) {
        throw new Error(`Question ${id} not found`);
      }

      this.draft.questions.splice(idx, 1);
    },
  },
});

