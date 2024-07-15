<template>
    <div class="container">
        <bar-chart />
        <pie-chart />
    </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart.vue";
import PieChart from '@/components/charts/PieChart.vue';

export default {
    name: "Overview",
    components: {
        BarChart,
        PieChart
    }
};
</script>
 

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

.container {
  display: flex;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background-color: #5b13d6;
}

.bar-chart-container {
  max-width: 800px;
  margin: 0 auto;
}

#my-chart-id {
  background-color: #caee17;
  padding: 20px;
  border-radius: 8px;
}
</style>