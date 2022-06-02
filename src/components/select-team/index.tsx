import {VueComponent, Component, Watch} from '@/types'
import { useStore } from 'vuex-simple'
import { Store, ITeamsSet } from '@/store/store'

import styles from './index.module.css'

@Component
export class SelectTeam extends VueComponent {
	public store: Store = useStore(this.$store)

	get totalPlayers() {
		return this.store.totalPlayers
	}

	get teamsSet() {
		return this.store.teamsSet
	}

	set teamsSet(value: ITeamsSet | undefined) {
		this.store.setTeamsSet(value)
	}

	get teamsSets() {
		return this.store.teamsSets
	}

	isSelected(teamSet: ITeamsSet) {
		return this.teamsSet?.length === teamSet.length
	}

	@Watch('totalPlayers')
	resetTeamsSet() {
		this.teamsSet = undefined
	}

	renderTeams(teamsSet: ITeamsSet) {
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

	render() {
		return (
			<div class={styles.teamsSets}>
				{this.teamsSets.map((teamsSet) => (
					this.renderTeams(teamsSet)
				))}
			</div>
		)
	}
}