import { App } from "vue";
import Calendar from './components/Calendar.vue'
import './components/Calendar.less'

export default {
  install: (app: App) => {
    app.component('Calendar', Calendar)
  }
}
