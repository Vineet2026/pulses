// Toggle mobile navigation
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  links.style.display = links.style.display === "flex" ? "none" : "flex";
});

// Handle contact form submissions via fetch
const form = document.getElementById("contactForm");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    responseDiv.textContent = result.message;
    form.reset();
  } catch (err) {
    responseDiv.textContent = "Error sending message.";
    console.error(err);
  }
});

// Buy Modal Functionality
const buyLink = document.getElementById("buyLink");
const buyModal = document.getElementById("buyModal");
const closeBtn = document.querySelector(".close");
const buyForm = document.getElementById("buyForm");
const buyResponse = document.getElementById("buyResponse");

buyLink.addEventListener("click", (e) => {
  e.preventDefault();
  buyModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  buyModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === buyModal) {
    buyModal.style.display = "none";
  }
});

buyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(buyForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    buyResponse.textContent = result.message;
    buyForm.reset();
    setTimeout(() => {
      buyModal.style.display = "none";
      buyResponse.textContent = "";
    }, 2000);
  } catch (err) {
    buyResponse.textContent = "Error placing order.";
    console.error(err);
  }
});
