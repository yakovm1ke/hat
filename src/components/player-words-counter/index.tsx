import {VueComponent, Component} from '@/types'
import { useStore } from 'vuex-simple'
import { HatStore } from '@/store/store'

import styles from './index.module.css'

@Component
export class PlayerWordsCounter extends VueComponent {
	public store: HatStore = useStore(this.$store)

	get playerWordsCount() {
		return this.store.playerWordsCount
	}

	set playerWordsCount(value: number) {
		this.store.setPlayerWordsCount(value)
	}

	render() {
		return (
			<div class={styles.row}>
				<button
					class={styles.button}
					onClick={() => this.playerWordsCount--}
				>
					-
				</button>
				<button
					class={styles.button}
					onClick={() => this.playerWordsCount++}
				>
					+
				</button>
				<div class={styles.number}>
					{this.playerWordsCount}
				</div>
			</div>
		)
	}
}