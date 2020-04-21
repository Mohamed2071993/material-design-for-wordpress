/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/email-input-field';
import BlockIcon from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/email-input-field/block-icon';
import Edit from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-edit';
import Save from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/text-input-save';
import { __ } from "@wordpress/i18n";

describe( 'blocks: material/email-input-field', () => {
	describe( 'name', () => {
		it( 'should equal material/email-input-field', () => {
			expect( name ).toStrictEqual( 'material/email-input-field' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Email', () => {
			expect( settings.title ).toStrictEqual( 'Email' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Want to reply to folks? Add an email address input.`', () => {
			expect( settings.description ).toStrictEqual(
				'Want to reply to folks? Add an email address input.'
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
					default: 'email',
				},
				inputRole: {
					type: 'string',
					default: 'email',
				},
				label: {
					type: 'string',
					default: __( 'Email', 'material-theme-builder' ),
				},
				inputValue: {
					type: 'string',
				},
				isRequired: {
					type: 'boolean',
					default: true,
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
