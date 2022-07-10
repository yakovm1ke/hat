import { EStage } from '@/core/consts'
import { IPlayers } from '@/store/modules/players'
import { ITeamsSet } from '@/store/modules/teams'
import { IWords } from '@/store/modules/words'

export interface ILocalStorageGameConfig {
	words: IWords
	players: IPlayers
	shuffledPlayers: IPlayers
	teamsSet: ITeamsSet
}

export interface ILocalStorageMoveConfig {
	stage: EStage
	move: number
	remainedWords: IWords
}

export const GAME_CONFIG_LS_NAME = 'gameConfig'
export const MOVE_CONFIG_LS_NAME = 'moveConfig'

export const setGameConfigToLocalStorage = (config: ILocalStorageGameConfig) => {
	localStorage.setItem(GAME_CONFIG_LS_NAME, JSON.stringify(config))
}

export const getGameConfigFromLocalStorage = (): ILocalStorageGameConfig | null => {
	const gameConfigJson = localStorage.getItem(GAME_CONFIG_LS_NAME)

	return (
		gameConfigJson !== null
			? JSON.parse(gameConfigJson)
			: null
	)
}

export const setMoveConfigToLocalStorage = (config: ILocalStorageMoveConfig) => {
	localStorage.setItem(MOVE_CONFIG_LS_NAME, JSON.stringify(config))
}

export const getMoveConfigFromLocalStorage = (): ILocalStorageMoveConfig | null => {
	const moveConfigJson = localStorage.getItem(MOVE_CONFIG_LS_NAME)

	return (
		moveConfigJson !== null
			? JSON.parse(moveConfigJson)
			: null
	)
}
