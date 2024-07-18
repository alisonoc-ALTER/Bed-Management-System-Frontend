<!-- Bar chart in overview for hoispital with the ID no 2 -->
<template>
  <div class="bar-chart-container" v-if="loaded">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChartId2',
  components: { Bar },
  data() {
    return {
      loaded: false,
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
            text: "Hospital no 2" //HardCode or make dynamic
          }
        }
      },
      chartData: {
        labels: ['Free', 'Occupied'],
        datasets: [
          {
            label: 'Bed Status',
            data: [],  
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }
        ]
      },
    };
  },
 
 methods: {
    async countDisabledBeds() {
      try {
        const response = await fetch('/api/beds/statuses?hospital_id=2'); // Adjust hospital_id 
        const data = await response.json();
  
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        
        const disabledCount = data.filter(item => item.disabled).length;
        const enabledCount = data.length - disabledCount; 
  
        this.chartData.datasets[0].data = [enabledCount, disabledCount];
  
        this.loaded = true;

        if (this.chartData.datasets[0].data.length > 0) {
          console.log("Chart data is populated:", this.chartData.datasets[0].data);
        } else {
          console.log("Chart data is empty or not yet populated.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loaded = true;
      }
    },
    
    async fetchHospitalName() {
      try {
        const response = await fetch('/api/hospitals/find?id=2'); 
        const data = await response.json();
        // description not name in api call
        if (data && data.description) {
          this.chartOptions.plugins.title.text = data.description;
        } else {
          throw new Error("Invalid hospital data");
        }
      } catch (error) {
        console.error("Error fetching hospital name:", error);
      }
    }
  },
  
  async mounted() {
   await this.fetchHospitalName();
   await this.countDisabledBeds();
  }
}
</script>
