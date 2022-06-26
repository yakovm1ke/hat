import { Component, VueComponent, Prop, Ref } from '@/types'
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

	@Ref() private readonly container!: HTMLDivElement

	private whenClickOutside(event: PointerEvent) {
		if (!(this.container === event.target || this.container?.contains(event.target as Node))) {
			this.whenClose()
		}
	}

	public render() {
		if (!this.isShow) return

		return (
			<div
				class={styles.popup}
				onClick={this.whenClickOutside}
			>
				<div
					class={styles.content}
					ref={'container'}
				>
					<div class={styles.heading}>
						<div class={styles.title}>
							{this.title}
						</div>
						<div
							class={styles.closeButton}
							onClick={this.whenClose}
						>
							&#10005;
						</div>
					</div>
					{this.content}
				</div>
			</div>
		)
	}
}