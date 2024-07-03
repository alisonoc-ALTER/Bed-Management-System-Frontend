<template>
    <div id="searchTable">
        <cv-search @input="handleSearch"></cv-search>
        <cv-data-table
            class="wardTable"
            :columns="columns"
            :zebra="true"
            v-for="beds in filteredResults"
            :key="beds[0].ward_id"
            :title="`${beds[0].ward} Ward Beds`"
        >
            <template slot="data">
                <cv-data-table-row v-for="result in beds" :key="result.id">
                    <cv-data-table-cell>
                        <cv-tooltip :tip="`Bed ID: ${result.bedId}`">
                            {{ result.bedDescription }}
                        </cv-tooltip>
                    </cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.roomDescription
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <bed-status-tag
                            :disabledReason="
                                result.disabled_reason || undefined
                            "
                        />
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-tooltip :tip="`Patient ID: ${result.patientId}`">
                            {{ result.patientName }}
                        </cv-tooltip>
                    </cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.dateOfBirth
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <gender-tag
                            v-if="result.patientGender"
                            :gender="result.patientGender"
                        />
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button @click="openBed(result.bedId)"
                            >View Bed</cv-button
                        >
                        <cv-button
                            kind="secondary"
                            :disabled="result.disabled_reason?.id !== 2"
                            @click="openTransfer(result.bedId)"
                            >Transfer</cv-button
                        >
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
    </div>
</template>

<script>
import GenderTag from "./tags/GenderTag.vue";
import BedStatusTag from "./tags/BedStatusTag.vue";

export default {
    name: "SearchTable",
    data() {
        return {
            searchQuery: "",
            columns: [
                "Bed Name",
                "Room Name",
                "Bed Status",
                "Patient Name",
                "Date of Birth",
                "Gender",
                "Actions"
            ]
        };
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    components: {
        GenderTag,
        BedStatusTag
    },
    computed: {
        filteredResults() {
            let data = this.data;
            if (this.searchQuery) {
                data = data.filter((result) => {
                    return Object.values(result).some((value) => {
                        if (value === null || value === undefined) {
                            return false;
                        }
                        return value
                            .toString()
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase());
                    });
                });
            }

            data = data.sort((a, b) => {
                if (
                    a.disabled_reason?.reason === "Occupied" &&
                    b.disabled_reason?.reason !== "Occupied"
                ) {
                    return -1;
                } else if (
                    a.disabled_reason?.reason !== "Occupied" &&
                    b.disabled_reason?.reason === "Occupied"
                ) {
                    return 1;
                } else {
                    return 0;
                }
            });

            let wardsArray = [];
            data.forEach((result) => {
                let wardIndex = wardsArray.findIndex(
                    (ward) => ward[0].wardId === result.wardId
                );
                if (wardIndex === -1) {
                    wardsArray.push([result]);
                } else {
                    wardsArray[wardIndex].push(result);
                }
            });
            return wardsArray;
        }
    },
    methods: {
        handleSearch(value) {
            this.searchQuery = value;
        },
        openBed(bedId) {
            this.$router.push(`/bed/${bedId}`);
        },
        openTransfer(bedId) {
            this.$router.push(`/transfer/${bedId}`);
        }
    }
};
</script>

<style lang="scss">
#searchTable {
    .cv-data-table.wardTable .bx--data-table-container .bx--data-table-header {
        padding: 0.3rem 0 0.4rem 1rem;
    }
}
</style>
