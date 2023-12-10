function defaultFunc() {
    function createCalendar(resources, events) {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'resourceTimeline',
            resources: resources,
            events: events,
            slotMinTime: "07:00:00",
            slotMaxTime: "19:00:00",
            expandRows: true
        });
        calendar.render();

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
                document.querySelector('.time__repeat').classList.remove('d-none')
                document.querySelector('.add__event').disabled = true
            } else {
                document.querySelector('.time__repeat').classList.add('d-none')
                document.querySelector('.add__event').disabled = false
            }
        }

        document.querySelectorAll('.check__time').forEach(item => {
            item.addEventListener('input', () => {
                addEventWithCheck({
                    id: 'check',
                    resourceId: 'room' + document.querySelector('.rooms__select').value,
                    title: document.querySelector('#schedule_title').value,
                    start: document.querySelector('#schedule_start').value,
                    end: document.querySelector('#schedule_end').value
                })
            })
        })
    }

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
                li[1].querySelector('strong').textContent = item.capacity + ' người'
                li[2].querySelector('strong').textContent = item.utility
                document.querySelector('.room__list').appendChild(divRoom)
                var option = document.createElement('option')
                option.textContent = item.name
                option.value = item.id
                document.querySelector('.rooms__select').appendChild(option)

                // thêm các phòng vào bảng calendar 
                resources.push({
                    id: 'room' + item.id,
                    title: item.name
                })
            });

            fetch('../backend/index.php?controller=booking')
                .then(response => response.json())
                .then(data_b => {
                    data_b = data_b.filter(item => {
                        return item.status == '1'
                    })
                    data_b.forEach(item_b => {
                        // thêm các sự kiện vào bảng calendar 
                        events.push({
                            id: 'event' + item_b.id,
                            resourceId: 'room' + item_b.room_id,
                            title: item_b.title,
                            start: item_b.timein,
                            end: item_b.timeout
                        })
                    })
                    // tạo bảng calendar
                    createCalendar(resources, events)
                })
        })
}

document.addEventListener('DOMContentLoaded', defaultFunc)
