<template>
  <div class="pie-chart-container">
    <Pie
      id="my-pie-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: ['UHL', 'Croom', 'Ennis', 'Nenagh', 'Maternity', 'St Johns'],
        datasets: [{
          label: 'Capacity',
          data: [762, 57, 95, 85, 110, 110],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Hospital Capacity Distribution',
            font: {
              size: 18,
              weight: 'bold'
            }
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.pie-chart-container {
  max-width: 600px;
  margin: 0 auto;
}

#my-pie-chart-id {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>
