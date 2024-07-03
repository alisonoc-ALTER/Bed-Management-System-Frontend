<template>
    <cv-select v-if="bedStatus?.reason" @change="setStatus" :label="label">
        <cv-select-option selected>
            {{ bedStatus.reason }}
        </cv-select-option>
        <cv-select-option
            v-for="disabledReason in disabledReasons"
            :key="disabledReason.id"
            :value="disabledReason.id"
        >
            {{ disabledReason.reason }}
        </cv-select-option>
    </cv-select>
</template>

<script>
import BedStatusTag from "../tags/BedStatusTag.vue";

export default {
    name: "DisabledReasonSelect",
    props: {
        bedId: {
            type: Number,
            required: true
        },
        label: {
            type: String,
            default: "Status"
        }
    },
    data() {
        return {
            bedStatus: undefined
        };
    },
    components: {
        BedStatusTag
    },
    computed: {
        disabledReasons() {
            return [
                {
                    id: 0,
                    reason: "Available"
                }
            ]
                .concat(this.$store.getters.getDisabledReasons)
                .filter((reason) => {
                    return reason.id !== this.bedStatus.id;
                });
        }
    },
    methods: {
        async setStatus(statusId) {
            try {
                if (statusId === "0") {
                    await this.enableBed(this.bedId);
                } else {
                    await this.disabledBed(this.bedId, statusId);
                }
                this.$emit("change", statusId);
            } catch (err) {
                this.$store.commit("ADD_NOTIFICATION", {
                    kind: "error",
                    title: "Failed to update bed status",
                    caption: `Failed to update bed ID: ${this.bedId}`
                });
                console.error(err);
            }
        },
        async enableBed(bedId) {
            const response = await fetch(`/api/beds/enable/${bedId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                }
            });
            if (response.ok) {
                console.info("Bed enabled successfully id: " + bedId);
                this.getBedStatus(bedId);
            } else {
                throw new Error("Failed to enable bed");
            }
        },
        async disabledBed(bedId, reasonId) {
            const response = await fetch(
                `/api/beds/disable/${bedId}?reason_id=${reasonId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                }
            );
            if (response.ok) {
                console.info("Bed disabled successfully id: " + bedId);
                this.getBedStatus(bedId);
            } else {
                throw new Error("Failed to enable bed");
            }
        },
        async getBedStatus(bedId) {
            try {
                const response = await fetch(`/api/beds/find/${bedId}/status`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedStatus = await response.json();
                return bedStatus;
            } catch (err) {
                console.error(err);
            }
        }
    },
    async mounted() {
        const bedStatus = await this.getBedStatus(this.bedId);
        this.bedStatus = bedStatus?.disabled_reason || {
            id: 0,
            reason: "Available"
        };
    }
};
</script>
