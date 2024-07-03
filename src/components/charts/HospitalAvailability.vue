<template>
    <cv-tile id="hospitalAvailability">
        <Pie
            v-if="dataAvailable"
            :options="chartOptions"
            :data="chartData"
            :id="chartId"
        />
    </cv-tile>
</template>

<script>
import { Pie } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    name: "PieChart",
    components: {
        Pie
    },
    data() {
        return {
            chartId: "Total Availability",
            chartData: {
                labels: [""],
                datasets: [
                    {
                        backgroundColor: [""],
                        data: []
                    }
                ]
            },
            chartOptions: {
                animation: false,
                transitions: {
                    active: {
                        animation: {
                            duration: 0
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Hospital Availability"
                    }
                }
            }
        };
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        dataAvailable() {
            return this.chartData.datasets[0].data.some((value) => value > 0);
        },
        disabledReasons() {
            return [
                { id: 0, name: "Available", color: "rgba(0,255,0,0.75)" }
            ].concat(
                this.$store.getters.getDisabledReasons.map((reason) => {
                    let color = "rgba(0,0,0,0.75)";
                    if (reason.id === 1) color = "rgba(255,255,0,0.75)";
                    else if (reason.id === 2) color = "rgba(255,0,0,0.75)";
                    else if (reason.id === 3) color = "rgba(0,255,255,0.75)";
                    else if (reason.id === 4) color = "rgba(155,155,155,0.75)";
                    return {
                        id: reason.id,
                        name: reason.reason,
                        color: color
                    };
                })
            );
        },
        disabledReasonNames() {
            return this.disabledReasons.map((reason) => reason.name);
        },
        disabledReasonColors() {
            return this.disabledReasons.map((reason) => reason.color);
        }
    },
    methods: {
        async fetchWardBeds() {
            try {
                const bedsDataResults = await this.fetchBedStatuses(
                    this.selectedHospital.id
                );
                if (
                    this.chartData.datasets[0].data.join("") !==
                    bedsDataResults.join("")
                ) {
                    this.chartData.datasets[0].data = [[]];
                    await new Promise((resolve) => setTimeout(resolve, 1));
                    this.chartData.datasets[0].data = bedsDataResults;
                }
            } catch (err) {
                console.error(err);
            }
        },
        async fetchBedStatuses(hospitalId) {
            try {
                const response = await fetch(
                    `/api/beds/statuses?hospital_id=${hospitalId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const beds = await response.json();
                let counts = [0];
                beds.map((bed) => {
                    if (!bed.disabled) {
                        counts[0]++;
                    } else if (counts[bed.disabled_reason.id]) {
                        counts[bed.disabled_reason.id]++;
                    } else {
                        counts[bed.disabled_reason.id] = 1;
                    }
                });
                return counts;
            } catch (err) {
                console.error(err);
                return [0, 0, 0];
            }
        }
    },
    props: {
        update: {
            type: Number,
            required: false
        }
    },
    watch: {
        selectedHospital() {
            this.fetchWardBeds();
        },
        update() {
            this.fetchWardBeds();
        }
    },
    mounted() {
        this.chartData.labels = this.disabledReasonNames;
        this.chartData.datasets[0].backgroundColor = this.disabledReasonColors;
        this.fetchWardBeds();
    }
};
</script>
