<template>
    <cv-data-table
        title="Pending Transfer Requests"
        :columns="columns"
        :zebra="true"
    >
        <template slot="data">
            <cv-data-table-row v-for="(result, index) in requests" :key="index">
                <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                <cv-data-table-cell>
                    <cv-tooltip :tip="`Patient ID: ${result.patientId}`">
                        {{ result.patientName }} </cv-tooltip
                    ><gender-tag
                        :gender="result.patientGender"
                        :abbreviated="true"
                    />
                </cv-data-table-cell>
                <cv-data-table-cell v-if="showCurrentHospital">{{
                    result.hospital
                }}</cv-data-table-cell>
                <cv-data-table-cell>{{
                    result.currentWard
                }}</cv-data-table-cell>
                <cv-data-table-cell>
                    <cv-tooltip :tip="`Bed ID: ${result.currentBedId}`">
                        {{ result.currentBed }}
                    </cv-tooltip></cv-data-table-cell
                >
                <cv-data-table-cell v-if="showRequestedHospital">{{
                    result.requestedHospital
                }}</cv-data-table-cell>
                <cv-data-table-cell>{{
                    result.requestedWard
                }}</cv-data-table-cell>
                <cv-data-table-cell>
                    <cv-tooltip :tip="`Bed ID: ${result.requestedBedId}`">
                        {{ result.requestedBed }}
                    </cv-tooltip>

                    <bed-status-tag
                        :disabledReason="
                            result.requestedBedDisabledReason || undefined
                        "
                /></cv-data-table-cell>
                <cv-data-table-cell v-if="showRequestedBy">{{
                    result.requestBy
                }}</cv-data-table-cell>
                <cv-data-table-cell>{{
                    result.requestTime
                }}</cv-data-table-cell>
                <cv-data-table-cell>
                    <cv-button-set>
                        <cv-button
                            v-if="allowApprove"
                            kind="primary"
                            :disabled="result.requestedBedDisabledReason"
                            @click="
                                approveRequest(result.id, result.requestedBedId)
                            "
                            >Approve</cv-button
                        >
                        <cv-button
                            kind="danger"
                            @click="deleteRequest(result.id)"
                            >Delete</cv-button
                        >
                    </cv-button-set>
                </cv-data-table-cell>
            </cv-data-table-row>
        </template>
    </cv-data-table>
</template>

<script>
import GenderTag from "../tags/GenderTag.vue";
import BedStatusTag from "../tags/BedStatusTag.vue";

export default {
    name: "RequestsTable",
    data() {
        return {
            allColumns: [
                "ID",
                "Patient Name",
                "Current Hospital",
                "Current Ward",
                "Current Bed",
                "Requested Hospital",
                "Requested Ward",
                "Requested Bed",
                "Request by",
                "Request Made At",
                "Action"
            ]
        };
    },
    components: {
        GenderTag,
        BedStatusTag
    },
    props: {
        requests: {
            type: Array,
            required: true
        },
        allowApprove: {
            type: Boolean,
            default: true
        },
        showRequestedBy: {
            type: Boolean,
            default: true
        },
        showCurrentHospital: {
            type: Boolean,
            default: true
        },
        showRequestedHospital: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        async deleteRequest(id) {
            try {
                const response = await fetch(`/api/transfers/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                if (response.status === 200) {
                    this.getResults();
                } else {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "error",
                        title: "Error Deleting Request",
                        caption: `Request ID: ${requestId} could not be deleted. Please try again later or contact support.`
                    });
                }
            } catch (err) {
                console.error(err);
            }
        },
        async approveRequest(requestId, bedId) {
            try {
                const response = await fetch(`/api/transfers/approve`, {
                    method: "POST",
                    body: JSON.stringify({
                        id: requestId,
                        approvedAt: new Date().toISOString(),
                        approvedBy: this.userDetails.id,
                        bedApproved: bedId
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                if (response.status === 201) {
                    this.getResults();
                } else {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "error",
                        title: "Error Approving Request",
                        caption: `Request ID: ${requestId} could not be approved. Please try again later or contact support.`
                    });
                }
            } catch (err) {
                console.error(err);
            }
        },
        getResults() {
            this.$emit("getResults");
        }
    },
    computed: {
        userDetails() {
            return this.$store.getters.getUserDetails;
        },
        columns() {
            return this.allColumns.filter((column) => {
                if (column === "Current Hospital") {
                    return this.showCurrentHospital;
                }
                if (column === "Requested Hospital") {
                    return this.showRequestedHospital;
                }
                if (column === "Request by") {
                    return this.showRequestedBy;
                }

                return true;
            });
        }
    }
};
</script>

<style scoped>
.bx--btn-set .bx--btn {
    width: 50%;
}
</style>
