import { PiniaSharedState } from 'pinia-shared-state';
import {createPinia} from "pinia";

const pinia = createPinia();

// Pass the plugin to your application's pinia plugin
pinia.use(
  PiniaSharedState({
    // Enables the plugin for all stores. Defaults to true.
    enable: true,
    // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
    initialize: false,
    // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
    type: 'localstorage',
  }),
);
