import { VueComponent, Component } from '@/types'
import { VNode } from 'vue'
import { useStore, RootModule } from '@/store/root'

import styles from './index.module.css'
import { Input } from '@/components/input'
import { LocalStorageItems } from '@/core/consts'

@Component
export class InputWordsView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get totalPlayers() {
		return this.store.players.totalPlayers
	}

	private get wordsCount() {
		return this.store.words.wordsCount
	}

	private get words() {
		return this.store.words.words
	}

	private setWord(key: number, value: string) {
		this.store.words.setWord({key, value})
	}

	private get players() {
		return this.store.players.players
	}

	private setPlayer(value: string) {
		this.store.players.setPlayer({
			key: this.currentPlayer,
			value,
		})
	}

	private get currentPlayer() {
		return this.store.players.currentInputPlayer
	}

	private get isLastPlayer() {
		return this.currentPlayer + 1 === this.totalPlayers
	}

	private get isValid() {
		let i = this.currentPlayer * this.wordsCount
		let isWordsValid = true

		while(i < this.currentPlayer * this.wordsCount + this.wordsCount && isWordsValid) {
			if (!this.words[i]) isWordsValid = false
			i++
		}

		return !!this.players[this.currentPlayer] && isWordsValid
	}

	private nextPlayer() {
		this.store.players.incrementCurrentInputPlayer()
	}

	private mounted() {
		if (!this.store.teams.teamsSet) {
			this.$router.push({
				path: '/error'
			})
		}
	}

	private whenSubmit() {
		if(!this.isValid) return

		const players = JSON.stringify(this.store.players.players)

		const words = JSON.stringify(this.store.words.words)

		window.localStorage.setItem(LocalStorageItems.Players, players)

		window.localStorage.setItem(LocalStorageItems.Words, words)

		if (this.isLastPlayer) {
			this.store.words.shuffleWords()
			this.store.players.shufflePlayers()

			this.$router.push({
				path: 'teams'
			})
			return
		}
		this.nextPlayer()
	}

	private whenFormSubmit(event: Event) {
		event.preventDefault()
		this.whenSubmit()
	}

	public renderWords() {
		const wordInputs: VNode[] = []

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

	public render() {
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
						ref='name'
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
