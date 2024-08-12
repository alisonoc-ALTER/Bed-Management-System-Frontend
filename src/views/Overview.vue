<template>
    <div class="overview" v-if="disabledReasons.length > 0">
        <cv-tile>
            <hospital-capacity-distribution :hospitals="hospitals" />
        </cv-tile>
        <hospital-availability
            v-for="hospital in hospitals"
            :key="hospital.id"
            :hospitalId="hospital.id"
            :title="hospital.description"
            :showDataLabels="true"
            :update="update"
        />
    </div>
    <cv-tile v-else>
        <cv-inline-loading state="loading" />
    </cv-tile>
</template>

<script>
import HospitalAvailability from "@/components/charts/HospitalAvailability.vue";
import HospitalCapacityDistribution from "@/components/charts/HospitalCapacityDistribution.vue";

export default {
    name: "Overview",
    data() {
        return {
            update: 0
        };
    },
    components: {
        HospitalAvailability,
        HospitalCapacityDistribution
    },
    computed: {
        hospitals() {
            return this.$store.getters.allHospitals;
        },
        disabledReasons() {
            return this.$store.getters.getDisabledReasons;
        },
        userDetails() {
            return this.$store.getters.getUserDetails;
        }
    },
    methods: {
        autoFetch() {
            if (!this.fetchInterval) {
                console.info("Automatically fetching data every 5 minutes.");
                this.fetchInterval = setInterval(() => {
                    this.update++;
                }, 300000);
            }
        }
    },
    watch: {
        userDetails() {
            this.autoFetch();
        }
    },
    mounted() {
        this.autoFetch();
    },
    beforeDestroy() {
        if (this.fetchInterval) {
            clearInterval(this.fetchInterval);
        }
    }
};
</script>

<style scoped lang="scss">
.overview {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
}
.cv-tile {
    margin: 1em;
    width: 23%;
    min-width: 20em;
    height: 40%;
}
</style>
