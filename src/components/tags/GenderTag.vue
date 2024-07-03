<template>
    <cv-tooltip :tip="gender">
        <cv-tag
            :label="getLabel(gender)"
            :kind="getColor(gender)"
            :class="`GenderTag ${contrast ? 'contrast' : ''}`"
        />
    </cv-tooltip>
</template>

<script>
export default {
    name: "GenderTag",
    props: {
        gender: {
            type: String,
            default: "None"
        },
        contrast: {
            type: Boolean,
            default: false
        },
        abbreviated: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getColor(gender) {
            if (gender === "Male") {
                return "cyan";
            } else if (gender === "Female") {
                return "magenta";
            } else if (gender === "All" || "Any") {
                return "green";
            } else {
                return "grey";
            }
        },
        getLabel(gender) {
            if (!this.abbreviated) {
                return gender;
            } else if (gender === "Male") {
                return "M";
            } else if (gender === "Female") {
                return "F";
            } else if (gender === "All") {
                return "M/F";
            } else {
                return "error";
            }
        }
    }
};
</script>

<style lang="scss">
.GenderTag {
    &.bx--tag--magenta {
        background-color: #ff7bff;
        color: #320028;
    }
    &.bx--tag--green {
        background-color: #f7ff00;
        color: #5f5116;
    }
    &.contrast {
        &.bx--tag--magenta {
            background-color: #fff;
            color: #320028;
        }
        &.bx--tag--green {
            background-color: #fff;
            color: #5f5116;
        }
        &.bx--tag--cyan {
            background-color: #fff;
        }
    }
}
</style>
