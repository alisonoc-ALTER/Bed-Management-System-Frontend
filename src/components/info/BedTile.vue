<template>
    <cv-tile id="bed">
        <hospital-bed-icon />
        <h1>Bed Info</h1>
        <p>Bed ID: {{ bedInfo.id }}</p>
        <p>Name: {{ bedInfo.description }}</p>
        <p>Room: {{ bedInfo.room?.description || "N/A" }}</p>
        <p>
            Bed Gender:
            <gender-tag :gender="bedInfo.room?.gender || ward.gender" />
        </p>
        <p>
            Status:
            <bed-status-tag
                :disabledReason="bedInfo.disabled_reason || undefined"
            />
        </p>

        <cv-accordion>
            <cv-accordion-item
                :open="true"
                v-if="
                    [1, 2, 4].includes(bedInfo.disabled_reason?.id) ||
                    ((bedInfo.disabled_reason?.id === 1 ||
                        !bedInfo.disabled_reason) &&
                        !patientInfo.id)
                "
            >
                <template slot="title">Actions</template>
                <template slot="content">
                    <cv-button-set>
                        <cv-button
                            @click="enableBed"
                            v-if="
                                bedInfo.disabled_reason?.id === 1 ||
                                bedInfo.disabled_reason?.id === 4
                            "
                            >Mark as Available</cv-button
                        >
                        <cv-button
                            @click="changeStatus(bedInfo.id, 3)"
                            v-if="bedInfo.disabled_reason?.id === 2"
                            >Mark as Checkout Scheduled</cv-button
                        >
                        <cv-button
                            @click="changeStatus(bedInfo.id, 4)"
                            kind="secondary"
                            v-if="
                                (bedInfo.disabled_reason?.id === 1 ||
                                    !bedInfo.disabled_reason) &&
                                !patientInfo.id
                            "
                            >Mark as Out of Order</cv-button
                        >
                    </cv-button-set>
                </template>
            </cv-accordion-item>
            <cv-accordion-item v-if="bedManager">
                <template slot="title">Manage</template>
                <template slot="content">
                    <disabled-reason-select
                        v-if="bedInfo.id"
                        :bedId="bedInfo.id"
                        label="Change Status"
                        @change="reloadPage"
                    />
                </template>
            </cv-accordion-item>
            <cv-accordion-item>
                <template slot="title">QR Code</template>
                <template slot="content">
                    <qrcode id="bedQrCodeUrl" :value="currentRoute" />
                    <cv-button id="qrDownloadButton" @click="downloadQrCode"
                        >Download QR Code</cv-button
                    ></template
                >
            </cv-accordion-item>
        </cv-accordion>
    </cv-tile>
</template>

<script>
import Qrcode from "qrcode.vue";
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import GenderTag from "@/components/tags/GenderTag.vue";
import BedStatusTag from "@/components/tags/BedStatusTag.vue";
import DisabledReasonSelect from "@/components/form_items/DisabledReasonSelect.vue";

export default {
    name: "BedTile",
    components: {
        Qrcode,
        HospitalBedIcon,
        GenderTag,
        BedStatusTag,
        DisabledReasonSelect
    },
    props: {
        bedInfo: Object,
        patientInfo: Object,
        ward: Object,
        currentRoute: String
    },
    computed: {
        bedManager() {
            return this.$store.getters.getUserDetails.can_approve_requests;
        }
    },
    methods: {
        async enableBed() {
            await fetch(`/api/beds/enable/${this.bedInfo.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                }
            });
            this.reloadPage();
        },
        async changeStatus(bedId, reasonId) {
            try {
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
                    this.reloadPage();
                } else {
                    throw new Error("Failed to enable bed");
                }
            } catch (err) {
                this.$store.commit("ADD_NOTIFICATION", {
                    kind: "error",
                    title: "Failed to update bed status",
                    caption: `Failed to update bed ID: ${this.bedInfo.id}`
                });
                console.error(err);
            }
        },
        reloadPage() {
            this.$router.go();
        },
        downloadQrCode() {
            const canvas = document.querySelector("canvas");
            const image = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            const link = document.createElement("a");
            link.href = image;
            link.download = `bed-${this.bedInfo.id}-qr-code.png`;
            link.click();
        }
    }
};
</script>

<style lang="scss" scoped>
#bed {
    .bx--accordion {
        width: 75%;
        margin: auto;
    }
    &.cv-tile {
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
        svg {
            width: 2em;
            height: 2em;
        }
    }
    .cv-button-set {
        display: flex;
    }
    .cv-accordion-item.bx--accordion__item.bx--accordion__item--active
        .bx--accordion__content {
        padding-left: 0px;
        padding-right: 0px;
        margin-left: 0px;
    }
}
</style>
