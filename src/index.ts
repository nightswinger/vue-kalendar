import { App } from "vue";
import Calendar from './components/Calendar.vue'

export default {
  install: (app: App) => {
    app.component('Calendar', Calendar)
  }
}
