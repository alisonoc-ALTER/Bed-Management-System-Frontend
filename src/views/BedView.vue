<template>
    <div class="bedView">
        <div class="tilesContainer">
            <bed-tile
                :bedInfo="bedInfo"
                :patientInfo="patientInfo"
                :bedStatus="bedStatus"
                :ward="ward"
                :currentRoute="currentRoute"
            />
            <patient-tile
                :bedInfo="bedInfo"
                :patientInfo="patientInfo"
                :bedStatus="bedStatus"
                :ward="ward"
            />
        </div>
    </div>
</template>

<script>
import PatientTile from "@/components/info/PatientTile.vue";
import BedTile from "@/components/info/BedTile.vue";

export default {
    name: "BedView",
    components: {
        PatientTile,
        BedTile
    },
    data() {
        return {
            bedInfo: {},
            patientInfo: {},
            bedStatus: true,
            ward: {}
        };
    },
    computed: {
        bedId() {
            return this.$route.params.bedId;
        },
        currentRoute() {
            return window.location.origin + this.$route.path;
        }
    },
    methods: {
        async getBedInfo() {
            try {
                const response = await fetch(`/api/beds/find/${this.bedId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedInfo = await response.json();
                this.bedInfo = bedInfo;
                this.bedStatus = await this.getBedStatus(bedInfo.id);
                this.findWard(bedInfo.ward_id);
            } catch (error) {
                console.error(error);
            }
        },
        async getBedStatus(bedId) {
            try {
                const response = await fetch(`/api/beds/find/${bedId}/status`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedDetails = await response.json();
                return bedDetails.disabled_reason;
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
        },
        async findWard(wardId) {
            try {
                const response = await fetch(`/api/wards/find?id=${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const ward = await response.json();
                this.ward = ward;
                return ward;
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
.bedView {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tilesContainer {
        width: 100%;
        min-height: 80vh;
        display: flex;
        justify-content: center;
        svg {
            width: 2em;
            height: 2em;
        }
    }
}

@media (max-width: 768px) {
    .bedView {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        .tilesContainer {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .cv-tile {
            width: 90%;
            margin: auto;
            height: fit-content;
        }
    }
    #qrDownloadButton,
    #bedQrCodeUrl {
        visibility: hidden;
    }
}
</style>
