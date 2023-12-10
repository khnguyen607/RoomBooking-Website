function defaultFunc() {
    function createCalendar(resources, events){
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'resourceTimeline',
            resources: resources,
            events: events,
            slotMinTime: "07:00:00",
            slotMaxTime: "16:00:00",
            expandRows: true
        });
        calendar.render();
    }

    // Hàm để thêm sự kiện và kiểm tra trùng lặp
    function addEventWithCheck(eventData) {
        // Lấy danh sách sự kiện hiện tại
        var currentEvents = calendar.getEvents();
        // Kiểm tra xem sự kiện mới có giao với bất kỳ sự kiện hiện tại nào hay không
        var isOverlap = currentEvents.some(function (existingEvent) {
            return eventData.resourceId == existingEvent._def.resourceIds[0] &&
                new Date(eventData.start) < existingEvent.end &&
                new Date(eventData.end) > existingEvent.start;
        });

        if (isOverlap) {
            alert('Lỗi: Sự kiện giao lặp với sự kiện hiện tại.');
        } else {
            // Thêm sự kiện mới nếu không có trùng lặp
            calendar.addEvent(eventData);
        }
    }

    // Hàm để xóa sự kiện dựa trên ID
    function removeEvent(eventId) {
        var existingEvent = calendar.getEventById(eventId);
        if (existingEvent) {
            existingEvent.remove();
        }
    }

    document.querySelector('.add__event').addEventListener('click', () => {
        addEventWithCheck({
            id: 'event3',
            resourceId: document.querySelector('#submit_schedule .selectpicker').value,
            title: document.querySelector('#schedule_title').value,
            start: document.querySelector('#schedule_start').value,
            end: document.querySelector('#schedule_end').value
        })
    })

    // Lấy dữ liệu các phòng
    fetch('../backend/index.php?controller=room')
        .then(response => response.json())
        .then(data => {
            var divtoRoom = document.querySelector('.room__info').cloneNode(true)
            document.querySelector('.room__info').remove()

            let resources = []
            let events = []
            data.forEach(item => {
                var divRoom = divtoRoom.cloneNode(true)
                divRoom.querySelector('h5').textContent = item.name
                divRoom.querySelector('img').src = item.img
                var li = divRoom.querySelectorAll('li')
                li[0].querySelector('strong').textContent = item.location
                li[1].querySelector('strong').textContent = item.capacity+ ' người'
                li[2].querySelector('strong').textContent = item.utility
                document.querySelector('.room__list').appendChild(divRoom)
                var option = document.createElement('option')
                option.textContent = item.name
                option.value = `room`+item.id
                document.querySelector('.rooms__select').appendChild(option)

                // thêm các phòng vào bảng calendar 
                resources.push({
                    id: 'room'+item.id,
                    title: item.name
                })
            });

            // events = [
            //     { id: 'event1', resourceId: 'research1', title: 'Trang - NCKH', start: '2023-12-01T08:00:00', end: '2023-12-01T10:00:00' },
            //     { id: 'event2', resourceId: 'group1', title: 'Nguyên - thảo luận nhóm', start: '2023-12-01T09:00:00', end: '2023-12-01T11:00:00' },
            //     { id: 'event4', resourceId: 'seminar2', title: 'Nguyên - thảo luận nhóm', start: '2023-12-01T09:05:00', end: '2023-12-01T11:10:00' },
            // ]

            // tạo bảng calendar
            createCalendar(resources, events)
        })
}

document.addEventListener('DOMContentLoaded', defaultFunc)
