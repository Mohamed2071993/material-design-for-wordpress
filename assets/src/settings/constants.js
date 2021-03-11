import { __ } from '@wordpress/i18n';

export const ACTIONS = {
	ERROR: 'ERROR',
	TOGGLE_UPDATES: 'TOGGLE_UPDATES',
	REMOVE_API_KEY: 'REMOVE_API_KEY',
	ADD_API_KEY: 'ADD_API_KEY',
};

export const UPDATERS = [
	{
		title: __( 'Google Fonts', 'material-design' ),
		type: 'FONT',
		lastUpdated: Date.now(),
		needsKey: true,
	},
	{
		title: __( 'Material Icons', 'material-design' ),
		type: 'ICON',
		lastUpdated: Date.now(),
		needsKey: false,
	},
];

export const KEY_PLACEHOLDER = '•••••••••••••••••••••••••••••';
