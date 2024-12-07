
<template>
  <div class="flex flex-col m-2 gap-2 h-full">
    <Navbar/>
    <part-layer/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PartCard from "./components/partCard.vue";
import {parts} from "./api/serverMock.js";
import { useSensorStore } from "./stores/partStore.js";
import Navbar from "./components/navbar.vue";
import PartLayer from "./components/partLayer.vue";

const sensorStore = useSensorStore()
const isDialogVisible = ref(false)

const choosePart = (id) => {
  isDialogVisible.value = false
  sensorStore.chosenParts.push(id)
}
</script>
