import { shuffle } from '@/helpers/shuffle-array'
import Vue from 'vue'
import { State, Mutation, Getter } from 'vuex-simple'

export type ITeamsSet = number[]
export type ITeams = string[]

export class Store {
	@State()
	totalPlayers = 4

	@Mutation()
	setPlayersCount(value: number) {
		if (value < 4) return
		if (value > 9) return
		this.totalPlayers = value
	}

	// TODO функция getTeams которая, возвращает комбинации
	@Getter()
	get teamsSets(): ITeamsSet[] {
		switch(this.totalPlayers) {
		case 4:
			return [[2, 2]]
		case 5:
			return [[3, 2]]
		case 6:
			return [[3, 3], [2, 2, 2]]
		case 7:
			return [[4, 3], [3, 2, 2]]
		case 8:
			return [[4, 4], [3, 3, 2], [2, 2, 2, 2]]
		case 9:
			return [[5, 4], [3, 3, 3], [3, 2, 2, 2]]
		default:
			return [[0]]
		}
	}

	@State()
	teamsSet?: ITeamsSet = undefined

	@Mutation()
	setTeamsSet(value?: ITeamsSet) {
		this.teamsSet = value
	}

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
		return this.totalPlayers * this.wordsCount
	}

	@State()
	currentInputPlayer = 0

	@Mutation()
	incrementCurrentInputPlayer() {
		this.currentInputPlayer++
	}

	@State()
	players: string[] = []

	@Mutation()
	setPlayer({key, value}: {
		key: number,
		value: string,
	}) {
		Vue.set(this.players, key, value)
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

	@State()
	shuffledPlayers: string[] = []

	@Mutation()
	shufflePlayers() {
		this.shuffledPlayers = shuffle(this.players)
	}

	@Getter()
	get teams(): ITeams[] {
		if (!this.teamsSet || this.shuffledPlayers.length !== this.totalPlayers) return []

		const teams: ITeams[] = []
		let currentPlayer = 0

		for (let i = 0; i < this.teamsSet.length; i++) {
			for (let j = 0; j < this.teamsSet[i]; j++) {
				teams[i].push(this.shuffledPlayers[currentPlayer])
				currentPlayer++
			}
		}

		return teams
	}
}