import { VueComponent, Component } from '@/types';

import styles from './index.module.css'
import {Store, useStore} from '@/store'

@Component
export class TeamsView extends VueComponent {

	private store = useStore<Store>(this.$store)

	private get teamsSet() {
		return this.store.teamsSet
	}

	private get teams() {
		return this.store.teams
	}

	private mounted() {
		if (!this.store.teamsSet) {
			this.$router.push({
				path: '/error'
			})
		}
	}

	public render() {
		return (
			<form>
				<div class={styles.bigTitle}>
					Команды
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Число команд:{' '}
						<span class={styles.highlightedText}>
							{this.teamsSet?.length}
						</span>
					</div>
				</div>
			</form>
		)
	}
}