onst fadeObserver = new IntersectionObserver((entries) => {
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


