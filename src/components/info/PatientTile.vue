<template>
    <cv-tile id="patient">
        <user-icon />
        <h1 v-if="patientInfo.first_name">Current Patient Info</h1>
        <h1 v-else>No Patient Currently Assigned</h1>
        <div v-if="patientInfo.first_name">
            <p>First Name: {{ patientInfo.first_name }}</p>
            <p>Last Name: {{ patientInfo.last_name }}</p>
            <p>Gender: <gender-tag :gender="patientInfo.gender" /></p>
            <p>
                DOB: {{ patientInfo.date_of_birth }} ({{
                    findPatientAge(patientInfo.date_of_birth)
                }})
            </p>
            <p>Time Assigned: {{ patientInfo.timeBooked }}</p>
        </div>

        <cv-accordion>
            <cv-accordion-item :open="true">
                <template slot="title">Actions</template>
                <template slot="content">
                    <cv-button-set v-if="patientInfo.first_name">
                        <cv-button
                            kind="danger"
                            @click="checkoutPatient(patientInfo.id, bedInfo.id)"
                            >Checkout</cv-button
                        >
                        <cv-button
                            kind="secondary"
                            @click="openTransfer(bedInfo.id)"
                            >Transfer</cv-button
                        >
                    </cv-button-set>
                    <cv-button-set v-else-if="!bedInfo.disabled_reason">
                        <cv-button
                            kind="primary"
                            @click="routerRedirect('create')"
                            >Assign New Patient</cv-button
                        >
                        <cv-button
                            kind="secondary"
                            @click="routerRedirect('search')"
                            >Transfer current patient</cv-button
                        >
                    </cv-button-set></template
                >
            </cv-accordion-item>
        </cv-accordion>
    </cv-tile>
</template>

<script>
import GenderTag from "@/components/tags/GenderTag.vue";
import UserIcon from "@carbon/icons-vue/es/user/32";

export default {
    name: "PatientTile",
    props: {
        patientInfo: Object,
        bedInfo: Object,
        ward: Object
    },
    components: {
        GenderTag,
        UserIcon
    },
    methods: {
        findPatientAge(dateOfBirth) {
            const dob = new Date(dateOfBirth.split("/").reverse().join("-"));
            const diff_ms = Date.now() - dob.getTime();
            const age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        },
        openTransfer(bedId) {
            this.$router.push(`/transfer/${bedId}`);
        },
        routerRedirect(route) {
            this.$router.push(`/${route}/`);
        },
        async checkoutPatient(patientId, bedId) {
            try {
                await fetch(
                    `/api/beds/checkout?patient_id=${patientId}&bed_id=${bedId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        },
                        body: JSON.stringify({
                            checkout_time: new Date().toISOString()
                        })
                    }
                );
                this.$router.go();
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#patient {
    &.cv-tile {
        h1 {
            margin-bottom: 1em;
        }
        width: 40%;
        height: 90%;
        font-size: 2rem;
        font-weight: 500;
        font-family: Roboto, sans-serif;
        text-align: center;
        margin: 2rem;
        svg {
            width: 2em;
            height: 2em;
        }
    }

    .cv-button-set {
        display: block;
        .cv-button.bx--btn--primary#green {
            background-color: green;
        }
        .cv-button.bx--btn--primary#yellow {
            background-color: rgb(122, 122, 0);
        }
    }

    .cv-accordion-item.bx--accordion__item.bx--accordion__item--active
        .bx--accordion__content {
        padding-left: 0px;
        padding-right: 0px;
        margin-left: 0px;
    }
}
</style>
