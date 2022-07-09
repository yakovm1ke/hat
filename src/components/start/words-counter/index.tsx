import { VueComponent, Component } from '@/types'
import { useStore, RootModule } from '@/store/root'

import { Counter } from '@/components/ui'

@Component
export class WordsCounter extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get wordsNumber() {
		return this.store.words.wordsNumber
	}

	private set wordsNumber(value: number) {
		this.store.words.setWordsNumber(value)
	}

	private get totalWords() {
		return this.store.words.totalWords
	}

	public render() {
		return (
			<Counter
				value={this.wordsNumber}
				whenDecrement={() => this.wordsNumber--}
				whenIncrement={() => this.wordsNumber++}
				totalValue={this.totalWords}
			/>
		)
	}
}
