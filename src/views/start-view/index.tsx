import { VueComponent, Component } from '@/types';
import { PlayersCounter } from '@/components/players-counter';
import { SelectTeam } from '@/components/select-team';
import { PlayerWordsCounter } from '@/components/player-words-counter';
import { useStore } from 'vuex-simple'
import { HatStore } from '@/store/store'

import styles from './index.module.css'

@Component
export class StartView extends VueComponent {
	public store: HatStore = useStore(this.$store)

	get isTeamsConfigurationSelected() {
		return !!this.store.teamsConfiguration
	}

	render() {
		return (
			<div>
				<div class={styles.bigTitle}>
					Начнем
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Выберите число игроков
					</div>
					<div class={styles.subText}>
						От 4 до 9 (от 2 до 4 команд)
					</div>
				</div>

				<div class={styles.block}>
					<PlayersCounter />
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Выберите число команд
					</div>
				</div>

				<div class={styles.block}>
					<SelectTeam />
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Выберите число слов на игрока
					</div>
					<div class={styles.subText}>
						От 4 до 6
					</div>
				</div>

				<div class={styles.block}>
					<PlayerWordsCounter />
				</div>

				{this.isTeamsConfigurationSelected &&
					<div class={styles.block}>
						<router-link to='/'>
							<button class={styles.button}>
								Придумать слова
							</button>
						</router-link>
					</div>
				}
			</div>
		)
	}
}