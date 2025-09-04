<template>
    <div class="label">
        <div class="label-info">
            <div>{{ model.protein }} ({{ model.plasmid }})</div>
            <div>{{ model.protein_conc_uM }} µM | {{ model.protein_conc_mgmL }} mg/mL</div>
            <div>{{ model.protein_batch }} </div>
            <div>{{ model.date }}  {{model.volume}}µL {{ model.author }}</div>
        </div>
        <div class="label-buffer">
            <div>Buffer:</div>
            <span style="white-space: pre-line;">{{ model.buffer }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    model: {
        protein: string;
        plasmid: string;
        protein_conc_uM: number;
        protein_conc_mgmL: number;
        protein_batch: string;
        date: string;
        volume: string;
        author: string;
        buffer: string;
        fontsize_mm: number;
    }

}>();


const fontsize=computed(() => `${props.model.fontsize_mm}mm`)
</script>

<style lang="css" scoped>
.label {
  width: 34mm;
  height: 11mm;
  box-sizing: border-box;
  border: 0.2mm dashed gray;
  font-size: v-bind(fontsize);
  line-height: v-bind(fontsize);
  display: flex;
  flex-direction: row;
}

.label-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding-right:1mm;
  padding-left:0.5mm;
  width: fit-content;
  border-right: 1px solid black;
}

.label-buffer{
    padding-left: 1mm;
}
</style>