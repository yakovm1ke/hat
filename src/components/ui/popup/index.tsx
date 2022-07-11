import { Component, VueComponent, Prop, Ref } from '@/types'
import { VNode } from 'vue'
import styles from './index.module.css'

type PopupProps = {
	title: string
	isShow: boolean
	whenClose: () => void
	closable?: boolean
}

@Component
export class Popup extends VueComponent<PopupProps> {

	@Prop() private readonly title: PopupProps['title']

	@Prop() private readonly isShow: PopupProps['isShow']

	@Prop() private readonly whenClose: PopupProps['whenClose']

	@Prop({default: true}) private readonly closable: PopupProps['closable']

	@Ref() private readonly container!: HTMLDivElement

	private whenClickOutside(event: PointerEvent) {
		if (
			this.closable
			&& this.container !== event.target
			&& !this.container?.contains(event.target as Node)
		) this.whenClose()
	}

	public render(): VNode | void {
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
						<div>
							{this.title}
						</div>
						{ this.closable &&(
							<div
								class={styles.closeButton}
								onClick={this.whenClose}
							>
								&#10005;
							</div>
						)}
					</div>

					{this.$slots.default}
				</div>
			</div>
		)
	}
}
