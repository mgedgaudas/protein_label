<template>
  <v-container class="page-container" max-width="900">
    <v-sheet border class="info-sheet">
      <div class="sheet-title">Sample information</div>
      <v-divider class="mb-2"></v-divider>
      <v-text-field label="protein" v-model="labelModel.protein" density="compact"></v-text-field>
      <v-text-field label="plasmid" v-model="labelModel.plasmid" density="compact"></v-text-field>
      <v-text-field label="Protein batch" v-model="labelModel.protein_batch" density="compact"></v-text-field>
      <v-text-field label="protein conc. (µM)" v-model="labelModel.protein_conc_uM" density="compact"></v-text-field>
      <v-text-field label="protein conc. (mg/mL)" v-model="labelModel.protein_conc_mgmL" density="compact"></v-text-field>
      <v-text-field label="date" v-model="labelModel.date" density="compact"></v-text-field>
      <v-text-field label="volume (µL)" v-model="labelModel.volume" density="compact"></v-text-field>
      <v-text-field label="author" v-model="labelModel.author" density="compact"></v-text-field>
      <v-textarea label="buffer" v-model="labelModel.buffer" density="compact"></v-textarea>
    </v-sheet>
    <!-- <print-label :model="labelModel" class="preview-label"></print-label> -->
    <v-sheet border class="preview-label-sheet">
      <div class="sheet-title">Preview label</div>
      <v-divider class="mb-2"></v-divider>
      <div class="preview-label-container">
      <print-label :model="labelModel" class="preview-label"></print-label>
      <v-btn color="primary" @click="print_func">Print</v-btn>
      </div>
      
    </v-sheet>

    <div class="print-page">
      <template v-for="n in 168">
        <print-label :model="labelModel"></print-label>

      </template>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PrintLabel from './PrintLabel.vue';


const labelModel = ref<{
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
}>({
  protein: "chCAIII",
  plasmid: "pL0194",
  protein_conc_uM: 25.9,
  protein_conc_mgmL: 0.76,
  protein_batch: "PB-AM0101",
  date: "2025-09-03",
  volume: "500",
  author: "AM",
  buffer: "pH 6.2\n20 mM MES\n50 mM NaCl\n2 mM DTT",
  fontsize_mm: 1.8,

});

const print_func = () => {window.print()}
</script>


<style lang="css">
.print-page {
  display: none;
}

@media print {
  @page {
    size: a4;
  }

  body {
    visibility: hidden;
  }

  .print-page {
    height: 297mm;
    width: 210mm;
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 34mm);
    grid-auto-rows: 11mm;
    row-gap: 0mm;
    column-gap: 0mm;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }


}

.preview-label-sheet {
  grid-area: "preview-label-sheet";
  align-self: start;
  height: auto;
}

.preview-label {
  zoom: 3;
  margin: 1em auto;
}

.info-sheet {
  grid-area: "info-sheet";
}

.page-container {
  display: grid;
  grid-template: "info-sheet preview-label-sheet";
  grid-column: 1fr 1fr;
  grid-column-gap: 1em;
}


.sheet-title{
  font-size:x-large;
  padding: 0.5em;
}
</style>