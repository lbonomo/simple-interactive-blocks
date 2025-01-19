/**
 * WordPress dependencies
 */
import "preact/devtools";
import "preact/debug";
import { render } from 'preact';
import { store, getContext, setState, getElement } from '@wordpress/interactivity';

const { state } = store( 
	'simple-interactive-blocks',
	{
		state: {
			term: null,
			result: null,
			posts: null
		},
		actions: {
			search: (event) => {
				// Search posts.
				const context = getContext()
				console.log(context.posts)
				console.log(state)
				if ( event.currentTarget.value !== state.term && event.currentTarget.value.length >= 3) {
					state.term = event.currentTarget.value
					search_products( state.term )
				} else if ( event.currentTarget.value !== state.term ) {
					context.showResult = false
					state.result       = null
				} else if ( event.currentTarget.value.length >= 3 ) {
					scrollList(event)
				}
			},
			setfocus: () => {
				// Put focus on the search input.
				const context = getContext()
				if ( context.setFocus ) {
					let search_editor = document.getElementById(context.inputID)
					search_editor.focus()
				}
			},
		}
	} 
);

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
	context.posts = await posts.json()
	state.posts = await posts.json()
}

const scrollList = (event) => {
	const context = getContext();
	const list = document.getElementById(context.resultID);
	const maininput = document.getElementById(context.inputID);

	// document.onkeydown = function() {
	// 	if( list.hasChildNodes() ) {
	// 		if ( event.key ===  'ArrowDown' || event.key ===  'ArrowUp' ) {
	// 			event.stopPropagation()
	// 			event.preventDefault()

	// 			switch (event.key) {
	// 				case 'ArrowDown':
	// 					console.log("Arrow Down")
	// 					break
	// 				case 'ArrowUp':
	// 					console.log("Arrow Up")
	// 					if ( document.activeElement == (maininput || list)) { break; }
	// 					else { document.activeElement.parentNode.previousSibling.firstChild.focus(); }
	// 					break
	// 			}
	// 		}

	// 	}
	// }

	// 	document.onkeydown = function(e) {
	// 		console.log(e.keyCode)

	// 		switch (e.keyCode) {
	// 			case 38:
	// 				if ( document.activeElement == (maininput || first)) { break; }
	// 				else { document.activeElement.parentNode.previousSibling.firstChild.focus(); }
	// 				break;
	// 			case 40: // Press down.
	// 				if ( document.activeElement == maininput) { list.firstChild.focus(); } 
	// 				else { document.activeElement.parentNode.nextSibling.firstChild.focus(); }
	// 				break;
	// 		}
	// 	}
} 
