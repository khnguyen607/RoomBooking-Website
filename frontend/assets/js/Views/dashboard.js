function defaultFunc() {
    // active tab
    let tab = new URLSearchParams(window.location.search).get('tab') ?? 'mgr__booking'
    if (tab == 'mgr__booking') {
        document.querySelector('#view-mgr__booking').classList.add('active', 'show')
        document.querySelector('#mgr__booking').classList.add('active', 'show')
        document.querySelector('#view-mgr__user').classList.remove('active', 'show')
        document.querySelector('#mgr__user').classList.remove('active', 'show')
    } else if (tab == 'mgr__user') {
        document.querySelector('#view-mgr__booking').classList.remove('active', 'show')
        document.querySelector('#mgr__booking').classList.remove('active', 'show')
        document.querySelector('#view-mgr__user').classList.add('active', 'show')
        document.querySelector('#mgr__user').classList.add('active', 'show')

        if (new URLSearchParams(window.location.search).get('sign_up') == 'false') {
            alert('Không thể đăng ký thủ thư mới')
        }
    } else if (tab == 'mgr__room') {
        document.querySelector('#view-mgr__booking').classList.remove('active', 'show')
        document.querySelector('#mgr__booking').classList.remove('active', 'show')
        document.querySelector('#view-mgr__room').classList.add('active', 'show')
        document.querySelector('#mgr__room').classList.add('active', 'show')
    }

    // quản lý người dùng
    function mgr__users() {
        // hiển thị người dùng 
        var divtoUser = document.querySelector('.user__info').cloneNode(true)
        document.querySelector('.user__info').remove()
        function show__user(role) {
            fetch('../backend/index.php?controller=user')
                .then(response => response.json())
                .then(data => {
                    data = data.filter(item => {
                        return item.role == role && item.status == '1'
                    })
                    switch (role) {
                        case '1':
                            divtoUser.querySelector('img').src = 'assets/images/user/librarian.png'
                            divtoUser.querySelector('.user-detail .badge').textContent = 'Thủ thư'
                            break;

                        case '0':
                            divtoUser.querySelector('img').src = 'assets/images/user/studying.png'
                            divtoUser.querySelector('.user-detail .badge').textContent = 'Sinh viên'
                            break;
                    }
                    document.querySelector('.user__list').innerHTML = ''
                    data.forEach(item => {
                        var divUser = divtoUser.cloneNode(true)
                        divUser.querySelector('.user-detail h6').textContent = item.name
                        divUser.querySelector('p.email').textContent = item.email
                        divUser.querySelector('.delete__btn').href += '&id=' + item.id
                        divUser.querySelector('.edit__btn').setAttribute('user_id', item.id)
                        document.querySelector('.user__list').appendChild(divUser)
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
        show__user(0)

        // Chuyển tab hiển thị tương ứng 
        document.querySelectorAll('.user__tab').forEach(item => {
            item.addEventListener('click', () => {
                show__user(item.getAttribute('user__role'))
            })
        })

        // tìm kiếm người dùng
        document.querySelector('.user__search').addEventListener('input', () => {
            document.querySelectorAll('.user__info').forEach(item => {
                let check = item.querySelector('.user-detail h6').textContent.toLowerCase().includes(document.querySelector('.user__search').value.toLowerCase())
                    || item.querySelector('p.email').textContent.toLowerCase().includes(document.querySelector('.user__search').value.toLowerCase())
                if (check) {
                    item.classList.remove('d-none')
                } else {
                    item.classList.add('d-none')
                }
            })
        })
    }

    // quản lý phòng
    function mgr__rooms() {
        var divtoRoom = document.querySelector('.room__info').cloneNode(true)
        document.querySelector('.room__info').remove()
        function show__room() {
            fetch('../backend/index.php?controller=room')
                .then(response => response.json())
                .then(data => {
                    data = data.filter(item => {
                        return item.status == '1'
                    })
                    document.querySelector('.room__list').innerHTML = ''
                    data.forEach(item => {
                        var divRoom = divtoRoom.cloneNode(true)
                        divRoom.querySelector('h5').textContent = item.name
                        divRoom.querySelector('img').src = item.img
                        var li = divRoom.querySelectorAll('li')
                        li[0].querySelector('strong').textContent = item.location
                        li[1].querySelector('strong').textContent = item.capacity + ' người'
                        li[2].querySelector('strong').textContent = item.utility

                        divRoom.querySelector('.delete__btn').href += item.id
                        divRoom.querySelector('.edit__btn').setAttribute('room_id', item.id)
                        document.querySelector('.room__list').appendChild(divRoom)
                    })

                    // mở model chỉnh sửa
                    document.querySelectorAll('#mgr__room .edit__btn').forEach(item => {
                        item.addEventListener('click', () => {
                            fetch('../backend/index.php?controller=room&action=findRoom&id=' + item.getAttribute('room_id'))
                                .then(response => response.json())
                                .then(data => {
                                    var model_edit = document.querySelector('#edit-room')
                                    model_edit.querySelector('input[name="name"]').value = data.name
                                    model_edit.querySelector('input[name="location"]').value = data.location
                                    model_edit.querySelector('input[name="capacity"]').value = data.capacity
                                    model_edit.querySelector('input[name="utility"]').value = data.utility
                                    model_edit.querySelector('input[name="img"]').value = data.img
                                    model_edit.querySelector('form').action += item.getAttribute('room_id')
                                })
                        })
                    })

                    // tìm kiếm người dùng
                    document.querySelector('.room__search').addEventListener('input', () => {
                        document.querySelectorAll('.room__info').forEach(item => {
                            let check = item.querySelector('h5.card-title').textContent.toLowerCase().includes(document.querySelector('.room__search').value.toLowerCase())
                            if (check) {
                                item.classList.remove('d-none')
                            } else {
                                item.classList.add('d-none')
                            }
                        })
                    })
                })

        }

        show__room()
    }

    // quản lý đặt  phòng
    function mgr__booking() {
        // hiển thị người dùng 
        var divtoBooking__alls = document.querySelector('#booking__alls .booking__info').cloneNode(true)
        var divtoBooking__pending = document.querySelector('#booking__pending .booking__info').cloneNode(true)
        var divtoBooking__approved = document.querySelector('#booking__approved .booking__info').cloneNode(true)
        var divtoBooking__old = document.querySelector('#booking__old .booking__info').cloneNode(true)
        function show__booking() {
            // TAB - BOOKING_ALLS
            fetch('../backend/index.php?controller=booking')
                .then(response => response.json())
                .then(data => {
                    document.querySelector('#booking__alls .booking__list').innerHTML = ''
                    document.querySelector('#booking__pending .booking__list').innerHTML = ''
                    document.querySelector('#booking__approved .booking__list').innerHTML = ''
                    document.querySelector('#booking__old .booking__list').innerHTML = ''
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
                                divBooking__alls.querySelector('.approve__btn').classList.add('d-none')
                                break;
                            case '2':
                                divBooking__alls.querySelector('div.badge-color').textContent = 'Hết hạn'
                                divBooking__alls.querySelector('div.badge-color').classList.add('badge-danger')
                                divBooking__alls.querySelector('h4').classList.add('text-danger')
                                divBooking__alls.querySelector('.delete__btn').classList.add('d-none')
                                divBooking__alls.querySelector('.approve__btn').classList.add('d-none')
                                divBooking__alls.querySelector('.edit__btn').classList.add('d-none')
                                break;
                        }
                        var m__info = divBooking__alls.querySelectorAll('.m__info p span')
                        m__info[0].textContent = item.id
                        m__info[2].textContent = item.location
                        var timein = item.timein.split(' ')[1].substring(0, 5)
                        var timeout = item.timeout.split(' ')[1].substring(0, 5)
                        m__info[1].textContent = timein + ' - ' + timeout
                        divBooking__alls.querySelector('.approve__btn').href = '../backend/index.php?controller=booking&action=changeStatus&status=1&id='+item.id 
                        divBooking__alls.querySelector('.delete__btn').href = '../backend/index.php?controller=booking&action=changeStatus&status=2&id='+item.id     

                        document.querySelector('#booking__alls .booking__list').appendChild(divBooking__alls)

                        // tab - pending 
                        var divBooking__pending = divtoBooking__pending.cloneNode(true)
                        divBooking__pending.querySelector('h1').textContent = day.split(' ')[0]
                        divBooking__pending.querySelector('h5').textContent = day.split(' ')[1]
                        divBooking__pending.querySelector('h4').textContent = item.title
                        var p_pending = divBooking__pending.querySelectorAll('p span')
                        p_pending[0].textContent = item.title
                        p_pending[1].textContent = item.id
                        p_pending[2].textContent = timein + ' - ' + timeout
                        p_pending[3].textContent = item.location
                        if (item.status == '0') {
                            divBooking__pending.querySelector('.approve__btn').href = '../backend/index.php?controller=booking&action=changeStatus&status=1&id='+item.id 
                            divBooking__pending.querySelector('.delete__btn').href = '../backend/index.php?controller=booking&action=changeStatus&status=2&id='+item.id     
                            document.querySelector('#booking__pending .booking__list').appendChild(divBooking__pending)
                        }
                        // tab - pending 
                        var divBooking__approved = divtoBooking__approved.cloneNode(true)
                        divBooking__approved.querySelector('h1').textContent = day.split(' ')[0]
                        divBooking__approved.querySelector('h5').textContent = day.split(' ')[1]
                        divBooking__approved.querySelector('h4').textContent = item.title
                        var p_approved = divBooking__approved.querySelectorAll('p span')
                        p_approved[0].textContent = item.title
                        p_approved[1].textContent = item.id
                        p_approved[2].textContent = timein + ' - ' + timeout
                        p_approved[3].textContent = item.location
                        if (item.status == '1') {
                            divBooking__approved.querySelector('.delete__btn').href = '../backend/index.php?controller=booking&action=changeStatus&status=2&id='+item.id
                            document.querySelector('#booking__approved .booking__list').appendChild(divBooking__approved)
                        }
                        // tab - old 
                        var divBooking__old = divtoBooking__old.cloneNode(true)
                        divBooking__old.querySelector('h1').textContent = day.split(' ')[0]
                        divBooking__old.querySelector('h5').textContent = day.split(' ')[1]
                        divBooking__old.querySelector('h4').textContent = item.title
                        var p_approved = divBooking__old.querySelectorAll('p span')
                        p_approved[0].textContent = item.title
                        p_approved[1].textContent = item.id
                        p_approved[2].textContent = timein + ' - ' + timeout
                        p_approved[3].textContent = item.location
                        if (item.status == '2') document.querySelector('#booking__old .booking__list').appendChild(divBooking__old)

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

        // tìm kiếm người dùng
        document.querySelector('.booking__search').addEventListener('input', () => {
            document.querySelectorAll('.booking__info').forEach(item => {
                let check = item.querySelector('.booking__id').textContent == document.querySelector('.booking__search').value
                || document.querySelector('.booking__search').value == ''
                if (check) {
                    item.classList.remove('d-none')
                } else {
                    item.classList.add('d-none')
                }
            })
        })
    }

    // Thực thi hàm 
    mgr__booking()
    mgr__users()
    mgr__rooms()
}

document.addEventListener('DOMContentLoaded', defaultFunc)
