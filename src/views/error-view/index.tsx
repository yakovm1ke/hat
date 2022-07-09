import { Block, Button, Page } from '@/components/ui'
import { VueComponent, Component } from '@/types'
import { VNode } from 'vue'

@Component<ErrorView>({})

export class ErrorView extends VueComponent {

	private whenClickHandler() {
		this.$router.push({
			name: 'home',
		})
	}

	public render(): VNode {
		return (
			<Page
				title={'Ошибка'}
			>
				<Block title={'Что-то пошло не так, попробуйте начать сначала'} />

				<Block>
					<Button
						spread
						whenClick={this.whenClickHandler}
					>
						В начало
					</Button>
				</Block>
			</Page>
		)
	}
}
