<?php
/**
 * Plugin Name:       Simple interactive blocks
 * Description:       An interactive block with the Interactivity API.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-interactive-blocks
 *
 * @package           simple-interactive-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function simple_interactive_blocks_search_init() {
	register_block_type_from_metadata( __DIR__ . '/build' );
}
add_action( 'init', 'simple_interactive_blocks_search_init' );
