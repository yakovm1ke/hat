import {VueComponent, Component, Prop} from '@/types'
import {useStore, RootModule} from '@/store/root'

import styles from './index.module.css'
import { Button } from '../button'
import { VNode } from 'vue'

export interface CounterProps {
	whenDecrement: () => void
	whenIncrement: () => void
	value: string | number
	totalValue?: string | number
}

@Component
export class Counter extends VueComponent<CounterProps> {

	private readonly store = useStore<RootModule>(this.$store)

	@Prop() private readonly whenDecrement: CounterProps['whenDecrement']

	@Prop() private readonly whenIncrement: CounterProps['whenIncrement']

	@Prop() private readonly value: CounterProps['value']

	@Prop() private readonly totalValue: CounterProps['totalValue']

	public render(): VNode {
		return (
			<div class={styles.row}>
				<div class={styles.counterButtons}>
					<Button
						type={'ghost'}
						whenClick={this.whenIncrement}
						class={styles.incrementButton}
					>
						+
					</Button>
					<Button
						type={'ghost'}
						class={styles.decrementButton}
						whenClick={this.whenDecrement}
					>
						-
					</Button>
				</div>

				<div class={styles.value}>
					{this.value}
					{this.totalValue && (
						<span class={styles.totalValue}>/{this.totalValue}</span>
					)}
				</div>
			</div>
		)
	}
}
