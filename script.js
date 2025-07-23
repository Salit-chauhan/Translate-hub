// 🌐 Full ISO 639-1 Language Codes
const languages = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  "zh-cn": "Chinese (Simplified)",
  "zh-tw": "Chinese (Traditional)",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  iw: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  ko: "Korean",
  ku: "Kurdish",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar",
  ne: "Nepali",
  no: "Norwegian",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  gd: "Scots Gaelic",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

// DOM Elements
const langSelect = document.getElementById("lang-select");
const translateBtn = document.getElementById("translate-btn");
const resultBox = document.getElementById("result-box");
const themeToggle = document.getElementById("theme-toggle");
const textInput = document.getElementById("text-input");
const swapBtn = document.getElementById("swap-btn");

// Populate dropdown
Object.entries(languages).forEach(([code, name]) => {
  const opt = document.createElement("option");
  opt.value = code;
  opt.textContent = `${name} (${code})`;
  langSelect.appendChild(opt);
});

// Translation request
translateBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  const target_lang = langSelect.value;

  if (!text) {
    resultBox.textContent = "❗ Please enter some text.";
    return;
  }

  resultBox.textContent = "⏳ Translating...";

  try {
    const res = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target_lang }),
    });

    const data = await res.json();

    if (res.ok && data.translation) {
      resultBox.textContent = `✅ ${data.translation}`;
    } else {
      resultBox.textContent = `❌ ${data.error || "Translation failed."}`;
    }
  } catch (err) {
    resultBox.textContent = `❌ Could not reach backend server. Make sure Flask is running.`;
  }
});

// Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  themeToggle.textContent = document.documentElement.classList.contains("dark")
    ? "🌞"
    : "🌙";
});

// Swap languages button (for advanced version you can maintain source_lang)
swapBtn.addEventListener("click", () => {
  const currentLang = langSelect.value;
  langSelect.selectedIndex = 0;
  langSelect.value = currentLang;
  const currentText = textInput.value;
  textInput.value = resultBox.textContent.replace(/^✅\s*/, "") || "";
  resultBox.textContent = currentText
    ? "⏳ Swapped. Ready to translate."
    : "Translation will appear here...";
});
