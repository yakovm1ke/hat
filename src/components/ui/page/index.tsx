import { VueComponent, Component, Prop } from '@/types'
import { VNode } from 'vue'

import styles from './index.module.css'

interface PageProps {
	title?: string | VNode
}

@Component
export class Page extends VueComponent<PageProps> {

	@Prop() private readonly title!: PageProps['title']

	public render() {
		return (
			<div class={styles.page}>
				<div class={styles.title}>{this?.title || ''}</div>

				{this.$slots.default}
			</div>
		)
	}
}
