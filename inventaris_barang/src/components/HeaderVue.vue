<template>
  <div class="card">
    <Sidebar v-model:visible="visible" header="MIB">
      <Menu :model="items" />
    </Sidebar>
    <Button
      class="pi pi-arrow-right text-primary p-2 border-none bg-primary border-round"
      @click="visible = true"
    />
  </div>

  <!-- bagian dialog -->
  <div class="card flex justify-content-center">
    <DialogVue
      v-model:visible="dialogOpen"
      modal
      header="Tambah Data Barang"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">Masukkan data barang</span>
      <FormTambahData @dialog="closeDialog()" />
    </DialogVue>
  </div>
</template>

<script setup>
import Menu from "primevue/menu";
import Sidebar from "primevue/sidebar";
import FormTambahData from "../components/TambahData/FormTambahData.vue";
import { ref } from "vue";

const visible = ref(false);
const dialogOpen = ref(false);

const items = ref([
  { label: "Inventaris Barang", icon: "pi pi-home" },
  {
    label: "Tambah Data Barang",
    icon: "pi pi-plus",
    command: () => {
      dialogOpen.value = true;
    },
  },
  { label: "Lihat Data Barang", icon: "pi pi-table" },
]);

const closeDialog = () => {
  dialogOpen.value = false;
};
</script>