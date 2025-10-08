const API_URL = 'https://provinces.open-api.vn/api/?depth=1';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lấy thẻ select theo ID
    const selectElement1 = document.getElementById('province-select-noSelect2');
    const selectElement2 = document.getElementById('province-select-Select2');
    const selectElement3 = document.getElementById('province-select-Select2-multi');
    const selectElement4 = document.getElementById('province-select-Select2-multi-dp');
    const selectElement5 = document.getElementById('province-select-Select2-multi-limit');
    const selectElement6 = document.getElementById('province-select-Select2-multi-clearable');
    const selectElement7 = document.getElementById('province-select-Select2-disable');
    const selectElement8 = document.getElementById('province-select-Select2-multi-disable');
    const selectElement9 = document.getElementById('province-select-Select2-w-50');
    const selectElement10 = document.getElementById('province-select-Select2-w-75');
    const selectElement11 = document.getElementById('province-select-Select2-dynamic');
    const selectElement12 = document.getElementById('province-select-Select2-dynamic-multi');
    const selectElement13 = document.getElementById('province-select-Select2-dynamic-multi-token');
    const selectElement14 = document.getElementById('province-select-Select2-theme1');
    const selectElement15 = document.getElementById('province-select-Select2-theme2');
    // const selectElement16 = document.getElementById('province-select-Select2-selected');
    // const selectElement17 = document.getElementById('province-select-Select2-disable');
    

    const selectElements = [selectElement1, selectElement2, selectElement3, selectElement4, selectElement5, selectElement6, selectElement7, selectElement8, selectElement9, selectElement10, selectElement11, selectElement12, selectElement13, selectElement14, selectElement15].filter(el => el !== null);

    // Kiểm tra nhanh: nếu không tìm thấy ít nhất một phần tử, dừng lại.
    if (selectElements.length === 0) {
        console.error("LỖI: Không tìm thấy bất kỳ phần tử nào có ID là 'a', 'b', hoặc 'c'. Vui lòng kiểm tra lại HTML.");
        return;
    }

    const loadProvinces = async () => {
        try {
            // 2. Gọi API
            const response = await fetch(API_URL);

            // Kiểm tra lỗi phản hồi HTTP
            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status} - Không thể truy cập API.`);
            }

            // Chuyển đổi phản hồi thành đối tượng JSON
            const data = await response.json();

            // 3. Điền dữ liệu vào TỪNG thẻ select đã tìm thấy
            selectElements.forEach((element) => {

                // Xóa nội dung mặc định
                element.innerHTML = '';

                // Thêm option mặc định
                element.add(new Option('-- Chọn Tỉnh/Thành phố --', ''));

                // Duyệt qua dữ liệu và thêm từng tỉnh vào select box
                data.forEach(province => {
                    // Tạo Option mới cho mỗi tỉnh
                    const option = new Option(province.name, province.code);

                    // Thêm option vào select box. 
                    // Ở đây không cần dùng cloneNode(true) vì chúng ta tạo một Option object mới (const option) trong mỗi vòng lặp
                    // và chỉ cần thêm nó vào phần tử select hiện tại (element.add(option)).
                    element.add(option);
                });

                // Kích hoạt lại select box sau khi tải xong
                element.disabled = false;
            });

            console.log(`Đã tải và điền thành công ${data.length} tỉnh thành vào ${selectElements.length} hộp chọn.`);

        } catch (error) {
            // Xử lý lỗi nếu xảy ra (lỗi mạng, lỗi parse JSON, lỗi HTTP)
            console.error("LỖI KHI TẢI DỮ LIỆU TỈNH THÀNH:", error);

            selectElements.forEach(el => {
                el.innerHTML = '<option value="">❌ Không tải được dữ liệu</option>';
                el.disabled = true;
            });
        }
    };

    // Bắt đầu tải dữ liệu khi trang đã sẵn sàng
    loadProvinces();
});