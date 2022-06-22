import { shuffle } from '@/helpers/shuffle-array'
import Vue from 'vue'
import { State, Mutation, Getter } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export class WordsModule extends BaseModule {

	@State()
	wordsCount = 4

	@Mutation()
	setWordsCount(value: number) {
		if (value < 4) return
		if (value > 6) return
		this.wordsCount = value
	}

	@Getter()
	get totalWords() {
		return this.root.players.totalPlayers * this.wordsCount
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
	shuffledWords: string[] = []

	@Mutation()
	shuffleWords() {
		this.shuffledWords = shuffle(this.words)
	}
}
