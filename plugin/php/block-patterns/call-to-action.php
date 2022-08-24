<?php
/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Call to action pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Call to action(CTA)', 'material-design' ),
	'content'       => '<!-- wp:group {"align":"full"} -->
<div class="wp-block-group alignfull"><!-- wp:heading {"textAlign":"center","align":"wide"} -->
<h2 class="alignwide has-text-align-center">Call to action</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Perform this action in no time, satisfaction guaranteed.</p>
<!-- /wp:paragraph -->

<!-- wp:material/buttons {"align":"center"} -->
<div class="wp-block-material-buttons aligncenter"><!-- wp:material/button {"style":"elevated","iconPosition":"none","size":"large","elevationStyle":"filled"} -->
<div class="wp-block-material-button" id="block-material-button-17"><button class="mdc-button label-large mdc-button--filled is-large"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Call to action</span></button></div>
<!-- /wp:material/button --></div>
<!-- /wp:material/buttons -->

<!-- wp:spacer {"height":"50px"} -->
<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->',
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header' ],
	'description'   => __( 'Call to action pattern.', 'material-design' ),
];
