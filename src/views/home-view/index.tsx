import { Block, Button, TextBlock, Page} from '@/components/ui'
import { VueComponent, Component } from '@/types'
import { instructions } from '@/assets/texts'

@Component
export class HomeView extends VueComponent {

	private whenClickHandler() {
		this.$router.push('/start')
	}

	// TODO Убрать скроллбар

	public render() {
		return (
			<Page title={'Шляпа'}>
				{instructions.map((instruction, index) => (
					<TextBlock
						key={index}
						title={instruction.title}
						content={instruction.content}
					/>
				))}

				<Block>
					<Button
						spread
						whenClick={this.whenClickHandler}
					>
						Начать
					</Button>
				</Block>
			</Page>
		)
	}
}
