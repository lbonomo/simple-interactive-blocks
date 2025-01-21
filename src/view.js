/**
 * WordPress dependencies
 */
import "preact/devtools";
import "preact/debug";
import { store, getContext, setContext } from "@wordpress/interactivity";

const { state } = store("simple-interactive-blocks", {
  state: {
    term: null,
    currentLI: 0,
  },
  actions: {
    search: (event) => {
      // Search posts.
      const context = getContext();
      if (
        context.showResult &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")
      ) {
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
  var url = `?rest_route=/wp/v2/posts&_embed&search_columns=post_title&_fields=id,title,link,_links,_embedded&status=publish&per_page=5&search=${term}`;
  const posts = await fetch(url);
  context.posts = await posts.json();
};

const scrollList = (event) => {
  event.stopPropagation();
  event.preventDefault();

  const context = getContext();
  const listItems = document.querySelectorAll(".search-results li");
  const seachinput = document.getElementById(context.inputID);
  const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape", "Tab"];

  if (keys.includes(event.key)) {
    switch (event.key) {
      case "ArrowDown":
      case "Tab":
        if (document.activeElement == seachinput) {
          // list.firstChild.focus();
          state.currentLI = 0; // Increase counter
          listItems[state.currentLI].classList.add("highlight");
          listItems[state.currentLI].children[0].focus();
        } else {
          listItems[state.currentLI].classList.remove("highlight");
          state.currentLI =
            state.currentLI < listItems.length - 1
              ? ++state.currentLI
              : listItems.length - 1;
          listItems[state.currentLI].classList.add("highlight");
          listItems[state.currentLI].children[0].focus();
        }
        break;
      case "ArrowUp":
        listItems[state.currentLI].classList.remove("highlight");
        state.currentLI = state.currentLI > 0 ? --state.currentLI : 0;
        listItems[state.currentLI].classList.add("highlight");
        listItems[state.currentLI].children[0].focus();
        break;
      case "Enter":
        listItems[currentLI].children[0].click();
        break;
      case "Escape":
        context.posts = [];
        context.showResult = false;
        seachinput.value = "";
        seachinput.focus();
        break;
      default:
        console.log(event.key);
        break;
    }
  }
};
