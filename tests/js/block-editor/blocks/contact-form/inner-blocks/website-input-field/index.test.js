/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/website-input-field';
import BlockIcon from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/website-input-field/block-icon';
import Edit from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-edit';
import Save from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-save';

describe( 'blocks: material/website-input-field', () => {
	describe( 'name', () => {
		it( 'should equal material/website-input-field', () => {
			expect( name ).toStrictEqual( 'material/website-input-field' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Website', () => {
			expect( settings.title ).toStrictEqual( 'Website' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Add an address input for a website.`', () => {
			expect( settings.description ).toStrictEqual(
				'Add an address input for a website.'
			);
		} );
	} );

	describe( 'parent settings', () => {
		it( 'should have a list of allowed parent blocks', () => {
			expect( settings.parent ).toStrictEqual( [ 'material/contact-form' ] );
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'icon settings', () => {
		it( 'should be equal to the BlockIcon component', () => {
			expect( settings.icon ).toStrictEqual( BlockIcon );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( settings.attributes ).toStrictEqual( {
				id: {
					type: 'string',
				},
				inputType: {
					type: 'string',
					default: 'url',
				},
				inputRole: {
					type: 'string',
					default: 'website',
				},
				label: {
					type: 'string',
					default: 'Website',
				},
				inputValue: {
					type: 'string',
				},
				isRequired: {
					type: 'boolean',
					default: false,
				},
				outlined: {
					type: 'boolean',
					default: false,
				},
				fullWidth: {
					type: 'boolean',
					default: true,
				},
				displayLabel: {
					type: 'boolean',
					default: true,
				},
			} );
		} );
	} );

	describe( 'settings edit property', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );

	describe( 'settings save property', () => {
		it( 'should be equal to the Save component', () => {
			expect( settings.save ).toStrictEqual( Save );
		} );
	} );
} );
