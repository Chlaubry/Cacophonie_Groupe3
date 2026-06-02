const statusMessage = document.getElementById('statusMessage');
const botsTableBody = document.querySelector('#botsTable tbody');
const botStatsGrid = document.getElementById('botStatsGrid');
const refreshBtn = document.getElementById('refreshBtn');

function setStatus(text, isError = false) {
    statusMessage.textContent = text;
    statusMessage.className = isError ? 'status-message error' : 'status-message';
}

function renderBots(bots) {
    if (!Array.isArray(bots) || bots.length === 0) {
        botsTableBody.innerHTML = '<tr><td colspan="5">Aucun bot trouvé.</td></tr>';
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

function renderBotStats(statistics) {
    if (!Array.isArray(statistics) || statistics.length === 0) {
        botStatsGrid.innerHTML = '<p>Aucune statistique disponible.</p>';
        return;
    }

    botStatsGrid.innerHTML = statistics.map(item => {
        return `
            <section class="bot-stat-section">
                <h4>${item.name || 'Bot inconnu'}</h4>
                <p><strong>Conversations :</strong> <span>${item.count != null ? item.count : '—'}</span></p>
            </section>
        `;
    }).join('');
}

async function loadBotStats(bots) {
    if (!Array.isArray(bots) || bots.length === 0) {
        botStatsGrid.innerHTML = '<p>Aucune statistique de bot à afficher.</p>';
        return;
    }

    botStatsGrid.innerHTML = '<p>Chargement des statistiques...</p>';

    const stats = await Promise.all(bots.map(async bot => {
        try {
            const response = await fetch(`/bots/${encodeURIComponent(bot.id)}/conv`);
            if (!response.ok) {
                return { id: bot.id, name: bot.name, count: 'Erreur' };
            }
            const data = await response.json();
            return { id: bot.id, name: bot.name, count: data.count };
        } catch (error) {
            return { id: bot.id, name: bot.name, count: 'Erreur' };
        }
    }));

    renderBotStats(stats);
}

async function loadBots() {
    setStatus('Chargement des bots...', false);
    botsTableBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
    botStatsGrid.innerHTML = '<p>Chargement des statistiques...</p>';

    try {
        const response = await fetch('/bots');

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const bots = await response.json();
        renderBots(bots);
        await loadBotStats(bots);
        setStatus(`Chargement terminé (${bots.length} bot${bots.length > 1 ? 's' : ''}).`, false);
    } catch (error) {
        botsTableBody.innerHTML = '<tr><td colspan="5">Impossible de récupérer la liste des bots.</td></tr>';
        botStatsGrid.innerHTML = '<p>Impossible de récupérer les statistiques.</p>';
        setStatus('Erreur : ' + error.message, true);
        console.error(error);
    }
}

refreshBtn.addEventListener('click', loadBots);
window.addEventListener('DOMContentLoaded', loadBots);
