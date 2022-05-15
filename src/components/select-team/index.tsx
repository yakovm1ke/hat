import {VueComponent, Component, Watch} from '@/types'
import { useStore } from 'vuex-simple'
import { HatStore, ITeamConfiguration } from '@/store/store'

import styles from './index.module.css'

@Component
export class SelectTeam extends VueComponent {
	public store: HatStore = useStore(this.$store)

	get playersCount() {
		return this.store.playersCount
	}

	get teamsConfiguration() {
		return this.store.teamsConfiguration
	}

	set teamsConfiguration(value: ITeamConfiguration | undefined) {
		this.store.setTeamsConfiguration(value)
	}

	get teamsConfigurations() {
		return this.store.teamsConfigurations
	}

	isSelected(teamsConfiguration: ITeamConfiguration) {
		return this.teamsConfiguration?.teamsCount === teamsConfiguration.teamsCount
	}

	@Watch('playersCount')
	resetTeamsConfiguration() {
		this.teamsConfiguration = undefined
	}

	renderTeams(teamsConfiguration: ITeamConfiguration) {
		return (
			<div
				class={[
					styles.teamsConfiguration,
					{[styles.selected]: this.isSelected(teamsConfiguration)}
				]}
				onClick={() => this.teamsConfiguration = teamsConfiguration}
			>
				<div class={styles.teamsCount}>
					{teamsConfiguration.teamsCount}
				</div>
				<div class={styles.teamsPlayers}>
					{teamsConfiguration.teamsPlayers.map((teamPlayers, index) => (
						<div>{index + 1} команда: {teamPlayers} игрока</div>
					))}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div class={styles.teamsConfigurations}>
				{this.teamsConfigurations.map(teamsConfiguration => (
					this.renderTeams(teamsConfiguration)
				))}
			</div>
		)
	}
}