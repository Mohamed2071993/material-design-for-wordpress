/* eslint-disable jsx-a11y/anchor-is-valid */
import { __ } from '@wordpress/i18n';
import { useState } from 'react';

const ThemePrompt = ( { status } ) => {
	const [ dismissed, setDismissed ] = useState( false );

	const title =
		status === 'install'
			? __( 'Install Material Theme', 'material-theme-builder' )
			: __( 'Activate Material Theme', 'material-theme-builder' );

	const message =
		status === 'install'
			? __(
					'Install and activate Material Theme for full site customization.',
					'material-theme-builder'
			  )
			: __(
					'Activate Material Theme for full site customization.',
					'material-theme-builder'
			  );

	const cta =
		status === 'install'
			? __( 'Install theme', 'material-theme-builder' )
			: __( 'Activate theme', 'material-theme-builder' );

	const dismiss = () => {
		setDismissed( true );
		window.localStorage.setItem( 'themeInstallerDismissed', '1' );
	};

	if ( dismissed ) {
		return null;
	}

	return (
		<>
			<button
				type="button"
				className="customize-help-toggle dashicons dashicons-dismiss"
				aria-expanded="false"
				onClick={ dismiss }
			>
				<span className="screen-reader-text">Dismiss</span>
			</button>
			<div className="accordion-section-title theme-installer-panel">
				<h3>{ title }</h3>
				<span className="customize-action">{ message }</span>
				<br />
				<a href="#" className="button">
					{ cta }
				</a>
			</div>
			<ul className="accordion-sub-container control-panel-content"></ul>
		</>
	);
};

export default ThemePrompt;
