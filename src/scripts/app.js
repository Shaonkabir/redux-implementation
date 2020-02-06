import createStore from './createStore'
import reducer from './reducer'
import createListItem from './createListItem'


let init = []

if (localStorage.getItem('bookmarks')) {
    init = JSON.parse(localStorage.getItem('bookmarks'))
}


export const store = createStore(reducer, init);
console.log(store)

window.onload = function() {
	// grab all needed elements
	const inputField = document.querySelector('#urlInput')
	const favouriteBookmarks = document.querySelector('#favouriteBookmarks');
	const allBookmarks = document.querySelector('#allBookmarks');



	// render our bookmarks from localstroge
	if(store.getState().length >0 ) {
		store.getState().map(bookmark => {
			let li = createListItem(bookmark);
			allBookmarks.appendChild(li);

			// check if favourite
			if(bookmark.isFav) {
				favouriteBookmarks.appendChild(li);
			}
		})
	}



	inputField.addEventListener('keypress', function(e) {
		if(e.keyCode == 13 ) {
			// our desire bookmark object
			const url = e.target.value;
			const name = domainName(url)
			const isFav = false;
			const id = create_UUID();
			
			// create list-item passing our bookmark object
			const li = createListItem({url, name, isFav, id})
			
			// push into our store
			store.dispatch({
				type: 'ADD_BOOKMARKS',
				payload: {
					url, name, isFav, id
				}
			})

			e.target.value = ''
			localStorage.setItem('bookmarks', JSON.stringify(store.getState()))
			
		}
	})


	// subscribe for all bookmark list
	store.subscribe(() => {
		allBookmarks.innerHTML = null;

		store.getState().map(bookmark => {
			let li = createListItem(bookmark);

			allBookmarks.appendChild(li);
		})
	})

	// subscribe for favourite Bookmarks list
	store.subscribe(() => {
		favouriteBookmarks.innerHTML = null;

		store.getState().map(bookmark => {

			if(bookmark.isFav) {
				let li = createListItem(bookmark);
				favouriteBookmarks.appendChild(li);
			}
		})
	})



}



// grab the domain name from url
function domainName(url) {
	return url.match(/:\/\/(.[^/)]+)/)[1]
}


// generate a unique id
function create_UUID() {
	let date = new Date().getTime();
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (date + Math.random() *16) % 16 | 0;
		date = Math.floor(date/16);
		return (c == 'x' ? r : (r&0*3|0*8)).toString(16);
	});
	return uuid;
}