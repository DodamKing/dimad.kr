// composables/useToast.ts
import { useToast as useToastification } from 'vue-toastification'
import type { POSITION } from 'vue-toastification'

export const useToast = () => {
    const toast = useToastification()

    const defaultOptions = {
        position: 'top-right' as POSITION,
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        icon: true,
    }

    return {
        toast: {
            error: (message: string) => toast.error(message, defaultOptions),
            success: (message: string) => toast.success(message, defaultOptions),
            warning: (message: string) => toast.warning(message, defaultOptions),
            info: (message: string) => toast.info(message, defaultOptions)
        }
    }
}