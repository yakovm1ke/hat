import { Block, Button, Page } from '@/components/ui'
import { useStore, RootModule } from '@/store/root'
import { VueComponent, Component, Watch } from '@/types'
import { VNode } from 'vue'

const ONE_SECOND_IN_MILLISECOND = 1000

import styles from './index.module.css'

@Component<MoveView>({
	created() {
		this.timerId = setInterval(() => {
			this.store.game.decrementTimeLeft()
		}, ONE_SECOND_IN_MILLISECOND)
	},
	mounted() {
		// TODO проверка, если есть слова и игроки
	},
})

export class MoveView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private timerId: number | null = null

	private currentWordsGuessed = 0

	private get stage() {
		return this.store.game.stage
	}

	private get remainedWords() {
		return this.store.words.remainedWords
	}

	private get timeLeft() {
		return this.store.game.timeLeft
	}

	private whenGuessedHandler() {
		// TODO проверяем если слова закончились, тогда сохраняем оставшееся время на следующий период
		this.store.words.addGuessedWord()
		this.currentWordsGuessed++
	}

	@Watch('timeLeft')
	whenTimeLeft(timeLeft: number) {
		if (timeLeft === 0 && this.timerId !== null) {
			clearInterval(this.timerId)
		}
	}

	public render(): VNode {
		return (
			<Page>
				<Block title={this.stage}></Block>

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
						whenClick={() => {}}
						spread
					>
						Пропустить ход
					</Button>
				</Block>

			</Page>
		)
	}
}
