// ================================================================
// GOOGLE APPS SCRIPT — Nhận dữ liệu từ Form và ghi vào Google Sheet
// ================================================================
// HƯỚNG DẪN SETUP:
// 1. Mở Google Sheet mới → Extensions → Apps Script
// 2. Dán toàn bộ code này vào
// 3. Bấm Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy URL được tạo ra
// 5. Dán URL đó vào file index.html tại dòng: const WEBHOOK_URL = '...'
// ================================================================

const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Tạo sheet nếu chưa có
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupHeaders(sheet);
    }

    // Parse dữ liệu
    const data = JSON.parse(e.postData.contents);

    // Các cột theo thứ tự
    const headers = getHeaders();
    const row = headers.map(h => data[h] || '');

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Webhook đang hoạt động ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}

function setupHeaders(sheet) {
  const headers = getHeaders();
  const displayNames = getDisplayNames();
  sheet.appendRow(displayNames);

  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0f2744');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);

  // Set column widths
  sheet.setColumnWidth(1, 180);
  headers.forEach((_, i) => {
    if (i > 0) sheet.setColumnWidth(i + 1, 200);
  });
}

function getHeaders() {
  return [
    'timestamp',
    'ho_ten', 'chuc_danh', 'phong_ban', 'tham_nien', 'ngay_phong_van',
    'sl_bgd', 'sl_qlct', 'sl_sx', 'sl_kd', 'sl_vp', 'sl_kt',
    'so_chuc_danh', 'so_do_tc', 'jd_hien_trang', 'dac_thu',
    'hinh_thuc_luong', 'thang_bang_luong', 'luong_vs_tt', 'van_de_luong', 'kho_khan_luong',
    'p_cong_bang', 'p_kpi', 'p_thi_truong', 'p_chi_phi', 'p_lo_trinh',
    'co_cau_luong', 'pham_vi', 'phuc_loi',
    'he_thong_dg', 'tan_suat_dg', 'nang_luc', 'co_so_tang_luong',
    'ngan_sach', 'nguoi_quyet_dinh',
    'change_bgd', 'change_qlct', 'change_nv',
    'tai_lieu', 'ky_vong', 'lo_ngai', 'y_kien_khac'
  ];
}

function getDisplayNames() {
  return [
    'Thời gian gửi',
    'Họ tên', 'Chức danh', 'Phòng/Ban', 'Thâm niên', 'Ngày PV',
    'SL Ban GĐ', 'SL QL cấp trung', 'SL Sản xuất', 'SL Kinh doanh', 'SL Văn phòng', 'SL Kỹ thuật',
    'Số chức danh', 'Sơ đồ TC', 'JD hiện trạng', 'Đặc thù lao động',
    'Hình thức trả lương', 'Thang bảng lương', 'Lương vs thị trường', 'Vấn đề lương', 'Khó khăn lương (mô tả)',
    'P.cong bang', 'P.KPI', 'P.Thi truong', 'P.Chi phi', 'P.Lo trinh',
    'Cơ cấu lương', 'Phạm vi áp dụng', 'Phúc lợi hiện có',
    'Hệ thống đánh giá', 'Tần suất đánh giá', 'Năng lực cốt lõi', 'Cơ sở tăng lương',
    'Ngân sách dự án', 'Người quyết định',
    'Sẵn sàng thay đổi - BGĐ', 'Sẵn sàng thay đổi - QLCT', 'Sẵn sàng thay đổi - NV',
    'Tài liệu có thể cung cấp', 'Kỳ vọng', 'Lo ngại', 'Ý kiến khác'
  ];
}