// Define our State
const initialState = [
	{
		'url': 'https://twitter.com',
		'name': 'twitter',
		'isFav': false,
		'id': 'sldjflasjdf'
	}
]



const reducer = (state = initialState, action) => {
	
	switch(action.type) {
		case 'ADD_BOOKMARKS' :
			return state.concat(action.payload)
			break;
		case 'REMOVE_BOOKMARKS' :
			return state.filter(bookmark => bookmark.id !== action.payload)
			break;
		case  'TOGGLE_FAVOURITE' : 
			return state.map(bookmark => {
				if(bookmark.id === action.payload) {
					bookmark.isFav != bookmark.isFav
				}
			return bookmark;
			})
			break;
		default: 
			return state;
			break;
	}


}


export default reducer;