<style>
.tabel {
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  border-radius: 10px;
}
.tabel .table {
  border-radius: inherit;
}
</style>
<template>
  <div>
    <h2>Data Barang</h2>
    <!-- bagian filter dan searc -->
    <div class="flex justify-content-between">
      <div class="flex gap-2 mb-2">
        <InputText
          id="search"
          class="flex-auto"
          autocomplete="off"
          required="true"
          placeholder="cari data"
          v-model="searchData"
          @keyup.enter="handleSearch"
          @keyup.esc="handleReset"
          @keyup.delete="handleRemoveSearch"
        />
        <ButtonVue label="Cari" @click="handleSearch" />
      </div>
    </div>
    <!-- bagian tabel data -->
    <div class="card">
      <DataTable
        class="tabel shadow-2"
        :value="barangFilter()"
        stripedRows
        tableStyle="width: 100%;"
      >
        <Column field="id" header="ID"></Column>
        <Column field="nama" sortable header="NAMA"></Column>
        <Column field="quantity" header="QUANTITY"></Column>
        <Column field="price" header="PRICE"></Column>
        <Column header="AKSI">
          <template #body="slotProps">
            <div class="flex gap-2">
              <button
                @click="editBarang(slotProps.data.id)"
                class="bg-yellow-400 border-none p-2 text-white border-round cursor-pointer"
              >
                Edit
              </button>
              <button
                @click="hapusBarang(slotProps.data.id)"
                class="bg-red-500 border-none p-2 text-white border-round cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- bagian pagination -->
    <div class="card mt-2">
      <Paginator
        v-model:first="first"
        :rows="10"
        :totalRecords="total"
        @page="pageNext"
      />
    </div>
  </div>

  <!-- bagian dialog -->
  <div class="card flex justify-content-center">
    <DialogVue
      v-model:visible="dialogOpen"
      modal
      header="Edit data barang"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">Masukkan data barang</span>
      <FormTambahData @dialog="closeDialog()" :paramsId="param" :edit="edit" />
    </DialogVue>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted, ref } from "vue";
import axios from "axios";
import Paginator from "primevue/paginator";
import FormTambahData from "../components/TambahData/FormTambahData.vue";
import Swal from "sweetalert2";

// import { ProductService } from "@/service/ProductService";

const semuaBarang = ref([]);
const dialogOpen = ref(false);
const total = ref(0);
const edit = ref(false);
const param = ref(0);
const searchData = ref("");
const searcing = ref(false);

const pageNext = (e) => {
  Barang(e.page + 1);
};

const editBarang = (paramsId) => {
  dialogOpen.value = true;
  edit.value = true;
  param.value = paramsId;
};

const handleSearch = () => {
  searcing.value = true;
  Barang(1);
};
const handleReset = () => {
  searchData.value = "";
  searcing.value = false;
  Barang(1);
};
const handleRemoveSearch = () => {
  searcing.value = false;
  Barang(1);
};
const barangFilter = () => {
  if (!searcing.value) {
    return semuaBarang.value;
  }
  return semuaBarang.value.filter((data) =>
    data.nama.match(new RegExp(searchData.value, "i"))
  );
};

const hapusBarang = (id) => {
  Swal.fire({
    title: "Apa kamu yakin?",
    text: "Anda tidak akan dapat mengembalikan ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Hapus",
    cancelButtonText: "Tidak",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/hapusBarang/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Barang berhasil dihapus",
          icon: "success",
        }).then(() => {
          location.reload();
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Barang gagal dihapus",
          icon: "error",
        });
      }
    }
  });
};

const closeDialog = () => {
  dialogOpen.value = false;
};

const Barang = async (page = 1) => {
  try {
    if (searcing.value) {
      const responseAll = await axios.get(
        "http://localhost:3000/api/getAllData"
      );
      semuaBarang.value = responseAll.data.data;
      total.value = responseAll.data.total;
      console.log("true");
    } else {
      const response = await axios.get(
        `http://localhost:3000/api/getData?page=${page}&limit=${10}`
      );
      semuaBarang.value = response.data.data;
      total.value = response.data.pagination.total;
      console.log("false");
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  Barang();
});
</script>