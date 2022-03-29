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

import './plugins/hide-sections';
import './plugins/post-navigation-link';
import './style';
import { registerBlocks } from './util';
import './hooks';

/**
 * Register the blocks.
 */
registerBlocks( require.context( './blocks', true, /(?<!test\/)index\.js$/ ) );
