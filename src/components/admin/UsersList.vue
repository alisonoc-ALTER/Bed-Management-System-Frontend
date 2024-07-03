<template>
    <div id="usersList">
        <cv-modal :visible="askPassword" :auto-hide-off="true">
            <template slot="title"> Password </template>
            <template slot="content">
                <cv-text-input
                    id="password"
                    label="Password"
                    type="password"
                    v-model="password"
                />
                <cv-button @click="firebaseSignup">Sign up</cv-button>
            </template>
        </cv-modal>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in filteredResults"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.first_name
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.last_name
                    }}</cv-data-table-cell>
                    <cv-data-table-cell
                        ><cv-tag
                            :label="result.can_approve_requests ? '✔' : '❌'"
                            :kind="
                                result.can_approve_requests ? 'green' : 'red'
                            "
                    /></cv-data-table-cell>
                    <cv-data-table-cell
                        ><cv-tag
                            :label="result.can_administrate ? '✔' : '❌'"
                            :kind="result.can_administrate ? 'green' : 'red'"
                    /></cv-data-table-cell>
                    <cv-data-table-cell> {{ result.email }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        {{ result.phone_number }}</cv-data-table-cell
                    >
                    <cv-data-table-cell>
                        <cv-button-set>
                            <cv-icon-button
                                label="Browsing History"
                                @click="open(result.id)"
                            >
                                <template slot="icon"><HistoryIcon /></template>
                            </cv-icon-button>
                            <cv-button
                                kind="ghost"
                                @click="changePassword(result.email)"
                                >Change Password
                            </cv-button>
                            <cv-button
                                kind="danger"
                                @click="deleteUser(result.id)"
                                :disabled="result.id === userDetails.id"
                                >Delete</cv-button
                            >
                        </cv-button-set>
                    </cv-data-table-cell>
                </cv-data-table-row>
                <cv-data-table-row>
                    <cv-data-table-cell>
                        <Cv-tag label="Auto" kind="cyan" />
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newUser.first_name"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newUser.last_name"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-checkbox
                            value="false"
                            v-model="newUser.can_approve_requests"
                        ></cv-checkbox>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-checkbox
                            value="false"
                            v-model="newUser.can_administrate"
                        ></cv-checkbox>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input v-model="newUser.email"></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newUser.phone_number"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button
                            @click="askPassword = true"
                            :disabled="!readyToCreate()"
                            >Create</cv-button
                        >
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <router-view></router-view>
    </div>
</template>

<script>
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import HistoryIcon from "@carbon/icons-vue/es/recently-viewed/32";

export default {
    name: "UsersList",
    data() {
        return {
            users: [],
            lastSelected: undefined,
            password: "",
            columns: [
                "ID",
                "First Name",
                "Last Name",
                "Can Approve Requests",
                "Can Administrate",
                "Email",
                "Phone Number",
                "Action"
            ],
            newUser: {
                first_name: "",
                last_name: "",
                can_approve_requests: false,
                can_administrate: false,
                email: "",
                phone_number: ""
            },
            askPassword: false
        };
    },
    components: {
        HistoryIcon
    },
    methods: {
        async getUsers() {
            try {
                const response = await fetch(
                    `/api/users/all?hospital_id=${this.selectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const users = await response.json();
                this.users = users;
            } catch (err) {
                console.error(err);
            }
        },
        readyToCreate() {
            return (
                this.newUser.first_name &&
                this.newUser.last_name &&
                this.newUser.email &&
                this.newUser.phone_number
            );
        },
        async deleteUser(userId) {
            try {
                await fetch(`/api/users/delete/${userId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                this.refreshData();
            } catch (err) {
                console.error(err);
            }
        },
        refreshData() {
            this.getUsers();
        },
        async createUser() {
            const userData = {
                ...this.newUser,
                hospital_id: this.selectedHospital.id,
                created_at: new Date().toISOString(),
                created_by: this.userId
            };
            console.info("Creating user:", userData);
            try {
                const response = await fetch("/api/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "success",
                        title: "User created successfully",
                        caption: `User "${userData.first_name} ${
                            userData.last_name
                        }" has been created successfully</br>Can Approve Requests: ${
                            userData.can_approve_requests ? "✔" : "❌"
                        }
                        </br>Can Administrate: ${
                            userData.can_administrate ? "✔" : "❌"
                        }`
                    });
                } else {
                    throw new Error("Failed to create user");
                }
                this.newUser = {
                    first_name: "",
                    last_name: "",
                    can_approve_requests: false,
                    can_administrate: false,
                    email: "",
                    phone_number: ""
                };
                this.refreshData();
            } catch (err) {
                this.$store.commit("ADD_NOTIFICATION", {
                    kind: "error",
                    title: "Failed to create user",
                    caption: "Failed to create user"
                });
                console.error(err);
            }
        },
        firebaseSignup() {
            const auth = getAuth();
            createUserWithEmailAndPassword(
                auth,
                this.newUser.email,
                this.password
            )
                .then((userCredential) => {
                    console.info("Account created!", userCredential.user.email);
                    this.askPassword = false;
                    this.createUser();
                })
                .catch((error) => {
                    this.askPassword = false;
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "error",
                        title: "Error Creating User",
                        caption: error.message
                    });
                });
        },
        async changePassword(userEmail) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, userEmail);
            this.$store.commit("ADD_NOTIFICATION", {
                kind: "info",
                title: "Password Reset",
                caption: `Password reset email sent to ${userEmail}. Please advise the user to check their email and follow the instructions to reset their password.`
            });
        },
        open(route) {
            if (this.lastSelected !== route) {
                this.lastSelected = route;
                this.$router.push(`/admin/users/${route}`);
            }
        }
    },
    watch: {
        selectedHospital() {
            this.getUsers();
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        filteredResults() {
            return this.users;
        },
        userId() {
            return this.$store.getters.getUserDetails.id;
        },
        userHospitalId() {
            return this.$store.getters.getUserDetails.hospital_id;
        },
        userDetails() {
            return this.$store.getters.getUserDetails;
        }
    },
    mounted() {
        this.getUsers();
    }
};
</script>

<style scoped>
.bx--btn-set .bx--btn {
    width: auto;
}
</style>
