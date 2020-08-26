/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Save from '../../../../../assets/src/block-editor/blocks/data-table/save';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Save { ...props } /> );
};

const attributes = {
	hasFixedLayout: true,
	head: [
		{
			cells: [
				{
					content: 'Version',
					tag: 'th',
				},
				{
					content: 'Jazz Musician',
					tag: 'th',
				},
				{
					content: 'Release Date',
					tag: 'th',
				},
			],
		},
	],
	body: [
		{
			cells: [
				{
					content: '5.2',
					tag: 'td',
				},
				{
					content: 'Jaco Pastorius',
					tag: 'td',
				},
				{
					content: 'May 7, 2019',
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: '5.1',
					tag: 'td',
				},
				{
					content: 'Betty Carter',
					tag: 'td',
				},
				{
					content: 'February 21, 2019',
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: '5.0',
					tag: 'td',
				},
				{
					content: 'Bebo Valdés',
					tag: 'td',
				},
				{
					content: 'December 6, 2018',
					tag: 'td',
				},
			],
		},
	],
	foot: [
		{
			cells: [
				{
					content: 'Footer Col 1',
					tag: 'td',
				},
				{
					content: 'Footer Col 2',
					tag: 'td',
				},
				{
					content: 'Footer Col 3',
					tag: 'td',
				},
			],
		},
	],
	caption: 'Material Data Table',
	className: 'is-style-material',
};

describe( 'Data Table Save', () => {
	it( 'matches snapshot when table has data', () => {
		const wrapper = setup( { attributes } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when table has no data', () => {
		const wrapper = setup( {
			attributes: { ...attributes, head: [], body: [], foot: [] },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when table has rows', () => {
		const wrapper = setup( {
			attributes: { ...attributes, head: [], foot: [] },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
