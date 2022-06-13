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

	@Prop() private readonly value: Props['value']

	@Prop() private readonly whenChange: Props['whenChange']

	@Prop() private readonly invalid: Props['invalid']

	@Prop() private readonly placeholder: Props['placeholder']

	public render() {
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