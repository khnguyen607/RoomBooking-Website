document.addEventListener('DOMContentLoaded', () => {
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('.iq-top-navbar').innerHTML = div.querySelector('.iq-top-navbar').innerHTML
            document.querySelector('.iq-footer').innerHTML = div.querySelector('.iq-footer').innerHTML

            if (window.location.href.includes('dashboard.html')) document.querySelector('#iq-sidebar-toggle a[href="dashboard.html"]').parentNode.classList.add('active')
            else if (window.location.href.includes('index.html')) {
                document.querySelector('#iq-sidebar-toggle a[href="index.html"]').parentNode.classList.add('active')

                var calendarEl = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'resourceTimeline',
                    resources: [
                        { id: 'research1', title: 'Phòng nghiên cứu cá nhân 1' },
                        { id: 'research2', title: 'Phòng nghiên cứu cá nhân 2' },
                        { id: 'group1', title: 'Phòng học nhóm 1' },
                        { id: 'group2', title: 'Phòng học nhóm 2' },
                        { id: 'group3', title: 'Phòng học nhóm 3' },
                        { id: 'seminar1', title: 'Phòng thuyết trình 1' },
                        { id: 'seminar2', title: 'Phòng thuyết trình 2' },
                        { id: 'presentation', title: 'Phòng hội thảo' },
                    ],
                    events: [
                        { id: 'event1', resourceId: 'research1', title: 'Trang - NCKH', start: '2023-12-01T08:00:00', end: '2023-12-01T10:00:00' },
                        { id: 'event2', resourceId: 'group1', title: 'Nguyên - thảo luận nhóm', start: '2023-12-01T09:00:00', end: '2023-12-01T11:00:00' },
                        { id: 'event4', resourceId: 'seminar2', title: 'Nguyên - thảo luận nhóm', start: '2023-12-01T09:05:00', end: '2023-12-01T11:10:00' },
                    ],
                    slotMinTime: "07:00:00",
                    slotMaxTime: "16:00:00",
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

            }

        })
})