import {Component, VueComponent, Prop } from '@/types'
import { VNode } from 'vue'

import styles from './index.module.css'

export interface ButtonProps {
	leftContent?: string | VNode
	rightContent?: string | VNode
	disabled?: boolean
	type?: 'basic' | 'outline' | 'ghost' | 'submit'
	spread?: boolean
	whenClick?: () => void
}

@Component<Button>({})
export class Button extends VueComponent<ButtonProps> {

	@Prop() private readonly leftContent: ButtonProps['leftContent']

	@Prop() private readonly rightContent: ButtonProps['rightContent']

	@Prop({default: false}) private readonly disabled: ButtonProps['disabled']

	@Prop({default: 'basic'}) private readonly type: ButtonProps['type']

	@Prop({default: false}) private readonly spread: ButtonProps['spread']

	@Prop() private readonly whenClick: ButtonProps['whenClick']

	get buttonClass() {
		const buttonClass: string[] = [styles.button]

		if (this.spread) buttonClass.push(styles.spreadButton)

		switch(this.type) {
		case('outline'):
			buttonClass.push(styles.outlineButton)
			break
		case('ghost'):
			buttonClass.push(styles.ghostButton)
			break
		case('submit'):
			buttonClass.push(styles.submitButton)
			break
		default:
			break
		}

		return buttonClass
	}

	public render() {
		return (
			<button
				class={this.buttonClass}
				disabled={this.disabled}
				onClick={this.whenClick}
			>
				{this.leftContent && (
					<div>
						{this.leftContent}
					</div>
				)}
				{this.$slots.default && (
					<div>
						{this.$slots.default}
					</div>
				)}
				{this.rightContent && (
					<div>
						{this.rightContent}
					</div>
				)}
			</button>
		)
	}
}
