(() => {
  'use strict';

  const data = window.CANCHA_DATA;
  if (!data) throw new Error('No se pudo cargar el modo de fútbol español.');

  const primary = data.competitions.find(item => item.countryId === 'es' && item.tier === 1);
  const clubById = new Map(data.clubs.map(club => [club.id, club]));
  const competitionById = new Map(data.competitions.map(competition => [competition.id, competition]));
  if (!primary || data.clubs.filter(club => club.competitionId === primary.id).length !== 20) {
    throw new Error('El catálogo no contiene los 20 equipos esperados de Primera División.');
  }

  const setText = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };
  const officialRosterCount = club => window.CANCHA_ROSTERS?.[club.code]?.length || 0;

  function decorate() {
    document.title = 'Cancha Libre FC 27 — Modo Mánager';
    setText(document.querySelector('.brand-copy small'), 'MODO MÁNAGER · TEMPORADA 2026/27');
    setText(document.querySelector('.hero .eyebrow'), 'EA SPORTS FC 27 STYLE · MODO CARRERA DE MÁNAGER');
    setText(document.querySelector('#statParticipations')?.nextElementSibling, 'clubes jugables');
    setText(document.querySelector('#statComps')?.nextElementSibling, 'competiciones');
    setText(document.getElementById('statParticipations'), String(data.clubs.length));
    setText(document.getElementById('statComps'), String(data.competitions.length));

    document.querySelectorAll('.club-card[data-club]').forEach(card => {
      const club = clubById.get(card.dataset.club);
      if (!club) return;
      card.dataset.tier = String(club.tier);
      setText(card.querySelector('.club-place'), club.city);
      const code = card.querySelector('.club-code');
      if (code && !card.querySelector('.club-rating')) {
        const rating = document.createElement('span');
        rating.className = 'club-rating';
        rating.textContent = `${club.overall} GRL`;
        code.insertAdjacentElement('afterend', rating);
      }
    });

    document.querySelectorAll('.league-block').forEach(block => {
      const club = clubById.get(block.querySelector('[data-club]')?.dataset.club);
      const competition = club && competitionById.get(club.competitionId);
      if (!competition) return;
      block.dataset.tier = String(competition.tier);
      const meta = block.querySelector('.league-meta');
      if (meta) setText(meta, `${competition.country} · ${competition.tierLabel || `Nivel ${competition.tier}`} · ${competition.clubCount} clubes`);
      setText(block.querySelector('.coverage-pill'), 'Clubes reales · escudos originales');
      setText(block.querySelector('.partial-pill'), 'Plantillas generadas');
    });

    const results = document.getElementById('clubResults');
    if (results) setText(results, results.textContent.replace(/participaciones?/g, match => match.endsWith('es') ? 'clubes' : 'club'));

    const selected = document.querySelector('.club-card.selected');
    const club = selected && clubById.get(selected.dataset.club);
    const profile = document.querySelector('.club-panel');
    if (club && profile) {
      const competition = competitionById.get(club.competitionId);
      profile.dataset.tier = String(club.tier);
      setText(profile.querySelector('.profile-sub'), `${club.city} · ${club.country || 'España'}`);
      const title = profile.querySelector('.club-profile-title');
      if (title && !title.querySelector('.club-overall')) {
        const rating = document.createElement('span');
        rating.className = 'club-overall';
        rating.textContent = `${club.overall} GRL DE CLUB`;
        title.append(rating);
      }
      setText(profile.querySelector('.profile-badge'), `${competition.title}${competition.group === 'Nacional' ? '' : ` · ${competition.group}`}`);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const countryFilter = document.getElementById('countryFilter');
    const leagueFilter = document.getElementById('leagueFilter');
    const list = document.getElementById('clubList');
    const roots = [list, document.getElementById('clubResults'), document.getElementById('clubPanelContent'), document.getElementById('careerRoot')].filter(Boolean);

    const observer = new MutationObserver(decorate);
    roots.forEach(root => observer.observe(root, { childList: true, subtree: true }));
    decorate();

    if (countryFilter && countryFilter.value !== 'all') {
      countryFilter.value = 'all';
      countryFilter.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (leagueFilter && leagueFilter.value !== 'all') {
      leagueFilter.value = 'all';
      leagueFilter.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const search = document.getElementById('searchInput');
    if (search) search.placeholder = 'Buscar club, ciudad, provincia o división (España / Canadá)';
    requestAnimationFrame(() => {
      const firstClub = list?.querySelector('.club-card');
      if (firstClub) firstClub.click();
      decorate();
    });
  });
})();
