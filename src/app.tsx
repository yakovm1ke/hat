import { VueComponent, Component} from '@/types'
import '@/assets/css/main.css'
import 'normalize.css'

import styles from './app.module.css'

@Component
export class App extends VueComponent {
	public render() {
		return (
			<div class={styles.app}>
				<div class={styles.container}>
					<router-view/>
				</div>
			</div>
		)
	}
}
