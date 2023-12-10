function defaultFunc() {
    if(window.location.href.includes('?name=')){
        document.querySelector('#name').value = new URLSearchParams(window.location.search).get('name')
        document.querySelector('#false__user').classList.remove('d-none')
    }
}

document.addEventListener('DOMContentLoaded', defaultFunc)
