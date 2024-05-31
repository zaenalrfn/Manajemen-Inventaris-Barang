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
          required="true"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="quantity" class="font-semibold w-6rem">Quantity</label>
        <InputText
          id="quantity"
          class="flex-auto"
          autocomplete="off"
          required="true"
          v-model="barang.quantity"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="price" class="font-semibold w-6rem">Price</label>
        <InputText
          id="price"
          class="flex-auto"
          autocomplete="off"
          required="true"
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
import Swal from "sweetalert2";
import { reactive } from "vue";
import { onMounted } from "vue";

const emit = defineEmits(["dialog"]);
const props = defineProps({
  paramsId: {
    type: Number,
    required: true,
  },
  edit: {
    type: Boolean,
    required: true,
  },
});

// bagian untuk menyimpan data dari input user
const barang = reactive({
  nama: "",
  quantity: "",
  price: "",
});
let barangT = JSON.parse(localStorage.getItem("data-barang-terakhir")) || [];
const barangTerakhir = (nama, quantity, price) => {
  let dataTerakhir = {
    nama: nama,
    quantity: quantity,
    price: price,
  };
  barangT.push(dataTerakhir);
  localStorage.setItem("data-barang-terakhir", JSON.stringify(barangT));
};

// bagian load barang yang mau diupdate
const loadBarang = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/getData/${id}`);
    const data = response.data.data;
    for (let d of data) {
      barang.nama = d.nama;
      barang.quantity = d.quantity;
      barang.price = d.price;
    }
  } catch (error) {
    console.log(error);
  }
};

// bagian fungsi untuk menghandle tambah data
const handleSubmit = async () => {
  try {
    if (props.edit) {
      await axios.put(
        `http://localhost:3000/api/editBarang/${props.paramsId}`,
        {
          nama: barang.nama,
          quantity: barang.quantity,
          price: barang.price,
        }
      );
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      toast
        .fire({
          icon: "success",
          title: `Barang dengan id ${props.paramsId} diedit`,
        })
        .then((result) => {
          // Kondisi untuk reload halaman setelah 3000ms (3 detik)
          if (result.dismiss === Swal.DismissReason.timer) {
            location.reload();
          }
        });
    } else {
      await axios.post("http://localhost:3000/api/tambahBarang", {
        nama: barang.nama,
        quantity: barang.quantity,
        price: barang.price,
      });
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      toast
        .fire({
          icon: "success",
          title: "Berhasil menambahkan barang",
        })
        .then((result) => {
          barangTerakhir(barang.nama, barang.quantity, barang.price);
          // Kondisi untuk reload halaman setelah 3000ms (3 detik)
          if (result.dismiss === Swal.DismissReason.timer) {
            location.reload();
          }
        });
    }
    emit("dialog");
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  if (props.edit) {
    loadBarang(props.paramsId);
  }
});
</script>