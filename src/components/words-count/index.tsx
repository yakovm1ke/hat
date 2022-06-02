import {VueComponent, Component} from '@/types'
import { useStore } from 'vuex-simple'
import { Store } from '@/store/store'

import styles from './index.module.css'

@Component
export class WordsCount extends VueComponent {
	public store: Store = useStore(this.$store)

	get wordsCount() {
		return this.store.wordsCount
	}

	set wordsCount(value: number) {
		this.store.setWordsCount(value)
	}

	render() {
		return (
			<div class={styles.row}>
				<button
					class={styles.button}
					onClick={() => this.wordsCount--}
				>
					-
				</button>
				<button
					class={styles.button}
					onClick={() => this.wordsCount++}
				>
					+
				</button>
				<div class={styles.number}>
					{this.wordsCount}
				</div>
			</div>
		)
	}
}