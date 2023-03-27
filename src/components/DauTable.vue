<template>
  <div>
    <card>
      <template #title>Daily Active Users Table</template>
      <template #content>
        <data-table sortField="month" :sortOrder="-1" :value="data" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <column sortable field="month" header="Month" style="width: 33%"></column>
            <column sortable field="country" header="Country" style="width: 33%">
                <template #body="slotProps">
                    {{ getCountryName(slotProps.data.country) }}
                </template>
            </column>
            <column sortable field="count" header="Daily Activity User" style="width: 33%"></column>
        </data-table>
      </template>
    </card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { repairJSON } from '../utils/jsonUtils';
import { getCountryName } from '../utils/countries'

import axios from "axios"

export default {
  name: 'DauTable',
  components: {
    Card,
    DataTable,
    Column,
  },
  setup() {
    const data = ref([])

    const fetchItems = async () => {
        axios
            .get("https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country")
            .then((response) => {
                const { items } = repairJSON(response.data);

                data.value = items.map((item, iItem) => ({
                    month: new Date(item.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.date).getFullYear(),
                    country: item.country,
                    count: item.count,
                    item: iItem,
                }))
                console.log(data.value)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    onMounted(fetchItems)

    return {
      getCountryName,
      data
    }
  }
}
</script>
