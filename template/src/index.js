import { registerBlockType } from '@wordpress/blocks';
const { Component } = wp.element;
import { InnerBlocks } from '@wordpress/block-editor';

class ###nameC### extends Component {
	constructor() {
		super(...arguments);
	}


	render() {
		return (
				<h1>###name### Block</h1>
		);
	}
}

registerBlockType('###prefix###/###nameK###', {
	title: '###name###',
	icon: '',
	category: 'guter block',
	attributes: {},
	edit: ###nameC###,
	save() {
		return <InnerBlocks.Content />;
	}
});
