<template>
  <div class="container">
    <div class="bar-chart-container">
      <BarChart />
    </div>
    <div class="bar-chart-container2">
      <BarChartId2/>
    </div>
    <div class="bar-chart-container3">
      <BarChartId3/>
    </div>
    <div class="bar-chart-container3">
      <BarChartId4/>
    </div>
    <div class="bar-chart-container3">
      <BarChartId5/>
    </div>
    <div class="bar-chart-container3">
      <BarChartId6/>
    </div>
    <div class="pie-chart-container">
      <PieChart />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import BarChartId2 from "@/components/charts/BarChartId2.vue";
import BarChartId3 from "@/components/charts/BarChartId3.vue";
import BarChartId4 from "@/components/charts/BarChartId4.vue";
import BarChartId5 from "@/components/charts/BarChartId5.vue";
import BarChartId6 from "@/components/charts/BarChartId6.vue";

export default {
  name: "Overview",
  components: {
    BarChart,
    PieChart,
    BarChartId2,
    BarChartId3,
    BarChartId4,
    BarChartId5,
    BarChartId6
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");


.container {
  display: grid;
  grid-template-columns: repeat(3,1fr); 
  gap: 20px;
  font-family: "Roboto", sans-serif;
  padding: 30px;
  // background-color: #5b13d6;
}

.pie-chart-container
 {
  background-color: #ffffff;
  flex: 1;
  max-width: 400px; 
  margin: 0 20px;
  padding: 20px;
}

.bar-chart-container
{
  background-color: #ffffff;
  flex: 1;
  max-width: 450px;
  min-height: 200px; 
  margin: 0 20px;
  border-radius: 8px;
  
}

.my-chart-id {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  
}

</style>
