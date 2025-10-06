<script setup lang="ts">
import { ref } from 'vue';
import PrintLabel from './components/PrintLabel.vue';
import type { LabelInfo } from './utils';

const printModel = ref({
  labelCount: 115,
})

const labelModel = ref<LabelInfo>({
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

const printFunction = () => print();
</script>

<template>
  <div class="main-container">
    <Card class="title">
      <template #title>BVTS protein sample label</template>
    </Card>
    <Card class="label-properties">
      <template #title>Sample information</template>
      <template #content>
        <FloatLabel variant="in">
          <InputText id="in_label" v-model="labelModel.protein" variant="filled" />
          <label for="in_label">Protein</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText id="in_label" v-model="labelModel.plasmid" variant="filled" />
          <label for="in_label">Plasmid</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText id="in_label" v-model="labelModel.protein_batch" variant="filled" />
          <label for="in_label">Protein batch</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputNumber id="in_label" v-model.number="labelModel.protein_conc_uM" :maxFractionDigits="2" suffix="  µM" variant="filled" />
          <label for="in_label">Protein conc.</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputNumber id="in_label" v-model.number="labelModel.protein_conc_mgmL" :maxFractionDigits="2" suffix="  mg/mL" variant="filled" />
          <label for="in_label">Protein conc.</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputText id="in_label" v-model="labelModel.volume" suffix="  µL"  variant="filled" />
          <label for="in_label">volume</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText id="in_label" v-model="labelModel.author" variant="filled" />
          <label for="in_label">Author</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText id="in_label" v-model="labelModel.date" variant="filled" />
          <label for="in_label">Date</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <Textarea id="in_label" v-model="labelModel.buffer" autoResize variant="filled" />
          <label for="in_label">Buffer</label>
        </FloatLabel>
      </template>
    </Card>
    <Card class="'preview-label'">
      <template #title>Preview label</template>
      <template #content>
        <PrintLabel class="preview-label" :model="labelModel" />
      </template>
    </Card>
    <Card class="print-settings">
      <template #title>Print settings</template>
      <template #content>
        <FloatLabel variant="in">
          <InputNumber v-model="printModel.labelCount" showButtons inputId="in_label"
            variant="filled" />
          <label for="in_label">Label count</label>
        </FloatLabel>

        <Button label="Print" @click="printFunction" />
      </template>
    </Card>

  </div>
  <div class="print-page">
    <template v-for="_ in printModel.labelCount">
      <print-label :model="labelModel"></print-label>
    </template>

  </div>
</template>

<style>
.print-page {
  display: none;
}

@media print {
  @page {
    size: a4;
    margin: 10mm;
  }

  .main-container {
    display: none !important;
  }

  .print-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    page-break-inside: auto;
  }
}

.main-container {
  margin: 0 auto;
  max-width: 900px;
  display: grid;
  grid-template-areas:
    "title title"
    "label-properties preview-label"
    "label-properties print-settings"
  ;
  row-gap: 1em;
  column-gap: 1em;

}

.title {
  grid-area: title;
}

.preview-label {
  grid-area: preview-label;
}

.print-settings {
  grid-area: print-settings;
  .p-card-body > .p-card-content{
    padding-top: 1em;
    display:flex;
    flex-direction: column;
    align-items: center;
    row-gap: 3em;
  }
}

.label-properties {
  grid-area: label-properties;

}

.label-properties>.p-card-body>.p-card-content {
  display: grid;
  row-gap: 0.2em;
}

.p-card {
  border: 1px solid rgb(192, 192, 192);
  border-radius: 1em;

}

.preview-label {
  zoom: 3;
  margin: 1em auto;
}
</style>
