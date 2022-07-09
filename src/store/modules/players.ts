import { shuffle } from '@/helpers/shuffle-array'
import Vue from 'vue'
import { State, Mutation } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export class PlayersModule extends BaseModule {

	@State()
	playersNumber = 4

	@Mutation()
	setPlayersNumber(value: number) {
		if (value < 4) return
		if (value > 9) return

		this.playersNumber = value
	}

	@State()
	players: string[] = []

	@Mutation()
	setPlayer({key, value}: {
		key: number,
		value: string,
	}) {
		Vue.set(this.players, key, value)
	}

	@State()
	shuffledPlayers: string[] = []

	@Mutation()
	shufflePlayers() {
		this.shuffledPlayers = shuffle([...this.players])
	}
}
