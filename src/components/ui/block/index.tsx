import { VueComponent, Component, Prop } from '@/types'
import { VNode } from 'vue'

import styles from './index.module.css'

interface ContentItem {
	text?: string | VNode
	type?: 'basic' | 'highlighted' | 'ghost'
	isHtml?: boolean
}

export interface PageBlock {
	title?: string
	content?: ContentItem | ContentItem[]
}

type BlockProps = PageBlock

@Component<Block>({})
export class Block extends VueComponent<BlockProps> {

	@Prop() private readonly title: BlockProps['title']

	@Prop() private readonly content: BlockProps['content']

	private getContentItemClass(	type?: 'basic' | 'highlighted' | 'ghost' ) {
		switch(type) {
		case('highlighted'):
			return [styles.highlighted]
		case('basic'):
			return [styles.text]
		default:
			return [styles.ghost]
		}
	}

	private renderContentItem(contentItem?: ContentItem) {
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

	public render() {
		return (
			<div class={styles.block}>
				{this.title && (
					<div class={styles.title}>
						{this.title}
					</div>
				)}

				{Array.isArray(this.content)
					? this.content
						.map(contentItem => (
							this.renderContentItem(contentItem)
						))
					: (
						this.renderContentItem(this.content)
					)
				}
			</div>
		)
	}
}
