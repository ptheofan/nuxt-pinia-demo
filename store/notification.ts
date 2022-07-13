import {defineStore} from "pinia";

export interface AppNotification {
  message: string;
  code?: string;
  timeout?: number;
  color?: string;
  error?: Error|null;
}

interface InternalAppNotification extends AppNotification {
  createdAt: number;
}

interface State {
  latest: InternalAppNotification|null;
}

export const useNotification = defineStore('notification', {
  state: (): State => {
    return {
      latest: null
    };
  },
  getters: {
    getLast: (state): AppNotification|null => state.latest,
  },
  actions: {
    addNotification(e: AppNotification) {
      this.latest = {
        ...e,
        createdAt: Date.now()
      };
    }
  },
});
