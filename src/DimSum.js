import React, {Component} from 'react';
import EditorFactory from './EditorFactory';

let schema = {
	type: 'object',
	properties: {
		prop1: {
			type: 'string'
		},
		prop2: {
			type: 'string'
		}
	}
};

export default class DimSum extends Component {
	render() {
		return (
			<EditorFactory
				name="root"
				{...schema}
			/>
		);
	}
}
