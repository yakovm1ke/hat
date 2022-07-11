import { shuffle } from '@/helpers/shuffle-array'
import Vue from 'vue'
import { State, Mutation, Getter } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export type IWords = string[]

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
	words: IWords = []

	@Mutation()
	setWord({key, value}: {
		key: number,
		value: string,
	}) {
		Vue.set(this.words, key, value)
	}

	@Mutation()
	setWords(value: IWords) {
		this.words = value
	}

	@State()
	remainedWords: IWords = []

	@Mutation()
	setRemainedWords(value: string[]) {
		this.remainedWords = [...value]
	}

	@Mutation()
	shuffleRemainedWords() {
		this.remainedWords = shuffle([...this.remainedWords])
	}

	@State()
	guessedTeamsWords: IWords[] = []

	@Mutation()
	setGuessedTeamsWords(value: IWords[]) {
		this.guessedTeamsWords = value
	}

	@Mutation()
	resetWordsWhenStageChange() {
		this.setRemainedWords(this.words)
		this.shuffleRemainedWords()
	}

	@Mutation()
	addGuessedWord() {
		const teamIndex = this.root.game.currentTeamIndex

		Array.isArray(this.guessedTeamsWords[teamIndex])
			? this.guessedTeamsWords[teamIndex].push(...this.remainedWords.splice(0, 1))
			: this.guessedTeamsWords[teamIndex] = [...this.remainedWords.splice(0, 1)]
	}
}
