// i18n.js - Theme and Localization Management

// 1. Immediately apply theme to prevent flash of wrong theme
(function() {
  const savedTheme = localStorage.getItem('ie_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();

const translations = {
  id: {
    // Profil
    "prof.title": "Profil Saya",
    "prof.sub": "Kelola data pribadi dan preferensi Anda",
    "prof.edit": "Edit Profil",
    "prof.fullname": "Nama Lengkap",
    "prof.email": "Email Terdaftar",
    "prof.email_hint": "Email bersifat tetap sebagai ID utama sistem",
    "prof.bio": "Peran & Keahlian (Bio)",
    "prof.loc": "Lokasi / Kampus",
    "prof.web": "Tautan Portofolio",
    "prof.pref": "Preferensi Antarmuka",
    "prof.pref_sub": "Sesuaikan bahasa dan tema layar sesuai gaya kerjamu",
    "prof.lang": "Bahasa / Language",
    "prof.lang_hint": "Pilih bahasa pengantar antarmuka sistem",
    "prof.theme": "Tema Layar / Theme",
    "prof.theme_hint": "Gunakan mode terang atau gelap",
    "prof.danger": "Selesai Bekerja?",
    "prof.danger_sub": "Pastikan semua issue sudah di-save sebelum keluar",
    "prof.logout": "Keluar dari Akun",`n    "prof.empty": "Belum diisi",
    // Sidebar
    "sb.search": "Cari...",
    "sb.menu": "Menu Utama",
    "sb.dash": "Dashboard",
    "sb.proj": "Semua Proyek",
    "sb.rep": "Laporan",
    "sb.myproj": "Proyek Saya",
    "sb.new": "Proyek Baru",
    "sb.profile": "Lihat Profil"
  },
  en: {
    // Profile
    "prof.title": "My Profile",
    "prof.sub": "Manage your personal data and preferences",
    "prof.edit": "Edit Profile",
    "prof.fullname": "Full Name",
    "prof.email": "Registered Email",
    "prof.email_hint": "Email is permanent as the main system ID",
    "prof.bio": "Role & Expertise (Bio)",
    "prof.loc": "Location / Campus",
    "prof.web": "Portfolio Link",
    "prof.pref": "Interface Preferences",
    "prof.pref_sub": "Customize language and display theme to your working style",
    "prof.lang": "Bahasa / Language",
    "prof.lang_hint": "Select the system interface language",
    "prof.theme": "Theme",
    "prof.theme_hint": "Use light or dark mode",
    "prof.danger": "Done Working?",
    "prof.danger_sub": "Make sure all issues are saved before logging out",
    "prof.logout": "Log Out",`n    "prof.empty": "Not filled yet",
    // Sidebar
    "sb.search": "Search...",
    "sb.menu": "Main Menu",
    "sb.dash": "Dashboard",
    "sb.proj": "All Projects",
    "sb.rep": "Reports",
    "sb.myproj": "My Projects",
    "sb.new": "New Project",
    "sb.profile": "View Profile"
  }
};

function setLanguage(lang) {
  localStorage.setItem('ie_lang', lang);
  applyTranslations();
  updateLangButtons();
}

function setTheme(theme) {
  localStorage.setItem('ie_theme', theme);
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeButtons();
}

function applyTranslations() {
  const lang = localStorage.getItem('ie_lang') || 'id';
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
}

function updateLangButtons() {
  const lang = localStorage.getItem('ie_lang') || 'id';
  const btnEn = document.getElementById('btn-lang-en');
  const btnId = document.getElementById('btn-lang-id');
  if (btnEn && btnId) {
    if (lang === 'en') {
      btnEn.classList.add('active-pref');
      btnId.classList.remove('active-pref');
    } else {
      btnId.classList.add('active-pref');
      btnEn.classList.remove('active-pref');
    }
  }
}

function updateThemeButtons() {
  const theme = localStorage.getItem('ie_theme') || 'light';
  const btnLight = document.getElementById('btn-theme-light');
  const btnDark = document.getElementById('btn-theme-dark');
  if (btnLight && btnDark) {
    if (theme === 'dark') {
      btnDark.classList.add('active-pref');
      btnLight.classList.remove('active-pref');
    } else {
      btnLight.classList.add('active-pref');
      btnDark.classList.remove('active-pref');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangButtons();
  updateThemeButtons();
});

function getTranslation(key) {
  const lang = localStorage.getItem('ie_lang') || 'id';
  return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}
