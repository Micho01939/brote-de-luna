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
    document.title = 'Cancha Libre — Mánager de fútbol español';
    setText(document.querySelector('.brand-copy small'), 'FÚTBOL ESPAÑOL · 2026/27');
    setText(document.querySelector('.hero .eyebrow'), 'Fútbol español · Temporada 2026/27');
    setText(document.querySelector('.hero-copy p'), 'Elige entre Primera División, Segunda División o Primera Federación. Gestiona tu plantilla con GRL y atributos, y vive partidos tácticos 2D.');
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
      const officialCount = officialRosterCount(club);
      profile.dataset.tier = String(club.tier);
      setText(profile.querySelector('.profile-sub'), `${club.city} · España`);
      setText(profile.querySelector('.profile-text'), officialCount
        ? `Club real de ${club.league}. Nombres, dorsales, posiciones y edades de la plantilla oficial de LaLiga 2026/27; GRL y atributos son estimaciones del juego.`
        : 'Club participante de la temporada 2026/27. El escudo es original y los jugadores, nombres, GRL y atributos se generan para Cancha Libre.');
      const title = profile.querySelector('.club-profile-title');
      if (title && !title.querySelector('.club-overall')) {
        const rating = document.createElement('span');
        rating.className = 'club-overall';
        rating.textContent = `${club.overall} GRL DE CLUB`;
        title.append(rating);
      }
      profile.querySelectorAll('.fact-box').forEach(box => {
        const label = box.querySelector('span')?.textContent;
        if (label === 'Competencia') setText(box.querySelector('strong'), `${competition.title} · ${competition.group}`);
        if (label === 'Plantilla') setText(box.querySelector('strong'), officialCount ? `${officialCount} jugadores oficiales` : '18 jugadores generados');
      });
      setText(profile.querySelector('.profile-badge'), `${competition.title}${competition.group === 'Nacional' ? '' : ` · ${competition.group}`}`);
    }

    document.querySelectorAll('.squad-toolbar h3').forEach(heading => {
      const officialCount = careerClubRosterCount();
      setText(heading, officialCount
        ? heading.textContent.replace('Plantilla ficticia', 'Plantilla oficial')
        : heading.textContent.replace('Plantilla ficticia', 'Plantilla generada'));
    });
  }

  function careerClubRosterCount() {
    const heading = document.getElementById('careerHeading');
    const career = heading && [...clubById.values()].find(club => club.name === heading.textContent);
    return career ? officialRosterCount(career) : 0;
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
    if (leagueFilter && leagueFilter.value !== primary.id) {
      leagueFilter.value = primary.id;
      leagueFilter.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const search = document.getElementById('searchInput');
    if (search) search.placeholder = 'Buscar club, grupo o división';
    requestAnimationFrame(() => {
      const firstClub = list?.querySelector('.club-card');
      if (firstClub) firstClub.click();
      decorate();
    });
  });
})();
