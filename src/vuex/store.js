// import Vue from 'vue'
// import Vuex from 'vuex'
import dbinfo from './modules/dbinfo'
import toolslist from './modules/tools'
// Vue.use(Vuex)

export default new Vuex.Store(
    {
        modules: {
          dbinfo,
          toolslist
        }
    }
)