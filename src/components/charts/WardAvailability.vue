<template>
    <cv-tile id="wardAvailability">
        <Bar
            v-if="dataAvailable"
            id="stackedBarChart"
            :options="chartOptions"
            :data="chartData"
        />
    </cv-tile>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: "WardAvailability",
    components: { Bar },
    data() {
        return {
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
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Ward Availability"
                    }
                }
            },
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Occupied Beds",
                        data: [],
                        backgroundColor: "rgba(255,0,0,0.75)"
                    },
                    {
                        label: "Cleaning Required",
                        data: [],
                        backgroundColor: "rgba(255,255,0,0.75)"
                    },
                    {
                        label: "Available Beds",
                        data: [],
                        backgroundColor: "rgba(0,255,0, 0.75)"
                    }
                ]
            }
        };
    },
    methods: {
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.$store.getters.getSelectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                this.chartData.datasets = this.disabledReasons.map((reason) => {
                    return {
                        label: reason.name,
                        data: [],
                        backgroundColor: reason.color
                    };
                });
                this.chartData.labels = wards.map((ward) => ward.description);
                const bedsDataPromises = wards.map((ward) =>
                    this.getBeds(ward.id)
                );
                const bedsDataResults = await Promise.all(bedsDataPromises);
                bedsDataResults.forEach((bedsData) => {
                    bedsData.forEach((beds, index) => {
                        this.chartData.datasets[index].data.push(beds);
                    });
                });
            } catch (err) {
                console.error(err);
            }
        },

        async getBeds(wardId) {
            try {
                const response = await fetch(
                    `/api/beds/statuses?ward_id=${wardId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const beds = await response.json();

                if (beds.length !== 0) {
                    const returnArray = [];
                    const available = beds.filter(
                        (bed) => !bed.disabled
                    ).length;
                    returnArray.push(available);
                    this.disabledReasons.forEach((reason) => {
                        if (reason.id === 0) return;
                        returnArray.push(
                            beds.filter(
                                (bed) => bed.disabled_reason?.id === reason.id
                            ).length
                        );
                    });
                    return returnArray;
                } else {
                    return [0, 0, 0];
                }
            } catch (err) {
                console.error(err);
            }
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        dataAvailable() {
            return (
                this.chartData.datasets[0].data.length ===
                    this.chartData.labels.length &&
                this.chartData.datasets[1].data.length ===
                    this.chartData.labels.length &&
                this.chartData.datasets[2].data.length ===
                    this.chartData.labels.length
            );
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
            this.getWards();
        },
        update() {
            this.getWards();
        }
    },
    mounted() {
        this.getWards();
    }
};
</script>
