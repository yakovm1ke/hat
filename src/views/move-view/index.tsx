import { Block, Button, Page } from '@/components/ui'
import { GUESSED_WORDS_QUERY_PARAM, MOVE_TIME_IN_SECONDS } from '@/core/consts'
import { LocalStorageMixin } from '@/mixins/local-storage-mixin'
import { Component, Watch } from '@/types'
import { VNode } from 'vue'

const ONE_SECOND_IN_MILLISECOND = 1000

import styles from './index.module.css'

@Component<MoveView>({
	mounted() {
		this.getGameConfig()
		this.getMoveConfig()

		if (!this.store.configurations.isGameConfigured) {
			this.$router.push({
				name: 'home',
			})
		}

		if (!this.store.configurations.isMoveConfigured) {
			this.$router.push({
				name: 'ready',
			})
		}

		this.timerId = setInterval(() => {
			this.store.game.decrementTimeLeft()
			this.setMoveConfig()
		}, ONE_SECOND_IN_MILLISECOND)
	},
	beforeDestroy() {
		if (this.timerId) {
			clearInterval(this.timerId)
		}
	},
})

export class MoveView extends LocalStorageMixin {

	// TODO переработать
	private currentWordsGuessed = 0

	private whenGuessedHandler() {
		// TODO переработать

		if (this.timerId === null) return

		this.currentWordsGuessed++

		if (this.remainedWords.length === 1) {
			clearInterval(this.timerId)

			this.store.game.nextStage()

			this.setMoveConfig()

			// TODO окно промежуточного этапа

			this.$router.push({
				name: 'move-end',
				query: {
					[GUESSED_WORDS_QUERY_PARAM]: String(this.currentWordsGuessed),
				},
			})
		}

		this.store.words.addGuessedWord()
	}

	private whenSkipHandler() {
		// TODO переработать

		if (this.timerId === null) return

		clearInterval(this.timerId)

		this.move++

		this.store.words.shuffleRemainedWords()

		this.timeLeft = MOVE_TIME_IN_SECONDS

		this.setMoveConfig()

		this.$router.push({
			name: 'move-end',
			query: {
				[GUESSED_WORDS_QUERY_PARAM]: String(this.currentWordsGuessed),
			},
		})
	}

	@Watch('timeLeft')
	whenTimeLeft(timeLeft: number) {
		if (timeLeft === 0 && this.timerId !== null) {
			// TODO переработать

			clearInterval(this.timerId)

			this.move++

			this.store.words.shuffleRemainedWords()

			this.timeLeft = MOVE_TIME_IN_SECONDS

			this.setMoveConfig()

			this.$router.push({
				name: 'move-end',
				query: {
					[GUESSED_WORDS_QUERY_PARAM]: String(this.currentWordsGuessed),
				},
			})
		}
	}

	public render(): VNode {
		return (
			<Page title={this.stage}>
				<Block>
					<div class={styles.currentWord}>
						{this.remainedWords[0] ?? '-'}
					</div>
				</Block>

				<Block title={'Осталось времени'}>
					{this.timeLeft}
				</Block>

				<Block title={'Осталось слов'}>
					{this.remainedWords.length}
				</Block>

				<Block title={'Угадали слов'}>
					{this.currentWordsGuessed}
				</Block>

				<Block>
					<Button
						type={'submit'}
						whenClick={this.whenGuessedHandler}
						spread
					>
						Угадали
					</Button>
				</Block>

				<Block>
					<Button
						type={'outline'}
						whenClick={this.whenSkipHandler}
						spread
					>
						Пропустить ход
					</Button>
				</Block>

			</Page>
		)
	}
}
