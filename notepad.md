# Perintah Menjalankan Project

## 1. Infrastructure (Redis)
Jalankan container untuk Redis (pastikan Docker Desktop aktif):
```bash
docker-compose up -d
```

## 2. Backend (Laravel)
Jalankan server development Laravel:
```bash
php artisan serve
```

## 3. Frontend (Vite)
Jalankan server development frontend (hot-reload):
```bash
npm run dev
```

## 4. Queue Worker
Proses background jobs (penting untuk fitur yang menggunakan antrian):
```bash
php artisan queue:work
```
*Tips: Gunakan `php artisan queue:listen` saat development agar perubahan code worker langsung terbaca.*

---
