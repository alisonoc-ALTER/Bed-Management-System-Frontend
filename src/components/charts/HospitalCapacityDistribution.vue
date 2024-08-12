<template>
    <Pie v-if="dataAvailable" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Pie } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Colors
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, Colors);

export default {
    name: "HospitalCapacityDistribution",
    components: { Pie },
    props: {
        hospitals: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dataAvailable: false,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Capacity",
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top"
                    },
                    colors: {
                        enabled: true
                    },
                    datalabels: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: "Hospital Capacity Distribution",
                        font: {
                            size: 18,
                            weight: "bold"
                        }
                    }
                }
            }
        };
    },
    methods: {
        async getHospitalCapacity(hospitalId) {
            try {
                const response = await fetch(
                    `/api/beds/total?hospital_id=${hospitalId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const size = await response.json();
                return size;
            } catch (err) {
                console.error(err);
            }
        },
        async getChartData() {
            const data = this.hospitals.map(async (hospital) => {
                return this.getHospitalCapacity(hospital.id);
            });
            const hospitalSizes = await Promise.all(data);

            this.chartData.labels = this.hospitalNames;
            this.chartData.datasets[0].data = hospitalSizes;
            this.dataAvailable = true;
        }
    },
    computed: {
        hospitalNames() {
            return this.hospitals.map((hospital) => hospital.description);
        }
    },
    mounted() {
        this.getChartData();
    }
};
</script>
