import { Block, Button, Page } from '@/components/ui'
import { RootModule, useStore } from '@/store/root'
import { VueComponent, Component } from '@/types'

@Component
export class ReadyView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get stage() {
		return this.store.game.stage
	}

	private get currentTeamIndex() {
		return this.store.game.currentTeamIndex
	}

	private get currentTeamSting(): string | void {
		return this.store.game.currentTeam?.join(', ')
	}

	private get currentTeam() {
		return this.store.game.currentTeam
	}

	private get currentPlayer() {
		return this.store.game.currentPlayer
	}

	private get remainedWords() {
		return this.store.words.remainedWords
	}

	private get currentTeamGuessedWords() {
		return this.store.game.currentTeamGuessedWords
	}

	private whenClickHandler() {
		this.$router.push({
			name: 'move',
		})
	}

	public render() {
		return (
			<Page title={'Готовы?'}>
				<Block title={'Этап'}>
					{this.stage}
				</Block>

				<Block title={'Играет'}>
					Команда {this.currentTeamIndex + 1}
				</Block>

				<Block title={'Участники'}>
					{this.currentTeamSting
						? this.currentTeamSting
						: 'Пусто'
					}
				</Block>

				<Block title={'Начинает'}>
					{this.currentPlayer
						? this.currentPlayer
						: 'Пусто'
					}
				</Block>

				<Block title={'Осталось слов'}>
					{this.remainedWords.length}
				</Block>

				<Block title={'Команда угадала'}>
					{this.currentTeamGuessedWords?.length}
				</Block>

				<Block>
					<Button
						spread
						whenClick={this.whenClickHandler}
					>
						Играть
					</Button>
				</Block>
			</Page>
		)
	}
}
