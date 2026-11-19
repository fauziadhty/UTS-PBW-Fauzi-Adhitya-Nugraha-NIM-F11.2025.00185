
const tombolTema = document.getElementById("tema");
const html = document.documentElement;

function pasangTema(nama) {
  html.setAttribute("data-bs-theme", nama);
  if (tombolTema) {
    tombolTema.textContent = nama === "dark" ? "Mode terang" : "Mode gelap";
  }
  try {
    localStorage.setItem("tema", nama); // diingat untuk kunjungan berikutnya
  } catch (e) {
  }
}

let temaTersimpan = null;
try {
  temaTersimpan = localStorage.getItem("tema");
} catch (e) {
  temaTersimpan = null;
}
pasangTema(temaTersimpan || "light");

if (tombolTema) {
  tombolTema.addEventListener("click", function () {
    const sedangGelap = html.getAttribute("data-bs-theme") === "dark";
    pasangTema(sedangGelap ? "light" : "dark");
  });
}
const elemenSapaan = document.getElementById("sapaan");

if (elemenSapaan) {
  const jam = new Date().getHours();
  let sapaan;

  if (jam < 11) {
    sapaan = "Selamat pagi";
  } else if (jam < 15) {
    sapaan = "Selamat siang";
  } else if (jam < 18) {
    sapaan = "Selamat sore";
  } else {
    sapaan = "Selamat malam";
  }

  elemenSapaan.textContent = sapaan + ", saya";
}

const elemenUmur = document.getElementById("umur");

if (elemenUmur) {
  const lahir = new Date(2005, 8, 23);
  const sekarang = new Date();

  let umur = sekarang.getFullYear() - lahir.getFullYear();

  const belumUlangTahun =
    sekarang.getMonth() < lahir.getMonth() ||
    (sekarang.getMonth() === lahir.getMonth() && sekarang.getDate() < lahir.getDate());

  if (belumUlangTahun) {
    umur = umur - 1;
  }

  elemenUmur.textContent = umur + " tahun";
}

const tombolSalin = document.getElementById("salin");

if (tombolSalin) {
  tombolSalin.addEventListener("click", function () {
    navigator.clipboard
      .writeText("fauziadhitya27@gmail.com")
      .then(function () {
        tombolSalin.textContent = "Tersalin";
      })
      .catch(function () {
        tombolSalin.textContent = "Gagal";
      });

    // Kembalikan tulisan tombol setelah 1,5 detik
    setTimeout(function () {
      tombolSalin.textContent = "Salin";
    }, 1500);
  });
}

const form = document.getElementById("formKontak");

if (form) {
  const inputNama = document.getElementById("nama");
  const inputEmail = document.getElementById("email");
  const inputPesan = document.getElementById("pesan");

  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, idError, pesan) {
    const kotakError = document.getElementById(idError);
    if (pesan) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      kotakError.textContent = pesan;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      kotakError.textContent = "";
    }
  }

  function cekNama() {
    // trim() membuang spasi di awal dan akhir, jadi isi spasi saja dianggap kosong
    const nilai = inputNama.value.trim();
    if (nilai === "") {
      setError(inputNama, "errNama", "Nama tidak boleh kosong atau hanya spasi.");
      return false;
    }
    setError(inputNama, "errNama", "");
    return true;
  }

  function cekEmail() {
    const nilai = inputEmail.value.trim();
    if (nilai === "") {
      setError(inputEmail, "errEmail", "Email tidak boleh kosong.");
      return false;
    }
    if (!polaEmail.test(nilai)) {
      setError(inputEmail, "errEmail", "Format email tidak valid. Contoh: nama@contoh.com");
      return false;
    }
    setError(inputEmail, "errEmail", "");
    return true;
  }

  function cekPesan() {
    const nilai = inputPesan.value.trim();
    if (nilai === "") {
      setError(inputPesan, "errPesan", "Pesan tidak boleh kosong.");
      return false;
    }
    if (nilai.length < 10) {
      setError(inputPesan, "errPesan", "Pesan minimal 10 karakter.");
      return false;
    }
    setError(inputPesan, "errPesan", "");
    return true;
  }

  inputNama.addEventListener("input", function () {
    if (inputNama.classList.contains("is-invalid")) cekNama();
  });
  inputEmail.addEventListener("input", function () {
    if (inputEmail.classList.contains("is-invalid")) cekEmail();
  });
  inputPesan.addEventListener("input", function () {
    if (inputPesan.classList.contains("is-invalid")) cekPesan();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // cegah halaman ter-refresh

    const namaOk = cekNama();
    const emailOk = cekEmail();
    const pesanOk = cekPesan();

    const kotakHasil = document.getElementById("hasil");

    if (namaOk && emailOk && pesanOk) {
      document.getElementById("hasilNama").textContent = inputNama.value.trim();
      document.getElementById("hasilEmail").textContent = inputEmail.value.trim();
      document.getElementById("hasilPesan").textContent = inputPesan.value.trim();
      kotakHasil.classList.remove("d-none");

      form.reset();
      inputNama.classList.remove("is-valid");
      inputEmail.classList.remove("is-valid");
      inputPesan.classList.remove("is-valid");
    } else {
      kotakHasil.classList.add("d-none");
    }
  });
}
