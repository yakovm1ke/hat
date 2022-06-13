import { RootModule } from '../root'

export class BaseModule {

	protected root: RootModule

	constructor(root: RootModule) {
		this.root = root
	}
}