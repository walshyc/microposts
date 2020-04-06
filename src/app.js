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

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}

function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body
  }
  // Create Post
  http
    .post('http://localhost:3000/posts', data)
    .then(post => {
      ui.showAlert('Post Added', 'success')
      ui.clearFields()
      getPosts()
    })
    .catch(err => console.log(err))

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