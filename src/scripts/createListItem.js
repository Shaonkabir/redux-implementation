
// function which create a simple list item

const createListItem = bookmark => {

	const li = document.createElement('li')
	li.className = 'list-group-item d-flex'

	const img = document.createElement('img')
	img.src = `//logo.clearbit.com/${bookmark.name}`
	img.alt = bookmark.name

	const text = document.createElement('p')
	text.className = 'lead ml-4'
	text.innerHTML = bookmark.name
	text.style.cursor = 'pointer'
	text.onclick = function() {
		window.open(bookmark.name, '_blank')
	}


	const iconContainer = document.createElement('div')
	iconContainer.className = 'ml-auto'

	const favIcon = document.createElement('span')
	const i = document.createElement('i')
	i.className = `${bookmark.isFav ? 'fas' : 'far'} fa-heart`
	favIcon.appendChild(i)
	
	// TODO: Event listener will be added later
	
	const deleteIcon = document.createElement('span')
	deleteIcon.innerHTML = `<i class="fas fa-trash"></i>`
	deleteIcon.className = 'mx-3'
	

	iconContainer.append(deleteIcon, favIcon)

	li.append(img, text)


	return li;
}


export default createListItem;