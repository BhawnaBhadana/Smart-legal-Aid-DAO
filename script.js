async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("wallet-address").innerText = `Connected: ${accounts[0]}`;
    } catch (err) {
      alert('Wallet connection failed.');
    }
  } else {
    alert('Please install MetaMask to connect.');
  }
}

document.getElementById('caseForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const details = document.getElementById('details').value.trim();
  const status = document.getElementById('status').value;
  const goal = parseFloat(document.getElementById('goal').value);
  const msgEl = document.getElementById('submit-msg');

  if (!name || !details || !status || isNaN(goal) || goal <= 0) {
    msgEl.innerText = "Please fill all fields correctly.";
    msgEl.style.color = "red";
    return;
  }

  try {
    await db.collection("cases").add({
      name, details, status, goal,
      raised: 0,
      timestamp: Date.now()
    });
    msgEl.innerText = "Case submitted successfully!";
    msgEl.style.color = "lightgreen";
    e.target.reset();
    loadCases(); // refresh after submit
  } catch (err) {
    msgEl.innerText = "Submission failed.";
    msgEl.style.color = "red";
  }
});

async function loadCases() {
  const caseList = document.getElementById('case-list');
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const snapshot = await db.collection("cases").orderBy("timestamp", "desc").get();
  caseList.innerHTML = '';

  snapshot.forEach(doc => {
    const data = doc.data();
    if (
      !data.name.toLowerCase().includes(searchQuery) &&
      !data.details.toLowerCase().includes(searchQuery)
    ) return;

    const percent = Math.min(100, Math.round((data.raised / data.goal) * 100));
    const el = document.createElement('div');
    el.className = "case-card";
    el.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Status:</strong> ${data.status}</p>
      <p>${data.details}</p>
      <p><strong>Goal:</strong> ${data.goal} ETH | <strong>Raised:</strong> ${data.raised || 0} ETH</p>
      <div class="progress-bar"><div class="progress" style="width:${percent}%"></div></div>
    `;
    caseList.appendChild(el);
  });
}

document.getElementById('searchInput').addEventListener('input', loadCases);
win
