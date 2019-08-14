import "bootstrap";
import "./static/bootstrap.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

Object.defineProperty(Vue.prototype, "$http", {
    value: axios
});

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8080/sbvc/';

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
