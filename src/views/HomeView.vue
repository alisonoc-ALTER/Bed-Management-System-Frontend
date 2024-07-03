<template>
    <div>
        <main-layout>
            <router-view />
        </main-layout>
    </div>
</template>

<script>
import MainLayout from "@/components/Layout/MainLayout.vue";

export default {
    name: "HomeView",
    components: {
        MainLayout
    },
    computed: {
        userDetails() {
            return this.$store.getters.getUserDetails;
        },
        transferRequests() {
            return this.$store.getters.getTransferRequests;
        }
    },
    watch: {
        transferRequests(newVal, oldVal) {
            if (newVal.length > oldVal.length && oldVal.length > 0) {
                console.info("New transfer request");
                const diff = newVal.length - oldVal.length;
                const newRequests = newVal.slice(-diff);
                newRequests.forEach((request) => {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "info",
                        title: "New Transfer Request",
                        caption: `Transfer request id:${request.id}`
                    });
                });
            }
        },
        userDetails() {
            if (this.userDetails.can_approve_requests) {
                console.info(
                    "User can approve requests; Auto-fetching transfer requests."
                );
                this.fetchTransferRequestsInterval = setInterval(() => {
                    this.$store.dispatch("fetchTransferRequests");
                }, 5000);
            } else if (this.fetchTransferRequestsInterval) {
                clearInterval(this.fetchTransferRequestsInterval);
            }
        }
    },
    created() {
        this.$store.dispatch("fetchHospitals");
        this.$store.dispatch("fetchDisabledReasons");
    },
    beforeDestroy() {
        if (this.fetchTransferRequestsInterval) {
            clearInterval(this.fetchTransferRequestsInterval);
        }
    }
};
</script>
