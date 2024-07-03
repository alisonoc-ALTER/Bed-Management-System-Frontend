<template>
    <div class="create">
        <AddPatient @patientDetails="handlePatientDetails" />
        <BedList
            :age="patientAge"
            :treatmentLevel="Number(patientDetails.treatment)"
            :gender="patientDetails.gender"
            :hospitalId="selectedHospital.id"
            :triggerUpdate="triggerUpdate"
            action="Assign"
            @assignBed="assignBed"
        />
    </div>
</template>

<script>
import AddPatient from "@/components/AddPatient.vue";
import BedList from "@/components/BedList.vue";

export default {
    name: "CreateView",
    data() {
        return {
            patientDetails: {},
            patientAge: 0,
            triggerUpdate: 0
        };
    },
    components: {
        AddPatient,
        BedList
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        userId() {
            return this.$store.getters.getUserDetails.id;
        }
    },
    methods: {
        handlePatientDetails(patientDetails) {
            this.patientAge = this.findPatientAge(patientDetails.dateOfBirth);
            this.patientDetails = patientDetails;
        },
        findPatientAge(dateOfBirth) {
            const dob = new Date(dateOfBirth.split("/").reverse().join("-"));
            const diff_ms = Date.now() - dob.getTime();
            const age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        },
        async createPatient() {
            try {
                return await fetch("/api/patients/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify({
                        first_name: this.patientDetails.firstName,
                        last_name: this.patientDetails.lastName,
                        date_of_birth: this.patientDetails.dateOfBirth,
                        gender: this.patientDetails.gender,
                        in_transit: false,
                        created_by: this.userId,
                        created_at: new Date().toISOString(),
                        treatment_level_id: this.patientDetails.treatment
                    })
                });
            } catch (err) {
                console.error(err);
            }
        },
        openBed(bedId) {
            this.$router.push(`/bed/${bedId}`);
        },
        async assignBed(bedId) {
            const response = await this.createPatient();
            const patient = await response.json();
            try {
                fetch("/api/beds/occupancy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify({
                        patient_id: patient.id,
                        bed_id: bedId,
                        time_booked: new Date().toISOString(),
                        created_by: this.userId,
                        created_at: new Date().toISOString()
                    })
                });
                this.triggerUpdate++;
                this.openBed(bedId);
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>

<style scoped>
.create {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
.create #bedList {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-left: 0.1em solid #000;
}
</style>
