<template>
    <cv-tile id="busyTimes">
        <Bar
            id="horizontalBarChart"
            :options="chartOptions"
            :data="chartData"
        />
    </cv-tile>
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default {
    name: "BusyTimes",
    components: {
        Bar
    },
    data() {
        return {
            chartData: {
                labels: [
                    "22",
                    "20",
                    "18",
                    "16",
                    "08",
                    "14",
                    "12",
                    "10",
                    "06",
                    "04",
                    "02",
                    "00"
                ],
                datasets: [
                    {
                        label: "Occupied Beds",
                        data: [10, 20, 25, 35, 50, 70, 80, 70, 60, 50, 40, 30],
                        backgroundColor: "rgba(255,0,0,0.75)"
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                horizontal: true,
                indexAxis: "y",
                plugins: {
                    title: {
                        display: true,
                        text: "Busy Times (Average over Past 72h)"
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: true
                    },
                    y: {
                        title: {
                            text: "Time",
                            display: true
                        }
                    }
                }
            }
        };
    }
};
</script>
