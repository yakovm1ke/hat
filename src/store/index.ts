import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple'
import { Store } from './store'

Vue.use(Vuex)

const instance = new Store()

export default createVuexStore(instance, {
	strict: true,
	modules: {},
	plugins: []
});

export * from './store'
export {useStore} from 'vuex-simple'