import Vue, { VNodeData } from 'vue';
import { Component } from 'vue-property-decorator'

type CSSClass = (string | string[] | {
	[key: string]: any
})

type Style = VNodeData['style']

@Component
export class VueComponent<P = {}> extends Vue {
	public $props!: P & {
		key?: string | number,
		class?: CSSClass | CSSClass[]
		style?: Style
		ref?: VNodeData['ref']
	}
}