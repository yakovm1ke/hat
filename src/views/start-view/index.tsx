import { VNode } from 'vue'
import { VueComponent, Component } from '@/types'
import { PlayersCounter } from '@/components/start/players-counter'
import { SelectTeam } from '@/components/start/select-team'
import { WordsCounter } from '@/components/start/words-counter'
import { useStore, RootModule } from '@/store/root'
import { Block, Button, Page } from '@/components/ui'

@Component<StartView>({})

export class StartView extends VueComponent {

	private readonly store = useStore<RootModule>(this.$store)

	private get playersNumber() {
		return this.store.players.playersNumber
	}

	private get teamsSet() {
		return this.store.teams.teamsSet
	}

	private whenSubmit() {
		if (!this.teamsSet) return

		this.$router.push({
			name: 'record-words',
			params: {
				player: '1',
			},
		})
	}

	public render(): VNode {
		return (
			<Page title={'Начнем'}>
				<Block title={'Выберите число игроков'} >
					От 4 до 9 (от 2 до 4 команд)
				</Block>

				<Block>
					<PlayersCounter />
				</Block>

				<Block title={'Выберите число команд'}/>

				<Block>
					<SelectTeam />
				</Block>

				{this.teamsSet && (
					<Block title={'Выберите число слов на игрока'}>
						От 4 до 6
					</Block>
				)}

				{this.teamsSet && (
					<Block>
						<WordsCounter />
					</Block>
				)}

				{this.teamsSet && (
					<Block>
						<Button
							spread
							type={'submit'}
							whenClick={this.whenSubmit}
						>
								Придумать слова
						</Button>
					</Block>
				)}
			</Page>
		)
	}
}
