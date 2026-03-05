// Global Salon website JS
const SALON_NAME = "Global Salon";

// You provided both a WhatsApp number and a wa.me message link.
// We'll use the message link for buttons (best for direct chat entry),
// and we will still display/copy the phone number on the site.
const WHATSAPP_NUMBER_DISPLAY = "9839007427";
const WHATSAPP_MESSAGE_LINK = "https://wa.me/message/GG377NVL7HWZB1";

const INSTAGRAM_LINK = "https://www.instagram.com/gonda_salonathome?igsh=cjRhM2d6MzJyOGE0&utm_source=ig_contact_invite";

const $ = (id) => document.getElementById(id);

function waLink(text) {
  // Use your wa.me message link and append text (works in most cases).
  // If some devices ignore the text with message links, user still lands in chat.
  const encoded = encodeURIComponent(text);
  const joiner = WHATSAPP_MESSAGE_LINK.includes("?") ? "&" : "?";
  return `${WHATSAPP_MESSAGE_LINK}${joiner}text=${encoded}`;
}

function setLinks() {
  const hello = `Hello ${SALON_NAME}! I want to book an appointment.`;

  const waTop = $("waTop");
  const waBottom = $("waBottom");
  const waLehenga = $("waLehenga");

  const waRates1 = $("waRates1");
  const waRates2 = $("waRates2");
  const waRates3 = $("waRates3");

  const phoneText = $("phoneText");

  if (waTop) waTop.href = waLink(hello);
  if (waBottom) waBottom.href = waLink(hello);
  if (waLehenga) waLehenga.href = waLink(`Hello ${SALON_NAME}! I want to enquire about Lehenga on Rent (starting ₹2999).`);

  if (waRates1) waRates1.href = waLink(`Hello ${SALON_NAME}! Please share your latest Makeup rates/package details.`);
  if (waRates2) waRates2.href = waLink(`Hello ${SALON_NAME}! Please share your latest Hair service rates/package details.`);
  if (waRates3) waRates3.href = waLink(`Hello ${SALON_NAME}! Please share your latest Facial/Cleanup/Waxing rates.`);

  if (phoneText) phoneText.textContent = WHATSAPP_NUMBER_DISPLAY;

  // Optional: set year
  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();
}

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
    ].filter(Boolean).join("\n");

    window.open(waLink(full), "_blank", "noopener,noreferrer");
  });
}

function initCallbackForm() {
  const form = $("callbackForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("cb_name") || "").toString().trim();
    const phone = (data.get("cb_phone") || "").toString().trim();
    const bestTime = (data.get("cb_time") || "").toString().trim();
    const reason = (data.get("cb_reason") || "").toString().trim();

    const full = [
      `Hello ${SALON_NAME}!`,
      ``,
      `CALL BACK REQUEST:`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Best time to call: ${bestTime}`,
      `Reason: ${reason}`,
      ``,
      `Please call me back.`
    ].join("\n");

    window.open(waLink(full), "_blank", "noopener,noreferrer");
  });
}

function init() {
  setLinks();
  initBookingForm();
  initCallbackForm();
}

document.addEventListener("DOMContentLoaded", init);
