/* istanbul ignore file */

/**
 * Internal dependencies
 */
import { registerBlocks } from './helpers';

/**
 * Internal dependencies
 * Register the blocks.
 */
registerBlocks( require.context( './blocks', true, /(?<!test\/)index\.js$/ ) );
