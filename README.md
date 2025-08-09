# lms sentiment analysis 

Hệ thống **lms sentiment analysis** là một giải pháp phân tích cảm xúc cho các nền tảng quản lý học tập (LMS). Dự án này gồm 3 thành phần:
- **Frontend** (Angular): Giao diện người dùng cho phép tham gia khoá học và đánh giá khoá học thông qua bình luận và hiển thị kết quả phân tích cảm xúc.
- **Backend** (NodeJS/Express): Trung gian nhận request từ frontend, chuyển tiếp đến API phân tích cảm xúc, xử lý và trả kết quả về frontend.
- **Sentiment Analysis API** (Flask/Python): Api để triển khai model [mr4/phobert-base-vi-sentiment-analysis](https://huggingface.co/mr4/phobert-base-vi-sentiment-analysis) để phân tích cảm xúc từ văn bản tiếng việt.

Mục tiêu của hệ thống là giúp các tổ chức giáo dục, giảng viên hoặc quản trị viên LMS hiểu rõ hơn về cảm xúc, thái độ của học viên thông qua các phản hồi, bình luận và từ đó giảng viên sẽ cải thiện chất lượng giảng dạy

## Cấu trúc thư mục

```
/frontend                   # Frontend Angular
/backend                   # Backend NodeJS (Express)
/sentiment_analysis_api   # API Model Flask (Python)
README.md
```

---

## 1. Cài đặt

Tại thư mục gốc, bạn làm theo các bước sau:

### 1.0. Cài đặt Angular CLI (nếu chưa có)
```bash
npm install -g @angular/cli
```

### 1.1. Cài đặt dependencies cho frontend (Angular)
```bash
cd frontend
npm install
cd ..
```

### 1.2. Cài đặt dependencies cho backend (NodeJS)
```bash
cd backend
npm install
cd ..
```

### 1.3. Cài đặt dependencies cho API model (Flask)
```bash
cd sentiment_analysis_api
pip install -r requirements.txt
cd ..
```

---

## 2. Cách chạy

Bạn có thể mở 3 terminal để chạy song song Frontend, Backend và Flask API.

### 2.1. Chạy frontend Angular (port 4200)
```bash
cd frontend
npm start
```
Angular sẽ chạy ở: http://localhost:4200

### 2.2. Chạy backend NodeJS (port 5000)
```bash
cd backend
npm run dev
```
Backend sẽ chạy ở: http://localhost:5000

### 2.3. Chạy API model Flask (port 8000)
```bash
cd sentiment_analysis_api
python run.py
```
Flask API sẽ chạy ở: http://localhost:8000

---

## 3. Luồng hoạt động

- Frontend (Angular) gửi request API đến Backend (NodeJS).
- Backend gọi sang Flask API để xử lý sentiment analysis.
- Flask API trả kết quả về Backend, sau đó gửi lại Frontend.

---

## 4. Scripts trong từng module

### client/package.json (Frontend)
| Script | Mục đích                       |
|--------|-------------------------------|
| start  | Chạy Angular ở chế độ development |
| build  | Build production              |
| lint   | Kiểm tra code style           |

### server/package.json (Backend)
| Script | Mục đích                       |
|--------|-------------------------------|
| dev    | Chạy backend với nodemon      |
| start  | Chạy backend production       |
| test   | Chạy test backend             |

---

## 5. Lưu ý

- Cài Node.js >= 16 và npm >= 8.
- Cài Python >= 3.10 cho Flask API.
- Nếu muốn đổi port, cập nhật:
  - Angular: `angular.json` hoặc lệnh `ng serve --port`
  - NodeJS: file `.env` hoặc config server
  - Flask: trong `run.py`
- Khi deploy cần cấu hình để 3 service chạy song song.

💡 **Tip:** Dùng VSCode và mở 3 terminal để chạy cả 3 service cùng lúc.

Chúc bạn coding vui vẻ! 🚀
