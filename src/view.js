/**
 * WordPress dependencies
 */
import { store, getContext, setState } from '@wordpress/interactivity';


const { state } = store( 'simple-interactive-blocks', {
	state: {
		term: null,
		result: null
	},
	actions: {
		search: (event) => {
			const context = getContext();
			state.term = event.currentTarget.value
			if ( state.term.length >= 3 ) {
				search_products( state.term )
			} else {
				context.showResult = false
				state.result       = null
			}
		},
		setfocus: () => {
			const context = getContext();
			// console.log(context.inputID)
			// console.log("init")
			document.getElementById(context.inputID).focus()
		}
	}
} );


const search_products = async( term ) => {
	const context = getContext();
	context.showResult = true
	const formData = new FormData();
	formData.append("term", term);
	// &_embed - Get embed data.
	// search=${term} - Term to seach.
	// search_columns=post_title - Seach just on post_title
	// _fields=id,title,link,_links,_embedded - Just get id, title and embed fields
	var url = `?rest_route=/wp/v2/posts&_embed&search_columns=post_title&_fields=id,title,link,_links,_embedded&search=${term}`

	const posts = await fetch(url);
	const x = await posts.json()
	
	context.posts = x

	console.log(context.posts)
}