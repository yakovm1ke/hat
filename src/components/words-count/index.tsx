import {VueComponent, Component} from '@/types'
import { useStore, RootModule } from '@/store/root'

import styles from './index.module.css'

@Component
export class WordsCount extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get wordsCount() {
		return this.store.words.wordsCount
	}

	private set wordsCount(value: number) {
		this.store.words.setWordsCount(value)
	}

	public render() {
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