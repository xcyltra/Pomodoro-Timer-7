# Pomodoro Timer

- Laudya Aprilia Khoirum                    (10241038) (100%)
- Clara Uenike Meylan Langi                 (10241018) (100%)
- Moh Irsyad Fiqi Ferdiansyah Difa Nanda    (10241042) (100%)
- Raihandy Wijaya                           (10241064) (100%)


## Pendahuluan
Teknik Pomodoro adalah metode manajemen waktu yang dikembangkan oleh Francesco Cirillo pada akhir tahun 1980-an. Teknik ini menggunakan pengatur waktu dapur untuk membagi pekerjaan ke dalam beberapa interval, biasanya 25 menit, yang dipisahkan oleh waktu istirahat singkat. Setiap interval dikenal sebagai pomodoro, dari bahasa Italia yang berarti tomat, sesuai dengan pengatur waktu dapur berbentuk tomat yang digunakan Cirillo saat menjadi mahasiswa.<a href> <a href="#div_ref1">(Cirillo, 2023)</a>. Dengan memecah pekerjaan menjadi bagian-bagian kecil dan diselingi istirahat seseorang dapat lebih fokus dan memiliki rasa pencapaian yang lebih cepat terhadap progres kerja mereka. Oleh karena itu, penerapan teknik ini dalam bentuk aplikasi digital seperti Pomodoro Timer sangat relevan untuk mendukung produktivitas di era modern.

Dengan latar belakang tersebut kami mengembangkan sebuah aplikasi Pomodoro Timer berbasis web menggunakan HTML, CSS, dan JavaScript. Tujuan kami membuat pomodoro timer ini adalah membuat alat bantu produktivitas yang mudah digunakan, menarik secara visual dan dapat digunakan secara offline tanpa perlu koneksi internet.

Selain itu, proyek pembuatan aplikasi Pomodoro Timer ini bertujuan sebagai solusi praktis untuk membantu pengguna mengelola waktu secara mandiri dalam berbagai aktivitas, seperti belajar, bekerja, atau menyelesaikan proyek pribadi. Aplikasi ini dirancang agar pengguna dapat fokus pada satu tugas dalam durasi tertentu tanpa gangguan, dengan jeda istirahat yang terjadwal secara otomatis. Fungsi utama dari Pomodoro Timer ini adalah sebagai pengatur siklus kerja dan istirahat, sehingga dapat meningkatkan konsentrasi, mengurangi kelelahan mental, dan membantu pengguna membentuk kebiasaan kerja yang lebih terstruktur. Dengan pendekatan ini, diharapkan pengguna bisa lebih produktif dan efisien dalam menjalani rutinitas harian, terutama di tengah distraksi yang tinggi di era digital.

## Tinjauan Pustaka
Aplikasi Pomodoro Timer sudah banyak dikembangkan oleh berbagai pihak, baik dalam bentuk aplikasi desktop, mobile, maupun berbasis web. Untuk mengembangkan program pomodoro ini kami mengambil referensi dari beberapa web berikut :

- **TomatoTimers** merupakan  merupakan situs web yang menyediakan aplikasi Pomodoro Timer sederhana dan fungsional yang dapat digunakan langsung melalui browser tanpa perlu instalasi. Website ini dirancang dengan antarmuka yang minimalis dan intuitif, memungkinkan pengguna untuk memilih tiga mode utama, yaitu Pomodoro, Short Break, dan Long Break. TomatoTimers sangat membantu dalam mendukung metode manajemen waktu berbasis teknik Pomodoro, karena memungkinkan pengguna fokus bekerja dalam durasi tertentu diselingi waktu istirahat yang terstruktur. Dapat diakses melalui link : https://www.tomatotimers.com/ 
- **Flocus** merupakan situs web produktivitas berbasis personal dashboard yang dirancang untuk membantu pengguna memulai hari dengan lebih fokus dan terorganisir. Flocus menampilkan halaman pembuka yang dapat dikustomisasi dengan to-do list, kutipan motivasi, widget cuaca, serta background gambar yang menenangkan. Tujuan utama dari Flocus adalah menciptakan suasana kerja yang positif dan memotivasi pengguna sejak awal mereka membuka browser, sehingga membantu mengurangi distraksi dan meningkatkan kesadaran terhadap prioritas harian. Dapat diakses melalui link : https://flocus.com/
- **StudyWithMe** merupakan aplikasi web berbasis Pomodoro yang dirancang dengan antarmuka aesthetic guna meningkatkan fokus dan produktivitas. Pengguna dapat memilih dari berbagai tema visual seperti “Cozy Fireplace”, “Tokyo Sakura”, dan “Seoul Sunrise” untuk menciptakan atmosfer belajar yang menyenangkan dan personal. Secara keseluruhan, StudyWithMe.io menggabungkan estetika visual dan audio yang menyenangkan dengan teknik manajemen waktu Pomodoro, menyediakan ruang digital yang dapat disesuaikan untuk belajar atau bekerja dengan lebih fokus dan bersemangat. Dapat diakses melalui link : https://studywithme.io/


