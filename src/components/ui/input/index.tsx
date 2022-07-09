import {VueComponent, Component, Prop, Ref} from '@/types'

import styles from './index.module.css'

type InputProps = {
	value: string
	whenChange: (value: string) => void
	whenKeydown?: (event: KeyboardEvent) => void
	whenFocus?: (event: FocusEvent) => void
	invalid?: boolean
	placeholder?: string
	disabled?: boolean
}

@Component
export class Input extends VueComponent<InputProps> {

	@Prop() private readonly value: InputProps['value']

	@Prop() private readonly whenChange: InputProps['whenChange']

	@Prop() private readonly invalid: InputProps['invalid']

	@Prop() private readonly placeholder: InputProps['placeholder']

	@Prop() private readonly disabled: InputProps['disabled']

	@Prop() private readonly whenKeydown: InputProps['whenKeydown']

	@Prop() private readonly whenFocus: InputProps['whenFocus']

	@Ref('input') private readonly input!: HTMLInputElement

	public focus() {
		this.input.focus()
	}

	public render() {
		return (
			<input
				ref={'input'}
				disabled={this.disabled ?? false}
				value={this.value}
				onInput={(event: InputEvent) => this.whenChange((event.target as HTMLInputElement).value)}
				onKeydown={(event: KeyboardEvent) => this.whenKeydown?.(event)}
				class={[styles.input, {[styles.invalid]: this.invalid ?? false}]}
				placeholder={this.placeholder}
				onFocus={(event: FocusEvent) => this.whenFocus?.(event)}
			/>
		)
	}
}
