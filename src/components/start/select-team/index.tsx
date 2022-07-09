import { VueComponent, Component, Watch } from '@/types'
import { ITeamsSet } from '@/store/modules/teams'
import { RootModule, useStore } from '@/store/root'
import { Button } from '@/components/ui'
import styles from './index.module.css'

@Component
export class SelectTeam extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get playersNumber() {
		return this.store.players.playersNumber
	}

	private get teamsSet() {
		return this.store.teams.teamsSet
	}

	private set teamsSet(value) {
		this.store.teams.setTeamsSet(value)
	}

	private get teamsSetOptions() {
		return this.store.teams.teamsSetOptions
	}

	private isSelected(teamSet: ITeamsSet) {
		return this.teamsSet?.length === teamSet.length
	}

	@Watch('playersNumber')
	private resetTeamsSet() {
		this.teamsSet = null
	}

	// TODO переделать множественно число игроков, игрока
	private renderTeams(teamsSet: ITeamsSet) {
		return (
			<Button
				type={'ghost'}
				whenClick={() => this.teamsSet = teamsSet}
				class={[
					styles.teamsSet,
					{[styles.selected]: this.isSelected(teamsSet)},
				]}
			>
				<div class={styles.teamsNumber}>
					{teamsSet.length}
				</div>
				<div class={styles.players}>
					{teamsSet.map((players, index) => (
						<div key={index}>{index + 1} команда: {players} игрока</div>
					))}
				</div>
			</Button>
		)
	}

	public render() {
		return (
			<div class={styles.teamsSetOptions}>
				{this.teamsSetOptions.map((teamsSet) => (
					this.renderTeams(teamsSet)
				))}
			</div>
		)
	}
}
