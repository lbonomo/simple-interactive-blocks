<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @package simple-interactive-blocks
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Generates a unique id for aria-controls.
$id_input  = wp_unique_id( 'input-' );
$id_result = wp_unique_id( 'result-' );

// Adds the global state.
wp_interactivity_state(
	'simple-interactive-blocks',
	array(
		'result' => array(),
		'term'   => '',
	)
);

$content = array(
	'showResult' => false,
	'inputID'    => $id_input,
	'resultID'   => $id_result,
	'posts'      => array(),
	'setFocus'   => $attributes['set_focus'],
);

?>

<div
	data-wp-interactive="simple-interactive-blocks"
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	<?php echo wp_kses_data( wp_interactivity_data_wp_context( $content ) ); ?>
>
	<form 
		role="search" 
		method="get"
		action=""
		data-wp-run="actions.setfocus"
		>
		<input 
		type="search"
		placeholder="<?php echo esc_attr( $attributes['placeholder'] ); ?>"
		autocomplete="off"
		value=""
		id="<?php echo esc_attr( $id_input ); ?>"
		name="s"
		data-wp-on--keyup="actions.search"
		/>
	</form>

	<ul 
		id="<?php echo esc_attr( $id_result ); ?>"
		data-wp-bind--hidden="!context.showResult"
		data-wp-on--keyup="actions.scroll"
		class="search-results"
	>
		<template data-wp-each--post="context.posts" >
			<li tabindex="-1">
				<a 
					data-wp-key="context.post.id"
					data-wp-text="context.post.title.rendered"
					data-wp-bind--href="context.post.link">
				</a>
			</li>
		</template>
	</ul>

</div>
