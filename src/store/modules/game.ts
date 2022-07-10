import { EStage } from '@/core/consts'
import { Getter, Mutation, State } from 'vuex-simple'
import { BaseModule } from '../common/base-module'
import { ITeam } from './teams'

export class GameModule extends BaseModule {

	@State()
	stage = EStage.Explanation

	@Mutation()
	setStage(value: EStage) {
		this.stage = value
		this.resetMove()
	}

	@Mutation()
	nextStage() {
		switch(this.stage) {
		case(EStage.Explanation):
			this.setStage(EStage.Pantomime)
			break
		case(EStage.Pantomime):
			this.setStage(EStage.OneWord)
			break
		default:
			break
		}
	}

	@State()
	move = 0

	@Mutation()
	setMove(value: number) {
		this.move = value
	}

	@Mutation()
	incrementMove() {
		this.move++
	}

	@Mutation()
	resetMove() {
		this.move = 0
	}

	@State()
	timeLeft = 60

	@Mutation()
	setTimeLeft(value: number) {
		this.timeLeft = value
	}

	@Mutation()
	decrementTimeLeft() {
		this.timeLeft--
	}

	@Mutation()
	resetTimeLeft() {
		this.timeLeft = 0
	}

	@Getter()
	get currentTeamIndex(): number {
		return this.move % this.root.teams.teamsNumber
	}

	@Getter()
	get currentTeam(): ITeam | null {
		return this.root.teams.teams[this.currentTeamIndex] ?? null
	}

	@Getter()
	get currentCycle(): number {
		return Math.trunc(this.move / this.root.teams.teamsNumber)
	}

	@Getter()
	get currentTeamPlayerIndex(): number | null{
		if (!this.currentTeam) return null

		return this.currentCycle % this.currentTeam.length
	}

	@Getter()
	get currentPlayer(): string | null {
		if (this.currentTeamPlayerIndex === null) return null

		return this.currentTeam?.[this.currentTeamPlayerIndex] ?? null
	}

	@Getter()
	get currentTeamGuessedWords(): string[] {
		return this.root.words.guessedTeamsWords?.[this.currentTeamIndex] ?? []
	}
}
