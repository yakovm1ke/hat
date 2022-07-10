import { shuffle } from '@/helpers/shuffle-array'
import Vue from 'vue'
import { State, Mutation } from 'vuex-simple'
import { BaseModule } from '../common/base-module'

export type IPlayers = string[]

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
	players: IPlayers = []

	@Mutation()
	setPlayer({key, value}: {
		key: number,
		value: string,
	}) {
		Vue.set(this.players, key, value)
	}

	@Mutation()
	setPlayers(value: IPlayers) {
		this.players = value
	}

	@State()
	shuffledPlayers: IPlayers = []

	@Mutation()
	setShuffledPlayers(value: IPlayers) {
		this.shuffledPlayers = value
	}

	@Mutation()
	shufflePlayers() {
		this.shuffledPlayers = shuffle([...this.players])
	}
}
