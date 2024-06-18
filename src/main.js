import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebaseConfig from "./firebaseConfig";
import "carbon-components/css/carbon-components.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import CarbonComponentsVue from "@carbon/vue";
import "core-js/stable";

Vue.config.productionTip = false;
Vue.use(CarbonComponentsVue);

let app = undefined;
initializeApp(firebaseConfig);
getAuth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App)
        }).$mount("#app");
    }
});
