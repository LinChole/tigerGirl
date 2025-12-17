# 系統 Config 說明

- 基本資訊
  - documentTitle: 網頁標頭
  - reCaptchaKey: 沒在使用，以前拿來放 `Google reCaptcha Key`
  - headerBackground: 導覽列的背景顏色
- 設定開關
  - logger: redux logger 的開關 (上線時強制關閉)
  - cors: 對應到 `axios` 的 `withCredentials` 設定
- 數值設定
  - containerMaxWidth: 網頁的最大寬度，超過這個寬度的話，`sidebar` 會自動展開
  - sidebarWidth: `sidebar` div 的寬度
- Router 設定
  - adminPage: 管理端預設頁面
  - adminName: 管理端網址前綴字
    - http://localhost/adm/query -> `adm` 為管理端前綴字
  - defaultRoot: 預設是 `/` 根目錄，但是如果 IIS 有設定 `子應用程式`，就要調整此設定
    - http://localhost/srv2/adm/query -> `srv2` 為 IIS 子應用的名稱，因此 `defaultRoot` 需要改為 `/srv2`
  - drawerActiveColor: `sidebar` 若選中 Router 匹配時顯示的背景顏色
- API 資訊
  - devHost: 開發模式的 api host
  - proHost: 上線模式的 api host
  - ipHost: 主控站的 uri，當登出或是登入逾時皆會導向主控站

# 簡易舊版單一入口說明

## for. 後端

### 資料庫查詢 `KeyConfig` 表

在此表中新增一筆資料 `CName (站台名稱)`, `Source (callback uri)`, `License (secret key)`。

```sql
insert into KeyConfig(CName, Source, License) values('', '', '')
```

資料插入成功後，如下表所示：

| KCID | CName        | Source                                   | License |
| ---- | ------------ | ---------------------------------------- | ------- |
| ...  | ...          | ...                                      | ...     |
| 10   | 測試教育資源 | http://10.xx.xx.xx.xx:xxxx/auth/callback | xxx     |

此 `Source` 對應到編報站接口的 callback 頁面，讓整合平台將 `sid` 以及 `pc` 傳遞至此。

## for. 前端

### 瀏覽站台資料夾，尋找 `Default.aspx.cs` 檔案

在 `54` 行的位置 (程式碼新舊版本段落行數可能有落差)

能夠看見 `string [] strArray = { ... }`

在此手動加入 `Source uri` (與資料庫 Source 欄位相同)，如下圖所示：

```c
string[] strArray = {
    ...,
    "http://10.xx.xx.xx.xx:xxxx/auth/callback"
};
```

如此一來就能夠透過以下網址來測試 (`host`部分需要修改)，是否完成單一入口。

```http
http://10.21.21.229:777/default.aspx?redirect=http://10.xx.xx.xx.xx:xxxx/auth/callback
```

