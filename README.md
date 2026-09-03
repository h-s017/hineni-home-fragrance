# HINENI 此域 選物

HINENI 的居家香氛與生活選物網站，包含商品分類、購物袋與會員功能。

## 會員系統

- Email／密碼註冊與登入
- Email 驗證、忘記密碼與密碼更新
- 使用 Supabase Auth 管理會員
- 使用 `public.member_carts` 保存跨裝置購物車
- Row Level Security 限制會員只能讀寫自己的購物車

瀏覽器端只使用 Supabase publishable key。請勿把 `service_role` 或 secret key 放進本專案。

資料庫變更記錄於 `supabase/migrations/`。

## 開發

需要 Node.js `>=22.13.0`。

```bash
npm ci
npm run dev
```

正式建置：

```bash
npm run build
```

## 部署前設定

在 Supabase Dashboard 的 **Authentication → URL Configuration** 設定正式網站網址，並把所有實際使用的正式網域加入 Redirect URLs。會員驗證信與密碼重設信才會回到正確網站。

目前正式 Sites 網址：

`https://hineni-home-fragrance.pystar0417.chatgpt.site`
