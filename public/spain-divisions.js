(() => {
  'use strict';

  const data = window.CANCHA_DATA;
  if (!data) throw new Error('No se pudo cargar el catálogo de fútbol español.');

  const competitions = [
    {
      id: 'league-hypermotion-2026-27',
      title: 'LaLiga Hypermotion',
      tier: 2,
      tierLabel: 'Segunda División',
      group: 'Nacional',
      expectedCount: 22,
      teams: [
        ['AD Ceuta FC', 'Ceuta', '#d21f35'],
        ['Albacete BP', 'Albacete', '#e9e7df'],
        ['Burgos CF', 'Burgos', '#292a2c'],
        ['Cádiz CF', 'Cádiz', '#ecd134'],
        ['CD Castellón', 'Castelló de la Plana', '#171717'],
        ['CD Eldense', 'Elda', '#3985ba'],
        ['CD Leganés', 'Leganés', '#176da1'],
        ['CD Tenerife', 'Santa Cruz de Tenerife', '#21477e'],
        ['CE Sabadell', 'Sabadell', '#2a6093'],
        ['Celta Fortuna', 'Vigo', '#7bb8d7'],
        ['Córdoba CF', 'Córdoba', '#18804d'],
        ['FC Andorra', 'Encamp', '#d72d3d'],
        ['Girona FC', 'Girona', '#c72534'],
        ['Granada CF', 'Granada', '#d6213a'],
        ['Real Sociedad B', 'San Sebastián', '#2e68a5'],
        ['RCD Mallorca', 'Palma', '#c52230'],
        ['Real Oviedo', 'Oviedo', '#22558b'],
        ['Real Sporting', 'Gijón', '#c8212d'],
        ['Real Valladolid CF', 'Valladolid', '#572b78'],
        ['SD Eibar', 'Eibar', '#1d4e83'],
        ['UD Almería', 'Almería', '#d52a34'],
        ['UD Las Palmas', 'Las Palmas de Gran Canaria', '#e9d43b']
      ]
    },
    {
      id: 'league-primera-federacion-grupo-i-2026-27',
      title: 'Primera Federación',
      tier: 3,
      tierLabel: 'Primera Federación',
      group: 'Grupo I',
      expectedCount: 20,
      teams: [
        ['AD Mérida', 'Mérida', '#202020'],
        ['Arenas Club', 'Getxo', '#c92832'],
        ['Athletic Club B', 'Bilbao', '#b9232d'],
        ['Barakaldo CF', 'Barakaldo', '#e5d43b'],
        ['CD Coria', 'Coria', '#19804c'],
        ['CD Extremadura', 'Almendralejo', '#1d3f76'],
        ['CD Lugo', 'Lugo', '#ce2d39'],
        ['CD Mirandés', 'Miranda de Ebro', '#ce2834'],
        ['CP Cacereño', 'Cáceres', '#137448'],
        ['Cultural y Deportiva Leonesa', 'León', '#ede8df'],
        ['Pontevedra CF', 'Pontevedra', '#9d2636'],
        ['Racing Club Ferrol', 'Ferrol', '#1c6644'],
        ['RC Deportivo Fabril', 'A Coruña', '#327bac'],
        ['Real Avilés Industrial', 'Avilés', '#d92832'],
        ['Real Unión Club', 'Irun', '#e6cc36'],
        ['SD Ponferradina', 'Ponferrada', '#1a1a1a'],
        ['UD Logroñés', 'Logroño', '#e4df3c'],
        ['UD Ourense', 'Ourense', '#c72d38'],
        ['Unionistas de Salamanca CF', 'Salamanca', '#171717'],
        ['Zamora CF', 'Zamora', '#c72a37']
      ]
    },
    {
      id: 'league-primera-federacion-grupo-ii-2026-27',
      title: 'Primera Federación',
      tier: 3,
      tierLabel: 'Primera Federación',
      group: 'Grupo II',
      expectedCount: 20,
      teams: [
        ['AD Alcorcón', 'Alcorcón', '#e4d43a'],
        ['Águilas FC', 'Águilas', '#c92331'],
        ['Algeciras CF', 'Algeciras', '#c62632'],
        ['Antequera CCF', 'Antequera', '#16814b'],
        ['Atlético Madrileño', 'Madrid', '#af2f3c'],
        ['CD Teruel', 'Teruel', '#c62632'],
        ['CE Europa', 'Barcelona', '#1e355e'],
        ['CF Rayo Majadahonda', 'Majadahonda', '#cc3d48'],
        ['FC Cartagena', 'Cartagena', '#1e2947'],
        ['Gimnàstic de Tarragona', 'Tarragona', '#c92735'],
        ['Hércules de Alicante CF', 'Alicante', '#253565'],
        ['Juventud de Torremolinos CF', 'Torremolinos', '#19804e'],
        ['Real Jaén CF', 'Jaén', '#1c7848'],
        ['Real Madrid Castilla', 'Madrid', '#eee9df'],
        ['Real Murcia CF', 'Murcia', '#c72b37'],
        ['Real Zaragoza', 'Zaragoza', '#327eb0'],
        ['SD Huesca', 'Huesca', '#2865a3'],
        ['UD Ibiza', 'Ibiza', '#25345e'],
        ['UE Sant Andreu', 'Barcelona', '#c52b36'],
        ['Villarreal CF B', 'Vila-real', '#e7d136']
      ]
    }
  ];

  const shieldColors = ['#286c9c', '#ba2838', '#27714d', '#d6ae32', '#40396f', '#b75c2c', '#407e83', '#5a5a62'];
  const motifs = ['wave', 'comet', 'mountain', 'star', 'leaf', 'compass', 'ribbon', 'sun', 'tree', 'diamond', 'bridge', 'anchor', 'bee', 'bolt', 'forge', 'gate', 'honey', 'mask', 'oak', 'pine', 'river', 'sail', 'sky', 'tower', 'wheel'];
  const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  for (const competition of competitions) {
    if (competition.teams.length !== competition.expectedCount) {
      throw new Error(`Conteo de clubes incorrecto para ${competition.title} ${competition.group}.`);
    }
    data.competitions.push({
      countryId: 'es',
      country: 'España',
      tier: competition.tier,
      tierLabel: competition.tierLabel,
      title: competition.title,
      group: competition.group,
      rosterStatus: 'generated',
      expectedCount: competition.expectedCount,
      channels: [],
      id: competition.id,
      season: '2026/27',
      clubCount: competition.teams.length
    });

    competition.teams.forEach(([name, city, primary], index) => {
      const slug = slugify(name);
      data.clubs.push({
        id: `club-${competition.id.replace(/^league-/, '').replace(/-2026-27$/, '')}-${slug}`,
        name,
        code: `${competition.tier === 2 ? 'HYP' : competition.group === 'Grupo I' ? 'P1' : 'P2'}${String(index + 1).padStart(2, '0')}`,
        c1: primary,
        c2: index % 2 ? '#f2efe7' : '#1f2935',
        c3: shieldColors[index % shieldColors.length],
        motif: motifs[(index + competition.tier * 3) % motifs.length],
        country: 'España',
        countryId: 'es',
        league: competition.title,
        tier: competition.tier,
        group: competition.group,
        competitionId: competition.id,
        pattern: (index + competition.tier) % 8,
        shape: (index + competition.tier) % 4,
        city,
        overall: (competition.tier === 2 ? 66 : 58) + (index % (competition.tier === 2 ? 7 : 6))
      });
    });
  }

  const ids = data.clubs.map(club => club.id);
  if (new Set(ids).size !== ids.length) throw new Error('El catálogo contiene IDs de club duplicados.');
  data.counts = { participations: data.clubs.length, competitions: data.competitions.length };
})();
