<template>
    <div class="transferView">
        <cv-modal
            :visible="showModal"
            :auto-hide-off="true"
            @primary-click="openDashboard"
        >
            <template slot="title">Success</template>
            <template slot="content">
                Transfer request has been sent successfully.
            </template>
            <template slot="primary-button">Continue</template>
        </cv-modal>
        <div class="tilesContainer">
            <cv-tile>
                <h1>Current Info</h1>
                <p>Bed ID: {{ bedInfo.id }}</p>
                <p>Description: {{ bedInfo.description }}</p>
                <p>First Name: {{ patientInfo.first_name }}</p>
                <p>Last Name: {{ patientInfo.last_name }}</p>
                <p>
                    DOB: {{ patientInfo.date_of_birth }} ({{
                        patientInfo.date_of_birth
                            ? findPatientAge(patientInfo.date_of_birth)
                            : "N/A"
                    }})
                </p>
                <p>Gender: <gender-tag :gender="patientInfo.gender" /></p>
                <p>Time Assigned: {{ patientInfo.timeBooked }}</p>
            </cv-tile>
            <cv-tile id="bedList">
                <cv-dropdown
                    v-model="selectedHospital"
                    placeholder="Select a Hospital"
                >
                    <cv-dropdown-item
                        v-for="hospital in hospitals"
                        :key="hospital.id"
                        :value="String(hospital.id)"
                    >
                        {{ hospital.description }}
                    </cv-dropdown-item>
                </cv-dropdown>
                <BedList
                    v-if="selectedHospital"
                    :age="findPatientAge(patientInfo.date_of_birth)"
                    :treatmentLevel="Number(patientInfo.treatment_level_id)"
                    :gender="patientInfo.gender"
                    :hospitalId="Number(selectedHospital)"
                    action="Request Transfer"
                    @assignBed="transferPatient"
                />
            </cv-tile>
        </div>
    </div>
</template>

<script>
import BedList from "@/components/BedList.vue";
import GenderTag from "@/components/tags/GenderTag.vue";

export default {
    name: "TransferView",
    components: {
        BedList,
        GenderTag
    },
    data() {
        return {
            bedInfo: {},
            patientInfo: {},
            selectedHospital: undefined,
            showModal: false
        };
    },
    computed: {
        bedId() {
            return this.$route.params.bedId;
        },
        currentRoute() {
            return "localhost:8080" + this.$route.path;
        },
        hospitals() {
            return this.$store.getters.allHospitals;
        },
        userDetails() {
            return this.$store.getters.getUserDetails;
        }
    },
    methods: {
        openDashboard() {
            this.$router.push("/dashboard");
        },
        findPatientAge(dateOfBirth) {
            const dob = new Date(dateOfBirth.split("/").reverse().join("-"));
            const diff_ms = Date.now() - dob.getTime();
            const age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        },
        async transferPatient(bedId) {
            const transferResponse = await this.postTransferRequest(bedId);
            if (transferResponse.status === 201) {
                this.showModal = true;
            }
        },
        async postTransferRequest(bedId) {
            try {
                const response = await fetch("/api/transfers/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify({
                        createdAt: new Date().toISOString(),
                        createdBy: this.userDetails.id,
                        bedRequested: bedId,
                        currentBed: this.bedInfo.id,
                        hospitalId: this.selectedHospital,
                        patientId: this.patientInfo.id
                    })
                });
                return response;
            } catch (error) {
                console.error(error);
            }
        },
        async getBedInfo() {
            try {
                const response = await fetch(`/api/beds/find/${this.bedId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                this.bedInfo = await response.json();
            } catch (error) {
                console.error(error);
            }
        },
        async findPatient() {
            try {
                let response = await fetch(
                    `/api/beds/find/${this.bedId}/active`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const bedActiveResponse = await response.json();
                const patientId = bedActiveResponse[0]?.patient_id;
                if (patientId) {
                    response = await fetch(
                        `/api/patients/find?id=${patientId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                            }
                        }
                    );
                    this.patientInfo = await response.json();
                    this.patientInfo.timeBooked = new Date(
                        bedActiveResponse[0].time_booked
                    ).toUTCString();
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.findPatient();
        this.getBedInfo();
    }
};
</script>

<style scoped lang="scss">
.transferView {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cv-tile {
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
    }
    .tilesContainer {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>
