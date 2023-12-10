function defaultFunc() {
    if(window.location.href.includes('?user=')){
        document.querySelector('#user').value = new URLSearchParams(window.location.search).get('user')
        document.querySelector('#signup__success').classList.remove('d-none')
    } else if (window.location.href.includes('?loginF=')){
        document.querySelector('#user').value = new URLSearchParams(window.location.search).get('loginF')
        document.querySelector('#signin__false').classList.remove('d-none')
    }
}

document.addEventListener('DOMContentLoaded', defaultFunc)
