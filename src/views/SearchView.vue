<template>
    <div class="searchView">
        <SearchTable :data="results" :bedsOnly="false" />
    </div>
</template>

<script>
import SearchTable from "@/components/SearchTable.vue";
export default {
    name: "SearchView",
    components: {
        SearchTable
    },
    data() {
        return {
            results: []
        };
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        }
    },
    methods: {
        async getBeds(wardId) {
            try {
                const response = await fetch(`/api/beds/all/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const beds = await response.json();
                return beds;
            } catch (err) {
                console.error(err);
            }
        },
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.selectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                return wards;
            } catch (err) {
                console.error(err);
            }
        },
        async getPatients(bedId) {
            let activeBeds;
            try {
                const response = await fetch(`/api/beds/find/${bedId}/active`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                activeBeds = await response.json();
            } catch (err) {
                console.error(err);
            }
            let patients = [];
            try {
                const patientPromises = activeBeds.map((bed) => {
                    return fetch(`/api/patients/find?id=${bed.patient_id}`, {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    });
                });
                const patientResponses = await Promise.all(patientPromises);
                patients = await Promise.all(
                    patientResponses.map((response) => response.json())
                );
            } catch (err) {
                console.error(err);
            }

            return patients;
        },
        async getTreatmentLevels() {
            try {
                const response = await fetch(`/api/wards/treatment_levels`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const treatmentLevels = await response.json();
                return treatmentLevels;
            } catch (err) {
                console.error(err);
            }
        },
        async getBedStatuses(wardId) {
            try {
                const response = await fetch(
                    `/api/beds/statuses?ward_id=${wardId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const bedStatuses = await response.json();
                return bedStatuses;
            } catch (err) {
                console.error(err);
            }
        },
        async findMatching() {
            const wards = await this.getWards();
            const bedsPromises = wards.map((ward) => this.getBeds(ward.id));
            const beds = (await Promise.all(bedsPromises)).flat();
            const patients = await Promise.all(
                beds.map((bed) => this.getPatients(bed.id))
            );
            const bedStatusesPromises = wards.map((ward) =>
                this.getBedStatuses(ward.id)
            );
            const bedStatuses = (await Promise.all(bedStatusesPromises)).flat();

            const treatmentLevels = await this.getTreatmentLevels();
            const results = beds.map((bed, index) => {
                const patient = patients[index][0];
                const ward = wards.find((ward) => ward.id === bed.ward_id);
                const treatmentLevel = treatmentLevels.find(
                    (level) => level.id === ward.treatment_level
                );
                const bedStatus = bedStatuses.find(
                    (status) => status.id === bed.id
                );

                return {
                    ward: ward.description,
                    wardId: ward.id,
                    bedId: bed.id,
                    bedDescription: bed.description,
                    roomDescription: bed.room?.description || "N/A",
                    patientId: patient ? patient.id : null,
                    patientName: patient
                        ? `${patient.first_name} ${patient.last_name}`
                        : null,
                    patientGender: patient ? patient.gender : null,
                    dateOfBirth: patient ? patient.date_of_birth : null,
                    treatmentLevel: ward ? treatmentLevel.name : null,
                    disabled_reason: bedStatus.disabled_reason
                };
            });
            this.results = results;
        }
    },
    watch: {
        selectedHospital() {
            this.findMatching();
        }
    },
    mounted() {
        this.findMatching();
    }
};
</script>
