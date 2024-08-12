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
