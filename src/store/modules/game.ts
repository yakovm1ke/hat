import { Stages as Stage } from '@/core/consts';
import { Getter, Mutation, State } from 'vuex-simple';
import { BaseModule } from '../common/base-module';

export class GameModule extends BaseModule {

	@State()
	stage = Stage.Explanation

	@Mutation()
	setStage(value: Stage) {
		this.stage = value
	}

	@State()
	currentPlayerIndex: number | null  = null

	@Mutation()
	setCurrentPlayerIndex(value: number) {
		this.currentPlayerIndex = value
	}

	@State()
	currentTeamIndex: number | null  = null

	@Mutation()
	setCurrentTeamIndex(value: number) {
		this.currentTeamIndex = value
	}

	@Getter()
	get currentTeam() {
		if (!this.currentTeamIndex) return null

		return this.root.teams.teams[this.currentTeamIndex]
	}

	@Getter()
	get currentPlayer() {
		if (!this.currentPlayerIndex) return null

		return this.root.players.shuffledPlayers[this.currentPlayerIndex]
	}
}