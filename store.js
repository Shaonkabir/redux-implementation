// Redux Implementation

// First: we'll create a Redux Library to understand what's happening behing the scence

// Crete 'createStore' Method which magically create a store
const createStore = (reducer, initialState) => {

	// create a Store Object which contains everything
	const store = {}

	// create state 
	store.state = initialState

	// create listeners 
	store.listeners = []

	// Create getState Method
	store.getState = () => store.state


	// Create Subscribers
	store.subscribe = listener => store.listeners.push(listener)

	// Create Dispatch Method
	store.dispatch = (action) => {
		store.state = reducer(store.state, action)
		store.listeners.forEach(listener => listener())
	}

	return store;
	
}


const reducer = (state, action) => {
	
	switch(action.type) {
		case 'ADD':
			return state + 10;
			break;
		case 'SUB' :
			return state - 5;
			break;
		default:
		return state;
	}

}

const store = createStore(reducer, 0)


store.subscribe(() => {
	console.log(store.getState())
})

// Call 'dispatch' method to check our Redux
store.dispatch({type: 'ADD' })
store.dispatch({type: 'ADD' })
store.dispatch({type: 'SUB' })
store.dispatch({type: 'ADD' })
store.dispatch({type: 'ADD' })