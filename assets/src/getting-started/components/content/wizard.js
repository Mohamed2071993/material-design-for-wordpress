/* global mtbGsm */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Wizard = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Get your Material site up and running', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				{ __(
					'Follow this simple step-by-step flow to install the Material Theme and quick start examples, so you can start customizing your WordPress site in no time.',
					'material-theme-builder'
				) }
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Re-run quick start', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					onClick={ props.handleClick }
					link={ mtbGsm.wizardUrl }
				/>
			</div>
		</Fragment>
	);
};
