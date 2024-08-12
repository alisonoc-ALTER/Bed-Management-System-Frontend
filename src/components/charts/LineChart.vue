<template>
    <div id="chartContainer">
        <LineGraph id="lineGraph" :data="data" :options="options" />
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default {
    name: "LineChart",
    components: {
        LineGraph: Line
    },
    data() {
        return {
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Discharges",
                        backgroundColor: "#f87979",
                        data: [40, 39, 10, 40, 39, 80, 40]
                    },
                    {
                        label: "Availability",
                        backgroundColor: "#0f0",
                        data: [50, 29, 7, 20, 19, 50, 20]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Ward Trend"
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            text: "Date",
                            display: true
                        }
                    }
                }
            }
        };
    },
    methods: {
        getLast7Days() {
            let results = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i - 1);
                results.push(date.toISOString().split("T")[0].slice(5));
            }
            this.data.labels = results.toReversed();
        }
    },
    created() {
        this.getLast7Days();
    }
};
</script>
