(() => {
  'use strict';

  const data = window.CANCHA_DATA;
  if (!data) throw new Error('No se pudo cargar el catálogo base para el fútbol de Canadá.');

  if (!data.countries.some(c => c.id === 'ca')) {
    data.countries.push({ id: 'ca', name: 'Canadá' });
  }

  const competitions = [
    {
      id: 'league-canada-premier-elite-2026-27',
      title: 'Canadian Premier League · Élite',
      tier: 1,
      tierLabel: 'División 1 · Canadá',
      group: 'Nacional',
      rosterStatus: 'complete',
      expectedCount: 12,
      teams: [
        ['Vancouver Whitecaps FC', 'Vancouver, BC', '#12284c', 'VAN', 80],
        ['Toronto FC', 'Toronto, ON', '#d81e36', 'TOR', 79],
        ['CF Montréal', 'Montréal, QC', '#003da5', 'MTL', 78],
        ['Forge FC', 'Hamilton, ON', '#e05219', 'FOR', 74],
        ['Cavalry FC', 'Calgary, AB', '#b82937', 'CAV', 74],
        ['Atlético Ottawa', 'Ottawa, ON', '#c82333', 'ATO', 73],
        ['Pacific FC', 'Langford, BC', '#582c83', 'PAC', 71],
        ['York United FC', 'Toronto, ON', '#1a4731', 'YRK', 71],
        ['HFX Wanderers FC', 'Halifax, NS', '#236092', 'HFX', 70],
        ['Vancouver FC', 'Langley, BC', '#222428', 'VFC', 69],
        ['Valour FC', 'Winnipeg, MB', '#7a1c24', 'VLR', 69],
        ['FC Edmonton', 'Edmonton, AB', '#1b4d89', 'EDM', 68]
      ]
    },
    {
      id: 'league-canada-l1-ontario-premier-2026-27',
      title: 'League1 Ontario',
      tier: 2,
      tierLabel: 'League1 Canada · Nivel 2',
      group: 'Premier Division',
      rosterStatus: 'generated',
      expectedCount: 12,
      teams: [
        ['Scrosoppi FC', 'Milton, ON', '#1c355e', 'SCR', 66],
        ['Simcoe County Rovers FC', 'Barrie, ON', '#1c4f82', 'SIM', 66],
        ['Vaughan Azzurri', 'Vaughan, ON', '#1e5aa8', 'VAU', 65],
        ['Blue Devils FC', 'Oakville, ON', '#1a4580', 'BDF', 65],
        ['Alliance United FC', 'Markham, ON', '#c62828', 'ALL', 64],
        ['North Toronto Nitros', 'Toronto, ON', '#207345', 'NTN', 64],
        ['Woodbridge Strikers', 'Woodbridge, ON', '#154c79', 'WOO', 64],
        ['Sigma FC', 'Mississauga, ON', '#2b547e', 'SIG', 63],
        ['Burlington SC', 'Burlington, ON', '#c59b27', 'BUR', 63],
        ['Guelph United FC', 'Guelph, ON', '#b82630', 'GUE', 63],
        ['Hamilton United', 'Hamilton, ON', '#23272b', 'HAM', 62],
        ['ProStars FC', 'Brampton, ON', '#1e3d6b', 'PRO', 62]
      ]
    },
    {
      id: 'league-canada-ligue1-quebec-2026-27',
      title: 'Ligue1 Québec',
      tier: 2,
      tierLabel: 'League1 Canada · Nivel 2',
      group: 'Première Ligue (PLSQ)',
      rosterStatus: 'generated',
      expectedCount: 10,
      teams: [
        ['CS Saint-Laurent', 'Saint-Laurent, QC', '#1a2b4c', 'CSL', 66],
        ['Royal Sélect de Beauport', 'Québec, QC', '#d4af37', 'RSB', 65],
        ['AS Blainville', 'Blainville, QC', '#1e6b52', 'ASB', 65],
        ['CS Mont-Royal Outremont', 'Mont-Royal, QC', '#b71c1c', 'MRO', 64],
        ['CS Longueuil', 'Longueuil, QC', '#1f4e78', 'LON', 63],
        ['AS Laval', 'Laval, QC', '#c62828', 'ASL', 63],
        ['FC Laval', 'Laval, QC', '#1a3a6c', 'FCL', 63],
        ['Celtix du Haut-Richelieu', 'Saint-Jean-sur-Richelieu, QC', '#1b6e44', 'CHR', 62],
        ['CS St-Hubert', 'Saint-Hubert, QC', '#d4a017', 'STH', 62],
        ['CF Montréal U23', 'Montréal, QC', '#003da5', 'MTU', 64]
      ]
    },
    {
      id: 'league-canada-l1-bc-2026-27',
      title: 'League1 British Columbia',
      tier: 2,
      tierLabel: 'League1 Canada · Nivel 2',
      group: 'British Columbia',
      rosterStatus: 'generated',
      expectedCount: 8,
      teams: [
        ['TSS Rovers FC', 'Burnaby, BC', '#a6192e', 'TSS', 65],
        ['Altitude FC', 'North Vancouver, BC', '#1c4e80', 'ALT', 64],
        ['Harbourside FC', 'Nanaimo, BC', '#1b5e6d', 'HAR', 63],
        ['Unity FC Surrey', 'Surrey, BC', '#512d6d', 'UNI', 63],
        ['Burnaby FC', 'Burnaby, BC', '#1b2432', 'BBY', 62],
        ['Kamloops Rivers FC', 'Kamloops, BC', '#1e6b7b', 'RIV', 62],
        ['Victoria Highlanders FC', 'Victoria, BC', '#1a365d', 'VIC', 63],
        ['Whitecaps FC Academy', 'Vancouver, BC', '#12284c', 'WCA', 65]
      ]
    },
    {
      id: 'league-canada-l1-alberta-2026-27',
      title: 'League1 Alberta',
      tier: 2,
      tierLabel: 'League1 Canada · Nivel 2',
      group: 'Alberta',
      rosterStatus: 'generated',
      expectedCount: 8,
      teams: [
        ['Calgary Foothills FC', 'Calgary, AB', '#1b5e3a', 'CFF', 65],
        ['Edmonton Scottish SC', 'Edmonton, AB', '#1a3e72', 'ESC', 64],
        ['St. Albert Impact', 'St. Albert, AB', '#b82630', 'SAI', 63],
        ['Cavalry FC U21', 'Calgary, AB', '#a82431', 'CVU', 64],
        ['BTB SC Edmonton', 'Edmonton, AB', '#c59b27', 'BTB', 63],
        ['Calgary Blizzard SC', 'Calgary, AB', '#2b6cb0', 'BLZ', 62],
        ['Callies United', 'Calgary, AB', '#b71c1c', 'CAL', 62],
        ['Lethbridge FC', 'Lethbridge, AB', '#1f4e78', 'LET', 61]
      ]
    },
    {
      id: 'league-canada-l1-ontario-championship-2026-27',
      title: 'League1 Ontario Championship',
      tier: 3,
      tierLabel: 'División 3 · Ontario',
      group: 'Championship Division',
      rosterStatus: 'generated',
      expectedCount: 10,
      teams: [
        ['FC London', 'London, ON', '#b71c1c', 'LDN', 60],
        ['St. Catharines Roma Wolves', 'St. Catharines, ON', '#8d1b28', 'ROM', 60],
        ['Master\'s FA', 'Scarborough, ON', '#1a365d', 'MFA', 59],
        ['Unionville Milliken SC', 'Markham, ON', '#c62828', 'UMS', 59],
        ['Windsor City FC', 'Windsor, ON', '#1e4e8c', 'WIN', 59],
        ['Darby FC', 'Whitby, ON', '#1b5e3a', 'DAR', 58],
        ['BVB IA Waterloo', 'Waterloo, ON', '#e5c100', 'BVB', 58],
        ['Pickering FC', 'Pickering, ON', '#206b43', 'PIC', 58],
        ['Sudbury Cyclones', 'Sudbury, ON', '#1d4ed8', 'SUD', 58],
        ['Toronto FC Academy', 'Toronto, ON', '#d81e36', 'TFA', 61]
      ]
    },
    {
      id: 'league-canada-csl-2026-27',
      title: 'Canadian Soccer League',
      tier: 3,
      tierLabel: 'Liga Semiprofesional · CSL',
      group: 'CSL Nacional',
      rosterStatus: 'generated',
      expectedCount: 8,
      teams: [
        ['Serbian White Eagles', 'Toronto, ON', '#c62828', 'SWE', 61],
        ['Scarborough SC', 'Toronto, ON', '#1e4e8c', 'SCA', 60],
        ['Toronto Falcons', 'Toronto, ON', '#2563eb', 'TFL', 60],
        ['Hamilton City SC', 'Hamilton, ON', '#d97706', 'HCS', 59],
        ['Continentals FC', 'Vaughan, ON', '#1b5e3a', 'CON', 59],
        ['Brampton Unity FC', 'Brampton, ON', '#4f46e5', 'BRU', 58],
        ['Ooty Black Pearl FC', 'Mississauga, ON', '#27272a', 'OBP', 58],
        ['Brantford Galaxy SC', 'Brantford, ON', '#b91c1c', 'BGS', 58]
      ]
    }
  ];

  const shieldColors = ['#c82333', '#1d4ed8', '#15803d', '#d97706', '#4338ca', '#0f766e', '#9333ea', '#334155'];
  const motifs = ['leaf', 'mountain', 'pine', 'star', 'wave', 'river', 'compass', 'sun', 'tree', 'diamond', 'bridge', 'anchor', 'bolt', 'forge', 'gate', 'oak', 'sail', 'sky', 'tower', 'wheel'];
  const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  for (const competition of competitions) {
    if (competition.teams.length !== competition.expectedCount) {
      throw new Error(`Conteo de clubes incorrecto para ${competition.title} (${competition.group}).`);
    }
    data.competitions.push({
      countryId: 'ca',
      country: 'Canadá',
      tier: competition.tier,
      tierLabel: competition.tierLabel,
      title: competition.title,
      group: competition.group,
      rosterStatus: competition.rosterStatus,
      expectedCount: competition.expectedCount,
      channels: ['OneSoccer', 'TSN', 'RDS'],
      id: competition.id,
      season: '2026/27',
      clubCount: competition.teams.length
    });

    competition.teams.forEach(([name, city, primary, code, ovr], index) => {
      const slug = slugify(name);
      data.clubs.push({
        id: `club-ca-${slug}`,
        name,
        code: code || `CA${String(index + 1).padStart(2, '0')}`,
        c1: primary,
        c2: index % 2 ? '#f8fafc' : '#0f172a',
        c3: shieldColors[index % shieldColors.length],
        motif: motifs[(index + competition.tier * 2) % motifs.length],
        country: 'Canadá',
        countryId: 'ca',
        league: competition.title,
        tier: competition.tier,
        group: competition.group,
        competitionId: competition.id,
        pattern: (index + competition.tier) % 8,
        shape: (index + competition.tier) % 4,
        city,
        overall: ovr || (competition.tier === 1 ? 71 : competition.tier === 2 ? 63 : 59)
      });
    });
  }

  window.CANCHA_ROSTERS = window.CANCHA_ROSTERS || {};
  Object.assign(window.CANCHA_ROSTERS, {
    VAN: [
      { number: 1, name: 'Yohei Takaoka', position: 'POR', age: 30 },
      { number: 32, name: 'Isaac Boehmer', position: 'POR', age: 24 },
      { number: 2, name: 'Mathías Laborda', position: 'DEF', age: 27 },
      { number: 3, name: 'Sam Adekugbe', position: 'DEF', age: 31 },
      { number: 4, name: 'Ranko Veselinović', position: 'DEF', age: 27 },
      { number: 6, name: 'Tristan Blackmon', position: 'DEF', age: 30 },
      { number: 23, name: 'Javain Brown', position: 'DEF', age: 27 },
      { number: 12, name: 'Belal Halbouni', position: 'DEF', age: 26 },
      { number: 20, name: 'Andrés Cubas', position: 'MED', age: 30 },
      { number: 25, name: 'Ryan Gauld', position: 'MED', age: 30 },
      { number: 45, name: 'Pedro Vite', position: 'MED', age: 24 },
      { number: 22, name: 'Ali Ahmed', position: 'MED', age: 26 },
      { number: 16, name: 'Sebastian Berhalter', position: 'MED', age: 25 },
      { number: 13, name: 'Ralph Priso', position: 'MED', age: 24 },
      { number: 24, name: 'Brian White', position: 'DEL', age: 30 },
      { number: 11, name: 'Fafà Picault', position: 'DEL', age: 35 },
      { number: 7, name: 'Jayden Nelson', position: 'DEL', age: 24 },
      { number: 28, name: 'Levonte Johnson', position: 'DEL', age: 27 }
    ],
    TOR: [
      { number: 1, name: 'Sean Johnson', position: 'POR', age: 37 },
      { number: 90, name: 'Luka Gavran', position: 'POR', age: 26 },
      { number: 19, name: 'Kobe Franklin', position: 'DEF', age: 23 },
      { number: 15, name: 'Nicksoen Gomis', position: 'DEF', age: 24 },
      { number: 17, name: 'Sigurd Rosted', position: 'DEF', age: 32 },
      { number: 22, name: 'Richie Laryea', position: 'DEF', age: 31 },
      { number: 5, name: 'Kevin Long', position: 'DEF', age: 36 },
      { number: 28, name: 'Raoul Petretta', position: 'DEF', age: 29 },
      { number: 21, name: 'Jonathan Osorio', position: 'MED', age: 34 },
      { number: 8, name: 'Matty Longstaff', position: 'MED', age: 26 },
      { number: 14, name: 'Alonso Coello', position: 'MED', age: 27 },
      { number: 20, name: 'Deybi Flores', position: 'MED', age: 30 },
      { number: 47, name: 'Kosi Thompson', position: 'MED', age: 23 },
      { number: 7, name: 'Jahkeele Marshall-Rutty', position: 'MED', age: 22 },
      { number: 10, name: 'Federico Bernardeschi', position: 'DEL', age: 32 },
      { number: 24, name: 'Lorenzo Insigne', position: 'DEL', age: 35 },
      { number: 29, name: 'Deandre Kerr', position: 'DEL', age: 24 },
      { number: 99, name: 'Prince Owusu', position: 'DEL', age: 29 }
    ],
    MTL: [
      { number: 40, name: 'Jonathan Sirois', position: 'POR', age: 25 },
      { number: 1, name: 'Sebastian Breza', position: 'POR', age: 28 },
      { number: 16, name: 'Joel Waterman', position: 'DEF', age: 30 },
      { number: 4, name: 'Fernando Álvarez', position: 'DEF', age: 23 },
      { number: 24, name: 'George Campbell', position: 'DEF', age: 25 },
      { number: 25, name: 'Gabriele Corbo', position: 'DEF', age: 26 },
      { number: 11, name: 'Jahkeele Dawkins', position: 'DEF', age: 24 },
      { number: 55, name: 'Caden Clark', position: 'MED', age: 23 },
      { number: 6, name: 'Samuel Piette', position: 'MED', age: 32 },
      { number: 19, name: 'Nathan Saliba', position: 'MED', age: 22 },
      { number: 10, name: 'Bryce Duke', position: 'MED', age: 25 },
      { number: 23, name: 'Dominik Yankov', position: 'MED', age: 26 },
      { number: 8, name: 'Victor Loturi', position: 'MED', age: 25 },
      { number: 27, name: 'Dawid Bugaj', position: 'DEF', age: 22 },
      { number: 9, name: 'Matías Cóccaro', position: 'DEL', age: 29 },
      { number: 14, name: 'Sunusi Ibrahim', position: 'DEL', age: 24 },
      { number: 17, name: 'Josef Martínez', position: 'DEL', age: 33 },
      { number: 21, name: 'Jules-Anthony Vilsaint', position: 'DEL', age: 23 }
    ],
    FOR: [
      { number: 1, name: 'Jassem Koleilat', position: 'POR', age: 27 },
      { number: 29, name: 'Christopher Kalongo', position: 'POR', age: 24 },
      { number: 13, name: 'Alexander Achinioti-Jönsson', position: 'DEF', age: 30 },
      { number: 5, name: 'Daniel Parra', position: 'DEF', age: 27 },
      { number: 2, name: 'Malcolm Duncan', position: 'DEF', age: 26 },
      { number: 4, name: 'Dominic Samuel', position: 'DEF', age: 32 },
      { number: 24, name: 'Rezart Rama', position: 'DEF', age: 25 },
      { number: 81, name: 'Malik Owolabi-Belewu', position: 'DEF', age: 24 },
      { number: 10, name: 'Kyle Bekker', position: 'MED', age: 36 },
      { number: 20, name: 'Alessandro Hojabrpour', position: 'MED', age: 26 },
      { number: 22, name: 'Noah Jensen', position: 'MED', age: 27 },
      { number: 11, name: 'Nana Ampomah', position: 'MED', age: 30 },
      { number: 6, name: 'Ben Paton', position: 'MED', age: 26 },
      { number: 7, name: 'David Choinière', position: 'DEL', age: 29 },
      { number: 14, name: 'Terran Campbell', position: 'DEL', age: 28 },
      { number: 19, name: 'Tristan Borges', position: 'DEL', age: 28 },
      { number: 39, name: 'Béni Badibanga', position: 'DEL', age: 30 },
      { number: 9, name: 'Jordan Hamilton', position: 'DEL', age: 30 }
    ],
    CAV: [
      { number: 1, name: 'Marco Carducci', position: 'POR', age: 30 },
      { number: 21, name: 'Jack Barrett', position: 'POR', age: 24 },
      { number: 4, name: 'Daan Klomp', position: 'DEF', age: 28 },
      { number: 3, name: 'Callum Montgomery', position: 'DEF', age: 29 },
      { number: 5, name: 'Bradley Kamdem', position: 'DEF', age: 32 },
      { number: 2, name: 'Roberto Alarcón', position: 'DEF', age: 28 },
      { number: 12, name: 'Tom Field', position: 'DEF', age: 29 },
      { number: 33, name: 'Fraser Aird', position: 'DEF', age: 31 },
      { number: 6, name: 'Charlie Trafford', position: 'MED', age: 34 },
      { number: 10, name: 'Sergio Camargo', position: 'MED', age: 32 },
      { number: 8, name: 'Jesse Daley', position: 'MED', age: 29 },
      { number: 26, name: 'Shamit Shome', position: 'MED', age: 29 },
      { number: 27, name: 'Diego Gutiérrez', position: 'MED', age: 29 },
      { number: 17, name: 'Nicolas Wähling', position: 'MED', age: 29 },
      { number: 9, name: 'Tobias Warschewski', position: 'DEL', age: 28 },
      { number: 7, name: 'Ali Musse', position: 'DEL', age: 30 },
      { number: 14, name: 'Malcolm Shaw', position: 'DEL', age: 31 },
      { number: 19, name: 'William Akio', position: 'DEL', age: 28 }
    ],
    ATO: [
      { number: 29, name: 'Nathan Ingham', position: 'POR', age: 33 },
      { number: 1, name: 'Rayane Yesli', position: 'POR', age: 27 },
      { number: 5, name: 'Luke Singh', position: 'DEF', age: 26 },
      { number: 4, name: 'Tyr Walker', position: 'DEF', age: 23 },
      { number: 55, name: 'Amer Didić', position: 'DEF', age: 31 },
      { number: 20, name: 'Joaquim Coulanges', position: 'DEF', age: 20 },
      { number: 2, name: 'Zachary Roy', position: 'DEF', age: 23 },
      { number: 84, name: 'Maxim Tissot', position: 'DEF', age: 34 },
      { number: 10, name: 'Ollie Bassett', position: 'MED', age: 28 },
      { number: 22, name: 'Matteo de Brienne', position: 'MED', age: 24 },
      { number: 33, name: 'Aboubakary Sissoko', position: 'MED', age: 31 },
      { number: 21, name: 'Alberto Zapater', position: 'MED', age: 41 },
      { number: 13, name: 'Ballou Tabla', position: 'DEL', age: 27 },
      { number: 9, name: 'Samuel Salter', position: 'DEL', age: 26 },
      { number: 19, name: 'Rubén del Campo', position: 'DEL', age: 26 },
      { number: 11, name: 'Gabriel Antinoro', position: 'MED', age: 22 },
      { number: 7, name: 'Kévin dos Santos', position: 'DEL', age: 27 },
      { number: 14, name: 'Jean-Aniel Assi', position: 'DEL', age: 22 }
    ],
    PAC: [
      { number: 1, name: 'Emil Gazdov', position: 'POR', age: 23 },
      { number: 55, name: 'Sean Melvin', position: 'POR', age: 32 },
      { number: 5, name: 'Thomas Meilleur-Giguère', position: 'DEF', age: 29 },
      { number: 26, name: 'Paul Amedume', position: 'DEF', age: 23 },
      { number: 2, name: 'Georges Mukumbilwa', position: 'DEF', age: 27 },
      { number: 4, name: 'Juan Quintana', position: 'DEF', age: 23 },
      { number: 13, name: 'Kunle Dada-Luke', position: 'DEF', age: 26 },
      { number: 44, name: 'Aly Ndom', position: 'DEF', age: 30 },
      { number: 7, name: 'Steffen Yeates', position: 'MED', age: 26 },
      { number: 11, name: 'Josh Heard', position: 'MED', age: 32 },
      { number: 8, name: 'Pierre Lamothe', position: 'MED', age: 29 },
      { number: 20, name: 'Sean Young', position: 'MED', age: 25 },
      { number: 34, name: 'Zackery Greco', position: 'MED', age: 21 },
      { number: 10, name: 'Marco Bustos', position: 'DEL', age: 30 },
      { number: 9, name: 'Dario Zanatta', position: 'DEL', age: 29 },
      { number: 14, name: 'Adonijah Reid', position: 'DEL', age: 27 },
      { number: 21, name: 'Ayman Sellouf', position: 'DEL', age: 25 },
      { number: 99, name: 'Reon Moore', position: 'DEL', age: 30 }
    ],
    YRK: [
      { number: 1, name: 'Thomas Vincensini', position: 'POR', age: 33 },
      { number: 67, name: 'Eleias Himaras', position: 'POR', age: 24 },
      { number: 3, name: 'Frank Sturing', position: 'DEF', age: 29 },
      { number: 4, name: 'Oswaldo León', position: 'DEF', age: 27 },
      { number: 23, name: 'Noah Abatneh', position: 'DEF', age: 22 },
      { number: 6, name: 'Nyall Higgins', position: 'DEF', age: 28 },
      { number: 2, name: 'Max Ferrari', position: 'DEF', age: 26 },
      { number: 15, name: 'Orlando Botello', position: 'DEF', age: 25 },
      { number: 8, name: 'Elijah Adekugbe', position: 'MED', age: 30 },
      { number: 28, name: 'Juan Córdova', position: 'MED', age: 31 },
      { number: 21, name: 'Kembo Kibato', position: 'MED', age: 26 },
      { number: 10, name: 'Dennis Salanović', position: 'MED', age: 30 },
      { number: 32, name: 'Christian Zeppieri', position: 'MED', age: 23 },
      { number: 9, name: 'Brian Wright', position: 'DEL', age: 31 },
      { number: 12, name: 'Austin Ricci', position: 'DEL', age: 30 },
      { number: 22, name: 'Mo Babouli', position: 'DEL', age: 33 },
      { number: 19, name: 'Shola Jimoh', position: 'DEL', age: 18 },
      { number: 17, name: 'Jorge Guzmán', position: 'DEL', age: 22 }
    ],
    HFX: [
      { number: 1, name: 'Yann Fillion', position: 'POR', age: 30 },
      { number: 50, name: 'Aiden Rushenas', position: 'POR', age: 23 },
      { number: 6, name: 'Lorenzo Callegari', position: 'MED', age: 28 },
      { number: 2, name: 'Cale Loughrey', position: 'DEF', age: 25 },
      { number: 3, name: 'Zachary Fernandez', position: 'DEF', age: 25 },
      { number: 4, name: 'Julian Dunn', position: 'DEF', age: 26 },
      { number: 5, name: 'Dan Nimick', position: 'DEF', age: 26 },
      { number: 14, name: 'Kareem Sow', position: 'DEF', age: 26 },
      { number: 18, name: 'Andre Rampersad', position: 'MED', age: 31 },
      { number: 22, name: 'Aidan Daniels', position: 'MED', age: 28 },
      { number: 8, name: 'Jérémy Gagnon-Laparé', position: 'MED', age: 31 },
      { number: 15, name: 'Vitor Dias', position: 'MED', age: 28 },
      { number: 28, name: 'Giorgio Probo', position: 'MED', age: 26 },
      { number: 7, name: 'Ryan Telfer', position: 'DEL', age: 32 },
      { number: 9, name: 'Tiago Coimbra', position: 'DEL', age: 22 },
      { number: 10, name: 'Massimo Ferrin', position: 'DEL', age: 28 },
      { number: 19, name: 'Clément Bayiha', position: 'DEL', age: 27 },
      { number: 11, name: 'Christian Volesky', position: 'DEL', age: 34 }
    ],
    VFC: [
      { number: 1, name: 'Callum Irving', position: 'POR', age: 33 },
      { number: 31, name: 'Niko Giantsopoulos', position: 'POR', age: 32 },
      { number: 2, name: 'Kadin Chung', position: 'DEF', age: 28 },
      { number: 3, name: 'Rocco Romeo', position: 'DEF', age: 26 },
      { number: 4, name: 'Allan Enyou', position: 'DEF', age: 22 },
      { number: 5, name: 'Matteo Campagna', position: 'DEF', age: 22 },
      { number: 12, name: 'Tyler Crawford', position: 'DEF', age: 22 },
      { number: 20, name: 'Anthony White', position: 'DEF', age: 23 },
      { number: 6, name: 'Renan Garcia', position: 'MED', age: 40 },
      { number: 8, name: 'Vasco Fry', position: 'MED', age: 26 },
      { number: 16, name: 'Ben Fisk', position: 'MED', age: 33 },
      { number: 10, name: 'Gabriel Bitar', position: 'MED', age: 28 },
      { number: 7, name: 'Paris Gee', position: 'MED', age: 32 },
      { number: 9, name: 'Alejandro Díaz', position: 'DEL', age: 30 },
      { number: 11, name: 'Mikaël Cantave', position: 'DEL', age: 29 },
      { number: 14, name: 'Moses Dyer', position: 'DEL', age: 29 },
      { number: 19, name: 'José Navarro', position: 'DEL', age: 23 },
      { number: 43, name: 'Grady McDonnell', position: 'MED', age: 18 }
    ],
    VLR: [
      { number: 50, name: 'Jonathan Viscosi', position: 'POR', age: 35 },
      { number: 99, name: 'Darlington Murasiranwa', position: 'POR', age: 25 },
      { number: 2, name: 'Roberto Alarcón', position: 'DEF', age: 28 },
      { number: 3, name: 'Jordan Haynes', position: 'DEF', age: 30 },
      { number: 4, name: 'Tass Mourdoukoutas', position: 'DEF', age: 27 },
      { number: 5, name: 'Abdou Samaké', position: 'DEF', age: 30 },
      { number: 30, name: 'Themi Antonoglou', position: 'DEF', age: 25 },
      { number: 23, name: 'Gianfranco Facchineri', position: 'DEF', age: 24 },
      { number: 6, name: 'Dante Campbell', position: 'MED', age: 27 },
      { number: 8, name: 'Diogo Ressurreição', position: 'MED', age: 26 },
      { number: 27, name: 'Raphael Ohin', position: 'MED', age: 31 },
      { number: 17, name: 'Juan Pablo Sánchez', position: 'MED', age: 23 },
      { number: 7, name: 'Kian Williams', position: 'DEL', age: 26 },
      { number: 9, name: 'Jordi Swibel', position: 'DEL', age: 27 },
      { number: 10, name: 'Shaan Hundal', position: 'DEL', age: 27 },
      { number: 11, name: 'Abdul Binate', position: 'DEL', age: 23 },
      { number: 24, name: 'Zachary Sukunda', position: 'MED', age: 31 },
      { number: 19, name: 'Joe Hanson', position: 'DEL', age: 23 }
    ],
    EDM: [
      { number: 1, name: 'Andreas Vaikla', position: 'POR', age: 29 },
      { number: 48, name: 'Joseph Holliday', position: 'POR', age: 21 },
      { number: 4, name: 'Luke Singh', position: 'DEF', age: 26 },
      { number: 5, name: 'Cale Loughrey', position: 'DEF', age: 25 },
      { number: 3, name: 'Kelsey Egwu', position: 'DEF', age: 23 },
      { number: 13, name: 'Nyal Higgins', position: 'DEF', age: 28 },
      { number: 22, name: 'T-Boy Fayia', position: 'DEF', age: 25 },
      { number: 25, name: 'Bicou Bissainthe', position: 'DEF', age: 27 },
      { number: 6, name: 'Shamit Shome', position: 'MED', age: 29 },
      { number: 8, name: 'C.J. Smith', position: 'MED', age: 28 },
      { number: 10, name: 'Wesley Timoteo', position: 'MED', age: 26 },
      { number: 17, name: 'Simon Triantafillou', position: 'MED', age: 27 },
      { number: 23, name: 'Gabriel Bitar', position: 'MED', age: 28 },
      { number: 7, name: 'Mastanabal Kacher', position: 'DEL', age: 30 },
      { number: 9, name: 'Julian Ulbricht', position: 'DEL', age: 27 },
      { number: 11, name: 'Azriel Gonzalez', position: 'DEL', age: 25 },
      { number: 14, name: 'Tobias Warschewski', position: 'DEL', age: 28 },
      { number: 19, name: 'Mamadi Camara', position: 'DEL', age: 31 }
    ]
  });

  const ids = data.clubs.map(club => club.id);
  if (new Set(ids).size !== ids.length) throw new Error('El catálogo contiene IDs de club duplicados al añadir Canadá.');
  data.counts = { participations: data.clubs.length, competitions: data.competitions.length };
})();
