/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Fragment, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../../admin/get-config';

export const Overview = () => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __(
					'Build with Material Blocks',
					'material-theme-builder'
				) }
			</h2>

			<p>
				{ __(
					'Add Material Components like buttons and cards, and create layouts for things like image-heavy pages or styled contact forms. Customize the look of your blocks by adjusting global theme styles, or setting the style of a single component in the block editor.',
					'material-theme-builder'
				) }
			</p>

			<img src={ `${ getConfig( 'assetsPath' ) }build-with-material-blocks.png` } alt="" />

			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Customize', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link={ getConfig( 'customize' ) }
				/>
			</div>

			<div style={ { height: '20px' } }></div>
		</Fragment>
	);
};
