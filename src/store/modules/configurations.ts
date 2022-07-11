import { Getter } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export class ConfigurationsModule extends BaseModule {

	@Getter()
	get isGameConfigured(): boolean {
		const { teamsSet } = this.root.teams
		const { words } = this.root.words
		const { players, shuffledPlayers } = this.root.players

		return (
			words.length > 0
			&& teamsSet !== null
			&& players.length > 0
			&& shuffledPlayers.length > 0
		)
	}

	@Getter()
	get isMoveConfigured(): boolean {
		// const { move, stage, timeLeft } = this.root.game
		const { remainedWords } = this.root.words

		return remainedWords.length > 0
	}
}
