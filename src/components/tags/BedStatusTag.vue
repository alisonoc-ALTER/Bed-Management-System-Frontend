<template>
    <cv-tag
        :label="disabledReasonObject.reason || 'Available'"
        :class="`BedStatusTag ${getColor(disabledReasonObject.id)}`"
    />
</template>

<script>
export default {
    name: "BedStatusTag",
    props: {
        bed_id: {
            type: Number,
            required: false
        },
        disabledReason: {
            type: Object,
            default: () => {
                return {
                    id: 0,
                    reason: "Available"
                };
            }
        }
    },
    data() {
        return {
            disabledReasonObject: {}
        };
    },
    methods: {
        async getBedStatus(bedId) {
            try {
                const response = await fetch(`/api/beds/find/${bedId}/status`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedStatus = await response.json();
                this.disabledReasonObject = bedStatus.disabledReason || {
                    id: 0,
                    reason: "Available"
                };
                return bedStatus;
            } catch (err) {
                console.error(err);
            }
        },
        getColor(disabled_reason_id) {
            const id = disabled_reason_id;
            if (id === 0) {
                return "green";
            } else if (id === 1) {
                return "yellow";
            } else if (id === 2) {
                return "red";
            } else if (id === 3) {
                return "cyan";
            } else {
                return "grey";
            }
        },
        setInfo() {
            if (this.bed_id) {
                this.getBedStatus(this.bed_id);
            } else {
                this.disabledReasonObject = this.disabledReason;
            }
        }
    },
    watch: {
        bed_id() {
            this.setInfo();
        },
        disabledReason() {
            this.setInfo();
        }
    },
    async mounted() {
        this.setInfo();
    }
};
</script>

<style lang="scss">
.BedStatusTag {
    &.red {
        background-color: #ffd7d9;
        color: #750e13;
    }
    &.green {
        background-color: #a7f0ba;
        color: #044317;
    }
    &.cyan {
        background-color: #d0e2ff;
        color: #002d9c;
    }
    &.yellow {
        background-color: #ffff00;
        color: #584708;
    }
    &.grey {
        background-color: #e0e0e0;
        color: #393939;
    }
}
</style>
