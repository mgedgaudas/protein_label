<template>
  <v-container class="page-container" max-width="900">
    <v-sheet border class="info-title">
      <div class="sheet-title">BVTS protein sample label</div>
    </v-sheet>
    <v-sheet border class="info-sheet">
      <div class="sheet-title">Sample information</div>
      <v-divider class="mb-2"></v-divider>
      <v-text-field label="protein" v-model="labelModel.protein" density="compact"></v-text-field>
      <v-text-field label="plasmid" v-model="labelModel.plasmid" density="compact"></v-text-field>
      <v-text-field label="Protein batch" v-model="labelModel.protein_batch" density="compact"></v-text-field>
      <v-text-field label="protein conc. (µM)" v-model="labelModel.protein_conc_uM" density="compact"></v-text-field>
      <v-text-field label="protein conc. (mg/mL)" v-model="labelModel.protein_conc_mgmL"
        density="compact"></v-text-field>
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
        <v-btn color="primary" variant="flat" @click="print_func">Print</v-btn>
      </div>

    </v-sheet>
    <v-sheet border class="print-settings">
      <div class="sheet-title">Printing settings</div>
      <v-divider class="mb-2"></v-divider>
       <v-text-field label="Label count" v-model.number="printModel.labelCount" density="compact"></v-text-field>
       <v-slider label="Font scale" v-model="labelModel.fontsize_scale" :min="20" :max="150" :step="5" thumb-label>
        <template v-slot:append>
          <v-text-field
            v-model.number="labelModel.fontsize_scale"
            density="compact"
            style="width: 80px"
            type="number"
            variant="outlined"
            hide-details
          ></v-text-field>
        </template>
       </v-slider>
    </v-sheet>
  </v-container>
  <div class="print-page">
    <template v-for="n in printModel.labelCount">
      <print-label :model="labelModel"></print-label>
    </template>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PrintLabel from './PrintLabel.vue';


const printModel = ref({
  labelCount: 120,
})


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
  fontsize_scale: number;
}>({
  protein: "chCAIII",
  plasmid: "pL00XX",
  protein_conc_uM: 25.9,
  protein_conc_mgmL: 0.76,
  protein_batch: "PB-XX00YY",
  date: (new Date()).toISOString().split('T')[0],
  volume: "500",
  author: "ABC",
  buffer: "pH 6.2\n20 mM MES\n50 mM NaCl\n2 mM DTT",
  fontsize_scale: 100,

});

const print_func = () => { window.print() }
</script>


<style lang="css">
.print-page {
  display: none;
}

@media print {
  @page {
    size: a4;
    margin:10mm;
  }

  .page-container{
    display: none!important;
  }

  .print-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    page-break-inside: auto;
    /*  display: grid;
    grid-template-columns: repeat(5, 34mm);
    grid-auto-rows: 11mm;
    row-gap: 0mm;
    column-gap: 0mm;
    margin:0;
    page-break-inside: auto;
    border: 1px solid red; */
  }


}

.preview-label-sheet {
  grid-area: preview-label-sheet;
  align-self: start;
  height: auto;
}

.preview-label {
  zoom: 3;
  margin: 1em auto;
}

.info-sheet {
  grid-area: info-sheet;
}

.print-settings{
  grid-area: print-settings;
}

.page-container {
  display: grid;
  grid-template-areas: 
  "info-title info-title"
  "info-sheet preview-label-sheet"
  "info-sheet print-settings";
  grid-column-gap: 1em;
  row-gap: 1em;
}

.info-title{
  grid-area: info-title;
}

.sheet-title {
  font-size: x-large;
  padding: 0.5em;
}
</style>