## Metode Pembuatan
Dalam program ini kami menggunakan bahasa pemrograman JavaScript untuk membuat logika utama dari timer Pomodoro. Kami juga menggunakan HTML sebagai kerangka struktur halaman dan CSS untuk memperindah tampilan antarmuka pengguna agar lebih menarik dan mudah digunakan.Selama untuk mengembangkan web Pomodoro ini langkah pertama yang kami lakukan adalah menetapkan fitur-fitur yang akan disediakan dalam program berupa :
- Timer Pomodoro dengan tiga mode Pomodoro (25 menit), Short Break (5 menit), dan Long Break (15 menit).
- Menu setting yang berfungsi untuk mengubah waktu timer dari masing-masing mode
- Tombol Mulai dan Reset berfungsi untuk mengelola alur waktu.
- Checkmarks otomatis yang menampilkan tanda centang setelah sesi kerja selesai.
- Task list berfungsi untuk mencatat dan memantau tugas yang ingin diselesaikan pengguna.
- Mode loop yang memungkinkan pengulangan otomatis antara kerja dan istirahat.

### Penjelasan terkait kode JavaScript yang digunakan dalam program :
1. Menentukan waktu untuk setiap mode

```js
const durations = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};
```
pada baris `const durations` berfungsi untuk mendefinisikan masing-masing mode (Pomodoro, Short Break, dan Long Break) dalam satuan detik.

2. Mengatur mode dan status tampilan

```js
function setMode(newMode) {
  mode = newMode;
  clearInterval(timerInterval);
  timeLeft = durations[mode];
  updateTimerDisplay();

  document.querySelectorAll(".mode-buttons button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`btn-${mode}`).classList.add("active");

  if (mode === "pomodoro") {
    statusDisplay.textContent = "Waktu kerja";
  } else if (mode === "short") {
    statusDisplay.textContent = "Istirahat pendek";
  } else {
    statusDisplay.textContent = "Istirahat panjang";
  }
}
```
pada baris `setMode()` berfungsi untuk mengganti mode timer dan memperbarui status di layar,dengan fungsi ini pengguna dapat berpindah mode kapan saja dan dapat melihat status kerja yang sedang berlangsung.

3. Timer interaktif

```js
function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      if (mode === "pomodoro") checkmarksDisplay.textContent += "✔";

      if (loopCheckbox.checked) {
        mode = (mode === "pomodoro") ? (reps % 8 === 0 ? "long" : "short") : "pomodoro";
        setMode(mode);
        startTimer();
      } else {
        statusDisplay.textContent = "Selesai!";
        setButtonState("btn-reset");
      }
    }
  }, 1000);
}
```
pada bagian ini timer akan otomatis berpindah ke mode selanjutnya jika opsi `loop otomatis` diaktifkan.

4. Reset dan pause timer

```js
function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    statusDisplay.textContent = "Ditunda...";
  } else {
    startTimer(); // lanjutkan
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isPaused = false;
  reps = 0;
  checkmarksDisplay.textContent = "";
  setMode("pomodoro");
}
```
pada bagian ini kami menambahkan menu berupa `pause` dan `reset` untuk menghentikan sementara dan mengulang timer dengan fleksibel.

5. Fitur task list

