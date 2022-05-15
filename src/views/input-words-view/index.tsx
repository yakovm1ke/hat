import { VueComponent, Component } from '@/types';
import { useStore } from 'vuex-simple'
import { HatStore } from '@/store/store'

import styles from './index.module.css'
import { Input } from '@/components/input';

@Component
export class InputWordsView extends VueComponent {
	public store: HatStore = useStore(this.$store)

	get currentPlayer() {
		return this.store.currentInputPlayer
	}

	get totalPlayers() {
		return this.store.totalPlayers
	}

	get playerWordsCount() {
		return this.store.playerWordsCount
	}

	get isLastPlayer() {
		return this.currentPlayer + 1 === this.totalPlayers
	}

	nextPlayer() {
		this.store.incrementCurrentInputPlayer()
	}

	mounted() {
		// if (!this.store.teamsConfiguration) {
		// 	this.$router.push({
		// 		path: '/error'
		// 	})
		// }
	}

	whenClickHandler() {
		if (this.isLastPlayer) {
			return
			// this.$router.push({
			// 	path: '/'
			// })
		}
		this.nextPlayer()
	}

	render() {
		return (
			<div>
				<div class={styles.bigTitle}>
					Игрок{' '}
					<span class={styles.ghostText}>
						{this.currentPlayer + 1}/{this.totalPlayers}
					</span>
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Число слов от игрока:{' '}
						<span class={styles.highlightedText}>{this.totalPlayers}</span>
					</div>
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>Имя</div>
					<Input
						value=''
						whenChange={() => ''}
						placeholder='Введите свое имя'
					/>
				</div>

				<div class={styles.block}>
					<div class={styles.block}>
						<button
							class={styles.submitButton}
							onClick={this.whenClickHandler}
						>
							{this.isLastPlayer ? 'К командам' : 'Следующий'}
						</button>
					</div>
				</div>
			</div>
		)
	}
}