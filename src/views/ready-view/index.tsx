import { RootModule, useStore } from '@/store/root'
import { VueComponent, Component } from '@/types'

import styles from './index.module.css'

@Component
export class ReadyView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get stage() {
		return this.store.game.stage
	}

	private get currentTeamIndex() {
		return this.store.game.currentTeamIndex
	}

	private get currentTeam() {
		return this.store.game.currentTeam
	}

	private get currentPlayer() {
		return this.store.game.currentPlayer
	}

	private whenClick() {
		this.$router.push({
			path: '/move',
		})
	}

	public render() {
		return (
			<div>
				<div class={styles.bigTitle}>
					Готовы?
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Этап
					</div>
					<div class={[styles.subText, styles.highlightedText]}>
						{this.stage}
					</div>
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Играет
					</div>
					<div class={[styles.subText, styles.highlightedText]}>
						{this.currentTeamIndex
							? this.currentTeamIndex + 1
							: 'Пусто'
						}
					</div>
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Участники
					</div>
					{this.currentTeam
						? this.currentTeam.map(player => <div class={styles.subText}>{player}</div>)
						: <div class={styles.subText}>Пусто</div>
					}
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Начинает
					</div>
					{this.currentPlayer
						? <div class={styles.subText}>{this.currentPlayer}</div>
						: <div class={styles.subText}>Пусто</div>
					}
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Осталось слов
					</div>
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Команда угадала
					</div>
				</div>

				<div class={styles.block}>
					<button
						class={styles.submitButton}
						onClick={this.whenClick}
					>
						Играть
					</button>
				</div>
			</div>
		)
	}
}