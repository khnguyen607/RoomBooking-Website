function defaultFunc() {
    if (new URLSearchParams(window.location.search).get('update') == 'false') {
        document.querySelector('.update__false').classList.remove('d-none')
        document.querySelector('#mgr__user').classList.add('active', 'show')
        document.querySelector('#mgr__booking').classList.remove('active', 'show')
        document.querySelector('#view-mgr__user').classList.add('active', 'show')
        document.querySelector('#view-mgr__booking').classList.remove('active', 'show')
    } else if (new URLSearchParams(window.location.search).get('update') == 'true') {
        document.querySelector('.update__true').classList.remove('d-none')
        document.querySelector('#mgr__user').classList.add('active', 'show')
        document.querySelector('#mgr__booking').classList.remove('active', 'show')
        document.querySelector('#view-mgr__user').classList.add('active', 'show')
        document.querySelector('#view-mgr__booking').classList.remove('active', 'show')
    }
    // quản lý người dùng
    function mgr__users() {
        fetch('../backend/index.php?controller=user&action=check')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.querySelector('#user_name').value = data.name
                document.querySelector('#user_email').value = data.email
                document.querySelector('#user_user').value = data.user
                // switch (data.role) {
                //     case '1':
                //         document.querySelector('.header__user img').src = 'assets/images/user/librarian.png'
                //         break;
                //     case '2':
                //         document.querySelector('.header__user img').src = 'assets/images/user/admin.jpg'
                //         break;
                // }
            })
            .catch(error => {
                document.querySelector('.btn__login').classList.remove('d-none')
            })
    }

    // quản lý đặt  phòng
    function mgr__booking() {
        // hiển thị người dùng 
        var divtoBooking__alls = document.querySelector('#booking__alls .booking__info').cloneNode(true)
        function show__booking() {
            function getCookie(cookieName) {
                var name = cookieName + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var cookieArray = decodedCookie.split(';');

                for (var i = 0; i < cookieArray.length; i++) {
                    var cookie = cookieArray[i];
                    while (cookie.charAt(0) == ' ') {
                        cookie = cookie.substring(1);
                    }
                    if (cookie.indexOf(name) == 0) {
                        return cookie.substring(name.length, cookie.length);
                    }
                }

                return null;
            }

            // TAB - BOOKING_ALLS
            fetch('../backend/index.php?controller=booking')
                .then(response => response.json())
                .then(data => {
                    data = data.filter(item => {
                        return item.user_id == getCookie("user_id")
                    })
                    data = data.sort((a, b) => {
                        return b.id - a.id
                    })
                    document.querySelector('#booking__alls .booking__list').innerHTML = ''
                    data.forEach(item => {
                        // tab - alls 
                        var divBooking__alls = divtoBooking__alls.cloneNode(true)
                        divBooking__alls.querySelector('h5').textContent = item.title
                        var day = new Date(item.timein)
                        day = day.getDate() + ' Th' + (day.getMonth() + 1)
                        divBooking__alls.querySelector('h4').textContent = day
                        switch (item.status) {
                            case '0':
                                divBooking__alls.querySelector('div.badge-color').textContent = 'Chưa duyệt'
                                divBooking__alls.querySelector('div.badge-color').classList.add('badge-info')
                                divBooking__alls.querySelector('h4').classList.add('text-info')
                                break;
                            case '1':
                                divBooking__alls.querySelector('div.badge-color').textContent = 'Đã duyệt'
                                divBooking__alls.querySelector('div.badge-color').classList.add('badge-success')
                                divBooking__alls.querySelector('h4').classList.add('text-success')
                                break;
                            case '2':
                                divBooking__alls.querySelector('div.badge-color').textContent = 'Đang bận'
                                divBooking__alls.querySelector('div.badge-color').classList.add('badge-warning')
                                divBooking__alls.querySelector('h4').classList.add('text-warning')
                                break;
                            case '3':
                                divBooking__alls.querySelector('div.badge-color').textContent = 'Hết hạn'
                                divBooking__alls.querySelector('div.badge-color').classList.add('badge-danger')
                                divBooking__alls.querySelector('h4').classList.add('text-danger')
                                divBooking__alls.querySelector('.delete__btn').classList.add('d-none')
                                break;
                        }
                        var m__info = divBooking__alls.querySelectorAll('.m__info p span')
                        m__info[0].textContent = item.id
                        m__info[2].textContent = item.location
                        var timein = item.timein.split(' ')[1].substring(0, 5)
                        var timeout = item.timeout.split(' ')[1].substring(0, 5)
                        m__info[1].textContent = timein + ' - ' + timeout
                        divBooking__alls.querySelector('.delete__btn').href = '../backend/index.php?controller=booking&action=changeStatus&status=3&user=true&id=' + item.id

                        document.querySelector('#booking__alls .booking__list').appendChild(divBooking__alls)

                    });

                    // mở model chỉnh sửa
                    document.querySelectorAll('#mgr__user .edit__btn').forEach(item => {
                        item.addEventListener('click', () => {
                            fetch('../backend/index.php?controller=user&action=findUser&id=' + item.getAttribute('user_id'))
                                .then(response => response.json())
                                .then(data => {
                                    var model_edit = document.querySelector('#edit-user')
                                    model_edit.querySelector('input[name="name"]').value = data.name
                                    model_edit.querySelector('input[name="user"]').value = data.user
                                    model_edit.querySelector('input[name="email"]').value = data.email
                                    model_edit.querySelector('form').action += item.getAttribute('user_id')
                                })
                        })
                    })
                })

        }
        show__booking()
    }

    // Thực thi hàm 
    mgr__booking()
    mgr__users()
}

document.addEventListener('DOMContentLoaded', defaultFunc)
