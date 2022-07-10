import {
	ILocalStorageGameConfig,
	ILocalStorageMoveConfig,
	setGameConfigToLocalStorage,
	setMoveConfigToLocalStorage,
	getGameConfigFromLocalStorage,
	getMoveConfigFromLocalStorage,
} from '@/helpers/local-storage'
import { RootModule, useStore } from '@/store/root'
import { VueComponent, Component } from '@/types'

@Component

export class LocalStorageMixin extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get teamsSet() {
		return this.store.teams.teamsSet
	}

	private set teamsSet(value) {
		this.store.teams.setTeamsSet(value)
	}

	private get shuffledPlayers() {
		return this.store.players.shuffledPlayers
	}

	private set shuffledPlayers(value) {
		this.store.players.setShuffledPlayers(value)
	}

	private get words() {
		return this.store.words.words
	}

	private set words(value) {
		this.store.words.setWords(value)
	}

	private get players() {
		return this.store.players.players
	}

	private set players(value) {
		this.store.players.setPlayers(value)
	}

	private get move() {
		return this.store.game.move
	}

	private set move(value) {
		this.store.game.setMove(value)
	}

	private get stage() {
		return this.store.game.stage
	}

	private set stage(value) {
		this.store.game.setStage(value)
	}

	private get remainedWords() {
		return this.store.words.remainedWords
	}

	private set remainedWords(value) {
		this.store.words.setRemainedWords(value)
	}

	private setGameConfig() {
		if (
			this.words.length === 0
			|| this.players.length === 0
			|| this.shuffledPlayers.length === 0
			|| this.teamsSet === null
		) return

		const config: ILocalStorageGameConfig = {
			players: this.players,
			teamsSet: this.teamsSet,
			words: this.words,
			shuffledPlayers: this.shuffledPlayers,
		}

		setGameConfigToLocalStorage(config)
	}

	private getGameConfig() {
		const config =  getGameConfigFromLocalStorage()

		if (config === null) return

		this.players = config.players
		this.teamsSet = config.teamsSet
		this.words = config.words
		this.shuffledPlayers = config.shuffledPlayers
	}

	private setMoveConfig() {
		const config: ILocalStorageMoveConfig = {
			move: this.move,
			stage: this.stage,
			remainedWords: this.remainedWords,
		}

		setMoveConfigToLocalStorage(config)
	}

	private getMoveConfig() {
		const config =  getMoveConfigFromLocalStorage()

		if (config === null) return

		this.move = config.move
		this.stage = config.stage
		this.remainedWords = config.remainedWords
	}
}
