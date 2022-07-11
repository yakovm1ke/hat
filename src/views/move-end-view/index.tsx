import { Block, Button, Page } from '@/components/ui'
import { GUESSED_WORDS_QUERY_PARAM } from '@/core/consts'
import { LocalStorageMixin } from '@/mixins/local-storage-mixin'
import { Component } from '@/types'
import { VNode } from 'vue'

@Component<MoveEndView>({
	mounted() {
		this.getGameConfig()
		this.getMoveConfig()

		if (!this.store.configurations.isGameConfigured) {
			this.$router.push({
				name: 'ready',
			})
		}

		if (!this.store.configurations.isMoveConfigured) {
			this.$router.push({
				name: 'home',
			})
		}
	},
})

export class MoveEndView extends LocalStorageMixin {

	private get previousTeamGuessedWords() {
		return this.$route.query[GUESSED_WORDS_QUERY_PARAM]
	}

	private get currentPlayer() {
		return this.store.game.currentPlayer
	}

	private whenSubmitHandler() {
		this.$router.push({
			name: 'ready',
		})
	}

	public render(): VNode {
		return (
			<Page title={'Конец хода'}>
				<Block title={'Угадали слов'}>
					{this.previousTeamGuessedWords}
				</Block>

				<Block title={'Осталось слов'}>
					{this.remainedWords.length}
				</Block>

				<Block title={'Дальше играет'}>
					{this.currentPlayer}
				</Block>

				<Block>
					<Button
						spread
						type={'submit'}
						whenClick={this.whenSubmitHandler}
					>
						Дальше
					</Button>
				</Block>
			</Page>
		)
	}
}
