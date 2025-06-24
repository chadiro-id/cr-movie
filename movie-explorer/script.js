// Dapatkan referensi ke elemen-elemen DOM yang akan digunakan
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieResultsContainer = document.getElementById('movie-results-container');
const movieDetailsModal = document.getElementById('movie-details-modal');
const movieDetailsContent = document.getElementById('movie-details-content');
const closeModalButton = document.getElementById('close-modal');

// API Key TMDb Anda (Sangat penting: JANGAN PERNAH menyertakan API Key sensitif di kode front-end untuk proyek produksi sungguhan!)
// Untuk proyek belajar ini, kita akan taruh langsung di sini, tapi di dunia nyata, ini harus disimpan di server.
const API_KEY = '42c23ce491ac261f4ddfe53b6cf6b2d5'; 
const BASE_URL = 'https://api.themoviedb.org/3';

// Tangani event submit pada form pencarian
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah halaman reload saat form disubmit

  const query = searchInput.value.trim(); // Ambil nilai input dan hapus spasi di awal/akhir

  if (query) {
    searchMovies(query); // Panggil fungsi untuk mencari film
  } else {
    alert('Mohon masukkan nama film untuk dicari!');
  }
});