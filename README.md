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

Semua isi undangan dibaca dari environment variable. Salin `.env.example` ke `.env.local` (berkas `.env*` diabaikan git), atau set variabel yang sama di dashboard hosting. Komponen tidak perlu disentuh.

Setiap variabel punya dua nama: `NEXT_PUBLIC_*` ikut terkirim ke browser karena dipakai Client Component; kembarnya tanpa awalan (`CHILD_NICKNAME`, `EVENT_DATE`, dan seterusnya) dibaca lebih dulu saat build dan tidak pernah masuk bundle. Pakai bentuk tanpa awalan kalau isinya ingin disembunyikan dari sumber halaman.

| Variabel | Arti |
| --- | --- |
| `CHILD_NICKNAME` | Nama panggilan, muncul di sampul dan salam |
| `CHILD_FULL_NAME` | Nama lengkap |
| `CHILD_ILLUSTRATION` | Ilustrasi di sampul |
| `FATHER_NAME`, `MOTHER_NAME` | Nama orang tua |
| `EVENT_TITLE` | Seluruh acara: `Aqiqah` atau `Aqiqah & Khitanan`. Kalimat salam mengikuti isi ini |
| `EVENT_DATE` | Tanggal acara, `YYYY-MM-DD` |
| `EVENT_START`, `EVENT_END` | Jam `HH:MM` |
| `EVENT_TIMEZONE`, `EVENT_TIMEZONE_LABEL` | Zona waktu untuk kalender dan label jam |
| `DRESS_CODE` | Kode berpakaian; tampil bila `NEXT_PUBLIC_SECTION_DRESSCODE` tidak `false` |
| `VENUE_NAME`, `VENUE_ADDRESS`, `VENUE_NOTE`, `MAPS_URL` | Tempat, alamat, patokan, dan tautan Google Maps |
| `GIFT_INTRO`, `GIFT_NOTE` | Pembuka dan catatan di bagian titip hadiah |
| `GIFT_BANK`, `GIFT_ACCOUNT_NUMBER`, `GIFT_ACCOUNT_HOLDER` | Satu rekening. Kosongkan bank untuk menyembunyikan kartunya |
| `NEXT_PUBLIC_SHOW_PUBLIC_WISHES` | Tampilkan daftar doa yang sudah masuk |
| `NEXT_PUBLIC_AUDIO_ENABLED` | Bunyi antarmuka (bukan musik latar) |
| `SITE_URL` | URL publik untuk metadata Open Graph dan canonical. Harus domain produksi, kalau tidak gambar preview menunjuk ke localhost |
| `SEO_DESCRIPTION` | Deskripsi untuk preview tautan |
| `NEXT_PUBLIC_SECTION_*` | Tampil atau sembunyikan bagian: `COVER`, `EVENT`, `DRESSCODE`, `LOCATION`, `GIFT`, `WISHES`, `FOOTER`. Bagian salam selalu tampil |

## Preview saat link dibagikan

`src/app/layout.tsx` mengirim `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, `og:locale`, dan `twitter:card`. Gambarnya `public/og.jpg` (1200x630, JPEG 75 KB), dipotong dari `public/img/cover-hero.webp` dengan ImageMagick. JPEG dipilih karena Telegram dan WhatsApp tidak selalu menerima WebP.

Sebelum dibagikan, set `SITE_URL` ke domain produksi. Tanpa itu `og:image` menunjuk ke `http://localhost:3000/og.jpg` dan preview tampil tanpa gambar. WhatsApp menyimpan cache preview; kalau gambar lama masih muncul setelah deploy, tambahkan query (`?v=2`) pada tautan yang dibagikan.

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
  components/invitation/  sampul, salam, acara, lokasi, doa
  components/ui/          bintang, lengkungan, tombol suara
  lib/invitation.ts       seluruh isi undangan, dibaca dari env
  lib/                    data undangan, format tanggal, kalender, doa, bunyi
data/wishes.json          hasil form doa
```

## Catatan perilaku

- Sampul mengunci scroll sampai dibuka, dan isi di bawahnya diberi `inert` agar tidak bisa dijangkau Tab sebelum amplop dibuka.
- `prefers-reduced-motion` membuat amplop terbuka seketika tanpa animasi.
- Bunyi memakai Web Audio dan hanya berbunyi setelah pengguna menekan tombol, sesuai kebijakan autoplay peramban.
- Peta yang tampil adalah ilustrasi. Tombol "Buka di Google Maps" membuka tujuan sebenarnya; peta sematan muncul bila `MAPS_URL` berisi `?q=`.