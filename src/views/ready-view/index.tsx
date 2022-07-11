import { Block, Button, Page, Popup } from '@/components/ui'
import { MOVE_TIME_IN_SECONDS } from '@/core/consts'
import { LocalStorageMixin } from '@/mixins/local-storage-mixin'
import { Component } from '@/types'
import styles from './index.module.css'

@Component<ReadyView>({
	mounted() {
		this.getGameConfig()
		this.getMoveConfig()

		if (!this.store.configurations.isGameConfigured) {
			this.$router.push({
				name: 'home',
			})
		}

		if (!this.store.configurations.isMoveConfigured) {
			this.isPopupShown = true
		}
	},
})

export class ReadyView extends LocalStorageMixin {

	private isPopupShown = false

	private isConfirmationPopupShown = false

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

	private get currentTeamGuessedWords() {
		return this.store.game.currentTeamGuessedWords
	}

	private whenClickHandler() {
		this.store.words.shuffleRemainedWords()

		this.setMoveConfig()

		this.$router.push({
			name: 'move',
		})
	}

	private whenLoadGameClick() {
		this.setMoveConfigIfGameConfigExist()
		this.isPopupShown = false
		this.isConfirmationPopupShown = false
	}

	private whenOpenConfirmationClick() {
		this.isPopupShown = false
		this.isConfirmationPopupShown = true
	}

	private whenSubmitCloseClick() {
		this.removeGameConfig()
		this.removeMoveConfig()

		this.$router.push({
			name: 'home',
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

				<Block title={
					this.timeLeft === MOVE_TIME_IN_SECONDS
						? 'Время на ход'
						: 'Осталось времени'
				}>
					{`${this.timeLeft} сек`}
				</Block>

				<Block>
					<Button
						spread
						whenClick={this.whenClickHandler}
					>
						Играть
					</Button>
				</Block>

				<Popup
					closable={false}
					title={'У вас есть сохраненная сессия'}
					isShow={this.isPopupShown}
					whenClose={() => this.isPopupShown = false}
				>
					<div class={styles.popup}>
						<div class={styles.popupButtons}>
							<Button
								spread
								type={'submit'}
								whenClick={this.whenLoadGameClick}
							>
								Загрузить
							</Button>
							<Button
								class={styles.alertButton}
								spread
								type={'basic'}
								whenClick={this.whenOpenConfirmationClick}
							>
								Закрыть
							</Button>
						</div>
					</div>
				</Popup>

				<Popup
					closable={false}
					title={'Вы уверены?'}
					isShow={this.isConfirmationPopupShown}
					whenClose={() => this.isPopupShown = false}
				>
					<div class={styles.popup}>
						Все сохраненные данные будут стерты
						<div class={styles.popupButtons}>
							<Button
								spread
								class={styles.alertButton}
								whenClick={this.whenSubmitCloseClick}
							>
								Стереть
							</Button>
							<Button
								spread
								type={'basic'}
								whenClick={this.whenLoadGameClick}
							>
								Отмена
							</Button>
						</div>
					</div>
				</Popup>
			</Page>
		)
	}
}
