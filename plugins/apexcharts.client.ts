// plugins/apexcharts.client.ts 생성
import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueApexCharts)
})