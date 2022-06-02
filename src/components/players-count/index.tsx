import {VueComponent, Component} from '@/types'
import { useStore } from 'vuex-simple'
import { Store } from '@/store/store'

import styles from './index.module.css'

@Component
export class PlayersCount extends VueComponent {
	public store: Store = useStore(this.$store)

	get totalPlayers() {
		return this.store.totalPlayers
	}

	set totalPlayers(value: number) {
		this.store.setPlayersCount(value)
	}

	render() {
		return (
			<div class={styles.row}>
				<button
					class={styles.button}
					onClick={() => this.totalPlayers--}
				>
					-
				</button>
				<button
					class={styles.button}
					onClick={() => this.totalPlayers++}
				>
					+
				</button>
				<div class={styles.number}>
					{this.totalPlayers}
				</div>
			</div>
		)
	}
}