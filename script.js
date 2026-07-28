const music = document.getElementById('bgMusic');
const loader = document.getElementById('loader');
const website = document.getElementById('website');
const slide = document.getElementById('slide');
const alumniImages = document.querySelectorAll('.alumni-grid .card img');

music.play();

music.addEventListener('ended', () => {
  music.pause();
  music.currentTime = 0;
});

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      website.style.display = 'block';
    }, 500);
  }, 8000);
});

const photos = [
  'assets/img/1.jpeg',
  'assets/img/2.jpeg',
  'assets/img/3.jpeg',
  'assets/img/4.jpeg',
  'assets/img/5.jpeg',
  'assets/img/8.jpeg',
  'assets/img/7.jpeg',
  'assets/img/6.jpeg'
];

function pilihGuru(logo, nama, deskripsi, guru) {
  document.getElementById('logoJurusan').src = logo;
  document.getElementById('namaJurusan').textContent = nama;
  document.getElementById('deskripsiJurusan').textContent = deskripsi;
  document.getElementById('guruJurusan').textContent = 'Guru Jurusan : ' + guru;
}

let slideIndex = 0;
const slideshow = setInterval(() => {
  slide.style.opacity = '0';
  setTimeout(() => {
    slideIndex = (slideIndex + 1) % photos.length;
    slide.src = photos[slideIndex];
    slide.style.opacity = '1';
  }, 300);
}, 1000);

const internshipLogos = {
  RPL: 'assets/logo/prl.jpg',
  APHPI: 'assets/logo/aphpi.png',
  TGP: 'assets/logo/tgp.png'
};

function getInternshipLogo(card) {
  const text = card.innerText;
  if (/APHPI|Perikanan/i.test(text)) return internshipLogos.APHPI;
  if (/TGP|Teknik Geologi Pertambangan/i.test(text)) return internshipLogos.TGP;
  return internshipLogos.RPL;
}

function toggleAlumniImage(img) {
  if (img.dataset.transitioning === 'true') return;

  const card = img.closest('.card');
  if (!card) return;

  const logo = getInternshipLogo(card);
  const isLogoShown = img.dataset.toggled === 'true';
  const nextSrc = isLogoShown ? img.dataset.original : logo;

  img.dataset.transitioning = 'true';
  img.classList.add('fade-transition');

  setTimeout(() => {
    img.src = nextSrc;
    img.dataset.toggled = isLogoShown ? 'false' : 'true';
    img.classList.remove('fade-transition');
    img.dataset.transitioning = 'false';
  }, 600);
}

alumniImages.forEach(img => {
  img.dataset.original = img.src;
  img.dataset.toggled = 'false';
  img.dataset.transitioning = 'false';
  img.addEventListener('click', () => toggleAlumniImage(img));
});

function autoToggleAllAlumni() {
  alumniImages.forEach(img => {
    if (img.dataset.transitioning === 'false') {
      toggleAlumniImage(img);
    }
  });
}

setInterval(autoToggleAllAlumni, 1800);

setTimeout(() => {
  clearInterval(slideshow);
  loader.style.display = 'none';
  website.style.display = 'block';
}, 8000);
