<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Generates a unique id for aria-controls.
$id_input  = wp_unique_id( 'p-' );
$id_search = wp_unique_id( 's-' );

// Adds the global state.
wp_interactivity_state(
	'simple-interactive-blocks',
	array(
		'result'	=> array(),
		'term'		=> ''
	)
);

$content = array( 
	'showResult' => false,
	'inputID' => $id_input,
	'posts' => array()
);

?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="simple-interactive-blocks"
	<?php echo wp_interactivity_data_wp_context( $content ); ?>
	data-wp-init="actions.setfocus"
>
	<form role="search" method="get" action="">
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

	<div
		id="<?php echo esc_attr( $id_search ); ?>" 
		data-wp-bind--hidden="!context.showResult"
		class="search-results"
	>
		<ul>
			<template data-wp-each--post="context.posts" >
				<li>
					<a 
						data-wp-key="context.post.id"
						data-wp-text="context.post.title.rendered"
						data-wp-bind--href="context.post.link">
					</a>
				</li>
			</template>
		</ul>
	</div>

</div>
