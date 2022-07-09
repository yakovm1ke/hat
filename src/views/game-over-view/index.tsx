import { Page } from '@/components/ui'
import { VueComponent, Component } from '@/types'
import { VNode } from 'vue'

@Component<GameOverView>({})

export class GameOverView extends VueComponent {

	public render(): VNode {
		return (
			<Page>

			</Page>
		)
	}
}
