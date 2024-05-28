<template>
  <h1 class="text-primary">Testing</h1>
  <div v-for="datas in data" :key="datas.id">
    <h1>{{ datas.nama }}</h1>
    <h2>{{ datas.quantity }}</h2>
    <h3>{{ datas.price }}</h3>
  </div>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const data = ref();
onMounted(async () => {
  try {
    let res = await axios.get("http://localhost:3000/api/getData");
    console.log(res.data.data);
    data.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

