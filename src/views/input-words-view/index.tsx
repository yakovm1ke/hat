import { VueComponent, Component } from '@/types';
import { VNode } from 'vue';
import { useStore } from 'vuex-simple'
import { Store } from '@/store/store'

import styles from './index.module.css'
import { Input } from '@/components/input';

@Component
export class InputWordsView extends VueComponent {
	public store: Store = useStore(this.$store)

	get totalPlayers() {
		return this.store.totalPlayers
	}

	get wordsCount() {
		return this.store.wordsCount
	}

	get words() {
		return this.store.words
	}

	setWord(key: number, value: string) {
		this.store.setWord({key, value})
	}

	get players() {
		return this.store.players
	}

	setPlayer(value: string) {
		this.store.setPlayer({
			key: this.currentPlayer,
			value,
		})
	}

	get currentPlayer() {
		return this.store.currentInputPlayer
	}

	get isLastPlayer() {
		return this.currentPlayer + 1 === this.totalPlayers
	}

	get isValid() {
		let i = this.currentPlayer * this.wordsCount
		let isWordsValid = true
		while(i < this.currentPlayer * this.wordsCount + this.wordsCount && isWordsValid) {
			if (!this.words[i]) isWordsValid = false
			i++
		}

		return !!this.players[this.currentPlayer] && isWordsValid
	}

	nextPlayer() {
		this.store.incrementCurrentInputPlayer()
	}

	mounted() {
		if (!this.store.teamsSet) {
			this.$router.push({
				path: '/error'
			})
		}
	}

	whenSubmit() {
		if(!this.isValid) return

		if (this.isLastPlayer) {
			this.store.shuffleWords()
			this.store.shufflePlayers()

			this.$router.push({
				path: 'teams'
			})
		}
		this.nextPlayer()
	}

	whenFormSubmit(event: Event) {
		event.preventDefault()
		this.whenSubmit()
	}

	renderWords() {
		const wordInputs: VNode[] = [];

		for (let i = 0; i < this.wordsCount; i++) {
			const key = i + this.currentPlayer * this.wordsCount
			wordInputs.push(
				<Input
					value={this.words[key]}
					whenChange={(value) => this.setWord(key, value)}
					invalid={!this.words[key]}
					placeholder={`Введите слово ${i + 1}`}
				/>
			)
		}

		return wordInputs
	}

	render() {
		return (
			<form
				onSubmit={this.whenFormSubmit}
			>
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
						value={this.players[this.currentPlayer]}
						whenChange={(value) => this.setPlayer(value)}
						invalid={!this.players[this.currentPlayer]}
						placeholder={'Введите свое имя'}
					/>
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>Слова</div>
					{this.renderWords()}
				</div>

				<div class={styles.block}>
					<div class={styles.block}>
						{this.isValid && <button
							class={styles.submitButton}
							onClick={this.whenSubmit}
						>
							{this.isLastPlayer ? 'К командам' : 'Следующий'}
						</button>}
					</div>
				</div>
			</form>
		)
	}
}