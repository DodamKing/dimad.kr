// plugins/toast.ts
import Toast from 'vue-toastification'
import type { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        position: 'top-right' as POSITION,
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    })
})