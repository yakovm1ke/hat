import { Module } from 'vuex-simple'

import { WordsModule } from './modules/words'
import { TeamsModule } from './modules/teams'
import { PlayersModule } from './modules/players'
import { GameModule } from './modules/game'
export { useStore } from 'vuex-simple'

export class RootModule {

	@Module()
	public words = new WordsModule(this)

	@Module()
	public teams = new TeamsModule(this)

	@Module()
	public players = new PlayersModule(this)

	@Module()
	public game = new GameModule(this)
}
