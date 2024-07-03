<template>
    <div id="approvedRequestsTable">
        <cv-data-table
            :title="`Approved Transfer Requests`"
            :columns="columns"
            :zebra="true"
        >
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in requests"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-tooltip :tip="`Patient ID: ${result.patientId}`">
                            {{ result.patientName }}
                        </cv-tooltip>

                        <gender-tag
                            :gender="result.patientGender"
                            :abbreviated="true"
                    /></cv-data-table-cell>
                    <cv-data-table-cell v-if="showPreviousHospital">{{
                        result.hospital
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.currentWard
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-tooltip :tip="`Bed ID: ${result.currentBedId}`">
                            {{ result.currentBed }}
                        </cv-tooltip>
                    </cv-data-table-cell>
                    <cv-data-table-cell v-if="showApprovedHospital">{{
                        result.requestedHospital
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.requestedWard
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-tooltip :tip="`Bed ID: ${result.requestedBedId}`">
                            {{ result.requestedBed }}
                        </cv-tooltip></cv-data-table-cell
                    >
                    <cv-data-table-cell v-if="showRequestedBy">{{
                        result.requestBy
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.requestTime
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        {{ result.approvedBy }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        {{ result.approvedTime }}
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
    </div>
</template>

<script>
import GenderTag from "../tags/GenderTag.vue";

export default {
    name: "ApprovedRequestsTable",
    components: {
        GenderTag
    },
    data() {
        return {
            allColumns: [
                "ID",
                "Patient Name",
                "Previous Hospital",
                "Previous Ward",
                "Previous Bed",
                "Approved Hospital",
                "Approved Ward",
                "Approved Bed",
                "Request by",
                "Request Made At",
                "Approved By",
                "Approved At"
            ]
        };
    },
    props: {
        requests: {
            type: Array,
            required: true
        },
        showRequestedBy: {
            type: Boolean,
            default: true
        },
        showApprovedHospital: {
            type: Boolean,
            default: false
        },
        showPreviousHospital: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        columns() {
            return this.allColumns.filter((column) => {
                if (column === "Request by") {
                    return this.showRequestedBy;
                } else if (column === "Approved Hospital") {
                    return this.showApprovedHospital;
                } else if (column === "Previous Hospital") {
                    return this.showPreviousHospital;
                }
                return true;
            });
        }
    }
};
</script>
