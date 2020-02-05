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
export default createStore