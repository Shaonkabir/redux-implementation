import createStore from './createStore'
import reducer from './reducer'
import createListItem from './createListItem'

const store = createStore(reducer);


window.onload = function() {
	// grab all needed elements
	const inputField = document.querySelector('#urlInput')
	const favouriteBookmarks = document.querySelector('#favouriteBookmarks');
	const allBookmarks = document.querySelector('#allBookmarks');


	inputField.addEventListener('keypress', function(e) {
		if(e.keyCode == 13 ) {
			// our desire bookmark object
			const url = e.target.value;
			const name = domainName(url)
			const isFav = false;
			const id = create_UUID();
			
			// create list-item passing our bookmark object
			const li = createListItem({url, name, isFav, id})
			allBookmarks.appendChild(li)

			e.target.value = ''
			
		}
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