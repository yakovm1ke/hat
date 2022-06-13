import { Component, VueComponent, Prop } from '@/types'
import { VNode } from 'vue'
import styles from './index.module.css'

type PopupProps = {
	title: string
	content: VNode
	isShow: boolean
	whenClose: () => void
}

@Component
export class Popup extends VueComponent<PopupProps> {

	@Prop() private readonly title: PopupProps['title']

	@Prop() private readonly content: PopupProps['content']

	@Prop() private readonly isShow: PopupProps['isShow']

	@Prop() private readonly whenClose: PopupProps['whenClose']

	public render() {
		if (!this.isShow) return

		return (
			<div class={styles.popup}>
				<div class={styles.content}>
					<div class={styles.heading}>
						<div class={styles.title}>
							{this.title}
						</div>
						<div
							class={styles.closeButton}
							onClick={this.whenClose}
						>
							Close
						</div>
					</div>
					{this.content}
				</div>
			</div>
		)
	}
}