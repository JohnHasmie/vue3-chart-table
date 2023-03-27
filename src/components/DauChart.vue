<!-- Chart.vue -->
<template>
  <div>
    <card>
      <template #title>Daily Active Users per Month Chart</template>
      <template #content> 
        <vue-apex-charts type="bar" :options="chartOptions" :series="chartSeries" height="400" />
      </template>
    </card>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue"
import Card from 'primevue/card';
import VueApexCharts from 'vue3-apexcharts'

import { repairJSON } from '../utils/jsonUtils';
import { getCountryName } from '../utils/countries'

import axios from "axios"

export default defineComponent({
  name: "DauChart",
  components: {
    Card,
    VueApexCharts,
  },
  setup() {
    const chartSeries = ref([{ name: '', data: [] }]);
    const chartOptions = ref({
      chart: {
        height: 400,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: function (val) {
            const date = new Date(val);
            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
          },
        },
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: 'DAILY ACTIVITY USER',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return val + ' Daily Active Users';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -20,
      },
    });

    watchEffect(() => {
      axios
        .get("https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country")
        .then((response) => {
          const { items } = repairJSON(response.data);
          const categories = [];
          const series = [];

          // group items by country
          const groupedByCountry = items.reduce((result, item) => {
            const { country, count, date } = item;

            if (!result[country]) {
              result[country] = {
                data: [],
              };
            }

            result[country].data.push(count);
            categories.push(date);
            return result;
          }, {});

          // create chart series for each country
          for (const [country, data] of Object.entries(groupedByCountry)) {
            series.push({
              name: getCountryName(country),
              data: data.data,
            });
          }

          chartSeries.value = series;
          chartOptions.value = {
            ...chartOptions.value,
            ...{
              xaxis: {
                categories: [...new Set(categories)],
                labels: {
                  formatter: function (val) {
                    const date = new Date(val);
                    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
                  },
                },
                title: {
                  text: "Month",
                },
              },
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      chartOptions,
      chartSeries,
    };
  },
});
</script>
