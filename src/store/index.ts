import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple'

import { RootModule } from './root'

Vue.use(Vuex)

const instance = new RootModule()

export default createVuexStore(instance, { strict: true })
