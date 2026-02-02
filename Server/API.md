# API 實作摘要

以下 API 已在 .NET 後端實作，以支援 React 前端。
這些 API 目前使用 **記憶體資料服務 (In-Memory Data Service)**，這意味著當伺服器重啟時，資料將會重置。

## 控制器 (Controllers)

### 1. LoginController
- **路徑**: `POST /login`
- **用途**: 驗證使用者身分。
- **模擬資料**:
  - 管理員: `admin@test.com` / `123` (角色 "G")
  - 一般使用者: `user@test.com` / `123` (角色 "C")

### 2. ProjectController
- **路徑**: `GET /project`
- **路徑**: `POST /project` (供管理員建立服務項目)
- **用途**: 管理服務項目 (例如：美睫、霧眉)。

### 3. SubProjectController
- **路徑**: `GET /subproject?pid={id}`
- **用途**: 取得服務的子項目。

### 4. AvailableTimesController
- **路徑**: `GET /availableTimes`
- **用途**: 回傳可預約的時段。

### 5. SchedulesController
- **路徑**: `GET /schedules?user={id}` (客戶歷史記錄)
- **路徑**: `GET /schedules` (管理員：所有預約)
- **路徑**: `POST /schedules` (建立預約)
- **路徑**: `PUT /schedules/{id}` (更新狀態)
- **路徑**: `DELETE /schedules/{id}` (取消預約)

### 6. MeController
- **路徑**: `GET /me`
- **路徑**: `PUT /me`
- **用途**: 管理目前使用者個人資料。

### 7. ImagesController
- **路徑**: `GET /images`
- **用途**: 回傳首頁輪播圖片 (目前為空列表)。

## 使用說明 (Usage)
請確保後端正在執行中。前端通常會代理到後端，或透過 `Config` 設定指向 `localhost:5000` (或類似位址)。
`DataService` 被註冊為 Singleton，因此在應用程式生命週期內資料會持續存在。
