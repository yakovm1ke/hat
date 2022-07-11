import { EStage, MOVE_TIME_IN_SECONDS } from '@/core/consts'
import {
	ILocalStorageGameConfig,
	ILocalStorageMoveConfig,
	setGameConfigToLocalStorage,
	setMoveConfigToLocalStorage,
	getGameConfigFromLocalStorage,
	getMoveConfigFromLocalStorage,
	removeGameConfigFromLocalStorage,
	removeMoveConfigFromLocalStorage,
} from '@/helpers/local-storage'
import { RootModule, useStore } from '@/store/root'
import { VueComponent, Component } from '@/types'

@Component

export class LocalStorageMixin extends VueComponent {

	protected readonly store = useStore<RootModule>(this.$store)

	protected get teamsSet() {
		return this.store.teams.teamsSet
	}

	protected set teamsSet(value) {
		this.store.teams.setTeamsSet(value)
	}

	protected get shuffledPlayers() {
		return this.store.players.shuffledPlayers
	}

	protected set shuffledPlayers(value) {
		this.store.players.setShuffledPlayers(value)
	}

	protected get words() {
		return this.store.words.words
	}

	protected set words(value) {
		this.store.words.setWords(value)
	}

	protected get players() {
		return this.store.players.players
	}

	protected set players(value) {
		this.store.players.setPlayers(value)
	}

	protected get move() {
		return this.store.game.move
	}

	protected set move(value) {
		this.store.game.setMove(value)
	}

	protected get stage() {
		return this.store.game.stage
	}

	protected set stage(value) {
		this.store.game.setStage(value)
	}

	protected get remainedWords() {
		return this.store.words.remainedWords
	}

	protected set remainedWords(value) {
		this.store.words.setRemainedWords(value)
	}

	protected get timeLeft() {
		return this.store.game.timeLeft
	}

	protected set timeLeft(value) {
		this.store.game.setTimeLeft(value)
	}

	protected get timerId() {
		return this.store.game.timerId
	}

	protected set timerId(value) {
		this.store.game.setTimerId(value)
	}

	protected get guessedTeamsWords() {
		return this.store.words.guessedTeamsWords
	}

	protected set guessedTeamsWords(value) {
		this.store.words.setGuessedTeamsWords(value)
	}

	protected setGameConfig() {
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

	protected getGameConfig() {
		const config =  getGameConfigFromLocalStorage()

		if (config === null) return

		this.players = config.players
		this.teamsSet = config.teamsSet
		this.words = config.words
		this.shuffledPlayers = config.shuffledPlayers
	}

	protected setMoveConfigIfGameConfigExist() {
		this.remainedWords = this.words
		this.store.words.shuffleRemainedWords()
	}

	protected setMoveConfig() {
		const config: ILocalStorageMoveConfig = {
			move: this.move,
			stage: this.stage,
			remainedWords: this.remainedWords,
			timeLeft: this.timeLeft,
			guessedTeamsWords: this.guessedTeamsWords,
		}

		setMoveConfigToLocalStorage(config)
	}

	protected getMoveConfig() {
		const config =  getMoveConfigFromLocalStorage()

		if (config === null) return

		this.move = config.move
		this.stage = config.stage
		this.remainedWords = config.remainedWords
		this.timeLeft = config.timeLeft
		this.guessedTeamsWords = config.guessedTeamsWords
	}

	protected removeGameConfig() {
		removeGameConfigFromLocalStorage()
		this.players = []
		this.teamsSet = null
		this.words = []
		this.shuffledPlayers = []
	}

	protected removeMoveConfig() {
		removeMoveConfigFromLocalStorage()

		this.move = 0
		this.stage = EStage.Explanation
		this.remainedWords = []
		this.timeLeft = MOVE_TIME_IN_SECONDS
		this.guessedTeamsWords = []
	}
}
