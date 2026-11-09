(() => {
  'use strict';

  const data = window.CANCHA_DATA;
  if (!data) throw new Error('No se pudo cargar el modo de LaLiga.');

  const competition = data.competitions.find(item => item.countryId === 'es' && item.tier === 1);
  const clubs = competition && data.clubs.filter(item => item.competitionId === competition.id);
  if (!competition || !clubs || clubs.length !== 20) {
    throw new Error('El catálogo no contiene los 20 equipos esperados de LaLiga.');
  }

  const teamById = new Map(clubs.map(club => [club.id, club]));
  const text = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };

  function decorate() {
    document.title = 'Cancha Libre — Mánager de LaLiga';
    text(document.getElementById('statParticipations'), '20');
    text(document.getElementById('statComps'), '2D');
    document.querySelectorAll('.club-card[data-club]').forEach(card => {
      const club = teamById.get(card.dataset.club);
      if (!club) return;
      text(card.querySelector('.club-place'), club.city);
      const code = card.querySelector('.club-code');
      if (code && !card.querySelector('.club-rating')) {
        const rating = document.createElement('span');
        rating.className = 'club-rating';
        rating.textContent = `${club.overall} GRL`;
        code.insertAdjacentElement('afterend', rating);
      }
    });
    const results = document.getElementById('clubResults');
    if (results) text(results, results.textContent.replace(/participaciones?/g, match => match === 'participación' ? 'equipo' : 'equipos'));
    document.querySelectorAll('.league-meta').forEach(meta => {
      text(meta, meta.textContent.replace(/participaciones?/g, match => match === 'participación' ? 'equipo' : 'equipos'));
    });

    const selected = document.querySelector('.club-card.selected');
    const selectedClub = selected && teamById.get(selected.dataset.club);
    const profile = document.querySelector('.club-panel');
    if (selectedClub && profile) {
      text(profile.querySelector('.profile-sub'), `${selectedClub.city} · España`);
      text(profile.querySelector('.profile-text'), 'Nombres, dorsales, posiciones y edades de la plantilla oficial de LaLiga 2026/27. El GRL y los atributos son estimaciones del juego, no valoraciones oficiales.');
      const title = profile.querySelector('.club-profile-title');
      if (title && !title.querySelector('.club-overall')) {
        const rating = document.createElement('span');
        rating.className = 'club-overall';
        rating.textContent = `${selectedClub.overall} GRL DE CLUB`;
        title.append(rating);
      }
      profile.querySelectorAll('.fact-box').forEach(box => {
        const label = box.querySelector('span')?.textContent;
        if (label === 'Competencia') text(box.querySelector('strong'), 'LaLiga 2026/27');
        if (label === 'Plantilla') text(box.querySelector('strong'), '25 jugadores oficiales');
      });
    }

    document.querySelectorAll('.coverage-pill').forEach(pill => text(pill, 'LaLiga EA Sports'));
    document.querySelectorAll('.squad-toolbar h3').forEach(heading => {
      text(heading, heading.textContent.replace('Plantilla ficticia', 'Plantilla oficial'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const countryFilter = document.getElementById('countryFilter');
    const leagueFilter = document.getElementById('leagueFilter');
    const list = document.getElementById('clubList');
    const roots = [list, document.getElementById('clubResults'), document.getElementById('clubPanelContent'), document.getElementById('careerRoot')].filter(Boolean);

    const observer = new MutationObserver(decorate);
    roots.forEach(root => observer.observe(root, { childList: true, subtree: true }));
    decorate();

    if (countryFilter && countryFilter.value !== 'es') {
      countryFilter.value = 'es';
      countryFilter.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (leagueFilter && leagueFilter.value !== competition.id) {
      leagueFilter.value = competition.id;
      leagueFilter.dispatchEvent(new Event('change', { bubbles: true }));
    }
    countryFilter?.closest('label')?.setAttribute('hidden', '');
    leagueFilter?.closest('label')?.setAttribute('hidden', '');
    document.querySelector('.filters')?.classList.add('spain-filtered');
    document.querySelector('[data-view="evidence"]')?.setAttribute('hidden', '');
    const search = document.getElementById('searchInput');
    if (search) search.placeholder = 'Buscar equipo de LaLiga';
    requestAnimationFrame(() => {
      const firstClub = list?.querySelector('.club-card');
      if (firstClub) firstClub.click();
      decorate();
    });
  });
})();
