import { VueComponent, Component, Watch } from '@/types'
import { VNode } from 'vue'
import { useStore, RootModule } from '@/store/root'

import styles from './index.module.css'
import { Input } from '@/components/ui/input'
import { Block, Button, Page } from '@/components/ui'

const REF_INPUT_NAME = 'input'

@Component<RecordWordsView>({
	mounted() {
		if (!this.store.teams.teamsSet) {
			this.$router.push({
				name: 'error',
			})
		}
	},
})

export class RecordWordsView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private currentInputIndex = 0

	private get currentPlayer(): number {
		return (+this.$route.params.player) - 1
	}

	private get playersNumber() {
		return this.store.players.playersNumber
	}

	private get wordsNumber() {
		return this.store.words.wordsNumber
	}

	private get words() {
		return this.store.words.words
	}

	private get players() {
		return this.store.players.players
	}

	private get isLastPlayer() {
		return this.currentPlayer + 1 === this.playersNumber
	}

	private get isValid() {
		let i = this.currentPlayer * this.wordsNumber
		let isWordsValid = true

		while(i < this.currentPlayer * this.wordsNumber + this.wordsNumber && isWordsValid) {
			if (!this.words[i]) isWordsValid = false
			i++
		}

		return !!this.players[this.currentPlayer] && isWordsValid
	}

	private setWord(key: number, value: string) {
		this.store.words.setWord({key, value})
	}

	private setPlayer(value: string) {
		this.store.players.setPlayer({
			key: this.currentPlayer,
			value,
		})
	}

	private nextPlayer() {
		this.$router.push({
			name: 'record-words',
			params: {
				player: String(this.currentPlayer + 2),
			},
		})

		this.currentInputIndex = 0
		;(this?.$refs?.[`${REF_INPUT_NAME}0`] as Input).focus()
	}

	private whenEnterPress(event: KeyboardEvent) {
		if (this.currentInputIndex === 0 && !this.players[this.currentPlayer]) return

		if (
			this.currentInputIndex > 0
			&& !this.words[this.currentInputIndex - 1 + this.currentPlayer * this.wordsNumber]
		) return

		if (event.code !== 'Enter') return

		if (this.currentInputIndex < this.wordsNumber) {
			this.currentInputIndex++
		}

		if (this.currentInputIndex === this.wordsNumber) {
			this.whenSubmit()
		}
	}

	@Watch('currentInputIndex')
	private whenCurrentInputIndexChange(currentInputIndex: number) {
		(this?.$refs?.[`${REF_INPUT_NAME}${currentInputIndex}`] as Input).focus()
	}

	private whenSubmit() {
		if(!this.isValid) return

		if (this.isLastPlayer) {
			this.store.words.setRemainedWords(this.words)

			this.store.players.shufflePlayers()

			this.$router.push({
				name: 'teams',
			})
			return
		}

		this.nextPlayer()
	}

	public renderWordInputs(): VNode[] {

		const wordInputs: VNode[] = []

		for (let i = 0; i < this.wordsNumber; i++) {
			const key = i + this.currentPlayer * this.wordsNumber

			wordInputs.push(
				<Input
					class={styles.input}
					whenKeydown={this.whenEnterPress}
					whenFocus={() => this.currentInputIndex = i + 1}
					ref={`${REF_INPUT_NAME}${i + 1}`}
					value={this.words[key]}
					whenChange={(value) => this.setWord(key, value)}
					invalid={!this.words[key]}
					placeholder={`Введи слово ${i + 1}`}
				/>,
			)
		}

		return wordInputs
	}

	public render(): VNode {
		return (
			<Page
				title={
					<div>
						Игрок{' '}
						<span class={styles.ghostText}>
							{this.currentPlayer + 1}/{this.playersNumber}
						</span>
					</div>
				}
			>
				<Block title={'Как тебя зовут?'} />

				<Input
					class={styles.input}
					whenFocus={() => this.currentInputIndex = 0}
					ref={`${REF_INPUT_NAME}0`}
					whenKeydown={this.whenEnterPress}
					value={this.players[this.currentPlayer]}
					whenChange={(value) => this.setPlayer(value)}
					invalid={!this.players[this.currentPlayer]}
					placeholder={'Введи свое имя'}
				/>

				<Block title={'Твои слова:'}/>

				{this.renderWordInputs()}

				{this.isValid && (
					<Block>
						<Button
							spread
							type={'submit'}
							whenClick={this.whenSubmit}
						>
							{this.isLastPlayer ? 'К командам' : 'Следующий'}
						</Button>
					</Block>
				)}
			</Page>
		)
	}
}
