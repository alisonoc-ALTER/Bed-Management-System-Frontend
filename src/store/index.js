import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hospitals: [],
        email: "",
        userDetails: {},
        selectedHospital: {},
        authToken: "",
        notifications: [],
        transferRequests: [],
        disabledReasons: []
    },
    getters: {
        allHospitals: (state) => state.hospitals,
        getUserEmail: (state) => state.email,
        getSelectedHospital: (state) => state.selectedHospital,
        getUserDetails: (state) => state.userDetails,
        getHospitalById: (state) => (id) => {
            return state.hospitals.find((hospital) => hospital.id === id);
        },
        getAuthToken: (state) => state.authToken,
        getNotifications: (state) => state.notifications,
        getTransferRequests: (state) => state.transferRequests,
        getDisabledReasons: (state) => state.disabledReasons
    },
    mutations: {
        SET_HOSPITALS(state, hospitals) {
            state.hospitals = hospitals;
        },
        SET_USER_EMAIL(state, email) {
            state.email = email;
        },
        SET_USER_DETAILS(state, userDetails) {
            state.userDetails = userDetails;
        },
        SET_SELECTED_HOSPITAL(state, hospital) {
            state.selectedHospital = hospital;
        },
        SET_AUTH_TOKEN(state, token) {
            state.authToken = token;
        },
        ADD_NOTIFICATION(state, notification) {
            notification.subTitle = formatInTimeZone(
                new Date(),
                "Europe/London",
                "HH:mm:ss dd/MM/yyyy"
            );
            state.notifications.push(notification);
        },
        REMOVE_NOTIFICATION(state, index) {
            state.notifications.splice(index, 1);
        },
        SET_TRANSFER_REQUESTS(state, requests) {
            state.transferRequests = requests;
        },
        SET_DISABLED_REASONS(state, reasons) {
            state.disabledReasons = reasons;
        }
    },
    actions: {
        fetchHospitals({ commit, state }) {
            axios
                .get("/api/hospitals/all", {
                    headers: {
                        Authorization: `Bearer ${state.authToken}`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    commit("SET_HOSPITALS", response.data);
                })
                .catch((error) => console.error(error));
        },
        fetchUserDetails({ commit, state }) {
            if (!state.email) {
                console.error("Email not set.");
                return;
            }
            axios
                .get(`/api/users/find?email=${state.email}`, {
                    headers: {
                        Authorization: `Bearer ${state.authToken}`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    commit("SET_USER_DETAILS", response.data);
                })
                .catch((error) => console.error(error));
        },
        fetchTransferRequests({ commit, state }) {
            axios
                .get(
                    `/api/transfers/all?hospital_id=${state.userDetails.hospital_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${state.authToken}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then((response) => {
                    commit("SET_TRANSFER_REQUESTS", response.data);
                })
                .catch((error) => console.error(error));
        },
        fetchDisabledReasons({ commit, state }) {
            axios
                .get("/api/beds/disabled_reasons", {
                    headers: {
                        Authorization: `Bearer ${state.authToken}`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    commit("SET_DISABLED_REASONS", response.data);
                })
                .catch((error) => console.error(error));
        }
    },
    modules: {}
});
