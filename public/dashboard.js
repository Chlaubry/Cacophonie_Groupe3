const statusMessage = document.getElementById('statusMessage');
const botsTableBody = document.querySelector('#botsTable tbody');
const refreshBtn = document.getElementById('refreshBtn');

function setStatus(text, isError = false) {
    statusMessage.textContent = text;
    if (isError) {
        statusMessage.className = 'status-message error';
    } else {
        statusMessage.className = 'status-message';
    }
}

function renderBots(bots) {
    if (!Array.isArray(bots) || bots.length === 0) {
        botsTableBody.innerHTML = '<tr><td colspan="6">Aucun bot trouvé.</td></tr>';
        return;
    }

    botsTableBody.innerHTML = bots.map(bot => {
        return `
            <tr>
                <td>${bot.name || ''}</td>
                <td>${bot.brain || ''}</td>
                <td>${bot.mouth || ''}</td>
                <td class="status ${bot.status ? 'active' : 'inactive'}">${bot.status ? 'Actif' : 'Inactif'}</td>
                <td>${bot.id || ''}</td>
            </tr>
        `;
    }).join('');
}

async function loadBots() {
    setStatus('Chargement des bots...', false);
    botsTableBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';

    try {
        const response = await fetch('/bots');

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const bots = await response.json();
        renderBots(bots);
        setStatus(`Chargement terminé (${bots.length} bot${bots.length > 1 ? 's' : ''}).`, false);
    } catch (error) {
        botsTableBody.innerHTML = '<tr><td colspan="6">Impossible de récupérer la liste des bots.</td></tr>';
        setStatus('Erreur : ' + error.message, true);
        console.error(error);
    }
}

refreshBtn.addEventListener('click', loadBots);
window.addEventListener('DOMContentLoaded', loadBots);
