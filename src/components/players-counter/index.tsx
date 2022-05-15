import {VueComponent, Component} from '@/types'
import { useStore } from 'vuex-simple'
import { HatStore } from '@/store/store'

import styles from './index.module.css'

@Component
export class PlayersCounter extends VueComponent {
	public store: HatStore = useStore(this.$store)

	get playersCount() {
		return this.store.playersCount
	}

	set playersCount(value: number) {
		this.store.setPlayersCount(value)
	}

	render() {
		return (
			<div class={styles.row}>
				<button
					class={styles.button}
					onClick={() => this.playersCount--}
				>
					-
				</button>
				<button
					class={styles.button}
					onClick={() => this.playersCount++}
				>
					+
				</button>
				<div class={styles.number}>
					{this.playersCount}
				</div>
			</div>
		)
	}
}