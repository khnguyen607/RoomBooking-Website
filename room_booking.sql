-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 10, 2023 lúc 05:18 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `room_booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `timein` datetime NOT NULL,
  `timeout` datetime NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `booking`
--

INSERT INTO `booking` (`id`, `title`, `content`, `timein`, `timeout`, `room_id`, `user_id`, `status`) VALUES
(1, 'Nguyên - họp nhóm thảo luận', 'Em muốn đặt phòng học ở thư viện để học nhóm, mong thầy/cô hỗ trợ. Em xin cảm ơn!', '2023-12-10 08:01:00', '2023-12-10 09:01:00', 1, 4, 2),
(2, 'Bảo Anh - mượn phòng tự học', 'Em muốn mượn phòng tự học ở thư viện, mong thầy/cô giúp đỡ. Em cảm ơn ạ!', '2023-12-09 10:01:45', '2023-12-09 13:01:45', 1, 2, 2),
(3, 'Minh Anh', 'Chào thầy cô, sắp tới thảo luận em muốn mượn phòng tập thuyết trình ạ', '2023-12-08 09:04:00', '2023-12-08 10:04:00', 1, 4, 2),
(7, 'test2', 'em muốn mượn phòng', '2023-12-10 07:07:00', '2023-12-07 10:07:00', 6, 4, 1),
(8, 'test3', 'CHào cô em muốn mượn phòng', '2023-12-10 10:15:00', '2023-12-10 22:16:00', 5, 4, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `location` varchar(200) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `capacity` int(11) NOT NULL,
  `utility` varchar(200) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `location`, `img`, `capacity`, `utility`, `status`) VALUES
(1, 'Group study Room 1', 'tầng 3, Thư viện TMU', 'https://ketnoikhonggian.com/anh/NSHG/phong-thu-vien-2.jpg', 6, 'Điều hòa, bàn ghế, Wifi', 1),
(2, 'Presentation practice Room 1', 'tầng 3, Thư viện TMU', 'https://cafebiz.cafebizcdn.vn/162123310254002176/2021/10/3/photo-1-1633251178556282398889.jpg', 20, 'Điều hòa, bàn ghế, Wifi, Máy chiếu, TV, Loa', 1),
(5, 'Presentation practice Room 2', 'tầng 5, Thư viện TMU', 'https://cafebiz.cafebizcdn.vn/162123310254002176/2021/10/3/photo-2-1633251180917127270845.jpg', 20, 'Điều hòa, bàn ghế, Wifi, TV, Loa, Bảng viết', 1),
(6, 'Group study Room 2', 'tầng 2, Thư viện TMU', 'https://tmu.edu.vn/upload/tmu_old/news/2022_05/e2e81687135ad2048b4b.jpg', 30, 'Điều hòa, bàn ghế, Wifi, máy chiếu, Bảng viết, Loa', 1),
(7, 'Group study Room 3', 'tầng 4, Thư viện TMUU', 'https://danviet.mediacdn.vn/zoom/700_438/296231569849192448/2022/1/8/3-1641617895804185513079-270-216-1116-1569-crop-1641618516573141536184.jpeg', 10, 'Điều hòa, bàn ghế, Wifi, máy chiếu', 1),
(13, 'Group study Room 4', 'tầng 5, Thư viện TMU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIAOjSdtbtvlr6awuUF_xySmra30_edvKjwQ&usqp=CAU', 6, 'Điều hòa, bàn ghế, Wifi', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `user` varchar(200) NOT NULL,
  `pass` varchar(500) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `user`, `pass`, `role`, `status`) VALUES
(1, 'nguyen@123gmail.com', 'Nguyênn', 'nguyen', '$2y$10$oxIaJRbZMp4e0vuIT22hzO8riGAoBZh8AUTU6z.iL2o0K2IwtkHV.', 0, 1),
(2, 'giang@gmail.com', 'Thủy Giang', 'giang', '$2y$10$Bit5DHWczZibY8Ie1ynPouA4JVx/sdjFq.oktokysRmMSz6tNBRgm', 0, 1),
(3, 'trang123@gmail.com', 'Trang', 'trang', '$2y$10$WeA4Pgyd317WhYcCgMiVmOSy0hkwKFiJFE0BzwO7JSkN288gd71Vi', 1, 1),
(4, 'trang@gmail.com', 'tranggg', 'trang123', '$2y$10$a.WGIr5w1XWVRXLUNNJLp.7EGFQWZum2VHZ9GtlrbjijtWwUPCFkS', 0, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking__user` (`user_id`),
  ADD KEY `booking__room` (`room_id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking__room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  ADD CONSTRAINT `booking__user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
