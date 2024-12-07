
<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button icon="pi pi-plus" class="mr-2" severity="secondary" text  @click="isDialogVisible = true"/>
        <Button icon="pi pi-cog" class="mr-2" severity="secondary" text />
      </template>
    </Toolbar>
  </div>

  <Dialog header="Добавить датчик" v-model:visible="isDialogVisible" style="width: 50rem">
    <div class="flex flex-wrap justify-around">
      <part-card class="hover:bg-zinc-800 cursor-pointer" @click="choosePart(p.id)" v-for="p in parts" :key="p.id" :name="p.name" :sensors="p.sensors"></part-card>
    </div>

  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import PartCard from "./partCard.vue";
import {parts} from "../api/serverMock.js";
import { useSensorStore } from "../stores/partStore.js";

const sensorStore = useSensorStore()
const isDialogVisible = ref(false)

const choosePart = (id) => {
  isDialogVisible.value = false
  sensorStore.chooseMode = true
  sensorStore.chosenId = id
}
</script>
