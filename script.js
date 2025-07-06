
// Scroll reveal
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
document.querySelectorAll('.fade-in, .animated-header, .testimonial').forEach(el => fadeObserver.observe(el));

// Back to Top
const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
};
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Wallet connect
function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        document.getElementById("wallet-address").innerText = "Connected: " + accounts[0];
      })
      .catch(err => alert("MetaMask error: " + err));
  } else {
    alert("MetaMask not found.");
  }
}

// Top Donors (Mock Data)
const donors = {
  "0xA1B2...E3": 750,
  "0xC4D5...F6": 500,
  "0x7890...12": 950,
};

const donorList = document.getElementById("donor-list");
if (donorList) {
  Object.entries(donors)
    .sort((a, b) => b[1] - a[1])
    .forEach(([wallet, amount], index) => {
      const li = document.createElement("li");
      li.textContent = `#${index + 1} - ${wallet} : ₹${amount}`;
      donorList.appendChild(li);
    });
}

document.getElementById("pollForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const vote = document.querySelector('input[name="vote"]:checked');
  const result = document.getElementById("pollResult");

  if (vote) {
    result.textContent = `✅ Your vote for "${vote.value}" has been submitted!`;
    result.style.color = "#0f0";
  } else {
    result.textContent = "⚠️ Please select an option before voting.";
    result.style.color = "#f00";
  }
});

