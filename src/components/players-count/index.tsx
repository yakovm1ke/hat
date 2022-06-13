import {VueComponent, Component} from '@/types'
import {useStore, RootModule} from '@/store/root'

import styles from './index.module.css'

@Component
export class PlayersCount extends VueComponent {

	public store = useStore<RootModule>(this.$store)

	private get totalPlayers() {
		return this.store.players.totalPlayers
	}

	private set totalPlayers(value: number) {
		this.store.players.setPlayersCount(value)
	}

	public render() {
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