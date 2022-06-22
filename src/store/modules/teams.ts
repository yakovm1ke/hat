import { State, Mutation, Getter } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export type ITeamsSet = number[]
export type ITeam = string[]

export class TeamsModule extends BaseModule {

	@Getter()
	get teamsSets(): ITeamsSet[] {
		switch(this.root.players.totalPlayers) {
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
	teamsSet: ITeamsSet | null = null

	@Mutation()
	setTeamsSet(value: ITeamsSet | null) {
		this.teamsSet = value
	}

	@Getter()
	get teamsCount () {
		return this.teamsSet?.length ?? 0
	}

	@Getter()
	get teams(): ITeam[] {
		if (!this.teamsSet || this.root.players.shuffledPlayers.length !== this.root.players.totalPlayers) return []

		const teams: ITeam[] = []
		let currentPlayer = 0

		for (let i = 0; i < this.teamsCount; i++) {
			teams[i] = []

			for (let j = 0; j < this.teamsSet[i]; j++) {
				teams[i].push(this.root.players.shuffledPlayers[currentPlayer])
				currentPlayer++
			}
		}

		return teams
	}
}
