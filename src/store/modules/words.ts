import { shuffle } from '@/helpers/shuffle-array'
import Vue from 'vue'
import { State, Mutation, Getter } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export class WordsModule extends BaseModule {

	@State()
	wordsNumber = 4

	@Mutation()
	setWordsNumber(value: number) {
		if (value < 4) return
		if (value > 6) return

		this.wordsNumber = value
	}

	@Getter()
	get totalWords() {
		return this.root.players.playersNumber * this.wordsNumber
	}

	@State()
	words: string[] = []

	@Mutation()
	setWord({key, value}: {
		key: number,
		value: string,
	}) {
		Vue.set(this.words, key, value)
	}

	@State()
	remainedWords: string[] = []

	@Mutation()
	setRemainedWords(value: string[]) {
		this.remainedWords = [...value]
	}

	@Mutation()
	shuffleRemainedWords() {
		this.remainedWords = shuffle([...this.remainedWords])
	}

	@State()
	guessedWords: string[][] = []

	@Mutation()
	addGuessedWord() {
		const teamIndex = this.root.game.currentTeamIndex

		Array.isArray(this.guessedWords[teamIndex])
			? this.guessedWords[teamIndex].push(...this.remainedWords.splice(0, 1))
			: this.guessedWords[teamIndex] = [...this.remainedWords.splice(0, 1)]
	}
}
