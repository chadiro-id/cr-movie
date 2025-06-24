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

async function searchMovies(query) {
  // Tampilkan loading state
  movieResultsContainer.innerHTML = '<p>Mencari film...</p>';
  
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    // Cek apakah respons OK (status 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json(); // Parse respons JSON
    if (data.results.length > 0) {
      displayMovies(data.results); // Tampilkan film jika ditemukan
    } else {
      movieResultsContainer.innerHTML = '<p>Tidak ada film ditemukan dengan kata kunci tersebut.</p>';
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    movieResultsContainer.innerHTML = `<p>Terjadi kesalahan saat mencari film: ${error.message}</p>`;
  }
}

function displayMovies(movies) {
  movieResultsContainer.innerHTML = ''; // Kosongkan kontainer hasil sebelumnya
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card'); // Tambahkan class untuk styling
    // Gunakan path gambar dari TMDb, jika poster tidak ada, pakai placeholder
    const posterPath = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
      : 'https://via.placeholder.com/200x300?text=No+Poster'; // Placeholder image
    movieCard.innerHTML = `
      <img src="${posterPath}" alt="${movie.title} Poster">
      <h3>${movie.title}</h3>
      <p>${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
    `;
    
    movieCard.addEventListener('click', () => {
      // Kita akan tambahkan fungsi untuk menampilkan detail film di sini nanti
      showMovieDetails(movie.id); 
    });
    
    movieResultsContainer.appendChild(movieCard);
  });
}