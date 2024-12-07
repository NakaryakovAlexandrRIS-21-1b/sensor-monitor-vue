import {defineStore} from "pinia";
import {parts} from "../api/serverMock.js";

export const useSensorStore = defineStore('part',{
  state: () => ({
    parts: parts,
    chosenParts: [],
    chooseMode: false,
    chosenId: null
  }),
  getters: {
    getPartById(){
      return (id) => this.parts.find(p => p.id === id) ?? null
    }
  },
  actions: {
    dragend(id, x, y){
      this.chosenParts.find(p => p.id === id).top += y / window.innerHeight * 100
      this.chosenParts.find(p => p.id === id).left += x / window.innerWidth * 100
    },
    deleteChosen(id){
      console.log(id)
      this.chosenParts = this.chosenParts.filter(p => p.id !== id)
    }
  },
  persist: true
})
