import { VueComponent, Component } from '@/types'
import { useStore, RootModule } from '@/store/root'
import { Counter } from '@/components/ui'
import { VNode } from 'vue'

@Component
export class PlayersCounter extends VueComponent {

	private readonly players = useStore<RootModule>(this.$store).players

	private get playersNumber() {
		return this.players.playersNumber
	}

	private set playersNumber(value: number) {
		this.players.setPlayersNumber(value)
	}

	public render(): VNode {
		return (
			<Counter
				value={this.playersNumber}
				whenIncrement={() => this.playersNumber++}
				whenDecrement={() => this.playersNumber--}
			/>
		)
	}
}
