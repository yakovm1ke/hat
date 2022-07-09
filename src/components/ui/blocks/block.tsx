import { VueComponent, Component, Prop } from '@/types'
import { VNode } from 'vue'

import styles from './index.module.css'

export interface BlockProps {
	title?: string | VNode
}

@Component<Block>({})
export class Block extends VueComponent<BlockProps> {

	@Prop() private readonly title: BlockProps['title']

	public render() {
		return (
			<div class={styles.block}>
				{this.title && (
					<div class={styles.title}>{this.title}</div>
				)}

				{this.$slots.default && (
					<div class={styles.text}>
						{this.$slots.default}
					</div>
				)}
			</div>
		)
	}
}
