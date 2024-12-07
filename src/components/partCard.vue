<script setup>
const {
  id,
  name,
  sensors
} = defineProps(['id','name', 'sensors'])
import {useSensorStore} from "../stores/partStore.js";

const sensorStore = useSensorStore()


</script>

<template>
  <div class="flex flex-col gap-1 w-64 rounded-2xl p-4 border-white">
    <div class="flex justify-between items-center">
      <span class="text-xl font-bold">{{name}}</span>
      <Button v-if="id" severity="secondary" text icon="pi pi-times" rounded size="sm" @click="sensorStore.deleteChosen(id)"/>
    </div>

    <div class="flex flex-col gap-0.5">
      <div class="flex justify-between" v-for="s in sensors" :key="s.id">
        <span>{{ s.name }}:</span>
        <span>{{`${s.value} ${s.units}`}}</span>
      </div>
    </div>
  </div>
</template>
