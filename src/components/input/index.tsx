import {VueComponent, Component, Prop} from '@/types'

import styles from './index.module.css'

type Props = {
	value: string
	whenChange: (value: string) => void
	invalid: boolean
	placeholder?: string
}

@Component
export class Input extends VueComponent<Props> {
	@Prop() value: Props['value']
	@Prop() whenChange: Props['whenChange']
	@Prop() invalid: Props['invalid']
	@Prop() placeholder: Props['placeholder']

	render() {
		return (
			<input
				value={this.value}
				onInput={(event: InputEvent) => this.whenChange((event.target as HTMLInputElement).value)}
				class={[styles.input, {[styles.invalid]: this.invalid}]}
				placeholder={this.placeholder}
			/>
		)
	}
}