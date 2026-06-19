const fs = require('fs');
const path = require('path');

const baseDir = 'd:/Agents/Access';

const styleAndHead = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài Kiểm Tra 45 Phút - Đề thi</title>
    <style>
        :root {
            --bg-color: #f9fafb;
            --container-bg: #ffffff;
            --text-main: #1f2937;
            --text-muted: #4b5563;
            --border-color: #e5e7eb;
            --heading-color: #111827;
            --accent-color: #2563eb;
            --code-bg: #f3f4f6;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            line-height: 1.6;
            margin: 0;
            padding: 2rem 1rem;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: var(--container-bg);
            padding: 2.5rem 3rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--border-color);
        }

        h1 {
            text-align: center;
            color: var(--heading-color);
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        h2 {
            text-align: center;
            color: var(--text-muted);
            font-size: 1.2rem;
            font-weight: 400;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid var(--border-color);
        }

        h3 {
            color: var(--accent-color);
            font-size: 1.25rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 0.5rem;
        }

        h4 {
            color: var(--heading-color);
            font-size: 1.1rem;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
        }

        p {
            margin-bottom: 1rem;
        }

        ul,
        ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }

        li {
            margin-bottom: 0.5rem;
        }

        .meta-info {
            background-color: var(--bg-color);
            padding: 1.5rem;
            border-radius: 6px;
            margin-bottom: 2rem;
            border: 1px solid var(--border-color);
        }

        .meta-info h4 {
            margin-top: 0;
        }

        .question-meta {
            font-style: italic;
            color: var(--text-muted);
            font-size: 0.95rem;
            margin-bottom: 1rem;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
        }

        th,
        td {
            border: 1px solid var(--border-color);
            padding: 0.75rem 1rem;
            text-align: left;
        }

        th {
            background-color: var(--bg-color);
            font-weight: 600;
            color: var(--heading-color);
        }

        pre {
            background-color: var(--code-bg);
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            border: 1px solid var(--border-color);
            font-family: Consolas, Monaco, "Courier New", monospace;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        code {
            font-family: Consolas, Monaco, "Courier New", monospace;
            background-color: var(--code-bg);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9em;
        }

        .quote {
            border-left: 4px solid var(--accent-color);
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: var(--text-muted);
            font-style: italic;
        }

        @media (max-width: 600px) {
            .container {
                padding: 1.5rem;
            }
        }
    </style>
</head>`;

const metaInfo = `
        <div class="meta-info">
            <h4>1. Mục tiêu bài kiểm tra</h4>
            <p>Bài kiểm tra dùng để đánh giá ứng viên trợ giảng về các năng lực:</p>
            <ul>
                <li>Đọc hiểu yêu cầu kỹ thuật.</li>
                <li>Phân tích bài toán và chia nhỏ vấn đề.</li>
                <li>Tư duy thuật toán và xử lý dữ liệu.</li>
                <li>Phát hiện lỗi logic trong chương trình.</li>
                <li>Thiết kế luồng xử lý cơ bản cho một chức năng phần mềm.</li>
                <li>Giải thích vấn đề kỹ thuật cho người mới học.</li>
            </ul>

            <h4>2. Hình thức làm bài</h4>
            <ul>
                <li><strong>Thời gian làm bài:</strong> 45 phút</li>
                <li>Không yêu cầu dùng ngôn ngữ lập trình cụ thể.</li>
                <li>Ứng viên có thể trình bày bằng: Giải thích bằng lời, Pseudo-code, Flowchart, Bảng phân tích, hoặc Sơ đồ xử lý.</li>
            </ul>
        </div>
`;

const exams = [
  {
    id: 1,
    title: "Đề 1 - Hệ thống Quản lý Khách sạn",
    content: `
        <!-- PHẦN A -->
        <h3>PHẦN A. PHÂN TÍCH YÊU CẦU BÀI TOÁN</h3>
        <h4>Câu 1. Phân tích chức năng tính tiền phòng</h4>
        <p>Hệ thống khách sạn cần tính tổng số tiền thanh toán dựa trên các quy tắc:</p>
        <table>
            <thead><tr><th>Loại phòng</th><th>Giá mỗi đêm</th></tr></thead>
            <tbody>
                <tr><td>Standard</td><td>500.000 VNĐ</td></tr>
                <tr><td>Deluxe</td><td>1.000.000 VNĐ</td></tr>
                <tr><td>Suite</td><td>2.000.000 VNĐ</td></tr>
            </tbody>
        </table>
        <p><strong>Quy tắc ưu đãi:</strong></p>
        <ul>
            <li>Khách hàng là <strong>Thành viên VIP</strong> được giảm 10% trên tổng giá tiền.</li>
            <li>Khách hàng là <strong>Thành viên Thường</strong> được giảm 5% trên tổng giá tiền.</li>
            <li>Nếu lưu trú <strong>trên 5 đêm</strong>, khách hàng được giảm thêm 5% tính trên số tiền sau khi đã trừ ưu đãi thành viên.</li>
        </ul>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Xác định input và output của bài toán.</li>
            <li>Viết pseudo-code để tính tổng tiền thanh toán.</li>
            <li>Chỉ ra ít nhất 3 trường hợp cần kiểm thử (Test cases).</li>
        </ol>

        <!-- PHẦN B -->
        <h3>PHẦN B. PHÁT HIỆN LỖI LOGIC</h3>
        <h4>Câu 2. Tìm lỗi trong đoạn xử lý đặt phòng</h4>
        <pre>function bookRoom(checkInDate, checkOutDate, availableRooms):
    if checkInDate < today:
        return "Ngày check-in không hợp lệ"
    
    if checkOutDate < checkInDate:
        return "Ngày check-out phải sau check-in"
    
    if availableRooms == 0:
        return "Hết phòng"
    
    return "Đặt phòng thành công"</pre>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Chỉ ra các lỗi logic tiềm ẩn trong logic trên (Gợi ý: điều kiện ngày check-out so với check-in).</li>
            <li>Đề xuất đoạn mã đã sửa lỗi.</li>
        </ol>

        <!-- PHẦN C -->
        <h3>PHẦN C. XỬ LÝ DỮ LIỆU</h3>
        <h4>Câu 3. Phân tích doanh thu dịch vụ</h4>
        <p>Cho danh sách sử dụng dịch vụ của một phòng:</p>
        <table>
            <thead><tr><th>Mã dịch vụ</th><th>Tên dịch vụ</th><th>Số tiền</th><th>Trạng thái</th></tr></thead>
            <tbody>
                <tr><td>S01</td><td>Giặt ủi</td><td>100.000</td><td>Đã dùng</td></tr>
                <tr><td>S02</td><td>Spa</td><td>500.000</td><td>Hủy</td></tr>
                <tr><td>S03</td><td>Ăn sáng tại phòng</td><td>200.000</td><td>Đã dùng</td></tr>
            </tbody>
        </table>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Tính tổng tiền các dịch vụ hợp lệ (không tính các dịch vụ bị hủy).</li>
            <li>Viết thuật toán duyệt qua danh sách để tính tổng tiền đó.</li>
        </ol>

        <!-- PHẦN D -->
        <h3>PHẦN D. THIẾT KẾ LUỒNG XỬ LÝ CHỨC NĂNG</h3>
        <h4>Câu 4. Thiết kế luồng đặt phòng trực tuyến</h4>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Vẽ hoặc mô tả bằng lời flow từ lúc khách hàng tìm kiếm phòng cho đến lúc thanh toán thành công.</li>
            <li>Xác định các trường hợp có thể gây lỗi (ví dụ: đang thanh toán thì người khác đặt mất phòng).</li>
        </ol>

        <!-- PHẦN E -->
        <h3>PHẦN E. GIẢI THÍCH CHO HỌC VIÊN</h3>
        <h4>Câu 5. Lỗi vòng lặp vô hạn</h4>
        <div class="quote">"Em định in ra các số từ 1 đến 5 nhưng chương trình cứ chạy mãi không dừng làm treo máy!"</div>
        <pre>i = 1
while i <= 5:
    print("Số: " + i)</pre>
        <p><strong>Yêu cầu:</strong> Giải thích lý do chương trình bị treo và sửa lại đoạn mã cho đúng để học viên dễ hiểu.</p>
    `
  },
  {
    id: 2,
    title: "Đề 2 - Hệ thống Quản lý Thư viện",
    content: `
        <!-- PHẦN A -->
        <h3>PHẦN A. PHÂN TÍCH YÊU CẦU BÀI TOÁN</h3>
        <h4>Câu 1. Phân tích chức năng tính phí phạt trễ hạn</h4>
        <p>Hệ thống thư viện phạt người dùng mượn quá hạn như sau:</p>
        <ul>
            <li>Trễ <strong>dưới 5 ngày</strong>: Phạt 5.000 VNĐ / ngày.</li>
            <li>Trễ <strong>từ 5 đến 10 ngày</strong>: Phạt 10.000 VNĐ / ngày.</li>
            <li>Trễ <strong>trên 10 ngày</strong>: Phạt 20.000 VNĐ / ngày.</li>
            <li>Nếu làm mất sách: Phạt 100% giá trị sách + 50.000 VNĐ phí hành chính. Không tính phí trễ ngày nữa.</li>
        </ul>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Xác định input/output.</li>
            <li>Viết pseudo-code xử lý bài toán này.</li>
            <li>Nêu 3 trường hợp test case tiêu biểu.</li>
        </ol>

        <!-- PHẦN B -->
        <h3>PHẦN B. PHÁT HIỆN LỖI LOGIC</h3>
        <h4>Câu 2. Tìm lỗi trong đoạn xử lý mượn sách</h4>
        <pre>function borrowBook(user, book):
    if user.borrowedBooks >= 5:
        return "Vượt quá số sách tối đa"
    
    if book.status == "AVAILABLE":
        return "Mượn sách thành công"
    
    if user.hasOverdueBooks == true:
        return "Không được mượn vì đang có sách trễ hạn"
    
    return "Sách không có sẵn"</pre>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Phân tích xem nếu user có sách trễ hạn và sách đang ở trạng thái AVAILABLE thì hàm trả về gì?</li>
            <li>Chỉ ra điểm bất hợp lý trong thứ tự kiểm tra điều kiện và sửa lại.</li>
        </ol>

        <!-- PHẦN C -->
        <h3>PHẦN C. XỬ LÝ DỮ LIỆU</h3>
        <h4>Câu 3. Tình trạng sách</h4>
        <p>Cho dữ liệu các bản sao của một cuốn sách (ví dụ "Đắc Nhân Tâm"):</p>
        <table>
            <thead><tr><th>ID Bản sao</th><th>Trạng thái</th></tr></thead>
            <tbody>
                <tr><td>B01</td><td>Đang mượn</td></tr>
                <tr><td>B02</td><td>Sẵn sàng</td></tr>
                <tr><td>B03</td><td>Đang sửa chữa</td></tr>
                <tr><td>B04</td><td>Sẵn sàng</td></tr>
            </tbody>
        </table>
        <p><strong>Yêu cầu ứng viên:</strong> Viết thuật toán (bằng lời hoặc mã giả) đếm xem có bao nhiêu bản sao đang <code>Sẵn sàng</code> để cho mượn.</p>

        <!-- PHẦN D -->
        <h3>PHẦN D. THIẾT KẾ LUỒNG XỬ LÝ CHỨC NĂNG</h3>
        <h4>Câu 4. Thiết kế luồng Đăng ký thẻ thư viện</h4>
        <p><strong>Yêu cầu:</strong></p>
        <ol>
            <li>Mô tả luồng người dùng (sinh viên) tạo thẻ thư viện trực tuyến.</li>
            <li>Cần xác thực thông tin gì? (Email sinh viên, Mã số sinh viên).</li>
            <li>Những rủi ro có thể xảy ra (đăng ký hộ, nhập sai mã) và cách xử lý.</li>
        </ol>

        <!-- PHẦN E -->
        <h3>PHẦN E. GIẢI THÍCH CHO HỌC VIÊN</h3>
        <h4>Câu 5. Lỗi truy cập ngoài giới hạn (Index out of bounds)</h4>
        <div class="quote">"Em duyệt danh sách mà bị báo lỗi 'IndexOutOfRangeException' hoặc 'undefined'."</div>
        <pre>arr = [10, 20, 30]
for i from 1 to 3:
    print(arr[i])</pre>
        <p><strong>Yêu cầu:</strong> Giải thích vì sao duyệt mảng như trên lại sai và sửa lại cho đúng.</p>
    `
  },
  {
    id: 3,
    title: "Đề 3 - Hệ thống Bán hàng trực tuyến",
    content: `
        <!-- PHẦN A -->
        <h3>PHẦN A. PHÂN TÍCH YÊU CẦU BÀI TOÁN</h3>
        <h4>Câu 1. Phân tích chức năng phí vận chuyển</h4>
        <p>Cửa hàng tính phí vận chuyển dựa vào khoảng cách:</p>
        <ul>
            <li>Khoảng cách <strong>dưới 5km</strong>: Phí 15.000 VNĐ.</li>
            <li>Khoảng cách <strong>từ 5km đến 20km</strong>: Phí 30.000 VNĐ.</li>
            <li>Khoảng cách <strong>trên 20km</strong>: Phí 50.000 VNĐ.</li>
            <li>Đặc biệt: Đơn hàng có tổng giá trị hàng hóa <strong>từ 500.000 VNĐ trở lên</strong> được miễn phí vận chuyển bất kể khoảng cách.</li>
        </ul>
        <p><strong>Yêu cầu ứng viên:</strong> Xác định Input/Output, viết pseudo-code và đưa ra 3 test case để kiểm thử hàm tính phí vận chuyển.</p>

        <!-- PHẦN B -->
        <h3>PHẦN B. PHÁT HIỆN LỖI LOGIC</h3>
        <h4>Câu 2. Áp dụng mã giảm giá (Voucher)</h4>
        <pre>function applyDiscount(cartTotal, discountCode, isExpired):
    if discountCode == "NEWUSER":
        return cartTotal - 50000
    
    if cartTotal >= 300000 and discountCode == "FREESHIP":
        return cartTotal - 30000
    
    if isExpired == true:
        return "Mã đã hết hạn"
    
    return cartTotal</pre>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Chỉ ra lỗi logic khi mã "NEWUSER" đã hết hạn (isExpired = true).</li>
            <li>Sửa lại đoạn code trên để đảm bảo mã hết hạn sẽ luôn không được áp dụng.</li>
        </ol>

        <!-- PHẦN C -->
        <h3>PHẦN C. XỬ LÝ DỮ LIỆU</h3>
        <h4>Câu 3. Tính tồn kho sản phẩm</h4>
        <p>Lịch sử xuất nhập của sản phẩm A:</p>
        <table>
            <thead><tr><th>Hành động</th><th>Số lượng</th></tr></thead>
            <tbody>
                <tr><td>Nhập kho</td><td>+ 100</td></tr>
                <tr><td>Bán ra</td><td>- 30</td></tr>
                <tr><td>Khách hoàn trả</td><td>+ 5</td></tr>
                <tr><td>Bán ra</td><td>- 20</td></tr>
            </tbody>
        </table>
        <p><strong>Yêu cầu:</strong> Nêu công thức tính số lượng tồn kho hiện tại và viết thuật toán duyệt mảng để tính tổng số lượng tồn kho cuối cùng.</p>

        <!-- PHẦN D -->
        <h3>PHẦN D. THIẾT KẾ LUỒNG XỬ LÝ CHỨC NĂNG</h3>
        <h4>Câu 4. Luồng Thanh toán giỏ hàng (Checkout)</h4>
        <p><strong>Yêu cầu:</strong></p>
        <ol>
            <li>Mô tả các bước từ khi khách bấm "Thanh toán" ở giỏ hàng cho đến khi hệ thống tạo thành công mã Đơn hàng.</li>
            <li>Liệt kê các kiểm tra bắt buộc (VD: kiểm tra tồn kho, kiểm tra tính hợp lệ của địa chỉ).</li>
        </ol>

        <!-- PHẦN E -->
        <h3>PHẦN E. GIẢI THÍCH CHO HỌC VIÊN</h3>
        <h4>Câu 5. Lỗi toán tử gán và toán tử so sánh</h4>
        <div class="quote">"Em viết kiểm tra nếu x bằng 5 thì in ra thông báo, nhưng lúc nào nó cũng in ra thông báo đó dù x bằng số khác!"</div>
        <pre>x = 10
if x = 5:
    print("x có giá trị bằng 5")
else:
    print("x không bằng 5")</pre>
        <p><strong>Yêu cầu:</strong> Giải thích sự khác biệt giữa toán tử <code>=</code> và <code>==</code>, đồng thời sửa lại mã cho đúng.</p>
    `
  },
  {
    id: 4,
    title: "Đề 4 - Hệ thống Quản lý Nhân sự",
    content: `
        <!-- PHẦN A -->
        <h3>PHẦN A. PHÂN TÍCH YÊU CẦU BÀI TOÁN</h3>
        <h4>Câu 1. Phân tích chức năng tính lương tháng</h4>
        <p>Mức lương cơ bản của nhân viên là <strong>10.000.000 VNĐ/tháng</strong>. Số ngày công chuẩn là 22 ngày.</p>
        <ul>
            <li>Lương một ngày = 10.000.000 / 22.</li>
            <li>Nếu làm không đủ 22 ngày, trừ tiền tương ứng những ngày thiếu.</li>
            <li>Nếu có làm thêm vào cuối tuần, mỗi ngày cuối tuần được tính hệ số 1.5 lần lương một ngày.</li>
        </ul>
        <p><strong>Yêu cầu ứng viên:</strong> Xác định Input/Output, viết pseudo-code tính tổng lương cuối cùng cho nhân viên. Cho 2 test case minh họa.</p>

        <!-- PHẦN B -->
        <h3>PHẦN B. PHÁT HIỆN LỖI LOGIC</h3>
        <h4>Câu 2. Duyệt đơn xin nghỉ phép</h4>
        <pre>function approveLeave(daysRequested, remainingLeaveDays, managerApproved):
    if daysRequested > remainingLeaveDays:
        return "Không đủ ngày phép"
    
    if managerApproved == false:
        return "Quản lý chưa phê duyệt"
    
    if daysRequested <= 0:
        return "Số ngày nghỉ không hợp lệ"
    
    return "Đã duyệt nghỉ phép"</pre>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Chỉ ra lỗ hổng bảo mật/logic khi <code>daysRequested</code> bị truyền vào là số âm (ví dụ -5).</li>
            <li>Sửa lại thứ tự các câu lệnh if để chặn lỗi này triệt để.</li>
        </ol>

        <!-- PHẦN C -->
        <h3>PHẦN C. XỬ LÝ DỮ LIỆU</h3>
        <h4>Câu 3. Tìm nhân viên đi trễ nhiều nhất</h4>
        <p>Hệ thống có một danh sách ghi lại số phút đi trễ của mỗi nhân viên trong tháng. (Một nhân viên có thể bị ghi nhận nhiều lần).</p>
        <p><strong>Yêu cầu:</strong> Trình bày thuật toán (không cần viết code thật) để gộp số phút đi trễ theo từng nhân viên và tìm ra nhân viên có tổng số phút đi trễ cao nhất.</p>

        <!-- PHẦN D -->
        <h3>PHẦN D. THIẾT KẾ LUỒNG XỬ LÝ CHỨC NĂNG</h3>
        <h4>Câu 4. Luồng Chấm công hàng ngày (Check-in / Check-out)</h4>
        <p><strong>Yêu cầu:</strong></p>
        <ol>
            <li>Mô tả luồng từ lúc nhân viên quẹt thẻ (hoặc bấm vân tay) vào buổi sáng và buổi chiều.</li>
            <li>Xử lý trường hợp "Quên check-out": Nếu nhân viên chỉ có giờ check-in mà qua ngày hôm sau không thấy check-out thì hệ thống nên làm gì?</li>
        </ol>

        <!-- PHẦN E -->
        <h3>PHẦN E. GIẢI THÍCH CHO HỌC VIÊN</h3>
        <h4>Câu 5. Lỗi cộng chuỗi và cộng số</h4>
        <div class="quote">"Em cộng hai số 5 và 10 sao kết quả lại ra 510 ạ?"</div>
        <pre>a = "5"
b = 10
sum = a + b
print("Tổng là: " + sum)</pre>
        <p><strong>Yêu cầu:</strong> Giải thích rõ khái niệm "Kiểu dữ liệu" (Data types) và chỉ cho học viên cách chuyển đổi chuỗi thành số để tính toán đúng.</p>
    `
  },
  {
    id: 5,
    title: "Đề 5 - Hệ thống Đặt vé xem phim",
    content: `
        <!-- PHẦN A -->
        <h3>PHẦN A. PHÂN TÍCH YÊU CẦU BÀI TOÁN</h3>
        <h4>Câu 1. Phân tích chức năng tính giá vé xem phim</h4>
        <p>Rạp chiếu phim áp dụng giá vé như sau:</p>
        <ul>
            <li>Vé phim 2D: 80.000 VNĐ.</li>
            <li>Vé phim 3D: 120.000 VNĐ.</li>
            <li>Học sinh / Sinh viên (dưới 22 tuổi): giảm 20% trên giá gốc.</li>
            <li>Khung giờ vàng (12h - 14h): giảm tiếp 10% (được tính trên giá đã giảm nếu có).</li>
        </ul>
        <p><strong>Yêu cầu ứng viên:</strong> Xác định Input/Output, viết pseudo-code và liệt kê 3 trường hợp cần test.</p>

        <!-- PHẦN B -->
        <h3>PHẦN B. PHÁT HIỆN LỖI LOGIC</h3>
        <h4>Câu 2. Trừ điểm thành viên khi đổi Voucher</h4>
        <pre>function applyVoucher(user, voucher):
    if user.points < voucher.cost:
        return "Không đủ điểm"
    
    user.points = user.points - voucher.cost
    
    if voucher.isExpired == true:
        return "Voucher đã hết hạn"
    
    return "Đổi voucher thành công"</pre>
        <p><strong>Yêu cầu ứng viên:</strong></p>
        <ol>
            <li>Phát hiện lỗi logic nghiêm trọng khiến người dùng "mất điểm oan" trong hàm trên.</li>
            <li>Đề xuất mã nguồn đã được sửa lỗi.</li>
        </ol>

        <!-- PHẦN C -->
        <h3>PHẦN C. XỬ LÝ DỮ LIỆU</h3>
        <h4>Câu 3. Tìm ghế trống liền kề</h4>
        <p>Cho một mảng biểu diễn hàng ghế, với giá trị 0 là ghế trống, 1 là ghế đã bán:</p>
        <p><code>[1, 1, 0, 0, 1, 0, 0, 0, 1]</code></p>
        <p><strong>Yêu cầu:</strong> Viết thuật toán tìm xem có tồn tại ít nhất 3 ghế trống nằm cạnh nhau không (trả về True/False).</p>

        <!-- PHẦN D -->
        <h3>PHẦN D. THIẾT KẾ LUỒNG XỬ LÝ CHỨC NĂNG</h3>
        <h4>Câu 4. Luồng Chọn và giữ ghế</h4>
        <p><strong>Yêu cầu:</strong> Khi người dùng bấm vào một ghế, ghế đó chuyển sang trạng thái "Đang giữ" (Hold) để người khác không chọn được.</p>
        <ol>
            <li>Thiết kế luồng thao tác.</li>
            <li>Làm sao để xử lý nếu người dùng giữ ghế nhưng 10 phút sau vẫn không thanh toán? (Giải phóng ghế).</li>
        </ol>

        <!-- PHẦN E -->
        <h3>PHẦN E. GIẢI THÍCH CHO HỌC VIÊN</h3>
        <h4>Câu 5. Lỗi truy cập thuộc tính của Null (Null Reference)</h4>
        <div class="quote">"Em kiểm tra điều kiện tuổi thì bị báo lỗi 'Cannot read properties of null' hoặc 'NullReferenceException'."</div>
        <pre>user = null
if user.age >= 18:
    print("Người lớn")
else:
    print("Trẻ em")</pre>
        <p><strong>Yêu cầu:</strong> Giải thích giá trị null là gì và làm thế nào để viết mã an toàn (chống lỗi null) trước khi truy cập thuộc tính <code>.age</code>.</p>
    `
  }
];

exams.forEach(exam => {
  const dir = path.join(baseDir, String(exam.id));
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
  
  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
${styleAndHead}
<body>
    <div class="container">
        <h1>Bài Kiểm Tra 45 Phút</h1>
        <h2>Đánh giá kỹ năng phân tích và giải quyết vấn đề công nghệ<br>Ứng viên Trợ giảng - ${exam.title}</h2>
        ${metaInfo}
        ${exam.content}
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), htmlContent, 'utf8');
  console.log(`Generated ${path.join(dir, 'index.html')}`);
});
