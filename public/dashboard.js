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

function getTopUserId(conversations) {
    if (!Array.isArray(conversations) || conversations.length === 0) {
        return null;
    }

    const counts = conversations.reduce((acc, item) => {
        const userId = item.userId;
        if (!userId) return acc;
        acc[userId] = (acc[userId] || 0) + 1;
        return acc;
    }, {});

    let topUserId = null;
    let maxCount = 0;

    for (const [userId, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            topUserId = userId;
        }
    }

    return { userId: topUserId, count: maxCount };
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
                <p><strong>Utilisateur favoris :</strong> <span>${item.topUserId || '—'}</span></p>
                <p><strong>Nombre de messages avec son utilisateur favoris :</strong> <span>${item.topUserCount != null ? item.topUserCount : '—'}</span></p>
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
                return { id: bot.id, name: bot.name, count: 'Erreur', topUserId: '—', topUserCount: '—' };
            }
            const data = await response.json();
            const top = getTopUserId(data.conversations || []);
            return {
                id: bot.id,
                name: bot.name,
                count: data.count,
                topUserId: top?.userId || '—',
                topUserCount: top?.count != null ? top.count : '—'
            };
        } catch (error) {
            return { id: bot.id, name: bot.name, count: 'Erreur', topUserId: '—', topUserCount: '—' };
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
