# 🌍 Translator Pro

**Translator Pro** is a modern, responsive web-based language translator built using Tailwind CSS and JavaScript, powered by a Flask API and the Deep Translator library. It supports translation between **100+ languages** using ISO 639-1 codes.

---

## 🚀 Features

- 🌐 Translate between all major world languages  
- 🎨 Beautiful, mobile-first UI with dark mode  
- ⚡ Fast translation powered by Deep Translator  
- 🔁 Swap language functionality  
- 💻 Fully responsive design (Tailwind CSS)  
- 🔧 Backend API built with Flask + Flask-CORS  

---

## 🧩 Tech Stack

- **Frontend:** HTML, JavaScript (vanilla), Tailwind CSS  
- **Backend:** Python, Flask, [Deep Translator](https://github.com/nidhaloff/deep-translator)  

---

## ☁️ Hosting

- **Frontend:** GitHub Pages  
- **Backend:** Render, Railway, or Replit  

---

## 🔧 How It Works

1. User enters text and selects a target language  
2. The frontend sends a `POST` request to the `/translate` endpoint  
3. Flask receives the request and uses **Deep Translator** to translate the text  
4. Translated text is returned and displayed on the page  

---

## 📂 Example

```bash
POST /translate
Content-Type: application/json

{
  "text": "Hola",
  "target_lang": "en"
}
