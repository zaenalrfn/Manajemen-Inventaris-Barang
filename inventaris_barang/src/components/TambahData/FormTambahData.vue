<template>
  <div>
    <!-- bagian form tambah data -->
    <form @submit.prevent="handleSubmit()">
      <div class="flex align-items-center gap-3 mb-3">
        <label for="nama" class="font-semibold w-6rem">Nama</label>
        <InputText
          id="nama"
          class="flex-auto"
          autocomplete="off"
          v-model="barang.nama"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="quantity" class="font-semibold w-6rem">Quantity</label>
        <InputText
          id="quantity"
          class="flex-auto"
          autocomplete="off"
          v-model="barang.quantity"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="price" class="font-semibold w-6rem">Price</label>
        <InputText
          id="price"
          class="flex-auto"
          autocomplete="off"
          v-model="barang.price"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <ButtonVue
          type="button"
          label="Cancel"
          severity="secondary"
          @click="$emit('dialog')"
        ></ButtonVue>
        <ButtonVue type="submit" label="tambah" @submit="show()"></ButtonVue>
      </div>
    </form>

    <Toast />
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const toast = useToast();

const emit = defineEmits(["dialog"]);

// bagian untuk menyimpan data dari input user
const barang = reactive({
  nama: "",
  quantity: "",
  price: "",
});

const show = () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Message Content",
    life: 3000,
  });
};

// bagian fungsi untuk menghandle tambah data
const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:3000/api/tambahBarang", {
      nama: barang.nama,
      quantity: barang.quantity,
      price: barang.price,
    });
  } catch (error) {
    console.log(error);
  }
  emit("dialog");
};
</script>