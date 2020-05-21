/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';
import edit from './edit';
import save from './save';

export const name = 'material/list';

export const settings = {
	title: __( 'Material List', 'material-theme-builder' ),
	description: __(
		'Lists allow you to list out your information in a clear manner.',
		'material-theme-builder'
	),
	category: 'material',
	icon: <i className="material-icons-outlined">list_alt</i>,
	keywords: [ __( 'Material List', 'material-theme-builder' ), 'mlist' ],
	attributes: {
		style: {
			type: 'string',
			default: 'basic',
		},
		leadingIconsEnabled: {
			type: 'boolean',
			default: false,
		},
		trailingIconsEnabled: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
	save,
};
