import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexStore} from 'vuex-simple'
import {HatStore} from './store'

Vue.use(Vuex)

const instance = new HatStore()

export default createVuexStore(instance, {
	strict: true,
	modules: {},
	plugins: []
});