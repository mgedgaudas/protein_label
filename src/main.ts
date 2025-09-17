import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import './style.css'
import App from './App.vue'


import Button from "primevue/button"
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FloatLabel  from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';



const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('FloatLabel', FloatLabel);
app.component('Textarea', Textarea);

app.mount('#app')
