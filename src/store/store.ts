import { State, Mutation, Getter } from 'vuex-simple'

export interface ITeamConfiguration {
	teamsCount: number
	teamsPlayers: number[]
}

export interface IPlayerWords {
	name: string
	words: string[]
}

export class HatStore {
	@State()
	totalPlayers = 4

	@Mutation()
	setPlayersCount(value: number) {
		if (value < 4) return
		if (value > 9) return
		this.totalPlayers = value
	}

	@Getter()
	get teamsConfigurations(): ITeamConfiguration[] {
		switch(this.totalPlayers) {
		case 4:
			return [
				{
					teamsCount: 2,
					teamsPlayers: [2, 2]
				}
			]
		case 5:
			return [
				{
					teamsCount: 2,
					teamsPlayers: [3, 2]
				}
			]
		case 6:
			return [
				{
					teamsCount: 2,
					teamsPlayers: [3, 3]
				},
				{
					teamsCount: 3,
					teamsPlayers: [2, 2, 2]
				},
			]
		case 7:
			return [
				{
					teamsCount: 2,
					teamsPlayers: [4, 3]
				},
				{
					teamsCount: 3,
					teamsPlayers: [3, 2, 2]
				},
			]
		case 8:
			return [
				{
					teamsCount: 2,
					teamsPlayers: [4, 4]
				},
				{
					teamsCount: 3,
					teamsPlayers: [3, 3, 2]
				},
				{
					teamsCount: 4,
					teamsPlayers: [2, 2, 2, 2]
				},
			]
		case 9:
			return [
				{
					teamsCount: 2,
					teamsPlayers: [5, 4]
				},
				{
					teamsCount: 3,
					teamsPlayers: [3, 3, 3]
				},
				{
					teamsCount: 4,
					teamsPlayers: [3, 2, 2, 2]
				},
			]
		default:
			return [
				{
					teamsCount: 0,
					teamsPlayers: [0]
				}
			]
		}
	}

	@State()
	teamsConfiguration?: ITeamConfiguration = undefined

	@Mutation()
	setTeamsConfiguration(value?: ITeamConfiguration) {
		this.teamsConfiguration = value
	}

	@State()
	playerWordsCount = 4

	@Mutation()
	setPlayerWordsCount(value: number) {
		if (value < 4) return
		if (value > 6) return
		this.playerWordsCount = value
	}

	@State()
	currentInputPlayer = 0

	@Mutation()
	incrementCurrentInputPlayer() {
		this.currentInputPlayer++
	}

	@State()
	playersWords: IPlayerWords[] = []

	@Mutation()
	addPlayerWords(value: IPlayerWords) {
		this.playersWords.push(value)
	}
}