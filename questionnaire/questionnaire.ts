import {Type, usePersonality} from "~/store/personality";
import {closestMatch} from "~/helpers/computations";

export interface QuestionOption {
  id: string;
  content: string|null;
  score: number|null;
}

export interface Question {
  id?: string;
  content: string|null;
  options: QuestionOption[];
}

interface ScoringCriteria {
  id: string;
  score: number;
}

export interface Questionnaire {
  id: string;
  questions: Question[];
  criteria: ScoringCriteria[];
}

export const isQuestionnaireValid = (questionnaire: Questionnaire) => {
  return questionnaire.questions.every(question => isQuestionValid(question));
}

export const isQuestionValid = (question: Question, checkOptions: Boolean = true) => {
  if (!question.content) {
    return false;
  }

  if (checkOptions) {
    return question.options.every(option => isOptionValid(option));
  }

  return true;
}

export const isOptionValid = (option: QuestionOption) => {
  return option.score !== undefined
    && option.score !== null
    && Number.isInteger(option.score)
    && option.content !== undefined
    && option.content !== null
    && option.content !== '';
}

export const computeType = (questionnaire: Questionnaire, scores: number[]): Type => {
  const pStore = usePersonality();
  const types = pStore.getTypes;

  // Some very complex calculation logic here derived from some kind of
  // configuration specific to this questionnaire...
  const score = scores.reduce((pre, cur) => {
    return pre + cur;
  }, 0) / scores.length;

  const bestScore = closestMatch(score, questionnaire.criteria.map(t => t.score));
  const bestType = questionnaire.criteria.find(t => t.score === bestScore);
  if (!bestType) {
    throw new Error('No type found');
  }

  const type = types.find(type => type.id === bestType.id);
  if (type) {
    return type;
  }

  throw new Error('Unable to compute type');
}
