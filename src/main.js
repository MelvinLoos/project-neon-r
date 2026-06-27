import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "./style.css";
import "augmented-ui/augmented-ui.min.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);

import { useUserStore } from './stores/user';
import { useTeamStore } from './stores/team';

const userStore = useUserStore();
const teamStore = useTeamStore();

userStore.init();
teamStore.init();

app.mount("#app");