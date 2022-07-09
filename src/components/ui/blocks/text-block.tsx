import { VueComponent, Component, Prop } from '@/types'
import { VNode } from 'vue'
import { Block, BlockProps } from './block'

import styles from './index.module.css'

export interface IContentItem {
	text?: string | VNode | number
	type?: 'basic' | 'highlighted' | 'ghost'
	isHtml?: boolean
}

export interface TextBlockProps extends BlockProps {
	content?: IContentItem | IContentItem[]
}

@Component<TextBlock>({})
export class TextBlock extends VueComponent<TextBlockProps> {

	@Prop() private readonly title: TextBlockProps['title']

	@Prop() private readonly content: TextBlockProps['content']

	private getContentItemClass(type?: 'basic' | 'highlighted' | 'ghost' ) {
		switch(type) {
		case('highlighted'):
			return [styles.highlighted]
		case('basic'):
			return [styles.text]
		default:
			return [styles.ghost]
		}
	}

	private renderContentItem(contentItem?: IContentItem): VNode {
		return (
			contentItem?.isHtml
				?	(
					<div
						class={this.getContentItemClass(contentItem?.type)}
						domPropsInnerHTML={contentItem?.text ?? ''}
					/>
				)
				:	(
					<div class={this.getContentItemClass(contentItem?.type)}>
						{contentItem?.text ?? ''}
					</div>
				)
		)
	}

	public render(): VNode {
		return (
			<Block
				title={this.title}
			>
				{Array.isArray(this.content)
					? this.content
						.map(contentItem => (
							this.renderContentItem(contentItem)
						))
					: (
						this.renderContentItem(this.content)
					)
				}
			</Block>
		)
	}
}
