# Undangan Aqiqah & Khitanan

Undangan digital bergaya cerita anak: sampul amplop 3D yang bisa dibuka, ilustrasi 3D anak berbaju koko, ornamen arsitektur Hagia Sophia, dan form doa yang tersimpan ke file JSON.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Mengisi data undangan

Semua isi undangan ada di `src/data/invitation.json`. Cukup ubah file itu, komponen tidak perlu disentuh.

| Field | Arti |
| --- | --- |
| `child.nickname` | Nama panggilan, muncul di sampul dan judul |
| `child.fullName` | Nama lengkap |
| `child.birthPlace`, `child.birthDate` | Tempat dan tanggal lahir, format `YYYY-MM-DD` |
| `child.photo` | URL foto asli anak. Kosongkan untuk memakai ilustrasi |
| `child.illustration` | Ilustrasi di lengkungan salam |
| `child.profileIllustration` | Ilustrasi khusus bagian profil |
| `parents.father`, `parents.mother` | Nama orang tua |
| `event.date` | Tanggal acara, `YYYY-MM-DD` |
| `event.startTime`, `event.endTime` | Jam `HH:MM` |
| `event.timezone`, `event.timezoneLabel` | Zona waktu untuk kalender dan label jam |
| `event.runs` | Daftar rangkaian acara |
| `sections.*.show` | Tampil atau sembunyikan bagian: `cover`, `greeting`, `profile`, `event`, `dresscode`, `location`, `wishes`, `footer` |
| `event.dressCode` | Kode berpakaian, hanya dipakai kalau `sections.dresscode.show` bernilai `true` |
| `venue.*` | Nama tempat, alamat, patokan, dan tautan Google Maps |
| `wishes.showPublicWishes` | Tampilkan daftar doa yang sudah masuk |
| `gk.greeting`, `gk.blessing` | Kalimat pembuka dan doa untuk anak |
| `audio.enabled` | Bunyi antarmuka (bukan musik latar) |
| `seo.siteUrl` | URL publik, dipakai metadata Open Graph |

Umur anak dihitung otomatis dari `child.birthDate`, jadi tidak perlu diperbarui tiap bulan. Kalau `birthDate` belum diisi format yang benar, badge umur memakai angka 1.

## Nama tamu di sampul

Tambahkan query string saat mengirim tautan:

```
https://domain-anda.com/?to=Bapak%20Darmawan
```

Nama itu tampil di bagian "Kepada" pada amplop. Tanpa query, tertulis "Bapak/Ibu/Saudara/i".

## Doa dan harapan

- Form mengirim `POST /api/wishes`, lalu disimpan ke `data/wishes.json`.
- Berkas dibuat otomatis dan ditulis atomik, jadi aman untuk beberapa kiriman bersamaan.
- Batas 500 doa. Setelah penuh, form menampilkan pesan agar mencoba lagi nanti.
- Isian dibatasi 60 karakter untuk nama dan 400 untuk pesan, karakter kontrol dibuang.
- Ada honeypot `website` untuk menahan bot.
- Endpoint `GET /api/wishes` dipakai daftar doa publik.

`data/wishes.json` bukan tempat rahasia: siapa pun yang bisa membaca folder proyek bisa melihatnya. Untuk produksi, arahkan `src/lib/wishes.ts` ke basis data bila diinginkan.

## Mengganti gambar

Aset ada di `public/img` dalam format WebP. Karakter utama memakai PNG transparan agar bisa ditempel di latar apa pun.

| Berkas | Dipakai di |
| --- | --- |
| `boy-wave.webp`, `girl.webp` | Anak yang mengintip di sampul |
| `baby-portrait.webp` | Lengkungan salam |
| `baby-rest.webp` | Profil anak |
| `boy-point.webp` | Bagian acara |
| `boy-lantern.webp` | Bagian lokasi |
| `boy-quran.webp` | Footer |
| `boy-doa.webp` | Ucapan terima kasih setelah kirim doa |
| `wishes-hero.webp` | Adegan malam di bagian doa |

Amiri untuk teks Arab disimpan sendiri di `public/fonts`, satu berkas tanpa pemecahan subset.

## Struktur

```
src/
  app/
    api/wishes/route.ts   GET daftar doa, POST doa baru
    page.tsx              urutan bab undangan
    globals.css           token warna, tipografi, pola geometris
  components/invitation/  sampul, salam, profil, acara, lokasi, doa
  components/ui/          bintang, lengkungan, tombol suara
  data/invitation.json    seluruh isi undangan
  lib/                    format tanggal, kalender, penyimpanan doa, bunyi
data/wishes.json          hasil form doa
```

## Catatan perilaku

- Sampul mengunci scroll sampai dibuka, dan isi di bawahnya diberi `inert` agar tidak bisa dijangkau Tab sebelum amplop dibuka.
- `prefers-reduced-motion` membuat amplop terbuka seketika tanpa animasi.
- Bunyi memakai Web Audio dan hanya berbunyi setelah pengguna menekan tombol, sesuai kebijakan autoplay peramban.
- Peta yang tampil adalah ilustrasi. Tombol "Buka di Google Maps" membuka tujuan sebenarnya; peta sematan muncul bila `venue.mapsUrl` berisi `?q=`.