```js
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
  });

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
}
```
pada bagian ini kami menambahkan task list dengan tujuan untuk memudahkan pengguna jika ingin menuliskan tugas yang ingin mereka selesaikan selama sesi pomodoro, jika tugas telah selesai dapat diberi tanda centang atau dihapus dari list sesuai dengan kebutuhan pengguna.


## Hasil Program
Hasil dari program yang kami buat memiliki beberapa fitur yang diimplementasikan melalui `timer dinamis` berupa menu _pomodoro, short break, dan long break_ dimana dalam ketiga fitur ini menampilkan timer secara real time dengan format menit:detik dan disediakan fitur reset untuk mengembalikan waktu ke mode awal program. 

Selain itu program ini juga memiliki metode `checkmarks` yang berfungsi untuk menambahkan ✔ secara otomatis untuk tiap sesi pomodoro yang selesai dijalankan. Sedangkan `task list` dalam program ini berfungsi sebagai tempat bagi pengguna untuk menambahkan daftar tugas yang ingin mereka kerjakan, list tugas yang telah ditambahkan dapat diberi tanda ✔ jika telah selesai dikerjakan dan juga dapat dihapus dengan menekan tombol ❌ jika diinginkan. 

### Diagram alir untuk program ini adalah sebagai berikut :
<img src="img-resources/flowchart1.png" width="600" height="220"> 

<img src="img-resources/flowchart2.png" width="600" height="220"> 
Untuk langkah penggunaan program kami adalah :

<br>1. Buka program dan tampilan awal akan masuk ketampilan dengan menu `pomodoro` 
<br>2. Selanjutnya pengguna dapat mengatur durasi timer sesuai dengan yang diinginkan pada menu `settings` 
<br>3. Pengguna dapat menambahkan `daftar tugas` yang ingin dikerjakan pada menu `task list` 
<br>4. pengguna dapat menekan tombol `centang` jika tugas telah terselesaikan dan bisa menekan tanda `X` jika ingin menghapus dari list
<br>5. Pengguna dapat memulai sesi produktif dengan menekan tombol `mulai` pada menu yang telah disediakan
<br>6. Pengguna dapat mencentang menu `loop otomatis` jika ingin melakukan sesi Pomodoro > Short break > Long Break secara berurutan tanpa perlu menekan tombol mulai secara manual


### Tampilan saat program dijalankan adalah sebagai berikut :
#### Tampilan program
<img src="img-resources/program.png" width="600" >
<img src="img-resources/setting-timer.png" width="600" >

#### Diagram alir kode program ini adalah sebagai berikut :
<img src="img-resources/flowchartprogram.png" width="600" >


## Kesimpulan
#### Pembuatan aplikasi pomodoro timer ini membeikan kami beberapa pengalaman sebagai berikut :
- Membagi jobdesk anggota tim
- Mengimplementasikan logika waktu dengan JavaScript
- Mengidentifikasi fitur-fitur yang cocok untuk digunakan dalam program
#### Kekurangan yang masih dialami dalam program ini diantaranya :
- Belum terdapat notifikasi bila waktu habis
- Belum terdapat history sesi penggunaan program
- Belum terdapat menu yang berisi deskripsi terkait program
- Belum terdapat menu untuk menambahkan/mengubah tema
- Belum terdapat fitur custom timer dan belum dapat menyimpan progress task list
#### Kelebihan dari program yang telah kami buat diantaranya :
- Dapat digunakan secara offline
- Mendukung mode kerja berulang (loop otomatis)
#### Rencana kami jika program dilanjutkan adalah :
- Menambahkan notifikasi jika waktu habis
- Menambahkan fitur history hasil kerja
- Menambahkan menu deskripsi terkait program
- Menambahkan menu untuk mengubah/menambahkan tema serta nada dering

## Daftar pustaka
- https://www.tomatoTimers.com. Diakses pada 23 Mei 2025.
- https://youtu.be/sVSAklXy1uE?si=Uhb9vOdr96oFsr2g Diakses pada 28 Mei 2025
- https://en.wikipedia.org/wiki/Pomodoro_Technique. Diakses pada 7 Juni 2025.
- https://flocus.com. Diakses pada 7 Juni 2025.
- https://studywithme.io. Diakses pada 9 Juni 2025.