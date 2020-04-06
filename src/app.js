import {
  http
} from './http'
import {
  ui
} from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)
// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost)
// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)
// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}

function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value

  const data = {
    title,
    body
  }


  if (title === '' || body === '') {
    ui.showAlert('Please add in all fields', 'danger')
  } else {
    if (id === '') {
      // Create Post
      http
        .post('http://localhost:3000/posts', data)
        .then(post => {
          ui.showAlert('Post Added', 'success')
          ui.clearFields()
          getPosts()
        })
        .catch(err => console.log(err))
    } else {
      // Update the post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(post => {
          ui.showAlert('Post Updated', 'success')
          ui.changeFormState('add')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }


}

function deletePost(e) {
  e.preventDefault()
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'danger')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const body = e.target.parentElement.previousElementSibling.textContent


    const data = {
      id,
      title,
      body
    }

    ui.fillForm(data)
  }
  e.preventDefault()
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }
  e.preventDefault()
}