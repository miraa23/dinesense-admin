const pageStart = document.getElementById("page-start");
const pageLogin = document.getElementById("page-login");

const btnGetStarted = document.getElementById("btnGetStarted");
const goBackStart = document.getElementById("goBackStart");

const loginForm = document.getElementById("loginForm");
const togglePw = document.getElementById("togglePw");
const password = document.getElementById("password");

const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

const infoModal = document.getElementById("infoModal");
const closeInfo = document.getElementById("closeInfo");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");

const forgotLink = document.getElementById("forgotLink");

btnGetStarted.addEventListener("click", () => {
  pageStart.classList.add("hidden");
  pageLogin.classList.remove("hidden");
});

goBackStart.addEventListener("click", (e) => {
  e.preventDefault();
  pageLogin.classList.add("hidden");
  pageStart.classList.remove("hidden");
});

togglePw.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});

forgotLink.addEventListener("click", (e) => {
  e.preventDefault();
  openInfo("Forgot Password", "For now, please contact the system owner to reset the admin password.");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const adminId = document.getElementById("adminId").value.trim();
  const pw = password.value.trim();

  // UI-only demo check (replace later with real auth)
  if (!adminId || !pw) {
    openInfo("Missing Info", "Please enter Admin ID and Password.");
    return;
  }

  openSuccess();

  // Simulate redirect to dashboard after 1.2s
  setTimeout(() => {
    // next step: dashboard page
    window.location.href = "dashboard.html";
  }, 1200);
});

function openSuccess(){
  successModal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  successModal.classList.add("hidden");
  openInfo("Next Step", "Tell me which admin module you want first: Dashboard, Reservations, Tables, or Staff.");
});

function openInfo(title, text){
  infoTitle.textContent = title;
  infoText.textContent = text;
  infoModal.classList.remove("hidden");
}

closeInfo.addEventListener("click", () => {
  infoModal.classList.add("hidden");
});

// click outside modal to close
[successModal, infoModal].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});
