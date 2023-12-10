document.addEventListener('DOMContentLoaded', () => {
    // LOAD LAYOUT
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('.iq-top-navbar').innerHTML = div.querySelector('.iq-top-navbar').innerHTML
            document.querySelector('.iq-footer').innerHTML = div.querySelector('.iq-footer').innerHTML
            // ACTIVE MENU 
            if (window.location.href.includes('/dashboard.html')) document.querySelector('#iq-sidebar-toggle a[href="dashboard.html"]').parentNode.classList.add('active')
            else if (window.location.href.includes('/index.html')) document.querySelector('#iq-sidebar-toggle a[href="index.html"]').parentNode.classList.add('active')

            fetch('../backend/index.php?controller=user&action=check')
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.header__user').classList.remove('d-none')
                    document.querySelector('.header__user h6').textContent = data.name
                    switch (data.role) {
                        case '1':
                            document.querySelector('.header__user img').src = 'assets/images/user/librarian.png'
                            break;
                        case '2':
                            document.querySelector('.header__user img').src = 'assets/images/user/admin.jpg'
                            break;
                    }
                })
                .catch(error=> {
                    document.querySelector('.btn__login').classList.remove('d-none')
                })
        })
})