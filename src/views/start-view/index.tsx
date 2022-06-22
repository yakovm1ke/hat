import { VueComponent, Component } from '@/types'
import { PlayersCount } from '@/components/players-count'
import { SelectTeam } from '@/components/select-team'
import { WordsCount } from '@/components/words-count'
import { useStore, RootModule } from '@/store/root'

import styles from './index.module.css'
import { LocalStorageItems } from '@/core/consts'

@Component
export class StartView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get isValid() {
		return !!this.store.teams.teamsSet
	}

	private get totalWords() {
		return this.store.words.totalWords
	}

	private whenSubmit() {
		if (!this.isValid) return

		const totalPlayers = String(this.store.players.totalPlayers)

		const teamSet = JSON.stringify(this.store.teams.teamsSet)

		window.localStorage.setItem(LocalStorageItems.TotalPlayers, totalPlayers)

		window.localStorage.setItem(LocalStorageItems.TeamsSet, teamSet)

		this.$router.push({
			path: '/input-words',
		})
	}

	private whenFormSubmit(event: Event) {
		event.preventDefault()
	}

	public render() {
		return (
			<form onSubmit={this.whenFormSubmit} >
				<div class={styles.bigTitle}>
					Начнем
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Выберите число игроков
					</div>
					<div class={styles.subText}>
						От 4 до 9 (от 2 до 4 команд)
					</div>
				</div>

				<div class={styles.block}>
					<PlayersCount />
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Выберите число команд
					</div>
				</div>

				<div class={styles.block}>
					<SelectTeam />
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Выберите число слов на игрока
					</div>
					<div class={styles.subText}>
						От 4 до 6
					</div>
				</div>

				<div class={styles.block}>
					<WordsCount />
				</div>

				{this.isValid && (
					<div class={styles.block}>
						<div class={styles.mainText}>
							Общее число слов:{' '}
							<span class={styles.highlightedText}>
								{this.totalWords}
							</span>
						</div>
					</div>
				)}

				{this.isValid && (
					<div class={styles.block}>
						<button
							class={styles.submitButton}
							onClick={this.whenSubmit}
						>
							Придумать слова
						</button>
					</div>
				)}
			</form>
		)
	}
}
