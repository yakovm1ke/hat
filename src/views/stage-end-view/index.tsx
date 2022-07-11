import { Block, Button, Page } from '@/components/ui'
import { LocalStorageMixin } from '@/mixins/local-storage-mixin'
import { Component } from '@/types'
import { VNode } from 'vue'

@Component<StageEndView>({
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

export class StageEndView extends LocalStorageMixin {

	private get teams() {
		return this.store.teams.teams
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
			<Page title={'Конец этапа'}>
				<Block title={'Команды угадали'}>
					{this.teams.map((team, index) => (
						<div key={index}>
							{`${team.join(', ')} - ${this.guessedTeamsWords[index]}`}
						</div>
					))}
				</Block>

				<Block title={'Следующий этап'}>
					{this.stage}
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
