<template>
    <div id="usersTransferRequests">
        <requests-table
            :requests="activeRequests"
            @getResults="getResults"
            :allowApprove="!userSpecific"
            :showRequestedBy="!userSpecific"
            :showCurrentHospital="!userSpecific"
            :showRequestedHospital="userSpecific"
        />
        <ApprovedRequestsTable
            :requests="approvedRequests"
            :showRequestedBy="!userSpecific"
            :showPreviousHospital="!userSpecific"
            :showApprovedHospital="userSpecific"
        />
    </div>
</template>

<script>
import RequestsTable from "@/components/transfer_tables/RequestsTable.vue";
import ApprovedRequestsTable from "@/components/transfer_tables/ApprovedRequestsTable.vue";
import { formatInTimeZone } from "date-fns-tz";

export default {
    name: "CombinedTransferTables",
    data() {
        return {
            activeRequests: [],
            approvedRequests: []
        };
    },
    components: {
        RequestsTable,
        ApprovedRequestsTable
    },
    props: {
        userSpecific: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        formatTimestamp(timestamp) {
            return formatInTimeZone(
                timestamp,
                "Europe/London",
                "HH:mm dd/MM/yyyy"
            );
        },
        async getRequests() {
            try {
                let url;
                if (this.userSpecific) {
                    url = `/api/transfers/find/created_by?user_id=${this.$store.getters.getUserDetails.id}`;
                } else {
                    url = `/api/transfers/all?hospital_id=${this.selectedHospital.id}`;
                }
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findHospital(id) {
            try {
                const response = await fetch(`/api/hospitals/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findPatient(id) {
            try {
                const response = await fetch(`/api/patients/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findWard(id) {
            try {
                const response = await fetch(`/api/wards/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findUser(id) {
            try {
                const response = await fetch(`/api/users/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findBed(id) {
            try {
                const response = await fetch(`/api/beds/find/${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async getResults() {
            const requests = await this.getRequests();
            const activeRequests = [];
            const approvedRequests = [];
            requests.forEach(async (request) => {
                const patient = await this.findPatient(request.patientId);
                const user = await this.findUser(request.createdBy);
                const bedRequested = await this.findBed(request.bedRequested);
                const wardRequested = await this.findWard(bedRequested.ward_id);
                const currentBed = await this.findBed(request.currentBed);
                const currentWard = await this.findWard(currentBed.ward_id);
                const requestedHospital = await this.findHospital(
                    wardRequested.hospital_id
                );
                const currentHospital = await this.findHospital(
                    currentWard.hospital_id
                );
                if (request.bedApproved) {
                    const approvedBy = await this.findUser(request.approvedBy);

                    approvedRequests.push({
                        id: request.id,
                        patientName: `${patient.first_name} ${patient.last_name} `,
                        patientId: patient.id,
                        patientGender: patient.gender,
                        requestedHospital: requestedHospital.description,
                        hospital: currentHospital.description,
                        currentWard: currentWard.description,
                        currentBed: currentBed.description,
                        currentBedId: currentBed.id,
                        requestedWard: wardRequested.description,
                        requestedBed: bedRequested.description,
                        requestedBedId: bedRequested.id,
                        requestBy: `${user.first_name} ${user.last_name}`,
                        requestTime: this.formatTimestamp(
                            new Date(request.createdAt)
                        ),
                        approvedBy: `${approvedBy.first_name} ${approvedBy.last_name}`,
                        approvedTime: this.formatTimestamp(
                            new Date(request.approvedAt)
                        )
                    });
                } else {
                    activeRequests.push({
                        id: request.id,
                        patientName: `${patient.first_name} ${patient.last_name} `,
                        patientId: patient.id,
                        patientGender: patient.gender,
                        requestedHospital: requestedHospital.description,
                        hospital: currentHospital.description,
                        currentWard: currentWard.description,
                        currentBed: currentBed.description,
                        currentBedId: currentBed.id,
                        requestedWard: wardRequested.description,
                        requestedBed: bedRequested.description,
                        requestedBedDisabledReason:
                            bedRequested.disabled_reason,
                        requestedBedId: bedRequested.id,
                        requestBy: `${user.first_name} ${user.last_name}`,
                        requestTime: this.formatTimestamp(
                            new Date(request.createdAt)
                        )
                    });
                }
            });
            this.activeRequests = activeRequests;
            this.approvedRequests = approvedRequests;
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        transferRequests() {
            return this.$store.getters.getTransferRequests;
        }
    },
    watch: {
        transferRequests(newVal, oldVal) {
            if (newVal.length > oldVal.length && oldVal.length > 0) {
                this.getResults();
            }
        },
        selectedHospital() {
            this.getResults();
        }
    },
    mounted() {
        this.getResults();
    }
};
</script>
