
import App from './App'
import router from './router'
import '@/assets/iconfont.css'
import '@/styles/index.scss'
import store from '@/vuex/store'
import { formatDate, dateFormat } from '@/common/formtDate.js'
import { dataToTree, toTree } from '@/common/dataToTree.js'
import { get, post,patch,del,location } from '@/api/common.js'
import cdn from '@/common/cdnhelper.js'
Vue.prototype.formatDate = formatDate
Vue.prototype.dateFormat = dateFormat
Vue.prototype.dataToTree = dataToTree
Vue.prototype.toTree = toTree
Vue.prototype.getkeybyfile = cdn.getkeybyfile

Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.patch = patch
Vue.prototype.del = del
Vue.prototype.location = location

Vue.config.devtools = true
Vue.config.productionTip = false
var vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})