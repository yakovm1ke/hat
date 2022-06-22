import { VueComponent, Component } from '@/types'

import styles from './index.module.css'
import {RootModule, useStore} from '@/store/root'
import { ITeam } from '@/store/modules/teams'
import { LocalStorageItems } from '@/core/consts'

@Component
export class TeamsView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get teamsCount() {
		return this.store.teams.teamsCount
	}

	private get teams() {
		return this.store.teams.teams
	}

	private mounted() {
		if (!this.store.teams.teamsSet) {
			this.$router.push({
				path: '/error'
			})
		}
	}

	private whenSubmit(event: Event) {
		event.preventDefault()

		const teams = JSON.stringify(this.store.teams.teams)

		const shuffledWords = JSON.stringify(this.store.words.shuffledWords)

		window.localStorage.setItem(LocalStorageItems.Teams, teams)

		window.localStorage.setItem(LocalStorageItems.ShuffledWords, shuffledWords)

		this.$router.push({
			path: '/ready',
		})
	}

	public renderTeam(team: ITeam, index: number) {
		return (
			<div class={styles.block}>
				<div class={[styles.mainText, styles.highlightedText]}>
					{`Команда ${index + 1}`}
				</div>

				{team.map(player => (
					<div class={[styles.subText]}>
						{player}
					</div>)
				)}
			</div>
		)
	}

	public render() {
		return (
			<form>
				<div class={styles.bigTitle}>
					Команды
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Число команд:{' '}
						<span class={styles.highlightedText}>
							{this.teamsCount}
						</span>
					</div>
				</div>

				{this.teams?.map((team, index) => this.renderTeam(team, index))}

				<div class={styles.block}>
					<button
						class={styles.submitButton}
						onClick={this.whenSubmit}
					>
						Поехали
					</button>
				</div>
			</form>
		)
	}
}
