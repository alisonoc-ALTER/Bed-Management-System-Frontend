<template>
    <div id="bedList">
        <h2>Bed Selection</h2>
        <p>
            Filtered by:
            <cv-tag
                v-if="filterByAge"
                :filter="true"
                label="Age"
                @remove="filterByAge = false"
            />
            <cv-tag
                v-if="filterByGender"
                :filter="true"
                label="Gender"
                @remove="filterByGender = false"
            />
            <cv-tag v-if="!filterByAge && !filterByGender" label="No filter" />
        </p>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="bed in filteredBeds"
                    :key="bed.bedId"
                    :class="`gender-${bed.gender}`"
                    :expandable="true"
                >
                    <cv-data-table-cell>{{
                        bed.ward_description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-tooltip :tip="`Bed ID: ${bed.id}`">
                            {{ bed.description }}
                        </cv-tooltip>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <gender-tag :gender="bed.gender" :contrast="true" />
                    </cv-data-table-cell>
                    <cv-data-table-cell
                        v-if="
                            checkIfInAgeRange(
                                bed.min_patient_age,
                                bed.max_patient_age
                            )
                        "
                    >
                        {{ bed.min_patient_age }} - {{ bed.max_patient_age }}
                    </cv-data-table-cell>
                    <cv-data-table-cell v-else>
                        <cv-tooltip
                            style="font-weight: bold; color: red"
                            tip="Warning: Bed may not be suitable for patients needs"
                        >
                            {{ bed.min_patient_age }} -
                            {{ bed.max_patient_age }}</cv-tooltip
                        >
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button @click="assignBed(bed.id)">{{
                            action
                        }}</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <cv-toast-notification
            v-if="!treatmentLevel || !gender || !hospitalId"
            id="fill-info-notification"
            title="Fill available fields for list of beds"
        ></cv-toast-notification>
        <cv-toast-notification
            v-else-if="!beds.length"
            id="fill-info-notification"
            kind="error"
            title="No beds available for the given criteria"
        ></cv-toast-notification>
    </div>
</template>

<script>
import GenderTag from "./tags/GenderTag.vue";

export default {
    name: "BedList",
    props: {
        treatmentLevel: {
            type: Number,
            required: false
        },
        age: {
            type: Number,
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        hospitalId: {
            type: Number,
            required: false
        },
        triggerUpdate: {
            type: Number,
            required: false
        },
        action: {
            type: String,
            required: false
        }
    },
    components: {
        GenderTag
    },
    data() {
        return {
            columns: [
                "Ward",
                "Bed Name",
                "Bed Gender",
                "Patient Age Range",
                "Action"
            ],
            wards: [],
            beds: [],
            filterByAge: true,
            filterByGender: true
        };
    },
    computed: {
        filteredBeds() {
            return this.beds
                .map((bed) => {
                    return {
                        ...bed,
                        gender:
                            bed.room?.gender ||
                            this.findWard(bed.ward_id).gender,
                        min_patient_age: this.findWard(bed.ward_id)
                            .min_patient_age,
                        max_patient_age: this.findWard(bed.ward_id)
                            .max_patient_age,
                        ward_description: this.findWard(bed.ward_id).description
                    };
                })
                .sort((a, b) => {
                    const preferredGender = this.gender;
                    const getGenderPriority = (gender) => {
                        if (gender === preferredGender) return 1;
                        if (gender === "All") return 2;
                        return 3;
                    };
                    const aPriority = getGenderPriority(a.gender);
                    const bPriority = getGenderPriority(b.gender);
                    if (aPriority < bPriority) return -1;
                    if (aPriority > bPriority) return 1;
                    return 0;
                });
        }
    },
    watch: {
        treatmentLevel() {
            this.getAllMatchingBeds(this.age, this.gender);
        },
        triggerUpdate() {
            this.getAllMatchingBeds(this.age, this.gender);
        },
        hospitalId() {
            this.beds = [];
            this.getAllMatchingBeds(this.age, this.gender);
        },
        filterByAge() {
            this.getAllMatchingBeds(this.age, this.gender);
        },
        filterByGender() {
            this.getAllMatchingBeds(this.age, this.gender);
        }
    },
    methods: {
        checkIfInAgeRange(minAge, maxAge) {
            return minAge <= this.age && this.age <= maxAge;
        },
        assignBed(bedId) {
            this.$emit("assignBed", bedId);
        },
        async getBeds(wardId) {
            try {
                let activeBeds = [];
                const response = await fetch(`/api/beds/all/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const beds = await response.json();
                const bedsPromises = beds.map(async (bed) => {
                    if (await this.isBedActive(bed.id)) {
                        activeBeds.push(bed);
                    }
                });
                await Promise.all(bedsPromises);
                return activeBeds;
            } catch (err) {
                console.error(err);
            }
        },
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.hospitalId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                this.wards = wards;
                return wards;
            } catch (err) {
                console.error(err);
            }
        },
        async isBedActive(bedId) {
            try {
                const response = await fetch(`/api/beds/find/${bedId}/status`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedDetails = await response.json();
                return !bedDetails.disabled;
            } catch (err) {
                console.error(err);
            }
        },
        async getAllMatchingBeds(age, gender) {
            const wards = await this.getWards();

            let filteredWards = [];
            if (this.filterByAge) {
                filteredWards = wards.filter(
                    (ward) =>
                        ward.min_patient_age <= age &&
                        ward.max_patient_age >= age
                );
            } else {
                filteredWards = wards;
            }

            if (filteredWards.length === 0) {
                this.beds = [];
                this.wards = [];
                return;
            }

            const bedPromises = filteredWards.map((ward) =>
                this.getBeds(ward.id)
            );
            let beds = (await Promise.all(bedPromises)).flat();

            if (this.filterByGender) {
                this.beds = beds.filter((bed) => {
                    if (bed.room) {
                        return (
                            bed.room.gender === gender ||
                            bed.room.gender === "All"
                        );
                    } else {
                        const ward = this.findWard(bed.ward_id);
                        return ward.gender === gender || ward.gender === "All";
                    }
                });
            } else {
                this.beds = beds;
            }
        },
        findWard(wardId) {
            return this.wards.find((ward) => ward.id === wardId);
        }
    },
    mounted() {
        if (this.treatmentLevel && this.age && this.gender && this.hospitalId) {
            this.getAllMatchingBeds(this.age, this.gender);
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
div#fill-info-notification.cv-notification.bx--toast-notification {
    height: min-content;
    button.bx--toast-notification__close-button {
        display: none;
        visibility: hidden;
    }
    .bx--toast-notification__details {
        height: min-content;
    }
}
tr {
    &.gender-All {
        td {
            background-color: #f7ff00;
            color: #5f5116;
        }
    }
    &.gender-Male {
        td {
            background-color: #bae6ff;
            color: #003a6d;
        }
    }
    &.gender-Female {
        td {
            background-color: #ff7bff;
            color: #320028;
        }
    }
}
.bx--data-table--zebra tbody tr:not(.bx--parent-row):nth-child(2n) {
    &.gender-All {
        td {
            background-color: color.scale(#f7ff00, $lightness: -5%);
            color: color.scale(#5f5116, $lightness: 5%);
        }
    }
    &.gender-Male {
        td {
            background-color: color.scale(#bae6ff, $lightness: -5%);
            color: color.scale(#003a6d, $lightness: 5%);
        }
    }
    &.gender-Female {
        td {
            background-color: color.scale(#ff7bff, $lightness: -5%);
            color: color.scale(#320028, $lightness: 5%);
        }
    }
}

.cv-tooltip.bx--tooltip__trigger.bx--tooltip--a11y.bx--tooltip--top.bx--tooltip--align-center {
    text-align: left;
}
</style>
