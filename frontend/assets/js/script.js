document.addEventListener('DOMContentLoaded', () => {
    // LOAD LAYOUT
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('.iq-top-navbar').innerHTML = div.querySelector('.iq-top-navbar').innerHTML
            document.querySelector('.iq-footer').innerHTML = div.querySelector('.iq-footer').innerHTML
            // // ACTIVE MENU 
            // if (window.location.href.includes('/dashboard.html')) document.querySelector('#iq-sidebar-toggle a[href="dashboard.html"]').parentNode.classList.add('active')
            // else if (window.location.href.includes('/index.html')) document.querySelector('#iq-sidebar-toggle a[href="index.html"]').parentNode.classList.add('active')

            fetch('../backend/index.php?controller=user&action=check')
                .then(response => response.json())
                .then(data => {
                    if (window.location.href.includes('/index.html')) {
                        if (data.role !== '0') {
                            window.location.href = 'dashboard.html';
                        }
                    } else if (window.location.href.includes('/dashboard.html')) {
                        if (data.role === '0') {
                            window.location.href = 'index.html';
                        }
                    }

                    document.querySelector('.header__user').classList.remove('d-none')
                    document.querySelector('.header__user h6').textContent = data.name
                    switch (data.role) {
                        case '0':
                            document.querySelector('.profile__btn.d-none').classList.remove('d-none')
                            break;
                        case '1':
                            document.querySelector('.header__user img').src = 'assets/images/user/librarian.png'
                            break;
                        case '2':
                            document.querySelector('.header__user img').src = 'assets/images/user/admin.jpg'
                            if (window.location.href.includes('/dashboard.html')) {
                                document.querySelector('#view-mgr__user').classList.remove('d-none')
                                document.querySelector('#view-mgr__room').classList.remove('d-none')
                            }
                            break;
                    }
                })
                .catch(error => {
                    document.querySelector('.btn__login').classList.remove('d-none')
                    window.location.href = 'auth-sign-in.html'
                })
        })
})