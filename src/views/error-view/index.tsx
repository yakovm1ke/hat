import { VueComponent, Component } from '@/types'

import styles from './index.module.css'

@Component
export class ErrorView extends VueComponent {

	private whenClickHandler() {
		this.$router.push({
			path: '/'
		})
	}

	public render() {
		return (
			<div>
				<div class={styles.bigTitle}>
					Ошибка
				</div>

				<div class={styles.block}>
					<div class={styles.mainText}>
						Что-то пошло не так, попробуйте начать сначала
					</div>
				</div>

				<div class={styles.block}>
					<button
						class={styles.submitButton}
						onClick={this.whenClickHandler}
					>
						В начало
					</button>
				</div>
			</div>
		)
	}
}