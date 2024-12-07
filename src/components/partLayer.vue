<script setup>
import PartCard from './partCard.vue'
import { useSensorStore } from '../stores/partStore.js'
import { computed, ref, watch } from 'vue'

const sensorStore = useSensorStore()

const chosenParts = computed(() => {
	const parts = []
	sensorStore.chosenParts.forEach(p => {
		parts.push({
			id: p.id,
			part: sensorStore.getPartById(p.part),
			top: p.top,
			left: p.left,
			pointX: p.pointX,
			pointY: p.pointY,
		})
	})
	return parts
})

const startX = ref(0)
const startY = ref(0)
const canvas = ref()

const dragstart = e => {
	startY.value = e.clientY
	startX.value = e.clientX
}
const dragend = (id, e) => {
	e.preventDefault()
	sensorStore.dragend(id, e.clientX - startX.value, e.clientY - startY.value)
}

const addChosen = e => {
	if (sensorStore.chooseMode) {
		sensorStore.chooseMode = false
		sensorStore.chosenParts.push({
      id: Date.now(),
			part: sensorStore.chosenId,
			top: (e.clientY - canvas.value?.getBoundingClientRect().top) / canvas.value?.getBoundingClientRect().height * 100,
			left: (e.clientX - canvas.value?.getBoundingClientRect().left) / canvas.value?.getBoundingClientRect().width * 100,
      pointX: (e.clientX - canvas.value?.getBoundingClientRect().left) / canvas.value?.getBoundingClientRect().width * 100,
			pointY: (e.clientY - canvas.value?.getBoundingClientRect().top) / canvas.value?.getBoundingClientRect().height * 100
		})
	}
}
</script>

<template>
	<svg
		ref="canvas"
		class="flex w-full gap-2 image"
		style="height: 88vh"
		@click="addChosen"
	>
		<line
			v-for="p in chosenParts"
			:key="p?.part.id"
			:x1="`${p.pointX}%`"
			:y1="`${p.pointY}%`"
			:x2="`${p.left}%`"
			:y2="`${p.top}%`"
			stroke="white"
			stroke-width="1"
		></line>
	</svg>
	<div
		draggable="true"
		class="z-top h-min w-min absolute bg-surface-800 rounded-2xl border border-white"
		:style="{ top: `${p?.top}%`, left: `${p?.left}%` }"
		v-for="p in chosenParts"
		:key="p?.part.id"
		@dragstart="dragstart"
		@dragend="dragend(p.id, $event)"
	>
		<part-card
			class=""
			:id="p.id"
			:sensors="p?.part.sensors"
			:name="p?.part.name"
		/>
	</div>
</template>

<style scoped>
.image {
	background-image: url('public/computer.jpg');
	background-size: 100% 100%;
}
</style>
