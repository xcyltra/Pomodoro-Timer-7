# Pomodoro Timer

- Laudya Aprilia Khoirum                    (10241038) (100%)
- Clara Uenike Meylan Langi                 (10241018) (100%)
- Moh Irsyad Fiqi Ferdiansyah Difa Nanda    (10241042) (100%)
- Raihandy Wijaya                           (10241064) (100%)


## Pendahuluan
Di era digital saat ini manajemen waktu menjadi keterampilan yang sangat penting untuk menunjang produktivitas terutama bagi pelajar, mahasiswa, dan pekerja profesional. Berbagai penelitian menunjukkan bahwa teknik Pomodoro dapat membantu meningkatkan manajemen waktu dan mengurangi prokrastinasi terutama saat menghadapi tugas-tugas besar yang menantang. Dengan memecah pekerjaan menjadi bagian-bagian kecil dan diselingi istirahat seseorang dapat lebih fokus dan memiliki rasa pencapaian yang lebih cepat terhadap progres kerja mereka <a href="#div_ref3">(Cirillo, 2006)</a>. Oleh karena itu, penerapan teknik ini dalam bentuk aplikasi digital seperti Pomodoro Timer sangat relevan untuk mendukung produktivitas di era modern.

Dengan latar belakang tersebut kami mengembangkan sebuah aplikasi Pomodoro Timer berbasis web menggunakan HTML, CSS, dan JavaScript. Tujuan kami membuat pomodoro timer ini adalah membuat alat bantu produktivitas yang mudah digunakan, menarik secara visual dan dapat digunakan secara offline tanpa perlu koneksi internet.


## Tinjauan Pustaka
Aplikasi Pomodoro Timer sudah banyak dikembangkan oleh berbagai pihak, baik dalam bentuk aplikasi desktop, mobile, maupun berbasis web. Kami mengambil referensi dari :

- https://www.tomatotimers.com/


Sebagai referensi kami untuk membuat web ini.

## Metode Pembuatan
## Perencanaan dan desain fitur program
Dalam proses pembuatan program kami merancang alur kerja dan fitur utama untuk mendukung aplikasi kami diantaranya :
- Pemilihan menu : Pomodoro, Short Break, dan Long Break.
- Timer yang dapat dijalankan dan direset.
- Menambahkan fitur loop untuk melakukan perulangan otomatis antar sesi.
- Fitur task list berfungsi sebagai tempat untuk menambah tugas.
## Struktur dan Logika Program 
Pada proses pembuatan program  ini kami menggunakan bahasa pemrograman JavaScript dimana dalam :
- Pengaturan Waktu
```js
const durations = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};
```
kami membuat variabel durations untuk menyimpan masing-masing mode dengan nilai yang telah ditentukan, lalu waktu tersebut akan berjalan secara mundur saat timer dijalankan.
- Timer Updating
```js
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
```
pada baris tersebut berfungsi untuk mengubah **`timeLeft`** dari detik ke `menit : detik` dan memperbarui tampilan program.
- Mengatur mode timer
```js
function setMode(newMode) {
  mode = newMode;
  clearInterval(timerInterval); // hentikan timer yang berjalan
  timeLeft = durations[mode];   // atur waktu sesuai mode
  updateTimerDisplay();

  // Update tampilan tombol mode aktif
  document.querySelectorAll(".mode-buttons button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`btn-${mode}`).classList.add("active");

  // Update teks status
  if (mode === "pomodoro") {
    statusDisplay.textContent = "Waktu kerja";
  } else if (mode === "short") {
    statusDisplay.textContent = "Istirahat pendek";
  } else {
    statusDisplay.textContent = "Istirahat panjang";
  }
}
```
pada baris kode tersebut berfungsi untuk mengatur mode timer, mengatur waktu sesuai mode, dan memperbarui tampilan tombol dalam program.
- Reset timer
```js
function resetTimer() {
  clearInterval(timerInterval);
  reps = 0;
  checkmarksDisplay.textContent = "";
  setMode("pomodoro");
}
```
Pada baris kode tersebut berfungsi untuk mengembalikan timer ke keadaan awal, menghapus tanda centang, dan mengatur mode ke Pomodoro.
- 

## Hasil Program
Sertakan gambar, diagram, atau link videos.
Sertakan ulasan selama proses pembuatan. Misal ada tidaknya
fitur yang bisa diselesaikan di dalam program.

Tutorial penggunaan program dapat dilihat melalui vidio berikut :

<video width="720" height="300" controls autoplay>
  <source src="Tutorial.mp4" type="video/mp4">
</video>


## Kesimpulan
#### Pembuatan aplikasi pomodoro timer ini membeikan kami beberapa pengalaman sebagai berikut :
- Membagi jobdesk anggota tim
- Mengimplementasikan logika waktu dengan JavaScript
- Mengidentifikasi fitur-fitur yang cocok untuk digunakan
#### Kekurangan yang masih dialami dalam program ini diantaranya :
- Belum terdapat notifikasi bila waktu habis
- Belum terdapat history sesi hasil kerja
- Belum terdapat menu yang berisi deskripsi terkait program
- Belum terdapat menu untuk menambahkan/mengubah tema
#### Kelebihan dari program yang telah kami buat diantaranya :
- Dapat digunakan secara offline
- Mendukung mode kerja berulang (loop otomatis)
- 
#### Rencana kami jika program dilanjutkan adalah :
- Menambahkan notifikasi jika waktu habis
- Menambahkan fitur history hasil kerja
- Menambahkan menu deskripsi terkait program
- Menambahkan menu untuk mengubah/menambahkan tema
- 

## Daftar pustaka
- <div id="div_ref1"> 
    https://en.wikipedia.org/wiki/Pomodoro_Technique. Diakses pada 7 Juni 2025.
  </div>
