import { VueComponent, Component, Prop } from '@/types'
import { VNode } from 'vue'
import { Block } from '@/components/ui'
import { ITeam } from '@/store/modules/teams'

import styles from './index.module.css'

export interface TeamProps {
	team: ITeam
	teamIndex?: number
}

@Component
export class Team extends VueComponent<TeamProps> {

	@Prop() private readonly team: TeamProps['team']

	@Prop() private readonly teamIndex: TeamProps['teamIndex']

	public render(): VNode {
		return (
			<Block
				title={this.teamIndex !== undefined ? `Команда ${this.teamIndex + 1}` : undefined}
				class={styles.team}
			>
				<div class={styles.players}>
					{this.team.map((teamPlayer, index) => (
						<div
							key={`${this.teamIndex}/${index}`}
							class={styles.player}
						>
							{teamPlayer}
						</div>
					))}
				</div>
			</Block>
		)
	}
}
