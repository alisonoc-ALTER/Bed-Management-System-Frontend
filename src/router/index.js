import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RequestsView from "../views/RequestsView.vue";
import CreateView from "../views/CreateView.vue";
import SearchView from "../views/SearchView.vue";
import AdminView from "../views/AdminView.vue";
import TransferView from "@/views/TransferView.vue";
import WardManagementView from "@/views/WardManagementView.vue";
import UserManagementView from "@/views/UserManagementView.vue";
import BedsList from "@/components/admin/BedsList.vue";
import BedView from "@/views/BedView.vue";
import UserRoutingHistory from "@/components/admin/UserRoutingHistory.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        redirect: "/dashboard",
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: DashboardView
            },
            {
                path: "requests",
                name: "requests",
                component: RequestsView
            },
            {
                path: "create",
                name: "create",
                component: CreateView
            },
            {
                path: "search",
                name: "search",
                component: SearchView
            },
            {
                path: "admin",
                name: "admin",
                component: AdminView,
                children: [
                    {
                        path: "wards",
                        name: "wards",
                        component: WardManagementView,
                        children: [
                            {
                                path: ":wardId",
                                component: BedsList
                            }
                        ]
                    },
                    {
                        path: "users",
                        name: "users",
                        component: UserManagementView,
                        children: [
                            {
                                path: ":userId",
                                component: UserRoutingHistory
                            }
                        ]
                    }
                ]
            },
            {
                path: "transfer/:bedId",
                name: "transfer",
                component: TransferView
            },
            {
                path: "bed/:bedId",
                name: "bed",
                component: BedView
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    {
        path: "/logout",
        name: "logout",
        beforeEnter: (to, from, next) => {
            getAuth().signOut();
            next("/login");
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

function waitForAuthState() {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(
            auth,
            (user) => {
                resolve(user);
            },
            reject
        );
    });
}

router.beforeEach(async (to, from, next) => {
    const currentUser = await waitForAuthState();
    if (currentUser) {
        store.commit("SET_USER_EMAIL", currentUser.email);
        store.commit("SET_AUTH_TOKEN", currentUser.accessToken);

        await store.getters.getAuthToken;
    }

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next("login");
    } else {
        next();
    }

    const userDetails = store.getters.getUserDetails;
    const selectedHospital = store.getters.getSelectedHospital;
    if (userDetails.id) {
        try {
            const response = await fetch("/api/routing-history/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                },
                body: JSON.stringify({
                    to: to.path,
                    from: from.path,
                    user_id: userDetails.id
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create routing history");
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (
        (to.name === "requests" && !userDetails.can_approve_requests) ||
        userDetails.hospital_id !== selectedHospital.id
    ) {
        next("dashboard");
    }

    if (
        (to.name === "admin" && !userDetails.can_administrate) ||
        userDetails.hospital_id !== selectedHospital.id
    ) {
        next("dashboard");
    }
});

export default router;
