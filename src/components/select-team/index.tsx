import {VueComponent, Component, Watch} from '@/types'
import { ITeamsSet } from '@/store/modules/teams'

import styles from './index.module.css'
import { RootModule, useStore } from '@/store/root'

@Component
export class SelectTeam extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get totalPlayers() {
		return this.store.players.totalPlayers
	}

	private get teamsSet() {
		return this.store.teams.teamsSet
	}

	private set teamsSet(value: ITeamsSet | null) {
		this.store.teams.setTeamsSet(value)
	}

	private get teamsSets() {
		return this.store.teams.teamsSets
	}

	private isSelected(teamSet: ITeamsSet) {
		return this.teamsSet?.length === teamSet.length
	}

	@Watch('totalPlayers')
	private resetTeamsSet() {
		this.teamsSet = null
	}

	public renderTeams(teamsSet: ITeamsSet) {
		return (
			<div
				class={[
					styles.teamsSet,
					{[styles.selected]: this.isSelected(teamsSet)}
				]}
				onClick={() => this.teamsSet = teamsSet}
			>
				<div class={styles.teamsNumber}>
					{teamsSet.length}
				</div>
				<div class={styles.players}>
					{teamsSet.map((players, index) => (
						<div>{index + 1} команда: {players} игрока</div>
					))}
				</div>
			</div>
		)
	}

	public render() {
		return (
			<div class={styles.teamsSets}>
				{this.teamsSets.map((teamsSet) => (
					this.renderTeams(teamsSet)
				))}
			</div>
		)
	}
}