<template>
  <div>
    <!-- bagian side bar -->
    <div class="main-content">
      <div
        class="dashboard-informasi flex md:flex-row flex-column w-full gap-2"
      >
        <div
          class="bg-primary md:w-full flex align-items-center justify-content-between pt-2 pb-2 pr-4 pl-4 border-round shadow-5 relative overflow-hidden"
        >
          <div>
            <span class="text-xl">Total barang</span>
            <h1 class="text-6xl font-bold -mt-1">{{ totalBarang }}</h1>
          </div>
          <div
            class="flex gap-3 align-items-center absolute"
            style="right: 20px"
          >
            <h1 class="pi pi-box opacity-70" style="font-size: 10rem"></h1>
          </div>
        </div>
      </div>

      <!-- bagian tabel data -->
      <div class="card mt-5">
        <DataTable :value="dataTerakhir" stripedRows tableStyle="width: 100%;">
          <Column field="nama" header="NAMA"></Column>
          <Column field="quantity" header="QUANTITY"></Column>
          <Column field="price" header="PRICE"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted, ref } from "vue";

const totalBarang = ref(0);
const dataTerakhir = ref([]);

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/api/getData");
  totalBarang.value = response.data.pagination.total;
  const data = JSON.parse(localStorage.getItem("data-barang-terakhir"));
  dataTerakhir.value = data;
  if (dataTerakhir.value.length == 5) {
    dataTerakhir.value.pop();
  }
});
</script>