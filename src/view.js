/**
 * WordPress dependencies
 */
import "preact/devtools";
import "preact/debug";
import { store, getContext } from '@wordpress/interactivity';

const { state } = store( 
	'simple-interactive-blocks',
	{
		state: {
			term: null,
			result: null,
			currentLI: 0
		},
		actions: {
			search: (event) => {
				// Search posts.
				const context = getContext()
				// console.log(context.posts)
				// if key is up or down and showResult = true.
				if ( context.showResult && ( event.key ===  'ArrowDown' || event.key ===  'ArrowUp' ) ) {
					scrollList(event);
				}

				if ( event.currentTarget.value !== state.term && event.currentTarget.value.length >= 3) {
					state.term = event.currentTarget.value
					search_products( state.term )
				} else if ( event.currentTarget.value !== state.term ) {
					// TODO. Check this else if.
					context.showResult = false
					state.result       = null
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
			scroll: (event) => {
				scrollList(event);
			}
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
}

const scrollList = (event) => {
	const context = getContext()
	const listItems = document.querySelectorAll(".search-results li")
 	const seachinput = document.getElementById(context.inputID)

	if ( event.key ===  'ArrowDown' || event.key ===  'ArrowUp' ) {
		event.stopPropagation()
		event.preventDefault()

		switch (event.key) {
			case 'ArrowDown':
				if ( document.activeElement == seachinput) {
					console.log("Estoy en el edit")
					// list.firstChild.focus();
					state.currentLI = 0; // Increase counter
					listItems[state.currentLI].classList.add("highlight");
					listItems[state.currentLI].focus() 
				} else {
					listItems[state.currentLI].classList.remove("highlight");
					state.currentLI = state.currentLI < listItems.length-1 ? ++state.currentLI : listItems.length-1;
					listItems[state.currentLI].classList.add("highlight");
					listItems[state.currentLI].focus() 
				}
				break
			case 'ArrowUp':
				console.log("Arrow Up")
				listItems[state.currentLI].classList.remove("highlight");
				state.currentLI = state.currentLI > 0 ? --state.currentLI : 0
				listItems[state.currentLI].classList.add("highlight")
				listItems[state.currentLI].focus()
		}
	}
} 
