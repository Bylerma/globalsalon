// =========================
// Global Salon - Config
// =========================
const SALON_NAME = "Global Salon";

// Put WhatsApp number in international format without + or spaces.
// Example: "9198XXXXXXXX" (India +91)
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// =========================
// Helpers
// =========================
const $ = (id) => document.getElementById(id);

function waLink(message) {
  const base = "https://wa.me/" + WHATSAPP_NUMBER;
  const text = encodeURIComponent(message);
  return base + "?text=" + text;
}

function setWhatsAppButtons() {
  const helloMsg = `Hello ${SALON_NAME}! I want to book an appointment.`;

  const waTop = $("waTop");
  const waBottom = $("waBottom");
  const phoneText = $("phoneText");

  if (waTop) waTop.href = waLink(helloMsg);
  if (waBottom) waBottom.href = waLink(helloMsg);

  if (phoneText) {
    phoneText.textContent =
      WHATSAPP_NUMBER === "91XXXXXXXXXX"
        ? "+91-XXXXXXXXXX (add your number)"
        : "+" + WHATSAPP_NUMBER;
  }
}

// =========================
// Booking form -> WhatsApp
// =========================
function initBookingForm() {
  const form = $("bookingForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const date = (data.get("date") || "").toString().trim();
    const time = (data.get("time") || "").toString().trim();
    const location = (data.get("location") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const full = [
      `Hello ${SALON_NAME}!`,
      ``,
      `Booking Request Details:`,
      `Name: ${name}`,
      `Customer Phone: ${phone}`,
      `Service: ${service}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Location: ${location}`,
      message ? `Message: ${message}` : null,
      ``,
      `Please confirm availability.`
    ]
      .filter(Boolean)
      .join("\n");

    window.open(waLink(full), "_blank", "noopener,noreferrer");
  });
}

// =========================
// Init
// =========================
function init() {
  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();

  setWhatsAppButtons();
  initBookingForm();
}

document.addEventListener("DOMContentLoaded", init);
