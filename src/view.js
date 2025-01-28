/**
 * WordPress dependencies
 */
import "preact/devtools";
import "preact/debug";
import { store, getContext, setContext } from "@wordpress/interactivity";

const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape", "Tab", "Shift"];
const { state } = store("simple-interactive-blocks", {
	state: {
		term: null,
		currentLI: null,
	},
	actions: {
		search: (event) => {
			// Search posts.
			const context = getContext();
			if (context.showResult && keys.includes(event.key)) {
				scrollList(event);
			}

			if (
				event.currentTarget.value !== state.term &&
				event.currentTarget.value.length >= 3
			) {
				state.term = event.currentTarget.value;
				search_products(state.term);
			} else if (event.currentTarget.value !== state.term) {
				// TODO. Check this else if.
				context.showResult = false;
			}
		},
		setfocus: () => {
			// Put focus on the search input.
			const context = getContext();
			if (context.setFocus) {
				let search_editor = document.getElementById(context.inputID);
				search_editor.focus();
			}
		},
		scroll: (event) => {
			scrollList(event);
		},
	},
});

/**
 * Searches for products based on a given term and updates the context with the results.
 *
 * @param {string} term - The search term to query products.
 * @returns {Promise<void>} A promise that resolves when the search is complete and the context is updated.
 */
const search_products = async (term) => {
	const context = getContext();
	context.showResult = true;
	const formData = new FormData();
	formData.append("term", term);
	// &_embed - Get embed data.
	// search=${term} - Term to seach.
	// search_columns=post_title - Seach just on post_title
	// _fields=id,title,link,_links,_embedded - Just get id, title and embed fields
	// per_page - limit to 5 posts.
	var url = `?rest_route=/wp/v2/posts&_embed&search_columns=post_title,post_content&_fields=id,title,link,_links,_embedded&status=publish&per_page=5&search=${term}`;
	const posts = await fetch(url);
	context.posts = await posts.json();
};

/**
 * Handles keyboard navigation and interaction for a list of search results.
 *
 * @param {Event} event - The keyboard event triggered by user interaction.
 *
 * @description
 * This function intercepts keyboard events to provide custom navigation and interaction
 * within a list of search results. It supports the following keys:
 * - ArrowDown: Moves the selection down the list.
 * - ArrowUp: Moves the selection up the list.
 * - Enter: Activates the selected list item.
 * - Escape: Clears the search input and results.
 * - Tab: Adjusts the current selection based on tab navigation.
 *
 * The function prevents the default behavior of these keys and stops their propagation.
 * It also ensures that the appropriate list item is focused based on the current selection state.
 */
const scrollList = (event) => {
	event.stopPropagation();
	event.preventDefault();

	const context = getContext();
	const listItems = document.querySelectorAll(".search-results li");
	const searchInput = document.getElementById(context.inputID);
	const resultsList = document.getElementById(context.resultID);

	if (keys.includes(event.key)) {
		switch (event.key) {
			case "ArrowDown":
				// If the last elemente is not selected, select next.
				if (state.currentLI != listItems.length - 1) {
					state.currentLI = ++state.currentLI;
				}
				// If focus on search input, select first LI.
				if (document.activeElement == searchInput) {
					state.currentLI = 0; // Increase counter
				}
				break;
			case "ArrowUp":
				if ( state.currentLI > 0 ) {
					console.log("aca estoy")
					state.currentLI = --state.currentLI;
				}
				break;
			case "Enter":
				// Click on the selected item.
				listItems[state.currentLI].children[0].click();
				break;
			case "Escape":
				context.posts = [];
				context.showResult = false;
				searchInput.value = "";
				searchInput.focus();
				break;
			case "Tab":
				// To fix tab issue.
				let activeListItem = document.activeElement.parentElement;
				if ( resultsList == activeListItem.parentElement ) {
					state.currentLI = Array.from(resultsList.children).indexOf(activeListItem);
				} else {
					state.currentLI = null
				} 
				break;
			default:
				console.log(event.key);
				break;
		}

		if ( state.currentLI != null ) {
			// Focus on the selected item.
			listItems[state.currentLI].children[0].focus();
		}
	}

};
