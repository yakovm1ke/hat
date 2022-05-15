import {VueComponent, Component, Prop} from '@/types'

import styles from './index.module.css'

type Props = {
	value: string
	whenChange: (value: string) => void
	placeholder?: string
}

@Component
export class Input extends VueComponent<Props> {
	@Prop() value: Props['value']
	@Prop() placeholder: Props['placeholder']
	@Prop() whenChange: Props['whenChange']

	render() {
		return (
			<input
				value={this.value}
				onInput={(event: InputEvent) => this.whenChange((event.target as HTMLInputElement).value)}
				class={styles.input}
				placeholder={this.placeholder}
			/>
		)
	}
}