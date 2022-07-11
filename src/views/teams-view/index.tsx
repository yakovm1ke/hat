import { Component } from '@/types'
import {RootModule, useStore} from '@/store/root'
import { Block, Button, Page } from '@/components/ui'
import { Team } from '@/components/team'
import { LocalStorageMixin } from '@/mixins/local-storage-mixin'

@Component<TeamsView>({
	mounted() {
		if (!this.teamsModule.teamsSet) {
			this.$router.push({
				name: 'error',
			})
		}
	},
})

export class TeamsView extends LocalStorageMixin {

	private readonly teamsModule = useStore<RootModule>(this.$store).teams

	private get teams() {
		return this.teamsModule.teams
	}

	private whenSubmit() {
		this.setGameConfig()

		this.$router.push({
			name: 'ready',
		})
	}

	public render() {
		return (
			<Page title={'Команды'}>
				{this.teams.length > 0
					? this.teams?.map((team, index) => (
						<Team
							key={index}
							team={team}
							teamIndex={index}
						/>
					)) : <Block title={'Нет команд'} />
				}

				<Block>
					<Button
						spread
						whenClick={this.whenSubmit}
					>
						Дальше
					</Button>
				</Block>
			</Page>
		)
	}
}
