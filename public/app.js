(()=>{'use strict';
const D=window.CANCHA_DATA;
if(!D||!Array.isArray(D.clubs)||!Array.isArray(D.competitions)){document.body.innerHTML='<main style="padding:2rem;color:white">No se pudo cargar el catálogo. Reintenta desde la página principal.</main>';return;}
const $=id=>document.getElementById(id), h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const compById=new Map(D.competitions.map(c=>[c.id,c])), clubById=new Map(D.clubs.map(c=>[c.id,c]));
const SAVE_KEY='cancha-libre-local-careers-v3', OLD_CLUB_KEY='cancha-libre-club-v1', PAGE_SIZE=60;
const shapes=['M12 7h76v47c0 25-24 37-38 45C36 91 12 79 12 54V7Z','M50 5 88 21v34c0 23-17 36-38 44C29 91 12 78 12 55V21L50 5Z','M14 8h72v44c0 25-21 39-36 47C35 91 14 77 14 52V8Z','M50 5 87 22v33c0 21-14 35-37 45-23-10-37-24-37-45V22L50 5Z'];
const motifs={orbit:'<circle cx="50" cy="47" r="18" fill="none" stroke="currentColor" stroke-width="4"/><ellipse cx="50" cy="47" rx="28" ry="10" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(-28 50 47)"/><circle cx="72" cy="33" r="4" fill="currentColor"/>',wave:'<path d="M24 39c10-13 18 13 28 0s18 13 28 0M24 51c10-13 18 13 28 0s18 13 28 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',comet:'<circle cx="59" cy="39" r="9" fill="currentColor"/><path d="m52 46-22 20 25-10-13 13 25-17" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',mountain:'<path d="m24 61 20-31 11 16 8-11 14 26H24Z" fill="currentColor"/><path d="m37 42 7-12 8 12-8-3-4 5" fill="#fff" fill-opacity=".75"/>',star:'<path d="m50 22 7 15 17 2-12 11 3 17-15-8-15 8 3-17-12-11 17-2 7-15Z" fill="currentColor"/>',leaf:'<path d="M68 26C46 25 32 34 34 49c1 9 8 12 16 8 13-8 18-31 18-31Z" fill="currentColor"/><path d="M31 62c10-14 20-22 33-31" stroke="#fff" stroke-opacity=".72" stroke-width="2.5" stroke-linecap="round"/>',compass:'<circle cx="50" cy="45" r="22" fill="none" stroke="currentColor" stroke-width="3"/><path d="m59 32-6 18-18 8 7-18 17-8Z" fill="currentColor"/><circle cx="50" cy="45" r="3" fill="#fff"/>',ribbon:'<path d="M31 30h38v9H54v8h15v9H54v8H42v-8H30v-9h12v-8H31v-9Z" fill="currentColor"/>',sun:'<circle cx="50" cy="44" r="10" fill="currentColor"/><path d="M50 21v7m0 32v7M27 44h7m32 0h7M34 28l5 5m22 22 5 5m0-32-5 5M39 55l-5 5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',tree:'<path d="M50 20c10 0 15 8 12 15 10 3 10 15 0 17 2 8-6 13-13 9-7 4-15-1-13-9-10-2-11-14 0-17-3-7 3-15 14-15Z" fill="currentColor"/><path d="M49 54v10" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>',diamond:'<path d="m50 19 25 25-25 25-25-25 25-25Z" fill="none" stroke="currentColor" stroke-width="5"/><path d="m50 31 13 13-13 13-13-13 13-13Z" fill="currentColor"/>',bridge:'<path d="M28 60V39m14 21V33m16 27V33m14 27V39M23 39c9-15 18-15 27 0 9-15 18-15 27 0M23 64h54" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',anchor:'<path d="M50 25v34m-15-23h30M40 25h20M50 13v12m-18 34c2 11 9 18 18 18s16-7 18-18M32 59H23m45 0h9" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="14" r="4" fill="currentColor"/>',bee:'<ellipse cx="50" cy="48" rx="12" ry="20" fill="currentColor"/><path d="M42 43h16M41 51h18M43 59h14" stroke="#fff" stroke-opacity=".8" stroke-width="3"/><ellipse cx="35" cy="37" rx="10" ry="7" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(-25 35 37)"/><ellipse cx="65" cy="37" rx="10" ry="7" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(25 65 37)"/><path d="m45 68 5 8 5-8" fill="currentColor"/>',bolt:'<path d="M56 19 31 51h16l-4 30 27-39H53l3-23Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',forge:'<path d="M22 58h56l-7 12H31l-9-12Zm15-8 10-14h20l10 14H37Z" fill="currentColor"/><path d="M49 36V25h16v8H55" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M49 20v-5m8 6 3-5m-17 8-4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',gate:'<path d="M26 72V42c0-14 11-25 24-25s24 11 24 25v30M21 72h58M34 72V43c0-9 7-16 16-16s16 7 16 16v29" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M50 40v32" stroke="currentColor" stroke-width="3"/>',honey:'<path d="m50 22 14 8v16l-14 8-14-8V30l14-8Zm-25 31 14 8v16l-14 8-14-8V61l14-8Zm50 0 14 8v16l-14 8-14-8V61l14-8Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/><path d="m50 30 7 4v8l-7 4-7-4v-8l7-4Z" fill="currentColor"/>',mask:'<path d="M24 33c8-8 17-12 26-12s18 4 26 12l-5 27c-2 12-11 21-21 21S31 72 29 60l-5-27Z" fill="currentColor"/><path d="M31 43c6-7 14-7 20 0-6 7-14 7-20 0Zm18 0c6-7 14-7 20 0-6 7-14 7-20 0Z" fill="#fff" fill-opacity=".82"/><path d="m43 58 7 6 7-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',oak:'<path d="M50 20c-6-8-17-2-13 7-10-3-16 8-8 14-9 7-2 18 7 16-3 10 8 16 15 8 7 8 18 2 15-8 9 2 16-9 7-16 8-6 2-17-8-14 4-9-7-15-15-7Z" fill="currentColor"/><path d="M50 61v17m0-23L37 43m13 12 13-12" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="3" stroke-linecap="round"/>',olive:'<path d="M30 70c11-17 22-29 41-43" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M34 60c-12-2-17-10-15-18 10-1 18 4 20 13m7-15c-3-12 2-20 10-23 6 8 5 17-2 24m2 9c2-12 10-17 18-16 2 10-3 18-14 21m-31 3c-11 3-19-1-22-9 7-7 16-7 24 1" fill="currentColor"/>',pick:'<path d="M29 69 68 30m-13-9c7-7 18-7 25 0L91 32c-8-3-16-1-22 5l-8 8-7-7 8-8c6-6 8-14 5-22Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m23 75 8-8 7 7-8 8-9 3 2-10Z" fill="currentColor"/>',pine:'<path d="M50 16 29 43h13L24 61h19L34 78h32L57 61h19L58 43h13L50 16Z" fill="currentColor"/><path d="M47 68h6v12h-6z" fill="#fff" fill-opacity=".7"/>',river:'<path d="M25 28c17 0 17 13 0 13s-17 13 0 13 17 13 0 13m25-40c17 0 17 13 0 13s-17 13 0 13 17 13 0 13m25-39c-17 0-17 13 0 13s17 13 0 13-17 13 0 13" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',sail:'<path d="M49 20v45M47 24 27 57h20V24Zm5 5 22 28H52V29ZM23 67h54l-9 10H33l-10-10Z" fill="currentColor" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M50 20v-5" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',sky:'<path d="M25 57c0-7 6-12 13-12 3-11 18-14 25-4 9-2 17 5 16 14 6 1 10 6 10 12H31c-4-2-6-5-6-10Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="m49 19 2 6m18-1-3 6m16 7-6 3M31 29l4 5m-12 9 7 1" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',tower:'<path d="M30 78V39h40v39M26 39h48M34 39V29h9V19h14v10h9v10M39 51h7v9h-7zm15 0h7v9h-7zM45 78V66h10v12" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M25 78h50" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',wheel:'<circle cx="50" cy="49" r="27" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="49" r="7" fill="currentColor"/><path d="M50 22v20m0 14v20M23 49h20m14 0h20M31 30l14 14m10 10 14 14m0-38L55 44M45 54 31 68" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'};
function generatedCrest(t,large=false){const motif=motifs[t.motif];if(!motif)throw new Error('Missing shield motif SVG: '+String(t.motif));const sh=shapes[(t.shape||0)%shapes.length],cid='clip-'+String(t.id).replace(/[^a-z0-9-]/gi,''),pat=(t.pattern||0)%8;let p='';switch(pat){case 0:p=`<path d="M12 7h30v92H12z" fill="${t.c2}"/><path d="M60 7h28v92H60z" fill="${t.c3}"/>`;break;case 1:p=`<path d="m10 72 48-67h34L45 101H10z" fill="${t.c2}"/><path d="m45 101 47-66v22L61 99z" fill="${t.c3}"/>`;break;case 2:p=`<path d="M12 7h76v31H12z" fill="${t.c2}"/><path d="M12 65h76v34H12z" fill="${t.c3}"/>`;break;case 3:p=`<path d="m10 8 40 28L90 8v32L50 68 10 40V8Z" fill="${t.c2}"/><path d="m20 79 30 20 30-20V59L50 79 20 59v20Z" fill="${t.c3}"/>`;break;case 4:p=`<circle cx="31" cy="30" r="7" fill="${t.c2}"/><circle cx="69" cy="30" r="7" fill="${t.c3}"/><circle cx="31" cy="69" r="7" fill="${t.c3}"/><circle cx="69" cy="69" r="7" fill="${t.c2}"/>`;break;case 5:p=`<path d="M50 8v91M15 29l70 48M15 77l70-48" stroke="${t.c2}" stroke-width="10"/><circle cx="50" cy="51" r="18" fill="${t.c3}"/>`;break;case 6:p=`<path d="M10 27h80v13H10zM10 60h80v13H10z" fill="${t.c2}"/><path d="M18 43h64v12H18z" fill="${t.c3}"/>`;break;default:p=`<path d="M12 7h76L50 99 12 7Z" fill="${t.c2}"/><path d="m88 7-38 92V42L88 7Z" fill="${t.c3}"/>`}
return `<svg xmlns="http://www.w3.org/2000/svg" class="${large?'detail-crest':'crest'}" viewBox="0 0 100 108" role="img" aria-label="Escudo original de ${h(t.name)}"><defs><clipPath id="${cid}"><path d="${sh}"/></clipPath><linearGradient id="grad-${cid}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient></defs><g clip-path="url(#${cid})"><path d="M0 0h100v108H0z" fill="${t.c1}"/>${p}<path d="M0 0h100v108H0z" fill="url(#grad-${cid})" opacity=".07"/><g color="${t.c3}">${motif}</g><path d="M25 76h50v22H25z" fill="#101614" fill-opacity=".88"/><text x="50" y="92" text-anchor="middle" font-family="${h(t.fontFamily||'ui-monospace,monospace')}" font-size="12" font-weight="700" letter-spacing="1" fill="#fff">${h(t.code)}</text></g><path d="${sh}" fill="none" stroke="${h(t.border||'#e9dfc2')}" stroke-opacity=".9" stroke-width="${Number(t.borderWidth)||2.5}"/></svg>`}
function crest(t,large=false){return window.CANCHA_GRAPHICS.logoMarkup(t,large,generatedCrest(t,large))}
function contrast(hex){const n=parseInt(String(hex||'#000').replace('#',''),16);const r=(n>>16)&255,g=(n>>8)&255,b=n&255;return .2126*r+.7152*g+.0722*b>150?'#172019':'#ffffff'}
function hash(s){let x=2166136261;for(let i=0;i<String(s).length;i++){x^=String(s).charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
function rngFrom(seed){let x=(typeof seed==='number'?seed:hash(seed))>>>0;return()=>{x=(x+0x6D2B79F5)|0;let t=Math.imul(x^(x>>>15),1|x);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296}}
function pick(a,r){return a[Math.floor(r()*a.length)]}
function uniquePlayerIds(list){return Array.isArray(list)&&list.every(p=>p&&typeof p.id==='string'&&p.id.trim()!=='')&&new Set(list.map(p=>p.id)).size===list.length}
function uniqueStrings(list){return Array.isArray(list)&&list.every(x=>typeof x==='string'&&x.trim()!=='')&&new Set(list).size===list.length}
function playerOrigin(p){return p?.originId||p?.id}
const isRecord=x=>!!x&&typeof x==='object'&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);
const validText=(x,max=160)=>typeof x==='string'&&x.length>0&&x.length<=max&&!/[\u0000-\u001f\u007f]/.test(x);
const validId=x=>typeof x==='string'&&/^[A-Za-z0-9][A-Za-z0-9:_-]{0,179}$/.test(x);
const inRange=(x,min,max)=>typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;
const whole=(x,min,max)=>Number.isInteger(x)&&x>=min&&x<=max;
const onlyKeys=(x,keys)=>isRecord(x)&&Object.keys(x).every(k=>keys.includes(k));
const hasKeys=(x,required,optional=[])=>onlyKeys(x,[...required,...optional])&&required.every(k=>Object.prototype.hasOwnProperty.call(x,k));
function validPlayer(p){
 if(!onlyKeys(p,['id','name','number','position','ovr','potential','age','stats','trait','fitness','value','market','originId','injured'])||!validId(p.id)||!validText(p.name,80)||!whole(p.number,1,120)||!['POR','DEF','MED','DEL'].includes(p.position)||!whole(p.ovr,28,100)||!whole(p.potential,p.ovr,100)||!whole(p.age,16,50)||!inRange(p.fitness,0,100)||!inRange(p.value,0,1e9)||typeof p.market!=='boolean'||!validText(p.trait,32)||!Object.prototype.hasOwnProperty.call(traitText,p.trait))return false;
 if(p.originId!==undefined&&!validId(p.originId))return false;
 if(p.injured!==undefined&&typeof p.injured!=='boolean')return false;
 if(!onlyKeys(p.stats,Object.keys(statLabels))||Object.keys(p.stats).length!==Object.keys(statLabels).length||Object.values(p.stats).some(v=>!inRange(v,0,100)))return false;
 return true;
}
function validClubRef(x){if(!isRecord(x)||!validId(x.id)||!clubById.has(x.id))return false;const canonical=clubById.get(x.id),keys=Object.keys(canonical);return hasKeys(x,keys)&&keys.every(k=>x[k]===canonical[k])}
function validTextList(a,maxItems,maxLength){return Array.isArray(a)&&a.length<=maxItems&&a.every(x=>validText(x,maxLength))&&new Set(a).size===a.length}
function validTimestamp(x){if(!validText(x,40))return false;const n=Date.parse(x);return Number.isFinite(n)&&new Date(n).toISOString()===x}
function seasonRoundCount(competitionId){const count=D.clubs.filter(club=>club.competitionId===competitionId).length;return count<2?0:2*(count%2?count:count-1)}
function buildSeasonFixtures(competitionId,anchorClubId){
 const teams=D.clubs.filter(club=>club.competitionId===competitionId).map(club=>club.id),anchorIndex=teams.indexOf(anchorClubId);
 if(anchorIndex>0)teams.unshift(teams.splice(anchorIndex,1)[0]);
 const ring=teams.length>1?[teams[0],...teams.slice(1).reverse()]:teams.slice();
 if(ring.length<2)return[];
 if(ring.length%2)ring.push(null);
 const firstLeg=[];
 for(let round=0;round<ring.length-1;round++){
  for(let pair=0;pair<ring.length/2;pair++){
   const left=ring[pair],right=ring[ring.length-1-pair];
   if(!left||!right)continue;
   const leftHome=(round+pair)%2===0;
   firstLeg.push({matchday:round+1,homeId:leftHome?left:right,awayId:leftHome?right:left,homeGoals:null,awayGoals:null});
  }
  ring.splice(1,0,ring.pop());
 }
 const legLength=ring.length-1;
 return firstLeg.concat(firstLeg.map(fixture=>({matchday:fixture.matchday+legLength,homeId:fixture.awayId,awayId:fixture.homeId,homeGoals:null,awayGoals:null}))).sort((a,b)=>a.matchday-b.matchday||a.homeId.localeCompare(b.homeId));
}
function validSeasonFixtures(fixtures,competitionId,anchorClubId){
 if(!Array.isArray(fixtures)||fixtures.length>1000)return false;
 const expected=buildSeasonFixtures(competitionId,anchorClubId);
 return fixtures.length===expected.length&&fixtures.every((fixture,index)=>{
  const scheduled=expected[index];
  return onlyKeys(fixture,['matchday','homeId','awayId','homeGoals','awayGoals'])&&fixture.matchday===scheduled.matchday&&fixture.homeId===scheduled.homeId&&fixture.awayId===scheduled.awayId&&((fixture.homeGoals===null&&fixture.awayGoals===null)||(whole(fixture.homeGoals,0,30)&&whole(fixture.awayGoals,0,30)));
 });
}
function simulatedFixtureScore(career,fixture){
 const home=clubById.get(fixture.homeId),away=clubById.get(fixture.awayId),random=rngFrom(`${career.id}:fixture:${fixture.matchday}:${fixture.homeId}:${fixture.awayId}`);
 const poisson=lambda=>{let count=0,product=1;do{count++;product*=random()}while(product>Math.exp(-lambda)&&count<12);return count-1};
 const difference=(Number(home?.overall)||60)-(Number(away?.overall)||60);
 const homeGoals=poisson(clamp(1.35+difference*.035+.18,.35,3.2));
 const awayGoals=poisson(clamp(1.2-difference*.035,.3,3));
 return{homeGoals,awayGoals};
}
function syncStandingsFromFixtures(c){
 const standings={};
 for(const team of D.clubs.filter(club=>club.competitionId===c.competitionId))standings[team.id]={played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};
 for(const fixture of c.fixtures||[]){
  if(fixture.homeGoals===null||fixture.awayGoals===null)continue;
  for(const [id,gf,against] of [[fixture.homeId,fixture.homeGoals,fixture.awayGoals],[fixture.awayId,fixture.awayGoals,fixture.homeGoals]]){
   const row=standings[id];if(!row)continue;
   row.played++;row.gf+=gf;row.ga+=against;
   if(gf>against){row.w++;row.pts+=3}else if(gf===against){row.d++;row.pts++}else row.l++;
  }
 }
 c.standings=standings;
}
function initializeSeasonFixtures(c){
 if(c.friendlyMode||Array.isArray(c.fixtures))return false;
 c.fixtures=buildSeasonFixtures(c.competitionId,c.clubId);
 const completedRounds=Math.min(Number(c.matchday)||0,seasonRoundCount(c.competitionId));
 for(const fixture of c.fixtures)if(fixture.matchday<=completedRounds)Object.assign(fixture,simulatedFixtureScore(c,fixture));
 for(const result of c.history||[]){
  if(!whole(result.matchday,1,completedRounds))continue;
  const fixture=c.fixtures.find(item=>item.matchday===result.matchday&&[item.homeId,item.awayId].includes(c.clubId)&&[item.homeId,item.awayId].includes(result.opponentId));
  if(!fixture)continue;
  const userHome=fixture.homeId===c.clubId;
  fixture.homeGoals=userHome?result.userGoals:result.oppGoals;
  fixture.awayGoals=userHome?result.oppGoals:result.userGoals;
 }
 const active=c.activeMatch,current=c.fixtures.find(fixture=>fixture.matchday===completedRounds+1&&(fixture.homeId===c.clubId||fixture.awayId===c.clubId));
 if(active&&current&&['1H','2H','HT'].includes(active.status)&&(active.homeClub?.id!==current.homeId||active.awayClub?.id!==current.awayId)){
  active.homeClub=clubById.get(current.homeId);active.awayClub=clubById.get(current.awayId);active.opponent=clubById.get(current.homeId===c.clubId?current.awayId:current.homeId);active.userSide=current.homeId===c.clubId?'home':'away';
  active.teams.home.club=active.homeClub;active.teams.away.club=active.awayClub;
 }
 syncStandingsFromFixtures(c);
 return true;
}
function validEvent(e){return onlyKeys(e,['minute','text','speaker','kind','side'])&&whole(e.minute,0,90)&&validText(e.text,600)&&validText(e.speaker,40)&&(e.kind===undefined||['info','goal','shot','foul','freekick','corner','substitution','pass','tackle','injury','card','throwin','goalKick','offside'].includes(e.kind))&&(e.side===undefined||['home','away'].includes(e.side))}
function validHistoryItem(x){return onlyKeys(x,['matchId','matchday','opponentId','opponentName','userGoals','oppGoals','home','dateDay','shotsUser','shotsOpp'])&&validId(x.matchId)&&(x.matchday==='A'||whole(x.matchday,1,1e6))&&validId(x.opponentId)&&clubById.has(x.opponentId)&&validText(x.opponentName,100)&&whole(x.userGoals,0,100)&&whole(x.oppGoals,0,100)&&typeof x.home==='boolean'&&whole(x.dateDay,1,1e6)&&whole(x.shotsUser,0,100)&&whole(x.shotsOpp,0,100)}
function validTeam(t){if(!hasKeys(t,['club','squad','lineup'])||!validClubRef(t.club)||!Array.isArray(t.squad)||t.squad.length<11||t.squad.length>25||!t.squad.every(validPlayer)||!uniquePlayerIds(t.squad)||!Array.isArray(t.lineup)||t.lineup.length>11||!uniqueStrings(t.lineup)||t.lineup.some(id=>!t.squad.some(p=>p.id===id)))return false;return true}
function validPitch(p,m){if(p===null)return true;if(!hasKeys(p,['players','ball','possession','pressId','coverId','phaseCounter'])||!Array.isArray(p.players)||p.players.length>22||!['home','away'].includes(p.possession)||!whole(p.phaseCounter,0,1000000))return false;const lineups=new Map();for(const side of ['home','away'])for(const id of m.teams[side].lineup)lineups.set(id,side);const playerKeys=['id','name','number','position','trait','stats','fitness','team','x','y','baseX','baseY','targetX','targetY','color','fill','injured'],ids=new Set();for(const q of p.players){if(!hasKeys(q,playerKeys)||!validId(q.id)||ids.has(q.id)||lineups.get(q.id)!==q.team||!validText(q.name,80)||!whole(q.number,1,120)||!['POR','DEF','MED','DEL'].includes(q.position)||!Object.prototype.hasOwnProperty.call(traitText,q.trait)||!isRecord(q.stats)||!hasKeys(q.stats,Object.keys(statLabels))||Object.keys(q.stats).length!==Object.keys(statLabels).length||Object.values(q.stats).some(v=>!inRange(v,0,100))||!inRange(q.fitness,0,100)||!['home','away'].includes(q.team)||!['x','y','baseX','baseY','targetX','targetY'].every(k=>inRange(q[k],-20,120))||typeof q.color!=='string'||!/^#[0-9a-f]{6}$/i.test(q.color)||typeof q.fill!=='string'||!/^#[0-9a-f]{6}$/i.test(q.fill)||typeof q.injured!=='boolean')return false;ids.add(q.id)}if(!hasKeys(p.ball,['x','y','ownerId'],['passTargetId'])||!inRange(p.ball.x,0,100)||!inRange(p.ball.y,0,100)||(p.ball.ownerId!==null&&!ids.has(p.ball.ownerId))||(p.ball.passTargetId!==undefined&&!ids.has(p.ball.passTargetId)))return false;for(const k of ['pressId','coverId'])if(p[k]!==null&&!ids.has(p[k]))return false;return true}
function validMatch(m,c){
 const matchRequired=['id','minute','status','running','userSide','homeClub','awayClub','opponent','goals','formation','tactic','subsUsed','events','stats','teams','injuryNames','pendingInjury','randomState','minutesPlayed','finalized'],matchOptional=['finishedAt','matchId','processedMatchIds','pitch'];
 if(!hasKeys(m,matchRequired,matchOptional)||!validId(m.id)||!whole(m.minute,0,90)||!['1H','2H','HT','FT'].includes(m.status)||typeof m.running!=='boolean'||!['home','away'].includes(m.userSide)||!validClubRef(m.homeClub)||!validClubRef(m.awayClub)||!validClubRef(m.opponent)||m.homeClub.id===m.awayClub.id||!formations[m.formation]||!['balanced','attack','defense'].includes(m.tactic)||!whole(m.subsUsed,0,5)||!Array.isArray(m.events)||m.events.length>80||!m.events.every(validEvent)||!whole(m.randomState,0,4294967295)||typeof m.finalized!=='boolean')return false;
 if(m.matchId!==undefined&&!validId(m.matchId))return false;
 if(m.finishedAt!==undefined&&!validTimestamp(m.finishedAt))return false;
 if(m.processedMatchIds!==undefined&&(!Array.isArray(m.processedMatchIds)||m.processedMatchIds.length>200||!m.processedMatchIds.every(validId)||new Set(m.processedMatchIds).size!==m.processedMatchIds.length))return false;
 if(!onlyKeys(m.goals,['home','away'])||!whole(m.goals.home,0,100)||!whole(m.goals.away,0,100))return false;
 if(!onlyKeys(m.stats,['shots','target','xg','possession']))return false;
 for(const group of ['shots','target','xg','possession'])if(!onlyKeys(m.stats[group],['user','opponent']))return false;
 for(const k of ['shots','target'])if(!whole(m.stats[k].user,0,100)||!whole(m.stats[k].opponent,0,100))return false;
 for(const k of ['xg','possession'])if(!inRange(m.stats[k].user,0,100)||!inRange(m.stats[k].opponent,0,100))return false;
 if(!onlyKeys(m.teams,['home','away'])||!validTeam(m.teams.home)||!validTeam(m.teams.away)||m.teams.home.club.id!==m.homeClub.id||m.teams.away.club.id!==m.awayClub.id||m.teams[m.userSide].club.id!==c.clubId||m.opponent.id!==m.teams[m.userSide==='home'?'away':'home'].club.id)return false;
 const homeIds=new Set(m.teams.home.squad.map(p=>p.id));if(m.teams.away.squad.some(p=>homeIds.has(p.id)))return false;
 if(!validTextList(m.injuryNames,25,100))return false;
 if(m.pendingInjury!==null&&(!onlyKeys(m.pendingInjury,['playerId','name'])||!validId(m.pendingInjury.playerId)||!validText(m.pendingInjury.name,80)||!m.teams[m.userSide].squad.some(p=>p.id===m.pendingInjury.playerId)))return false;
 if(!isRecord(m.minutesPlayed)||Object.keys(m.minutesPlayed).length>50||Object.entries(m.minutesPlayed).some(([id,n])=>!validId(id)||![...m.teams.home.squad,...m.teams.away.squad].some(p=>p.id===id)||!whole(n,0,90)))return false;
 if(m.pitch!==undefined&&!validPitch(m.pitch,m))return false;
 if(m.homeClub.competitionId!==c.competitionId||m.awayClub.competitionId!==c.competitionId)return false;
 return true;
}
function validCareer(c){
 const careerRequired=['version','id','clubId','competitionId','createdAt','updatedAt','matchday','calendarDay','formation','tactic','budget','salaryBudget','squad','market','injuries','history','standings','activeMatch','friendlyMode','tab','voice','gameSpeed','nextMatchSeq'];
 if(!hasKeys(c,careerRequired,['acquiredMarketIds','processedMatchIds','fixtures','calendarRound'])||c.version!==3||!validId(c.id)||!validId(c.clubId)||!clubById.has(c.clubId)||!validId(c.competitionId)||!compById.has(c.competitionId)||clubById.get(c.clubId).competitionId!==c.competitionId)return false;
 if(!validTimestamp(c.createdAt)||!validTimestamp(c.updatedAt)||!whole(c.matchday,0,10000)||!whole(c.calendarDay,1,1000000)||!formations[c.formation]||!['balanced','attack','defense'].includes(c.tactic)||!inRange(c.budget,0,10000000)||!inRange(c.salaryBudget,0,10000000)||typeof c.friendlyMode!=='boolean'||typeof c.voice!=='boolean'||![1,2,4].includes(c.gameSpeed)||!['squad','match','calendar','market','table'].includes(c.tab)||!whole(c.nextMatchSeq,0,1e6))return false;
 if(c.calendarRound!==undefined&&!whole(c.calendarRound,1,100))return false;
 if(c.fixtures!==undefined&&!validSeasonFixtures(c.fixtures,c.competitionId,c.clubId))return false;
 if(!Array.isArray(c.squad)||c.squad.length<11||c.squad.length>25||!c.squad.every(validPlayer)||!Array.isArray(c.market)||c.market.length>25||!c.market.every(validPlayer)||!Array.isArray(c.history)||c.history.length>40||!c.history.every(validHistoryItem))return false;
 const marketIds=c.market.map(p=>p.id);if(!uniquePlayerIds(c.squad)||!uniquePlayerIds(c.market)||new Set([...c.squad.map(p=>p.id),...marketIds]).size!==c.squad.length+marketIds.length)return false;
 const squadOrigins=c.squad.map(playerOrigin),marketOrigins=c.market.map(playerOrigin);if(!uniqueStrings(squadOrigins)||!uniqueStrings(marketOrigins)||marketOrigins.some(id=>squadOrigins.includes(id)))return false;
 if(c.acquiredMarketIds!==undefined&&(!validTextList(c.acquiredMarketIds,100,180)||marketOrigins.some(id=>c.acquiredMarketIds.includes(id))))return false;
 if(c.processedMatchIds!==undefined&&(!Array.isArray(c.processedMatchIds)||c.processedMatchIds.length>200||!c.processedMatchIds.every(validId)||new Set(c.processedMatchIds).size!==c.processedMatchIds.length))return false;
 const historyIds=c.history.map(x=>x.matchId);if(new Set(historyIds).size!==historyIds.length)return false;
 if(!isRecord(c.injuries)||Object.keys(c.injuries).length>25||Object.entries(c.injuries).some(([id,x])=>!c.squad.some(p=>p.id===id)||!onlyKeys(x,['days','total','reason'])||!whole(x.days,1,60)||!whole(x.total,x.days,60)||!validText(x.reason,80)))return false;
 if(!isRecord(c.standings)||Object.keys(c.standings).length>30||Object.entries(c.standings).some(([id,r])=>!clubById.has(id)||clubById.get(id).competitionId!==c.competitionId||!onlyKeys(r,['played','w','d','l','gf','ga','pts'])||Object.keys(r).length!==7||Object.values(r).some(n=>!whole(n,0,1e6))))return false;
 if(c.history.some(x=>clubById.get(x.opponentId).competitionId!==c.competitionId||clubById.get(x.opponentId).name!==x.opponentName))return false;
 if(c.activeMatch!==null&&!validMatch(c.activeMatch,c))return false;
 return true;
}
function sanitizeCareer(c){initializeSeasonFixtures(c);const m=c.activeMatch;if(m){m.running=false;m.pitch=null;m.homeClub=clubById.get(m.homeClub.id);m.awayClub=clubById.get(m.awayClub.id);m.opponent=clubById.get(m.opponent.id);for(const side of ['home','away'])m.teams[side].club=clubById.get(m.teams[side].club.id)}return c;}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
const firstNames={Nordlys:['Aske','Freja','Mikkel','Signe','Emil','Astrid','Nohr','Liva','Viggo','Alma','Eske','Ida','Lauge','Naja','Silas','Eira','Villum','Saga','Birk','Solvej'],Psen:['Iago','Nara','Lian','Aren','Sira','Nuno','Mara','Gael','Iria','Unai','Teo','Arlet','Ciro','Lorea','Ander','Nela','Eloi','Noa','Oihan','Jana','Joel','Alma','Eder','Vera','Aritz','Leire','Danel','Ane','Nico','Mikel'],Westria:['Elliot','Darcy','Rowan','Marnie','Callum','Orla','Finley','Elowen','Aiden','Tamsin','Ellis','Soren','Briar','Carys','Hale','Hollis','Anwen','Rhys','Dylan','Imogen','Niall','Keira','Wilf','Esme','Rory','Tegan','Jory','Maeve','Lennox','Perrin'],Rhenara:['Lio','Mira','Jona','Alva','Finn','Anika','Niko','Elian','Tilda','Malte','Nele','Leif','Sanna','Enno','Yara','Kian','Leni','Joris','Frida','Ole','Runa','Maren','Arno','Edda','Veit','Lotte','Sven','Mika','Timo','Ansel']};
const syllA={Nordlys:['Birke','Hav','Linde','Sol','Ravn','Ege','Nord','Fjord','Vinter','Mose','Kilde','Tinde','Aften','Pile','Gran'],Psen:['Val','Cier','Neral','Mir','Darel','Lior','Vera','Nuv','Cal','Salen','Rial','Varel','Arven','Taren','Mel','Bris','Oriel','Canda'],Westria:['Wren','Ash','Merr','Raven','Thorn','Brack','Lind','Wether','Grey','Kings','Marl','West','Fair','Crown','Hart','Briar','Lock','El'],Rhenara:['Falk','Hohen','Silber','Eichen','Wald','Kron','Rosen','Weiden','Morgen','Linden','Berg','Raben','Sonnen','Tannen','Finken','Himmel','Nord','Eisen']};
const syllB={Nordlys:['holm','lund','vig','bro','dal','havn','mark','borg','kær','vang','sø','næs','glimt','strand','skov'],Psen:['oria','era','alba','ena','ira','uel','aro','elia','onda','ero','iel','avia','enda','ora','anza','eira','ova','ina'],Westria:['ford','mere','wick','bury','combe','well','field','ridge','holt','bridge','dale','bourne','stead','moor','ley','cross','ham','ton'],Rhenara:['bach','feld','brück','heim','berg','furt','tal','hain','wald','born','dorf','mark','ried','au','fels','hof','quell','stadt']};
const traitText={sprinter:'Ruptura veloz',playmaker:'Organizador',anchor:'Ancla defensiva',engine:'Motor incansable',poacher:'Instinto de área',anticipator:'Anticipación',dribbler:'Conducción creativa',keeper:'Reflejos',sweeper:'Portero adelantado',link:'Conector de juego',leader:'Liderazgo'};
const statLabels={ataque:'ATA',velocidad:'VEL',pase:'PAS',regate:'REG',defensa:'DEF',entrada:'ENT',resistencia:'RES',fuerza:'FUE',tiro:'TIR',porteria:'POR',anticipacion:'ANT',vision:'VIS'};
const positionNames={POR:'Portero',DEF:'Defensa',MED:'Mediocampo',DEL:'Delantero'};
function playerName(country,seed){const names=firstNames[country]||firstNames.Psen,a=syllA[country]||syllA.Psen,b=syllB[country]||syllB.Psen;const n=Math.abs(seed>>>0),first=names[n%names.length],family=Math.floor(n/names.length),surname=a[family%a.length]+b[Math.floor(family/a.length)%b.length];return `${first} ${surname}`}
const roleWeights={POR:{porteria:.48,defensa:.17,pase:.1,fuerza:.08,velocidad:.07,resistencia:.05,anticipacion:.05},DEF:{defensa:.24,entrada:.22,velocidad:.13,fuerza:.12,pase:.1,anticipacion:.1,resistencia:.09},MED:{pase:.19,regate:.16,vision:.15,resistencia:.13,ataque:.11,defensa:.09,velocidad:.08,tiro:.05,entrada:.04},DEL:{tiro:.24,ataque:.22,velocidad:.18,regate:.15,fuerza:.08,pase:.07,resistencia:.04,vision:.02}};
function calcOverall(pos,stats){const w=roleWeights[pos]||roleWeights.MED;let score=0;for(const [k,v] of Object.entries(w))score+=stats[k]*v;return Math.round(score)}
function createPlayer(country,tier,seed,role,id,market=false){const r=rngFrom(seed),base={1:75,2:69,3:65,4:60,5:56,6:52,7:48}[tier]||57;const bonus={POR:{porteria:19,defensa:8,ataque:-24,tiro:-18,entrada:2},DEF:{defensa:12,entrada:11,anticipacion:8,ataque:-2,tiro:-8},MED:{pase:10,regate:9,vision:10,resistencia:6,porteria:-25},DEL:{ataque:13,tiro:14,velocidad:9,regate:7,defensa:-8,entrada:-9,porteria:-30}}[role]||{};const keys=Object.keys(statLabels);const stats={};for(const k of keys){const noise=Math.round((r()+r()+r()-1.5)*8);stats[k]=clamp(base+noise+(bonus[k]||0),28,96)}const ovr=calcOverall(role,stats),potential=clamp(ovr+Math.round(r()*15),ovr,98),age=18+Math.floor(r()*17);let trait='engine';if(role==='POR')trait=stats.anticipacion>base+5?'sweeper':'keeper';else if(role==='DEF')trait=stats.anticipacion>stats.entrada?'anticipator':'anchor';else if(role==='MED')trait=stats.vision>stats.resistencia?'playmaker':'engine';else if(role==='DEL')trait=stats.velocidad>stats.tiro?'sprinter':stats.regate>stats.ataque?'dribbler':'poacher';const fee=Math.round((ovr*ovr*90)+(potential-ovr)*ovr*180+(35-age)*Math.max(0,ovr-35)*160);return{id,name:playerName(country,seed),number:Math.floor(r()*90)+1,position:role,ovr,potential,age,stats,trait,fitness:90+Math.floor(r()*11),value:Math.max(25000,fee),market:!!market}}
const rosterPositions=['POR','POR','DEF','DEF','DEF','DEF','DEF','DEF','MED','MED','MED','MED','MED','MED','DEL','DEL','DEL','DEL'];
const legacyRosterPositions=['POR','POR','DEF','DEF','DEF','DEF','DEF','DEF','MED','MED','MED','MED','MED','MED','DEL','DEL','DEL','DEL'];
function officialRoster(club){return window.CANCHA_ROSTERS?.[club.code]||null}
function generateSquad(club){
  const roster=officialRoster(club);
  if(!roster)return rosterPositions.map((pos,i)=>createPlayer(club.country,club.tier,hash(`${club.id}:p:${i}`),pos,`${club.id}-p${i+1}`));
  if(!Array.isArray(roster)||roster.length<11)throw new Error(`Plantilla oficial incompleta: ${club.name}`);
  return roster.map((player,i)=>{
    const p=createPlayer(club.country,club.tier,hash(`${club.id}:${player.name}:${player.number}`),player.position,`${club.id}-real-${player.number||i+1}`);
    p.name=player.name;
    p.number=player.number;
    p.age=player.age||p.age;
    return p;
  });
}
function migrateLegacySquad(club,squad){
  const roster=officialRoster(club);
  if(!roster||!Array.isArray(squad))return false;
  const byPosition={POR:roster.filter(p=>p.position==='POR'),DEF:roster.filter(p=>p.position==='DEF'),MED:roster.filter(p=>p.position==='MED'),DEL:roster.filter(p=>p.position==='DEL')};
  const used={POR:0,DEF:0,MED:0,DEL:0};
  let changed=false;
  for(const player of squad){
    const match=typeof player?.id==='string'?player.id.match(/-p(\d+)$/):null;
    if(!match)continue;
    const index=Number(match[1])-1,position=legacyRosterPositions[index];
    if(!position||player.position!==position)continue;
    const official=byPosition[position][used[position]++];
    if(!official)continue;
    player.name=official.name;
    player.number=official.number;
    player.position=official.position;
    player.age=official.age||player.age;
    changed=true;
  }
  return changed;
}
function upgradeStoredCareer(c){
  if(!isRecord(c))return false;
  let changed=false;
  const club=clubById.get(c.clubId);
  if(club)changed=migrateLegacySquad(club,c.squad)||changed;
  changed=initializeSeasonFixtures(c)||changed;
  if(!whole(c.calendarRound,1,100)){c.calendarRound=Math.min(Math.max(1,(Number(c.matchday)||0)+1),Math.max(1,seasonRoundCount(c.competitionId)));changed=true}
  if(Array.isArray(c.history))for(const item of c.history){
    const opponent=clubById.get(item?.opponentId);
    if(opponent&&item.opponentName!==opponent.name){item.opponentName=opponent.name;changed=true}
  }
  const match=c.activeMatch;
  if(isRecord(match)){
    for(const key of ['homeClub','awayClub','opponent']){
      const current=match[key],canonical=clubById.get(current?.id);
      if(canonical&&current!==canonical){match[key]=canonical;changed=true}
    }
    if(isRecord(match.teams))for(const side of ['home','away']){
      const team=match.teams[side],canonical=clubById.get(team?.club?.id);
      if(!isRecord(team)||!canonical)continue;
      if(team.club!==canonical){team.club=canonical;changed=true}
      changed=migrateLegacySquad(canonical,team.squad)||changed;
    }
  }
  return changed;
}
function fitPlayer(career,p){return !career.injuries?.[p.id]||career.injuries[p.id].days<=0}
const formations={'4-3-3':{POR:1,DEF:4,MED:3,DEL:3},'4-4-2':{POR:1,DEF:4,MED:4,DEL:2},'3-5-2':{POR:1,DEF:3,MED:5,DEL:2}};
function pickXI(squad,formation,injuries={}){const need=formations[formation]||formations['4-3-3'],chosen=[],used=new Set();for(const pos of ['POR','DEF','MED','DEL']){const list=squad.filter(p=>p.position===pos&&(!injuries[p.id]||injuries[p.id].days<=0)).sort((a,b)=>b.ovr-a.ovr);for(const p of list.slice(0,need[pos]||0)){chosen.push(p.id);used.add(p.id)}}if(chosen.length<11){for(const p of squad.filter(p=>!used.has(p.id)&&(!injuries[p.id]||injuries[p.id].days<=0)).sort((a,b)=>b.ovr-a.ovr)){chosen.push(p.id);if(chosen.length===11)break}}return chosen}
function tierBudget(t){return{1:5000000,2:3000000,3:1800000,4:900000,5:500000,6:300000,7:150000}[t]||250000}
function makeMarket(club,excluded=[]){const roles=['DEF','MED','MED','DEL','POR','DEL'];return roles.map((role,i)=>{const p=createPlayer(club.country,Math.min(7,club.tier+1),hash(`${club.id}:agent:${i}`),role,`agent-${club.id}-${i+1}`,true);p.originId=p.id;return p}).filter(p=>!excluded.includes(p.originId))}
function readState(){try{const raw=localStorage.getItem(SAVE_KEY)||'null';if(raw.length>5*1024*1024)return{version:3,activeId:null,careers:{}};const x=JSON.parse(raw);if(hasKeys(x,['version','activeId','careers'])&&x.version===3&&(x.activeId===null||validId(x.activeId))&&isRecord(x.careers)&&Object.keys(x.careers).length<=D.clubs.length){const careers={};for(const [id,c] of Object.entries(x.careers))if(validId(id)&&c?.id===id){upgradeStoredCareer(c);if(validCareer(c))careers[id]=sanitizeCareer(c)}return{version:3,activeId:careers[x.activeId]?x.activeId:null,careers}}}catch(_){}return{version:3,activeId:null,careers:{}}}
let saveState=readState(),career=saveState.careers[saveState.activeId]||null,selectedClub=null,graphicsSelectedId=null,view='clubs',pageLimit=PAGE_SIZE,liveTimer=null,raf=0,lastFrame=0,aiElapsed=0,toastTimer=null,goalCelebrationTimer=null,matchActionTimer=null,substitutionOpen=false,speechReady=!!(window.speechSynthesis&&window.SpeechSynthesisUtterance);
try{const old=localStorage.getItem(OLD_CLUB_KEY);if(old)selectedClub=clubById.get(old)||null}catch(_){}
if(career&&career.activeMatch)career.activeMatch.running=false;
function persist(quiet=false){if(!career)return false;career.updatedAt=new Date().toISOString();saveState.careers[career.id]=career;saveState.activeId=career.id;try{for(const [id,c] of Object.entries(saveState.careers))if(c?.id!==id||!validCareer(c))throw new Error('Guardado duplicado o inválido');localStorage.setItem(SAVE_KEY,JSON.stringify(saveState));if(!quiet)toast('Autoguardado en este navegador.');}catch(_){toast('No se guardó: hay IDs repetidos o datos inválidos. Revisa la plantilla o importa un respaldo válido.');updateResumeBanner();updateSaveLine();return false}updateResumeBanner();updateSaveLine();return true}
function toast(s){const el=$('toast');if(!el)return;el.textContent=s;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function updateResumeBanner(){const el=$('resumeBanner');if(!el)return;if(!career){el.hidden=true;return}const c=clubById.get(career.clubId),m=career.activeMatch;el.hidden=false;el.innerHTML=`<span><strong>Carrera guardada:</strong> ${h(c?.name||'Club')} · ${m&&['1H','2H','HT'].includes(m.status)?`partido en ${h(m.minute)}'`:career.friendlyMode?career.matchday?'amistoso jugado':'lista para empezar':career.matchday>=seasonRoundCount(career.competitionId)?'temporada finalizada':`jornada ${h(career.matchday+1)}`} · solo en este navegador</span><button class="small-button" type="button" data-action="resume-career">Continuar</button>`}
function setView(v){view=v;document.querySelectorAll('.view-tab').forEach(b=>{const on=b.dataset.view===v;b.classList.toggle('active',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});$('view-clubs').hidden=v!=='clubs';$('view-career').hidden=v!=='career';$('view-evidence').hidden=v!=='evidence';if(v==='career')renderCareer();if(v==='evidence')renderEvidence();window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('.view-tab').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
function countryOptions(){const el=$('countryFilter');el.innerHTML='<option value="all">Todos</option>'+D.countries.map(c=>`<option value="${h(c.id)}">${h(c.name)}</option>`).join('')}
function compLabel(c){return `${c.title}${c.group&&c.group!=='Nacional'?' · '+c.group:''}${c.rosterStatus==='partial'?' · parcial':''}`}function tierLabel(c){return c.tierLabel||`Nivel ${c.tier}`}
function leagueOptions(){const el=$('leagueFilter'),country=$('countryFilter').value;const list=D.competitions.filter(c=>country==='all'||c.countryId===country);el.innerHTML='<option value="all">Todas</option>'+list.map(c=>`<option value="${h(c.id)}">${h(compLabel(c))}</option>`).join('')}
function renderClubList(){const country=$('countryFilter').value,competition=$('leagueFilter').value,term=$('searchInput').value.trim().toLocaleLowerCase('es');let filtered=D.clubs.filter(t=>(country==='all'||(t.countryId||compById.get(t.competitionId)?.countryId)===country)&&(competition==='all'||t.competitionId===competition));if(term)filtered=filtered.filter(t=>`${t.name} Sede ficticia ${t.country} ${t.league} ${t.group}`.toLocaleLowerCase('es').includes(term));const visible=filtered.slice(0,pageLimit),grouped=new Map();for(const t of visible){if(!grouped.has(t.competitionId))grouped.set(t.competitionId,[]);grouped.get(t.competitionId).push(t)}$('clubResults').textContent=`${filtered.length} ${filtered.length===1?'participación':'participaciones'}${filtered.length>pageLimit?` · mostrando ${visible.length}`:''}`;$('loadMore').hidden=filtered.length<=pageLimit;$('clubList').innerHTML=grouped.size?[...grouped.entries()].map(([id,teams])=>{const c=compById.get(id);return `<section class="league-block"><div class="league-heading"><div class="league-title-wrap"><span class="league-chip">${h(c.country.slice(0,3).toUpperCase())}</span><div><h3>${h(c.title)}${c.group!=='Nacional'?' · '+h(c.group):''}</h3><div class="league-meta">${h(c.country)} · ${h(tierLabel(c))} · ${c.rosterStatus==='partial'?`${h(c.clubCount)}/${h(c.expectedCount)} participantes`:`${h(c.clubCount)} participaciones`}</div></div></div><div class="country-kicker">${c.rosterStatus==='partial'?'<span class="partial-pill">Roster parcial</span>':`<span class="coverage-pill">${h('Universo ficticio')}</span>`}</div></div><div class="club-grid">${teams.map(t=>`<button type="button" class="club-card${selectedClub?.id===t.id?' selected':''}" data-club="${h(t.id)}" style="--club-accent:${h(t.c1)}" aria-pressed="${selectedClub?.id===t.id}" aria-label="Ver ${h(t.name)}, ${h(t.league)}, universo ${h(t.country)}"><span class="club-code">${h(t.code)}</span>${crest(t)}<span class="club-name">${h(t.name)}</span><span class="club-place">Sede ficticia</span></button>`).join('')}</div></section>`}).join(''):'<div class="empty-career"><h2>Sin resultados</h2><p>Prueba con otro nombre, universo o división.</p></div>';}
function renderClubPanel(){const root=$('clubPanelContent');if(!selectedClub){root.innerHTML='<div class="empty-panel"><svg class="empty-mark" viewBox="0 0 80 94" fill="none" aria-hidden="true"><path d="M8 7h64v48c0 16-17 28-32 35C25 83 8 71 8 55V7Z" stroke="#617062" stroke-width="1.5" stroke-dasharray="3 4"/><path d="m40 20 5.5 12.8L59 34l-10 8.9 2.8 13.1L40 49.3l-11.8 6.7L31 42.9 21 34l13.5-1.2L40 20Z" stroke="#82917d" stroke-width="1.3"/><circle cx="40" cy="39" r="4" stroke="#82917d" stroke-width="1.2"/></svg><h2 id="clubPanelTitle">Tu banquillo está vacío.</h2><p>Elige un equipo para ver su ficha, crear una plantilla original y empezar una carrera local.</p><p class="local-note">Sin cuenta, sin pago y sin sincronización entre dispositivos.</p></div>';return}const c=compById.get(selectedClub.competitionId),saved=Object.values(saveState.careers).find(x=>x.clubId===selectedClub.id);root.innerHTML=`<div class="club-profile-head">${crest(selectedClub,true)}<div class="club-profile-title"><h2 id="clubPanelTitle">${h(selectedClub.name)}</h2><div class="profile-sub">Sede ficticia · ${h(selectedClub.country)}</div><span class="profile-badge">${h(selectedClub.league)}${c.group!=='Nacional'?' · '+h(c.group):''}</span></div></div><p class="profile-text">Identidad creada para Cancha Libre. Su escudo es un SVG geométrico original y no reproduce insignias oficiales.</p><div class="profile-facts"><div class="fact-box"><span>Competencia</span><strong>${h(c.rosterStatus==='partial'?'Lista parcial':'Competición ficticia')}</strong></div><div class="fact-box"><span>Plantilla</span><strong>18 futbolistas ficticios</strong></div><div class="fact-box"><span>Rasgos</span><strong>Influyen en el juego 2D</strong></div><div class="fact-box"><span>Guardado</span><strong>Solo en este navegador</strong></div></div>${c.rosterStatus==='partial'?`<p class="injury-alert">Esta división tiene ${h(c.clubCount)} nombres verificables de ${h(c.expectedCount)}. Se permite jugar amistosos; no se simula una tabla incompleta.</p>`:''}<div class="button-row">${saved?`<button class="primary-button" type="button" data-action="continue-specific" data-career="${h(saved.id)}">Continuar carrera</button>`:`<button class="primary-button" type="button" data-action="start-career">${c.rosterStatus==='partial'?'Crear carrera de amistosos':'Iniciar carrera'}</button>`}</div><p class="local-note">Los jugadores, atributos, partidos y fichajes se generan en el navegador. No hay cuentas, cobros ni sincronización.</p>`}
$('countryFilter').addEventListener('change',()=>{pageLimit=PAGE_SIZE;leagueOptions();renderClubList()});$('leagueFilter').addEventListener('change',()=>{pageLimit=PAGE_SIZE;renderClubList()});$('searchInput').addEventListener('input',()=>{pageLimit=PAGE_SIZE;renderClubList()});$('loadMore').addEventListener('click',()=>{pageLimit+=PAGE_SIZE;renderClubList()});$('clubList').addEventListener('click',e=>{const b=e.target.closest('[data-club]');if(!b)return;selectedClub=clubById.get(b.dataset.club)||null;renderClubList();renderClubPanel()});$('clubPanelContent').addEventListener('click',e=>handleGlobalAction(e));$('resumeBanner').addEventListener('click',e=>handleGlobalAction(e));
$('clubList').addEventListener('click',e=>{if(e.target.closest('[data-club]'))$('graphicsFromClub').disabled=!selectedClub});
$('graphicsFromClub').addEventListener('click',()=>{graphicsSelectedId=selectedClub?.id||D.clubs[0]?.id;setView('evidence')});
$('graphicsEditor').addEventListener('change',e=>{if(e.target.id==='graphicsClubSelect'){graphicsSelectedId=e.target.value;renderGraphicsEditor()}else if(e.target.id==='graphicsFile'&&e.target.files?.[0])importClubLogo(e.target.files[0])});
$('graphicsEditor').addEventListener('input',e=>{if(e.target.id!=='graphicsClubSelect'&&e.target.id!=='graphicsFile')updateGraphicsPreview()});
$('graphicsEditor').addEventListener('click',async e=>{const action=e.target.closest('[data-action]')?.dataset.action;if(action==='save-crest'){await saveCreatedCrest();return}if(action==='remove-logo'){const id=$('graphicsClubSelect')?.value;if(!clubById.has(id))return;try{await window.CANCHA_GRAPHICS.remove(id);renderGraphicsEditor();refreshClubLogos();toast('Se restauró el escudo original.')}catch(error){const status=$('graphicsStatus');if(status)status.textContent=error.message;toast(error.message)}}});
function renderEvidence(){
 const root=$('evidenceList');
 root.innerHTML=D.competitions.map(c=>{
  const group=c.group!=='Nacional'?' · '+c.group:'';
  const roster=c.rosterStatus==='partial'?`${h(c.clubCount)}/${h(c.expectedCount)} clubes verificados · lista parcial`:c.rosterStatus==='complete'?`${h(c.clubCount)} clubes · plantilla oficial`:`${h(c.clubCount)} clubes · jugadores generados`;
  const description=c.rosterStatus==='complete'
   ?'Clubes reales de LaLiga. Los nombres, dorsales, posiciones y edades de la plantilla se basan en datos oficiales; GRL y atributos son estimaciones del juego.'
   :c.rosterStatus==='generated'
    ?'Competición y clubes reales. Jugadores, GRL y atributos se generan para Cancha Libre.'
    :'Participantes incompletos; se permiten amistosos y no se simula una clasificación.';
  return `<article class="evidence-card"><h3>${h(c.title)}${h(group)}</h3><div class="evidence-meta">${h(c.country)} · temporada ${h(c.season)} · ${h(roster)}</div><p>${h(description)}</p><div class="evidence-channels">${(c.channels||[]).map(x=>`<span>${h(x)}</span>`).join('')}</div><div class="evidence-meta">Los canales mostrados son ficticios; no son retransmisiones reales.</div></article>`
 }).join('');
 renderGraphicsSources();
 renderGraphicsEditor();
 $('evidenceGaps').innerHTML='<li>Las fuentes de participantes y calendarios se documentan en SOURCES.md; los escudos son diseños originales y los GRL son estimaciones.</li>'
}
function renderGraphicsSources(){
 const sources=[
  {name:'FootyLogos',meta:'Escudos de clubes, selecciones y torneos · PNG / SVG',description:'Biblioteca comunitaria de identidades futbolísticas en distintas resoluciones.',links:[['FootyLogos','https://footylogos.net/']]},
  {name:'Paladar Negro · Escudoteca PN',meta:'Archivo especializado de insignias de fútbol',description:'Colección visual de escudos de clubes y selecciones de distintas ligas.',links:[['Escudoteca PN','https://paladarnegro.net/escudoteca/']]},
  {name:'Archivos de escudos y equipaciones',meta:'Colecciones y comunidades de aficionados',description:'Los archivos comunitarios pueden incluir insignias históricas, kits y variantes por temporada.',links:[['Football Kit Archive','https://www.footballkitarchive.com/'],['FM Scout · archivos','https://www.fmscout.com/']]},
  {name:'Wikimedia Commons',meta:'Vectores SVG de asociaciones, torneos y clubes',description:'Los archivos pueden tener licencias distintas: consulta la ficha individual y respeta su atribución.',links:[['Categoría SVG football logos','https://commons.wikimedia.org/wiki/Category:SVG_association_football_logos']]},
  {name:'Sortitoutsi',meta:'Graphic packs de la comunidad de Football Manager',description:'Megapacks de logos en varios estilos; revisa requisitos y condiciones de descarga.',links:[['Standard Logos','https://sortitoutsi.net/graphics/style/1/standard-logos']]}
 ];
 $('graphicsSources').innerHTML=sources.map(source=>`<article class="evidence-card graphics-source-card"><h3>${h(source.name)}</h3><div class="evidence-meta">${h(source.meta)}</div><p>${h(source.description)}</p><div class="source-links">${source.links.map(([label,url])=>`<a href="${h(url)}" target="_blank" rel="noopener noreferrer">${h(label)}</a>`).join('')}</div></article>`).join('');
}
function renderGraphicsEditor(){
 const root=$('graphicsEditor');if(!root)return;
 const preferred=clubById.has(graphicsSelectedId)?graphicsSelectedId:clubById.has($('graphicsClubSelect')?.value)?$('graphicsClubSelect').value:selectedClub?.id||D.clubs[0]?.id;
 graphicsSelectedId=preferred;
 const club=clubById.get(preferred);if(!club){root.textContent='No hay clubes disponibles para personalizar.';return}
 const motifOptions=Object.keys(motifs).map(key=>`<option value="${h(key)}"${key===club.motif?' selected':''}>${h(key)}</option>`).join('');
 const patternOptions=Array.from({length:8},(_,index)=>`<option value="${index}"${index===(club.pattern||0)?' selected':''}>Diseño ${index+1}</option>`).join('');
 const shapeOptions=shapes.map((_,index)=>`<option value="${index}"${index===(club.shape||0)?' selected':''}>Forma ${index+1}</option>`).join('');
 const custom=window.CANCHA_GRAPHICS.hasCustom(club.id);
 root.innerHTML=`<div class="graphics-editor-grid">
  <div>
   <label class="graphics-field" for="graphicsClubSelect">Club e ID único<select id="graphicsClubSelect">${D.clubs.map(item=>`<option value="${h(item.id)}"${item.id===club.id?' selected':''}>${h(item.name)} · ${h(item.id)}</option>`).join('')}</select></label>
   <div class="graphics-id">Archivo local sugerido<br><code>assets/logos/${h(club.id)}.png</code> o <code>.svg</code></div>
   <label class="graphics-field" for="graphicsFile">Importar imagen PNG / SVG (máx. 6 MB)<input id="graphicsFile" type="file" accept="image/png,image/svg+xml,.png,.svg"></label>
   <p class="graphics-status" id="graphicsStatus" aria-live="polite">${custom?'Hay un escudo personalizado guardado en este navegador.':'Sin archivo personalizado; se usa el escudo original o el archivo local del ID.'}</p>
   ${custom?'<button class="secondary-button graphics-action" type="button" data-action="remove-logo">Restaurar escudo original</button>':''}
  </div>
  <div>
   <div class="graphics-colors">
    <label class="graphics-field" for="graphicsPrimary">Color primario<input id="graphicsPrimary" type="color" value="${h(club.c1)}"></label>
    <label class="graphics-field" for="graphicsSecondary">Secundario<input id="graphicsSecondary" type="color" value="${h(club.c2)}"></label>
    <label class="graphics-field" for="graphicsAccent">Acento<input id="graphicsAccent" type="color" value="${h(club.c3)}"></label>
   </div>
   <div class="graphics-controls">
    <label class="graphics-field" for="graphicsShape">Forma del escudo<select id="graphicsShape">${shapeOptions}</select></label>
    <label class="graphics-field" for="graphicsPattern">Patrón<select id="graphicsPattern">${patternOptions}</select></label>
    <label class="graphics-field" for="graphicsMotif">Cresta / motivo<select id="graphicsMotif">${motifOptions}</select></label>
    <label class="graphics-field" for="graphicsFont">Tipografía<select id="graphicsFont"><option value="ui-monospace,monospace">Monoespaciada</option><option value="Arial,sans-serif">Sans serif</option><option value="Georgia,serif">Serif</option></select></label>
    <label class="graphics-field" for="graphicsCode">Texto del escudo (1–3 caracteres)<input id="graphicsCode" type="text" maxlength="3" value="${h(club.code)}" autocomplete="off"></label>
    <label class="graphics-field" for="graphicsBorder">Borde · <output id="graphicsBorderValue">2.5</output><input id="graphicsBorder" type="range" min="1" max="6" step=".5" value="2.5"></label>
    <label class="graphics-field" for="graphicsBorderColor">Color del borde<input id="graphicsBorderColor" type="color" value="#e9dfc2"></label>
    <div class="button-row"><button class="primary-button" type="button" data-action="save-crest">Guardar escudo creado</button></div>
   </div>
  </div>
  <div class="graphics-preview" id="graphicsPreview" aria-label="Vista previa del escudo"></div>
 </div>
 <p class="graphics-intro graphics-warning">Importa únicamente imágenes que tengas derecho a utilizar. El juego no descarga packs automáticamente ni concede licencias sobre los escudos.</p>`;
 updateGraphicsPreview();
}
function graphicsDraft(showErrors=true){
 const club=clubById.get($('graphicsClubSelect')?.value);if(!club)return null;
 const code=$('graphicsCode').value.trim().toUpperCase();
 if(!/^[A-Z0-9]{1,3}$/.test(code)){if(showErrors)toast('El texto del escudo debe tener entre 1 y 3 letras o números.');return null}
 const colors=[$('graphicsPrimary').value,$('graphicsSecondary').value,$('graphicsAccent').value,$('graphicsBorderColor').value];
 if(colors.some(color=>!/^#[0-9a-f]{6}$/i.test(color))){if(showErrors)toast('Selecciona colores válidos para el escudo.');return null}
 return{...club,c1:colors[0],c2:colors[1],c3:colors[2],shape:Number($('graphicsShape').value),pattern:Number($('graphicsPattern').value),motif:$('graphicsMotif').value,code,border:colors[3],borderWidth:Number($('graphicsBorder').value),fontFamily:$('graphicsFont').value};
}
function updateGraphicsPreview(){
 const preview=$('graphicsPreview');if(!preview)return;
 const draft=graphicsDraft(false);if(!draft)return;
 preview.innerHTML=generatedCrest(draft,true);
 const value=$('graphicsBorderValue');if(value)value.textContent=draft.borderWidth;
}
function refreshClubLogos(){renderClubList();renderClubPanel();if(career)renderCareer()}
async function importClubLogo(file){
 const id=$('graphicsClubSelect')?.value;if(!clubById.has(id))return;
 try{await window.CANCHA_GRAPHICS.saveFile(id,file);renderGraphicsEditor();refreshClubLogos();toast('Escudo importado y guardado en este navegador.')}
 catch(error){const status=$('graphicsStatus');if(status)status.textContent=error.message;toast(error.message)}
}
async function saveCreatedCrest(){
 const draft=graphicsDraft();if(!draft)return;
 try{await window.CANCHA_GRAPHICS.saveSvg(draft.id,generatedCrest(draft,true));renderGraphicsEditor();refreshClubLogos();toast('Escudo creado y guardado en este navegador.')}
 catch(error){const status=$('graphicsStatus');if(status)status.textContent=error.message;toast(error.message)}
}
function newCareer(club){const c=compById.get(club.competitionId);const existing=Object.values(saveState.careers).find(x=>x.clubId===club.id);if(existing){saveState.activeId=existing.id;career=existing;persist(true);setView('career');return}const id=`career-${club.id}-${Date.now().toString(36)}`,squad=generateSquad(club);career={version:3,id,clubId:club.id,competitionId:club.competitionId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),matchday:0,calendarDay:1,calendarRound:1,fixtures:c.rosterStatus==='partial'?undefined:buildSeasonFixtures(club.competitionId,club.id),formation:'4-3-3',tactic:'balanced',budget:tierBudget(club.tier),salaryBudget:Math.round(tierBudget(club.tier)*.18),squad,market:makeMarket(club),injuries:{},history:[],standings:{},activeMatch:null,friendlyMode:c.rosterStatus==='partial',tab:'match',voice:false,gameSpeed:2,processedMatchIds:[],nextMatchSeq:0};for(const t of D.clubs.filter(x=>x.competitionId===club.competitionId))career.standings[t.id]={played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};saveState.careers[id]=career;saveState.activeId=id;persist(true);toast('Carrera creada; autoguardado local activado.');setView('career')}
function currentClub(){return career?clubById.get(career.clubId):null}
function currentComp(){return career?compById.get(career.competitionId):null}
function formatMoney(n){return new Intl.NumberFormat('es-MX',{maximumFractionDigits:0}).format(Math.max(0,n))+' CR'}
function readableDate(x){try{return new Intl.DateTimeFormat('es-MX',{dateStyle:'short',timeStyle:'short'}).format(new Date(x))}catch(_){return''}}
function saveLine(){return `<div class="autosave-line"><span><strong>Autoguardado local</strong> · sin cuenta ni sincronización entre dispositivos</span><span id="saveTime">${career.updatedAt?`Guardado ${h(readableDate(career.updatedAt))}`:'Listo para guardar'}</span></div>`}
function updateSaveLine(){const el=$('saveTime');if(el&&career)el.textContent=career.updatedAt?`Guardado ${readableDate(career.updatedAt)}`:'Listo para guardar'}
function careerHeader(){const c=currentClub(),comp=currentComp(),rounds=seasonRoundCount(career.competitionId),status=career.friendlyMode?'solo amistosos':career.matchday>=rounds?'temporada finalizada':`jornada ${career.matchday+1}/${rounds}`;return `<div class="career-top"><div class="career-title">${crest(c,true)}<div><div class="eyebrow">${career.friendlyMode?'Modo amistoso':'Temporada de mánager'}</div><h2 id="careerHeading">${h(c.name)}</h2><p>${h(c.league)} · ${h(c.country)} · ${h(tierLabel(comp))} · ${status}</p></div></div><div class="career-actions"><button type="button" class="secondary-button" data-action="export-save">Exportar respaldo</button><button type="button" class="secondary-button" data-action="import-save">Importar</button><input id="importFile" class="import-input" type="file" accept="application/json,.json"><button type="button" class="danger-button" data-action="delete-career">Borrar carrera</button></div></div>${saveLine()}`}
function renderSavedList(){const list=Object.values(saveState.careers).sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)));if(!list.length)return '';return `<div class="saved-career-list">${list.map(s=>{const c=clubById.get(s.clubId),m=s.activeMatch;return `<div class="saved-career"><span><strong>${h(c?.name||'Club')}</strong><br><span class="profile-sub">${m&&['1H','2H','HT'].includes(m.status)?`Partido ${h(m.minute)}' · ${h(m.goals?.home??0)}-${h(m.goals?.away??0)}`:`Jornada ${s.matchday+1}`} · guardado ${h(readableDate(s.updatedAt))}</span></span><button type="button" class="small-button" data-action="continue-specific" data-career="${h(s.id)}">Continuar</button></div>`}).join('')}</div>`}
function rosterLineupMarkup(){const squad=career.squad,inj=career.injuries||{},xi=pickXI(squad,career.formation,inj),c=currentClub();return `<div class="lineup-list">${xi.map((id,i)=>{const p=squad.find(x=>x.id===id);return p?`<span class="lineup-chip"><b>${String(i+1).padStart(2,'0')} ${h(p.position)}</b>${h(p.name)} · ${h(p.ovr)}</span>`:''}).join('')}</div>`}
function injuryMarkup(){const entries=Object.entries(career.injuries||{}).filter(([,x])=>x.days>0);if(!entries.length)return '<p class="career-intro">Sin lesiones activas. La disponibilidad y la recuperación se muestran aquí.</p>';return `<div class="injury-list">${entries.map(([id,x])=>{const p=career.squad.find(y=>y.id===id);const remain=clamp(x.days,0,x.total||x.days),pct=100*(1-remain/(x.total||remain||1));return `<div class="injury-row"><div><strong>${h(p?.name||'Jugador')}</strong> · ${h(positionNames[p?.position]||'') }<br><span>${h(x.reason)} · disponible en ${h(remain)} día${remain===1?'':'s'}</span><div class="recovery-bar"><i style="width:${h(pct)}%"></i></div></div><span>${h(remain)}d</span></div>`}).join('')}</div>`}
function playerCard(p){const injured=career.injuries?.[p.id]?.days>0;const st=p.stats;const barKeys=['ataque','velocidad','pase','defensa','entrada','resistencia'];return `<article class="player-card${injured?' injured':''}"><div class="player-card-head"><div><div class="player-name"><span class="player-position">${h(p.position)}</span>${h(p.name)}</div><div class="player-meta">Dorsal ${h(p.number)} · ${h(p.age)} años · Potencial ${h(p.potential)} · Condición ${h(Math.round(p.fitness??90))}%${injured?' · LESIONADO':''}</div></div><div class="player-ovr" aria-label="GRL ${h(p.ovr)}">${h(p.ovr)}<small style="display:block;font:7px var(--mono);color:#9aab9c">GRL</small></div></div><span class="trait-tag">${h(traitText[p.trait]||'Versátil')}</span><div class="stat-bars">${barKeys.map(k=>`<div class="stat-line"><span>${statLabels[k]}</span><span class="stat-track"><i style="width:${h(st[k])}%"></i></span><b>${h(st[k])}</b></div>`).join('')}</div><details><summary class="player-meta">Ver todos los atributos</summary><div class="stat-bars">${Object.keys(statLabels).map(k=>`<div class="stat-line"><span>${statLabels[k]}</span><span class="stat-track"><i style="width:${h(st[k])}%"></i></span><b>${h(st[k])}</b></div>`).join('')}</div></details></article>`}
function renderSquad(){const f=career.formation;return `<div class="squad-toolbar"><div><h3>Plantilla ficticia · ${h(career.squad.length)} futbolistas</h3><p class="career-intro">GRL se calcula según la posición y atributos. El rasgo modifica apoyos, anticipación, cobertura o velocidad de movimiento.</p></div><div class="formation-box"><label>Formación<br><select class="career-select" data-field="formation" ${career.activeMatch&&['1H','2H'].includes(career.activeMatch.status)?'disabled':''}>${Object.keys(formations).map(x=>`<option${x===f?' selected':''}>${x}</option>`).join('')}</select></label><label>Enfoque<br><select class="career-select" data-field="tactic" ${career.activeMatch&&['1H','2H'].includes(career.activeMatch.status)?'disabled':''}><option value="balanced"${career.tactic==='balanced'?' selected':''}>Equilibrado</option><option value="attack"${career.tactic==='attack'?' selected':''}>Ofensivo</option><option value="defense"${career.tactic==='defense'?' selected':''}>Bloque defensivo</option></select></label></div></div><div class="fact-box"><span>Once sugerido · ${h(f)}</span>${rosterLineupMarkup()}</div><div class="section-heading" style="margin-top:15px"><div><h2 style="font-size:13px">Disponibilidad médica</h2><div class="league-meta">Las lesiones son mecánicas ficticias de juego.</div></div><button class="small-button" type="button" data-action="rest-days">Descansar 3 días</button></div>${injuryMarkup()}<div class="squad-grid">${career.squad.map(playerCard).join('')}</div>`}
function currentFixture(){return career?.fixtures?.find(fixture=>fixture.matchday===career.matchday+1&&(fixture.homeId===career.clubId||fixture.awayId===career.clubId))||null}
function expectedOpponent(){const c=currentClub();if(!c)return null;if(!career.friendlyMode){const fixture=currentFixture();return fixture&&clubById.get(fixture.homeId===c.id?fixture.awayId:fixture.homeId)||null}const peers=D.clubs.filter(x=>x.competitionId===career.competitionId&&x.id!==c.id);if(!peers.length)return null;return peers[career.matchday%peers.length]}
function matchActions(m){if(m.status==='HT')return `<button class="primary-button" type="button" data-action="second-half">Reanudar segundo tiempo</button>`;if(m.status==='FT')return `<button class="primary-button" type="button" data-action="next-match">Siguiente jornada</button>`;if(m.running)return `<button class="secondary-button" type="button" data-action="pause-match">Pausar</button><button class="secondary-button" type="button" data-action="open-substitutions">Cambios</button>`;return `<button class="primary-button" type="button" data-action="resume-match">Reanudar partido desde ${h(m.minute)}'</button>${m.pendingInjury?'':`<button class="secondary-button" type="button" data-action="open-substitutions">Cambios</button>`}`}
function renderCalendar(){
 if(career.friendlyMode)return '<div class="match-summary"><h4>Calendario de liga no disponible</h4><p class="career-intro">Esta división tiene una lista parcial; puedes disputar amistosos sin una clasificación inventada.</p></div>';
 const rounds=seasonRoundCount(career.competitionId),round=clamp(career.calendarRound||Math.min(career.matchday+1,rounds),1,rounds),fixtures=(career.fixtures||[]).filter(fixture=>fixture.matchday===round);
 return `<div class="section-heading"><div><h3>Calendario de temporada</h3><div class="league-meta">${h(currentComp().title)} · ${h(rounds)} jornadas · ida y vuelta</div></div><label class="calendar-round-label">Jornada<select class="career-select" data-field="calendar-round">${Array.from({length:rounds},(_,index)=>index+1).map(value=>`<option value="${value}"${value===round?' selected':''}>${value}${value<=career.matchday?' · jugada':value===career.matchday+1?' · actual':''}</option>`).join('')}</select></label></div><div class="fixture-list">${fixtures.map(fixture=>{const home=clubById.get(fixture.homeId),away=clubById.get(fixture.awayId),played=fixture.homeGoals!==null;return `<div class="fixture-row${played?' played':''}${home.id===career.clubId||away.id===career.clubId?' user-fixture':''}"><span class="fixture-team home">${h(home.name)}</span><strong class="fixture-score">${played?`${h(fixture.homeGoals)} : ${h(fixture.awayGoals)}`:'vs'}</strong><span class="fixture-team away">${h(away.name)}</span><span class="fixture-status">${played?'Finalizado':round===career.matchday+1?'Pendiente':'Programado'}</span></div>`}).join('')}</div>${career.activeMatch&&['1H','2H','HT'].includes(career.activeMatch.status)?'<p class="local-note">El partido de tu club sigue en curso; al finalizar se guardarán los demás resultados de la jornada.</p>':''}`
}
function renderMatchSummary(m){if(!m||m.status!=='FT')return'';const userSide=m.userSide,us=m.goals[userSide],os=m.goals[userSide==='home'?'away':'home'],won=us>os,draw=us===os,inj=m.injuryNames?.length?m.injuryNames.join(', '):'Ninguna';return `<div class="match-summary"><h4>Resumen final · ${career.friendlyMode?'amistoso':'jornada '+(career.matchday||1)}</h4><p class="career-intro"><strong>${won?'Victoria':draw?'Empate':'Derrota'} ${h(us)}–${h(os)}</strong> frente a ${h(m.opponent.name)}. Tiros ${h(m.stats?.shots?.user||0)}–${h(m.stats?.shots?.opponent||0)}; posesión ${h(Math.round(m.stats?.possession?.user||50))}%–${h(Math.round(100-(m.stats?.possession?.user||50)))}%. Lesiones en este partido: ${h(inj)}.</p><p class="career-intro">${career.friendlyMode?'El amistoso no modifica una tabla.':'Resultado incorporado a la tabla local de la carrera.'}</p></div>`}
function renderMatchTab(){const c=currentClub(),comp=currentComp(),m=career.activeMatch;const noOpponent=expectedOpponent();if(!m||m.status==='FT'){return `<div class="match-header"><div><div class="eyebrow">${career.friendlyMode?'Amistoso':'Próxima jornada'}</div><h3>${noOpponent?`${h(c.name)} vs ${h(noOpponent.name)}`:'No hay rival verificado disponible'}</h3><p class="career-intro">${career.friendlyMode?'La lista de esta división es parcial: el partido será amistoso y no alterará una tabla.':'La simulación usa la forma del equipo, atributos, táctica y un componente de incertidumbre.'}</p></div>${m?`<span class="match-clock">Partido anterior · ${h(m.minute)}'</span>`:''}</div>${m?renderMatchSummary(m):''}<div class="formation-box"><label>Formación previa<br><select class="career-select" data-field="formation">${Object.keys(formations).map(x=>`<option${x===career.formation?' selected':''}>${x}</option>`).join('')}</select></label><label>Enfoque<br><select class="career-select" data-field="tactic"><option value="balanced"${career.tactic==='balanced'?' selected':''}>Equilibrado</option><option value="attack"${career.tactic==='attack'?' selected':''}>Ofensivo</option><option value="defense"${career.tactic==='defense'?' selected':''}>Bloque defensivo</option></select></label><label>Ritmo<br><select class="career-select" data-field="speed"><option value="1"${career.gameSpeed===1?' selected':''}>1×</option><option value="2"${career.gameSpeed===2?' selected':''}>2×</option><option value="4"${career.gameSpeed===4?' selected':''}>4×</option></select></label></div><div class="button-row"><button class="primary-button" type="button" data-action="start-match" ${!noOpponent?'disabled':''}>${m?'Jugar siguiente partido':'Sacar desde el centro'}</button><button class="secondary-button" type="button" data-action="voice-toggle">${career.voice?'Desactivar voz':'Activar voz opcional'}</button></div><p class="local-note">Subtítulos siempre visibles. Audio con voz del navegador, desactivado por defecto; no se envía audio ni datos.</p>`}ensurePitch(m);const home=m.teams.home,away=m.teams.away;const status=m.status==='HT'?'MEDIO TIEMPO':m.status==='1H'?'PRIMER TIEMPO':'SEGUNDO TIEMPO';return `<div class="match-header"><div><div class="eyebrow">${status}</div><h3>${h(home.club.name)} <span class="match-score">${h(m.goals.home)} : ${h(m.goals.away)}</span> ${h(away.club.name)}</h3><p class="career-intro"><span class="match-clock" id="matchClock">${h(m.minute)}' · ${m.running?'EN JUEGO':'PAUSADO'}</span> · Jornada ${h(career.matchday+1)}${career.friendlyMode?' · amistoso':''}</p></div><div id="liveMatchActions" class="match-actions">${matchActions(m)}<button class="secondary-button" type="button" data-action="voice-toggle">${career.voice?'Voz activada':'Voz apagada'}</button></div></div><div class="formation-box"><label>Ritmo<br><select class="career-select" data-field="speed"><option value="1"${career.gameSpeed===1?' selected':''}>1×</option><option value="2"${career.gameSpeed===2?' selected':''}>2×</option><option value="4"${career.gameSpeed===4?' selected':''}>4×</option></select></label><span class="profile-sub">Solo el defensor más cercano presiona; los demás mantienen líneas, cubren espacios o ofrecen pase.</span></div><div class="pitch-wrap"><svg id="matchPitch" class="pitch-svg" viewBox="0 0 900 520" role="img" aria-label="Cancha táctica 2D con dorsales y posiciones"><defs><pattern id="grass" width="120" height="520" patternUnits="userSpaceOnUse"><rect width="60" height="520" fill="#2c593e"/><rect x="60" width="60" height="520" fill="#285237"/></pattern></defs><rect width="900" height="520" rx="5" fill="url(#grass)"/><path d="M25 18H875V502H25Z M450 18V502 M450 260m-76 0a76 76 0 1 0 152 0a76 76 0 1 0-152 0 M25 144H145V376H25 M755 144H875V376H755 M25 207H75V313H25 M825 207H875V313H825" fill="none" stroke="#dce9dc" stroke-opacity=".65" stroke-width="2"/><circle cx="450" cy="260" r="4" fill="#f1f2dc"/><rect x="5" y="220" width="20" height="80" fill="#e4e7d2" fill-opacity=".65"/><rect x="875" y="220" width="20" height="80" fill="#e4e7d2" fill-opacity=".65"/><g id="playerLayer"></g><g id="ballLayer" transform="translate(450 260)"><circle class="ball-shadow" cx="1" cy="4" r="8"/><circle class="ball-main" r="7"/><path class="ball-panel" d="m0-4 3 2-1 4h-4l-1-4 3-2Zm5 0 2 1v3l-2 1-2-2 2-3Zm-10 0-2 1v3l2 1 2-2-2-3Z"/></g></svg><div class="pitch-caption"><span id="pressingNote">Presión selectiva: un defensor</span><span id="possessionNote">Dorsal · posición · rasgo</span></div></div><div class="match-log" id="matchLog" aria-live="polite" aria-label="Subtítulos y acciones del partido">${renderLogs(m)}</div>${m.pendingInjury?`<div class="injury-alert">Lesión: ${h(m.pendingInjury.name)} no puede continuar. Puedes gastar una sustitución para seguir con once; si no, el partido continúa con diez.</div>${renderSubstitution(m,true)}`:''}${m.status==='HT'&&!m.pendingInjury?`<div class="half-panel"><h4>Descanso · ajustes y sustituciones</h4><p class="career-intro">Cambia el dibujo o el enfoque y utiliza hasta cinco sustituciones en el partido.</p><div class="tactic-controls"><label>Formación<select class="career-select" data-field="formation">${Object.keys(formations).map(x=>`<option${x===career.formation?' selected':''}>${x}</option>`).join('')}</select></label><label>Enfoque<select class="career-select" data-field="tactic"><option value="balanced"${career.tactic==='balanced'?' selected':''}>Equilibrado</option><option value="attack"${career.tactic==='attack'?' selected':''}>Ofensivo</option><option value="defense"${career.tactic==='defense'?' selected':''}>Bloque defensivo</option></select></label><label>Usadas<select class="career-select" disabled><option>${h(m.subsUsed)}/5</option></select></label></div>${renderSubstitution(m,false)}</div>`:''}${renderMatchSummary(m)}`}
function renderLogs(m){const logs=(m.events||[]).slice(-12);return logs.length?logs.map(x=>`<div class="log-item log-${h(x.kind||'info')}"><strong>${h(x.minute)}' · ${h(x.speaker||'Relato')}</strong> — ${h(x.text)}</div>`).join(''):'<div class="log-item"><strong>0\'</strong> — El balón espera el silbatazo. Las acciones importantes aparecerán aquí como subtítulos.</div>'}
function renderSubstitution(m,injury){const side=m.userSide,team=m.teams[side],lineup=team.lineup.map(id=>team.squad.find(p=>p.id===id)).filter(Boolean),bench=team.squad.filter(p=>!team.lineup.includes(p.id)&&(!career.injuries[p.id]||career.injuries[p.id].days<=0)),close=m.status==='HT'||injury||m.pendingInjury?'':`<button class="secondary-button" type="button" data-action="close-substitutions">Cerrar cambios</button>`;let controls='';if(m.subsUsed>=5)controls='<p class="career-intro">Límite de cinco sustituciones alcanzado; puedes continuar con los jugadores disponibles.</p>';else if(!bench.length)controls='<p class="career-intro">No hay suplentes disponibles.</p>';else if(injury||m.pendingInjury)controls=`<div class="substitution-controls"><label>Jugador de refresco<select class="career-select" id="subIn"><option value="">Selecciona</option>${bench.map(p=>`<option value="${h(p.id)}">${h(p.name)} · ${h(p.position)} · GRL ${h(p.ovr)}</option>`).join('')}</select></label><button class="primary-button" type="button" data-action="apply-sub" data-injury="true">Reemplazar lesionado</button></div>`;else controls=`<div class="substitution-controls"><label>Sale<select class="career-select" id="subOut"><option value="">Jugador en cancha</option>${lineup.map(p=>`<option value="${h(p.id)}">${h(p.number)} · ${h(p.name)} · ${h(p.position)}</option>`).join('')}</select></label><label>Entra<select class="career-select" id="subIn"><option value="">Suplente disponible</option>${bench.map(p=>`<option value="${h(p.id)}">${h(p.number)} · ${h(p.name)} · ${h(p.position)} · GRL ${h(p.ovr)}</option>`).join('')}</select></label><button class="primary-button" type="button" data-action="apply-sub">Confirmar cambio</button></div>`;return m.status==='HT'?controls:`<div class="half-panel live-substitution"><h4>Cambios · Partido detenido</h4>${controls}${close}</div>`}
function renderScheduledMatchTab(){const m=career.activeMatch,markup=renderMatchTab();if(m&&['1H','2H','HT'].includes(m.status))return markup;const template=document.createElement('template');template.innerHTML=markup;const opponent=expectedOpponent(),heading=template.content.querySelector('.match-header h3'),button=template.content.querySelector('[data-action="start-match"]');if(heading&&!opponent&&!career.friendlyMode)heading.textContent='Temporada completada';if(button){button.disabled=!opponent;button.textContent=!opponent?'Temporada completada':m?'Jugar siguiente partido':'Sacar desde el centro'}return template.innerHTML}
function renderCareerTab(tab){if(tab==='squad')return renderSquad();if(tab==='market')return renderMarket();if(tab==='table')return renderTable();if(tab==='calendar')return renderCalendar();return renderScheduledMatchTab()}
function renderMarket(){return `<div class="squad-toolbar"><div><h3>Mercado de agentes libres</h3><p class="career-intro">Futbolistas originales generados para este universo. Los CR son moneda ficticia de la partida; no tienen valor real.</p></div><div class="summary-box"><strong>${h(formatMoney(career.budget))}</strong><span>Presupuesto de fichajes (CR)</span></div></div>${career.squad.length>=25?'<p class="injury-alert">Plantilla máxima de 25 jugadores. Libera una plaza antes de fichar.</p>':''}<div class="market-grid">${career.market.map(p=>`<article class="market-card"><div class="player-card-head"><h4>${h(p.name)}</h4><strong>${h(p.ovr)} GRL</strong></div><p>${h(positionNames[p.position])} · ${h(p.age)} años · Potencial ${h(p.potential)}</p><p>Rasgo: ${h(traitText[p.trait]||'Versátil')}</p><p>Valor estimado: <strong>${h(formatMoney(p.value))}</strong></p><button class="small-button" type="button" data-action="sign-player" data-player="${h(p.id)}" ${career.budget<p.value||career.squad.length>=25?'disabled':''}>${career.budget<p.value?'Presupuesto insuficiente':career.squad.length>=25?'Plantilla completa':'Fichar'}</button></article>`).join('')||'<p class="career-intro">No quedan agentes libres en esta ventana. Los fichajes y saldos se guardan solo en esta partida.</p>'}</div>`}
function standingsRows(){const comp=career.friendlyMode?null:currentComp();if(!comp)return[];const rows=D.clubs.filter(t=>t.competitionId===career.competitionId).map(t=>{const x=career.standings[t.id]||{played:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};return{team:t,...x,gd:x.gf-x.ga}});rows.sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.team.name.localeCompare(b.team.name));return rows}
function renderTable(){if(career.friendlyMode)return '<div class="match-summary"><h4>Tabla no disponible</h4><p class="career-intro">La división tiene un roster parcial. Se permiten amistosos, pero no se inventan participantes para completar la clasificación.</p></div>';const rows=standingsRows();const match=career.activeMatch;return `<div class="section-heading"><div><h3>Clasificación de tu carrera</h3><div class="league-meta">Solo se actualizan los partidos que se han simulado en esta partida.</div></div><span class="coverage-pill">${h(rows.length)} equipos</span></div><div class="standings-wrap"><table class="standings"><thead><tr><th>#</th><th>Club</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>${rows.map((r,i)=>`<tr class="${r.team.id===career.clubId?'current':''}"><td class="pos">${i+1}</td><td>${h(r.team.name)}</td><td>${h(r.played)}</td><td>${h(r.w)}</td><td>${h(r.d)}</td><td>${h(r.l)}</td><td>${h(r.gf)}</td><td>${h(r.ga)}</td><td>${h(r.gd)}</td><td><strong>${h(r.pts)}</strong></td></tr>`).join('')}</tbody></table></div><div class="section-heading" style="margin-top:16px"><div><h3>Resultados recientes</h3></div></div><div class="result-list">${career.history.slice(-8).reverse().map(x=>`<div class="result-row"><span>J${h(x.matchday||'A')} · ${h(x.opponentName)} · ${x.home?'local':'visita'}</span><strong>${x.userGoals} : ${x.oppGoals}</strong></div>`).join('')||'<p class="career-intro">Aún no hay resultados; inicia un partido para actualizar tabla y resumen.</p>'}</div>${match?renderMatchSummary(match):''}`}
function renderCareer(){const root=$('careerRoot');if(!career){root.innerHTML=`<div class="panel-card empty-career"><div class="eyebrow" style="justify-content:center">Carrera local</div><h2>Ninguna carrera activa</h2><p>Elige un club y crea una plantilla ficticia para empezar. Si ya guardaste una partida en este navegador, puedes reanudarla aquí.</p>${renderSavedList()}<button class="primary-button" type="button" data-action="open-clubs">Elegir un club</button><p class="local-note">Los guardados viven en el almacenamiento local de este navegador; no se sincronizan con otros dispositivos.</p></div>`;return}const tabs=[['squad','Plantilla'],['match','Partido 2D'],['calendar','Calendario'],['market','Fichajes'],['table','Tabla y resumen']],tab=career.tab||'match';root.innerHTML=`<div class="career-shell">${careerHeader()}<nav class="career-tabs" aria-label="Gestión del club">${tabs.map(([id,label])=>`<button class="career-tab${tab===id?' active':''}" type="button" data-career-tab="${id}">${label}</button>`).join('')}</nav><section id="careerContent" class="career-content">${renderCareerTab(tab)}</section></div>`;if(career.activeMatch&&['1H','2H','HT'].includes(career.activeMatch.status)){const live=career.activeMatch;live.running=false;if(!live.pitch||!live.pitch.players?.length)rebuildPitch(live);renderPitchSvg(live)}}
function sideContrast(team){return contrast(team.club.c1||'#284b35')}
function coordsFor(form,side){const counts=formations[form]||formations['4-3-3'],rows=[['POR',12,1],['DEF',29,counts.DEF],['MED',50,counts.MED],['DEL',72,counts.DEL]],out=[];for(const [pos,x,count] of rows){for(let i=0;i<count;i++){const y=count===1?50:18+(64*(i/(count-1)));out.push({position:pos,x:side==='home'?x:100-x,y})}}return out}
function ensurePitch(m){if(!m.pitch)rebuildPitch(m)}
function rebuildPitch(m){
 const previous=m.pitch,positions={home:coordsFor(m.formation||career.formation,'home'),away:coordsFor(m.formation||career.formation,'away')},players=[];
 for(const side of ['home','away']){
  const team=m.teams[side],order=['POR','DEF','MED','DEL'];
  const ordered=team.lineup.map(id=>team.squad.find(p=>p.id===id)).filter(Boolean).sort((a,b)=>order.indexOf(a.position)-order.indexOf(b.position)||b.ovr-a.ovr);
  const slots=positions[side];
  ordered.forEach((p,i)=>{
   const slot=slots[i]||{position:p.position,x:50,y:20+((i*61)%80)},old=previous?.players?.find(x=>x.id===p.id);
   players.push({id:p.id,name:p.name,number:p.number,position:p.position,trait:p.trait,stats:p.stats,fitness:p.fitness,team:side,x:old?.x??slot.x,y:old?.y??slot.y,baseX:slot.x,baseY:slot.y,targetX:old?.targetX??slot.x,targetY:old?.targetY??slot.y,color:sideContrast(team),fill:team.club.c1,injured:!!p.injured});
  });
 }
 const ball=previous?.ball?{...previous.ball}:{x:50,y:50,ownerId:null},possession=previous?.possession||'home';
 let owner=players.find(p=>p.id===ball.ownerId&&!p.injured);
 if(!owner){
  delete ball.passTargetId;
  const available=players.filter(p=>p.team===possession&&p.position!=='POR');
  owner=available.reduce((best,p)=>!best||distance(p,ball)<distance(best,ball)?p:best,null);
  if(!owner)owner=players.find(p=>p.position!=='POR')||players[0];
  ball.ownerId=owner?.id||null;
 }
 if(ball.passTargetId&&!players.some(p=>p.id===ball.passTargetId))delete ball.passTargetId;
 m.pitch={players,ball,possession:owner?.team||possession,pressId:players.some(p=>p.id===previous?.pressId)?previous.pressId:null,coverId:players.some(p=>p.id===previous?.coverId)?previous.coverId:null,phaseCounter:previous?.phaseCounter||0};
 renderPitchSvg(m);
}
function renderPitchSvg(m){const layer=$('playerLayer');if(!layer)return;layer.innerHTML=m.pitch.players.map(p=>`<g id="pp-${h(p.id)}" class="pitch-player" transform="translate(${h(p.x*9)} ${h(p.y*5.2)})" aria-label="Dorsal ${h(p.number)}, posición ${h(p.position)}, ${h(p.name)}"><title>${h(p.name)} · ${h(positionNames[p.position])} · ${h(traitText[p.trait]||'Versátil')}</title><circle class="press-ring" r="18" style="display:${m.pitch.pressId===p.id?'block':'none'}"/><circle r="14" fill="${h(p.fill)}" stroke="#f4f1db" stroke-width="2"/><text class="pitch-number" y=".5" fill="${h(p.color)}">${h(p.number)}</text><text class="pitch-position" y="26">${h(p.position)}</text><g class="press-marker" style="display:${m.pitch.pressId===p.id?'block':'none'}"><circle cx="12" cy="-12" r="6"/><text class="press-marker-text" x="12" y="-12">P</text></g>${p.injured?'<text x="14" y="-14" style="font:800 11px sans-serif;fill:#ffb79f">×</text>':''}</g>`).join('');const b=$('ballLayer');if(b)b.setAttribute('transform',`translate(${m.pitch.ball.x*9} ${m.pitch.ball.y*5.2})`);showLiveScoreboard(m);if(substitutionOpen&&!document.getElementById('liveSubstitutionPanel')){const panel=document.createElement('div');panel.id='liveSubstitutionPanel';panel.innerHTML=renderSubstitution(m,false);$('matchLog')?.insertAdjacentElement('beforebegin',panel)}}
function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function moveToward(p,target,dt,boost=1){
 const dx=target.x-p.x,dy=target.y-p.y,d=Math.hypot(dx,dy);
 if(d<.015)return;
 const stats=p.stats||{},trait=(p.trait==='sprinter'?1.18:p.trait==='engine'?1.1:1)*boost;
 const energy=clamp(Number(p.fitness??90)/100,.45,1);
 const speed=(3.4+(Number(stats.velocidad)||58)*.045)*trait*energy;
 const step=Math.min(d,speed*Math.max(0,dt)/1000);
 p.x+=dx/d*step;
 p.y+=dy/d*step;
}
function launchPass(m,from,receiver){
 if(!from||!receiver||from.id===receiver.id)return false;
 m.pitch.ball.ownerId=from.id;
 m.pitch.ball.passTargetId=receiver.id;
 m.pitch.possession=from.team;
 return true;
}
function updateAI(m,dt){
  if(!m.pitch)return;
  const ps=m.pitch.players,ball=m.pitch.ball;
  if(ball.passTargetId){
    const target=ps.find(p=>p.id===ball.passTargetId);
    if(!target)delete ball.passTargetId;
    else{
      const nearestDefender=ps.filter(p=>p.team!==m.pitch.possession).reduce((best,p)=>!best||distance(p,ball)<distance(best,ball)?p:best,null);
      if(nearestDefender&&distance(nearestDefender,ball)<1.9&&distance(nearestDefender,ball)<distance(target,ball)){
        ball.ownerId=nearestDefender.id;
        m.pitch.possession=nearestDefender.team;
        delete ball.passTargetId;
        addEvent(m,m.minute,`${nearestDefender.name} intercepta el pase y recupera para ${m.teams[nearestDefender.team].club.name}.`,'Análisis',false,'tackle',nearestDefender.team);
      }else{
        const d=distance(ball,target),step=Math.min(d,(30+(Number(ps.find(p=>p.id===ball.ownerId)?.stats?.pase)||55)*.16)*Math.max(0,dt)/1000);
        if(d<=step+.1){
          ball.x=target.x;ball.y=target.y;ball.ownerId=target.id;delete ball.passTargetId;
        }else if(d>0){
          ball.x+=(target.x-ball.x)/d*step;
          ball.y+=(target.y-ball.y)/d*step;
        }
      }
    }
  }
  let owner=ps.find(p=>p.id===ball.ownerId);
  if(!owner){
    owner=ps.reduce((a,b)=>distance(a,ball)<distance(b,ball)?a:b,ps[0]);
    if(owner){ball.ownerId=owner.id;m.pitch.possession=owner.team}
  }
  if(!owner)return;
  const defend=owner.team==='home'?'away':'home',attackDir=owner.team==='home'?1:-1,defendDir=-attackDir;
  const defenders=ps.filter(p=>p.team===defend&&p.position!=='POR');
  const press=defenders.reduce((best,p)=>{
    const stats=p.stats||{},speed=stats.velocidad||58,reading=stats.anticipacion||58;
    const roleBonus=p.position==='MED'?1.08:p.position==='DEF'?1.03:.94;
    const score=distance(p,ball)/(1+speed/150+reading/220)*roleBonus;
    if(!best)return p;
    const bestStats=best.stats||{},bestBonus=best.position==='MED'?1.08:best.position==='DEF'?1.03:.94;
    const bestScore=distance(best,ball)/(1+(bestStats.velocidad||58)/150+(bestStats.anticipacion||58)/220)*bestBonus;
    return score<bestScore?p:best;
  },null);
  const coverTarget={x:clamp(ball.x+defendDir*9,8,92),y:clamp(50+(ball.y-50)*.42,16,84)};
  const cover=defenders.filter(p=>p.id!==press?.id).reduce((best,p)=>{
    const stats=p.stats||{},reading=stats.anticipacion||58,defense=stats.defensa||58;
    const score=distance(p,coverTarget)/(1+reading/260+defense/420);
    if(!best)return p;
    const bestStats=best.stats||{},bestScore=distance(best,coverTarget)/(1+(bestStats.anticipacion||58)/260+(bestStats.defensa||58)/420);
    return score<bestScore?p:best;
  },null);
  m.pitch.pressId=press?.id||null;
  m.pitch.coverId=cover?.id||null;
  const supports=ps.filter(p=>p.team===owner.team&&p.id!==owner.id&&p.position!=='POR').sort((a,b)=>{
    const score=p=>distance(p,ball)/(1+(p.stats?.vision||58)/260+(p.stats?.anticipacion||58)/500);
    return score(a)-score(b);
  }).slice(0,2);
  const supportIds=new Set(supports.map(p=>p.id));
  const userTactic=m.tactic||'balanced';
  for(const p of ps){
    const isGK=p.position==='POR',stats=p.stats||{},lane=p.baseY<50?-1:1;
    const ownBall=p.team===owner.team,teamDir=ownBall?attackDir:defendDir;
    const tactic=p.team===m.userSide?userTactic:'balanced';
    const width=clamp((p.baseY-50)*.18,-8,8);
    if(p.id===owner.id){
      const tacticRun=tactic==='attack'?1.5:tactic==='defense'?-1.5:0;
      const traitRun=p.trait==='poacher'?1.5:p.trait==='dribbler'?1:0;
      const carryDistance=clamp(2+(stats.velocidad||58)*.025+tacticRun+traitRun,2,7);
      p.targetX=clamp(ball.x+attackDir*carryDistance,8,92);
      p.targetY=clamp(ball.y+(p.trait==='dribbler'?Math.sin((m.minute||0)*.7)*5:0),8,92);
    }else if(p.id===press?.id){
      p.targetX=clamp(ball.x+defendDir*1.5,5,95);
      p.targetY=clamp(ball.y,8,92);
    }else if(p.id===cover?.id){
      p.targetX=coverTarget.x;
      p.targetY=coverTarget.y;
    }else if(isGK){
      const keeperDepth=p.team==='home'?8:92;
      const danger=clamp(1-Math.abs(ball.x-keeperDepth)/75,.05,.8);
      p.targetX=clamp(keeperDepth+(ball.x-(p.team==='home'?0:100))*.1,p.team==='home'?6:86,p.team==='home'?18:94);
      p.targetY=clamp(50+(ball.y-50)*(.2+danger*.12),32,68);
    }else if(ownBall&&p.position==='DEL'){
      const run=10+(stats.velocidad||58)*.08+(stats.ataque||58)*.04;
      const forwardX=ball.x+teamDir*run;
      const supporting=supportIds.has(p.id);
      const holdPosition=p.baseX+teamDir*clamp((ball.x-p.baseX)*.28,-12,16);
      p.targetX=clamp(supporting?forwardX:holdPosition,8,92);
      p.targetY=clamp(ball.y+lane*(supportIds.has(p.id)?11:18)+width*.35,7,93);
    }else if(ownBall&&p.position==='MED'){
      const vision=(stats.vision||58)/14,forward=supportIds.has(p.id)?vision+2:clamp((ball.x-p.baseX)*.18,-5,6);
      p.targetX=clamp(ball.x+teamDir*forward,8,92);
      p.targetY=clamp(ball.y+lane*(supportIds.has(p.id)?12:7)+width*.3,7,93);
    }else if(ownBall&&p.position==='DEF'){
      const overlap=tactic==='attack'&&(stats.velocidad||58)>68&&supportIds.has(p.id);
      const advance=overlap?9:tactic==='defense'?-4:1;
      p.targetX=clamp(p.baseX+(ball.x-50)*.16+teamDir*advance,8,92);
      p.targetY=clamp(p.baseY+(ball.y-p.baseY)*.15,7,93);
    }else{
      const compactness=clamp((stats.defensa||58)/100,.3,.95);
      const depth=p.position==='DEF'?9:p.position==='MED'?1:-8;
      const lineX=ball.x+defendDir*depth;
      const blockX=p.baseX*.42+lineX*.58;
      const pressForward=tactic==='attack'?5:tactic==='defense'?-4:0;
      p.targetX=clamp(blockX-defendDir*pressForward,8,92);
      p.targetY=clamp(50+(p.baseY-50)*(.72+compactness*.18)+(ball.y-50)*.12,7,93);
    }
    const traitBoost=p.trait==='anchor'&&!ownBall?1.08:1;
    moveToward(p,{x:p.targetX,y:p.targetY},dt,traitBoost);
  }
  if(!ball.passTargetId){
    ball.x=owner.x+attackDir*1.7;
    ball.y=owner.y+1.5;
  }
}
function paintPitch(m){if(!m||!m.pitch||!$('playerLayer'))return;const pressNote=$('pressingNote'),possNote=$('possessionNote');for(const p of m.pitch.players){const el=$('pp-'+p.id);if(el){el.setAttribute('transform',`translate(${(p.x*9).toFixed(2)} ${(p.y*5.2).toFixed(2)})`);const ring=el.querySelector('.press-ring'),marker=el.querySelector('.press-marker');if(ring)ring.style.display=m.pitch.pressId===p.id?'block':'none';if(marker)marker.style.display=m.pitch.pressId===p.id?'block':'none'}}const b=$('ballLayer');if(b)b.setAttribute('transform',`translate(${(m.pitch.ball.x*9).toFixed(1)} ${(m.pitch.ball.y*5.2).toFixed(1)})`);if(pressNote){const p=m.pitch.players.find(x=>x.id===m.pitch.pressId);pressNote.textContent=p?`Único presionador: #${h(p.number)} ${h(p.position)} · ${p.trait==='anticipator'?'anticipa':'cierra espacio'}`:'Presión selectiva activa'}if(possNote){const owner=m.pitch.players.find(x=>x.id===m.pitch.ball.ownerId);possNote.textContent=owner?`Balón: #${owner.number} ${owner.position} · ${traitText[owner.trait]||'versátil'}`:'Balón suelto'}}
function kickOff(career){const user=currentClub(),fixture=currentFixture(),opp=expectedOpponent();if(!opp){toast(career.friendlyMode?'No hay suficientes rivales en este grupo.':'La temporada terminó o no hay un partido programado.');return}const userHome=fixture?fixture.homeId===user.id:career.matchday%2===0,homeClub=userHome?user:opp,awayClub=userHome?opp:user;const userSquad=career.squad.map(p=>JSON.parse(JSON.stringify(p))),oppSquad=generateSquad(opp);const userXI=pickXI(userSquad,career.formation,career.injuries),oppXI=pickXI(oppSquad,'4-3-3',{});const matchSeq=Number(career.nextMatchSeq)||0;career.nextMatchSeq=matchSeq+1;const m={id:`match-${career.id}-${career.friendlyMode?'friendly':career.matchday}-${opp.id}-${matchSeq}`,minute:0,status:'1H',running:false,userSide:userHome?'home':'away',homeClub,awayClub,opponent:opp,goals:{home:0,away:0},formation:career.formation,tactic:career.tactic,subsUsed:0,events:[],stats:{shots:{user:0,opponent:0},target:{user:0,opponent:0},xg:{user:0,opponent:0},possession:{user:0,opponent:0}},teams:{home:userHome?{club:user,squad:userSquad,lineup:userXI}:{club:opp,squad:oppSquad,lineup:oppXI},away:userHome?{club:opp,squad:oppSquad,lineup:oppXI}:{club:user,squad:userSquad,lineup:userXI}},injuryNames:[],pendingInjury:null,randomState:hash(`${career.id}:${career.matchday}:${opp.id}:${matchSeq}`),minutesPlayed:{},finalized:false};career.activeMatch=m;rebuildPitch(m);addEvent(m,0,`Comienza el encuentro. ${user.name} juega ${userHome?'como local':'como visitante'}.`,'Relato',false);persist(true);renderCareer();}
function randomMatch(m){let x=m.randomState>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;m.randomState=x>>>0;return m.randomState/4294967296}
function addEvent(m,minute,text,speaker='Relato',speak=true,kind='info',side){const ev={minute,text,speaker,kind};if(side)ev.side=side;m.events.push(ev);if(m.events.length>80)m.events.shift();if(speak&&career.voice)narrate(`${speaker}: ${text}`)}
function narrate(text){if(!career?.voice||!speechReady)return;try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='es-MX';u.rate=.97;const voices=window.speechSynthesis.getVoices(),v=voices.find(x=>/^es-MX/i.test(x.lang))||voices.find(x=>/^es-ES/i.test(x.lang))||voices.find(x=>/^es/i.test(x.lang));if(v)u.voice=v;window.speechSynthesis.speak(u)}catch(_){}}
function playerForSide(m,side,role){const team=m.teams[side],onPitch=team.lineup.map(id=>team.squad.find(p=>p.id===id)).filter(Boolean);const pool=onPitch.filter(p=>p.position===role);return pick(pool.length?pool:onPitch,rngFrom(`${m.id}:${h(m.minute)}:${role}:${side}`))}
function setBallOwner(m,side){const team=m.teams[side],ids=team.lineup.map(id=>team.squad.find(p=>p.id===id)).filter(Boolean),pool=ids.filter(p=>p.position!=='POR'),candidates=pool.length?pool:ids,p=candidates.reduce((best,x)=>!best||distance(x,m.pitch.ball)<distance(best,m.pitch.ball)?x:best,null);if(p){m.pitch.ball.ownerId=p.id;delete m.pitch.ball.passTargetId;m.pitch.possession=side}}
function shotChance(m,side,shooter){const team=m.teams[side],eff=(p,v)=>Number(p.stats?.[v]||50)*clamp(Number(p.fitness||90)/100,.35,1),active=team.lineup.map(id=>team.squad.find(p=>p.id===id)).filter(Boolean);const atk=active.reduce((s,p)=>s+(eff(p,'ataque')+eff(p,'tiro')+eff(p,'velocidad'))/3,0)/(active.length||1);const defSide=side==='home'?'away':'home',defTeam=m.teams[defSide],defLine=defTeam.lineup.map(id=>defTeam.squad.find(p=>p.id===id)).filter(Boolean),def=defLine.reduce((s,p)=>s+(eff(p,'defensa')+eff(p,'entrada')+eff(p,'porteria'))/3,0)/(defLine.length||1);let chance=.28+(atk-def)/180;const formation=m.formation||career.formation;if(side===m.userSide){if(m.tactic==='attack')chance+=.045;if(m.tactic==='defense')chance-=.035;chance+=formation==='4-3-3'?.018:formation==='4-4-2'?.008:formation==='3-5-2'?.012:0}else{if(m.tactic==='defense')chance-=.035;if(m.tactic==='attack')chance+=.018;chance-=formation==='3-5-2'?.012:formation==='4-4-2'?.008:0}return clamp(chance+(eff(shooter||{stats:{}},'tiro')-65)/500,.13,.49)}
function recordInjury(m,side,p,reason='molestia'){
 if(!p||side===m.userSide&&m.pendingInjury)return false;
 const team=m.teams[side],days=reason==='golpe'?3+Math.floor(randomMatch(m)*7):8+Math.floor(randomMatch(m)*17);
 p.injured=true;
 const matchPlayer=team.squad.find(x=>x.id===p.id);
 if(matchPlayer)matchPlayer.injured=true;
 const idx=team.lineup.indexOf(p.id);
 if(idx>=0)team.lineup.splice(idx,1);
 if(side===m.userSide){
  career.injuries[p.id]={days,total:days,reason};
  const careerPlayer=career.squad.find(x=>x.id===p.id);
  if(careerPlayer)careerPlayer.injured=true;
  m.pendingInjury={playerId:p.id,name:p.name};
  m.injuryNames.push(`${p.name} (${days}d)`);
  const text=`${p.name} se lesiona (${reason}); el equipo continúa con diez hasta sustituirlo.`;
  addEvent(m,m.minute,text,'Análisis',true,'injury',side);
  showMatchAction(m,'injury',side,text);
 }else{
  const bench=team.squad.filter(x=>!team.lineup.includes(x.id)&&!x.injured&&x.position!=='POR');
  if(bench.length)team.lineup.push(pick(bench,rngFrom(`${m.id}:auto-sub:${h(m.minute)}`)).id);
  const text=`${p.name} se lesiona (${reason}) y deja el campo; ${team.club.name} realiza un cambio.`;
  addEvent(m,m.minute,text,'Relato',true,'injury',side);
  showMatchAction(m,'injury',side,text);
 }
 rebuildPitch(m);
 return true;
}
function injuryEvent(m){
 if(m.events.some(e=>e.minute===m.minute&&e.kind==='injury')||randomMatch(m)>.0024)return;
 const sides=m.pendingInjury?['home','away'].filter(side=>side!==m.userSide):['home','away'];
 const side=pick(sides,()=>randomMatch(m)),team=m.teams[side],line=team.lineup.map(id=>team.squad.find(p=>p.id===id)).filter(p=>p&&!p.injured);
 if(!line.length)return;
 const p=pick(line,()=>randomMatch(m)),reason=randomMatch(m)<.25?'molestia muscular':'golpe';
 recordInjury(m,side,p,reason);
}
function applyPlayingCost(m){if(!m.minutesPlayed)m.minutesPlayed={};for(const side of ['home','away']){const team=m.teams[side];for(const id of team.lineup){const p=team.squad.find(x=>x.id===id);if(!p)continue;const resistance=Number(p.stats?.resistencia||60),tactic=side===m.userSide?m.tactic:'balanced',pressure=tactic==='attack'?.055:tactic==='defense'?-.012:0,cost=Math.max(.035,.085+(100-resistance)*.00075+pressure);p.fitness=clamp(Number(p.fitness??90)-cost,35,100);m.minutesPlayed[id]=(m.minutesPlayed[id]||0)+1}}}
function showGoalCelebration(m,side,scorer){
 const pitch=$('matchPitch')?.closest('.pitch-wrap');
 if(!pitch)return;
 let overlay=pitch.querySelector('.goal-celebration');
 if(!overlay){
  overlay=document.createElement('div');
  overlay.className='goal-celebration';
  overlay.setAttribute('role','status');
  overlay.setAttribute('aria-live','assertive');
  pitch.append(overlay);
 }
 const score=`${m.goals.home} – ${m.goals.away}`,team=m.teams[side];
 overlay.className=`goal-celebration goal-${side}`;
 overlay.style.setProperty('--goal-accent',team.club.c1||'#ffd166');
 overlay.innerHTML=`<span class="goal-team-label">${side==='home'?'LOCAL':'VISITANTE'} · ${h(team.club.name)}</span><strong>¡GOOOL!</strong><span>${h(scorer.name)}</span><b>${h(score)}</b>`;
 overlay.classList.remove('is-visible');
 void overlay.offsetWidth;
 overlay.classList.add('is-visible');
 const scoreElement=document.querySelector('.match-score');
 if(scoreElement){
  scoreElement.classList.remove('goal-pulse');
  void scoreElement.offsetWidth;
  scoreElement.classList.add('goal-pulse');
 }
 clearTimeout(goalCelebrationTimer);
 goalCelebrationTimer=setTimeout(()=>{
  overlay.remove();
  scoreElement?.classList.remove('goal-pulse');
  goalCelebrationTimer=null;
 },2900);
}
function showMatchAction(m,kind,side,text){
 const pitch=$('matchPitch')?.closest('.pitch-wrap');
 if(!pitch)return;
 let overlay=pitch.querySelector('.match-action-flash');
 if(!overlay){
  overlay=document.createElement('div');
  overlay.className='match-action-flash';
  overlay.setAttribute('role','status');
  overlay.setAttribute('aria-live','polite');
  pitch.append(overlay);
 }
 const labels={foul:'FALTA',freekick:'TIRO LIBRE',corner:'CÓRNER',substitution:'CAMBIO',injury:'LESIÓN',card:'TARJETA AMARILLA',throwin:'SAQUE DE BANDA',goalKick:'SAQUE DE META',offside:'FUERA DE JUEGO'};
 overlay.className=`match-action-flash action-${kind} action-${side}`;
 overlay.style.setProperty('--action-accent',m.teams[side]?.club.c1||'#ffd166');
 overlay.innerHTML=`<strong>${labels[kind]||'ACCIÓN'}</strong><span>${h(text)}</span>`;
 overlay.classList.remove('is-visible');
 void overlay.offsetWidth;
 overlay.classList.add('is-visible');
 clearTimeout(matchActionTimer);
 matchActionTimer=setTimeout(()=>{overlay.remove();matchActionTimer=null},2200);
}
function showLiveScoreboard(m){
 const header=document.querySelector('.match-header');
 if(!header)return;
 let board=header.querySelector('.live-scoreboard');
 if(!board){
  header.classList.add('has-live-scoreboard');
  board=document.createElement('div');
  board.className='live-scoreboard';
  board.setAttribute('aria-label','Marcador del partido');
  board.setAttribute('role','status');
  board.setAttribute('aria-live','polite');
  const home=m.teams.home.club,away=m.teams.away.club;
  board.innerHTML=`<div class="score-team score-home" style="--team-accent:${h(home.c1)}"><span>LOCAL</span><strong>${h(home.name)}</strong></div><div class="score-center"><span class="score-clock" data-score-clock></span><strong><i data-score-home></i><b>:</b><i data-score-away></i></strong><span class="score-state" data-score-state></span></div><div class="score-team score-away" style="--team-accent:${h(away.c1)}"><span>VISITANTE</span><strong>${h(away.name)}</strong></div>`;
  const heading=header.querySelector('h3');
  (heading?.parentElement||header).insertBefore(board,heading||null);
 }
 board.querySelector('[data-score-home]').textContent=m.goals.home;
 board.querySelector('[data-score-away]').textContent=m.goals.away;
 board.querySelector('[data-score-clock]').textContent=`${m.minute}'`;
 board.querySelector('[data-score-state]').textContent=m.running?'EN JUEGO':m.status==='HT'?'DESCANSO':'PAUSADO';
}
function awardCorner(m,side){
 const x=side==='home'?90:10,y=m.pitch.ball.y<50?4:96;
 setBallOwner(m,side);
 const taker=m.pitch.players.find(p=>p.id===m.pitch.ball.ownerId);
 if(taker){taker.x=x;taker.y=y;taker.targetX=x;taker.targetY=y}
 m.pitch.ball.x=x;m.pitch.ball.y=y;
 const text=`Córner para ${m.teams[side].club.name}. El equipo se prepara para el saque de esquina.`;
 addEvent(m,m.minute,text,'Relato',true,'corner',side);
 showMatchAction(m,'corner',side,text);
}
function awardThrowIn(m,side){
 m.pitch.ball.y=m.pitch.ball.y<50?2:98;
 setBallOwner(m,side);
 const player=m.pitch.players.find(p=>p.id===m.pitch.ball.ownerId);
 const text=`Saque de banda para ${m.teams[side].club.name}. ${player?.name||'El equipo'} pone el balón en juego.`;
 addEvent(m,m.minute,text,'Relato',true,'throwin',side);
 showMatchAction(m,'throwin',side,text);
}
function awardGoalKick(m,side){
 m.pitch.ball.x=side==='home'?7:93;
 m.pitch.ball.y=50;
 setBallOwner(m,side);
 const text=`Saque de meta para ${m.teams[side].club.name}.`;
 addEvent(m,m.minute,text,'Relato',true,'goalKick',side);
 showMatchAction(m,'goalKick',side,text);
}
function attemptDirectFreeKick(m,side){
 const closeToGoal=side==='home'?m.pitch.ball.x>70:m.pitch.ball.x<30;
 if(!closeToGoal||randomMatch(m)>.22)return;
 const kicker=m.pitch.players.find(p=>p.id===m.pitch.ball.ownerId);
 if(!kicker)return;
 const label=side===m.userSide?'user':'opponent';
 m.stats.shots[label]++;
 const onTarget=randomMatch(m)<clamp(.3+(kicker.stats.tiro-60)/220,.16,.58);
 if(onTarget)m.stats.target[label]++;
 m.stats.xg[label]+=clamp(.07+(kicker.stats.tiro/100)*.22,.07,.35);
 if(onTarget&&randomMatch(m)<shotChance(m,side,kicker)){
  m.goals[side]++;
  const text=`¡Gol de tiro libre! ${kicker.name} convierte para ${m.teams[side].club.name}.`;
  addEvent(m,m.minute,text,'Relato',true,'goal',side);
  showGoalCelebration(m,side,kicker);
  m.pitch.ball.x=50;m.pitch.ball.y=50;
  setBallOwner(m,side==='home'?'away':'home');
 }else{
  const text=`${kicker.name} ejecuta el tiro libre${onTarget?'; el portero responde.':', pero el balón no encuentra portería.'}`;
  addEvent(m,m.minute,text,'Relato',true,'shot',side);
  if(onTarget){if(randomMatch(m)<.22)awardCorner(m,side);else setBallOwner(m,side==='home'?'away':'home')}
  else awardGoalKick(m,side==='home'?'away':'home');
 }
}
function minuteEngine(m){
 applyPlayingCost(m);
 const roll=randomMatch(m),side=m.pitch.possession||'home';
 m.stats.possession[side===m.userSide?'user':'opponent']+=1;
 const team=m.teams[side],owner=m.pitch.players.find(p=>p.id===m.pitch.ball.ownerId);
 if(m.pitch.ball.passTargetId){if(!m.injuryNames.length||m.injuryNames.length<2)injuryEvent(m);return}
 if(roll<.055){
  const defender=playerForSide(m,side==='home'?'away':'home','DEF');
  const text=`Falta de ${defender?.name||'un defensor'} sobre ${owner?.name||'el atacante'}. Tiro libre para ${team.club.name}.`;
  const x=m.pitch.ball.x,y=m.pitch.ball.y;
  setBallOwner(m,side);
  const taker=m.pitch.players.find(p=>p.id===m.pitch.ball.ownerId);
  if(taker){taker.x=x;taker.y=y;taker.targetX=x;taker.targetY=y}
  m.pitch.ball.x=x;m.pitch.ball.y=y;
  addEvent(m,m.minute,text,'Relato',true,'foul',side);
  showMatchAction(m,'foul',side,text);
  if(defender&&randomMatch(m)<.14){
   const cardText=`Tarjeta amarilla para ${defender.name} por la entrada.`;
   addEvent(m,m.minute,cardText,'Árbitro',true,'card',defender.team);
   showMatchAction(m,'card',defender.team,cardText);
  }
  if(owner&&randomMatch(m)<.04)recordInjury(m,side,owner,randomMatch(m)<.65?'golpe':'lesión por contacto');
  const sector=(side==='home'?m.pitch.ball.x>68:m.pitch.ball.x<32)?'cerca del área':(side==='home'?m.pitch.ball.x>50:m.pitch.ball.x<50)?'campo rival':'campo propio';
  addEvent(m,m.minute,`Tiro libre para ${team.club.name} desde ${sector}.`,'Árbitro',false,'freekick',side);
  showMatchAction(m,'freekick',side,text);
  attemptDirectFreeKick(m,side);
 }else if(roll<.085&&(side==='home'?m.pitch.ball.x>65:m.pitch.ball.x<35)&&(m.pitch.ball.y<25||m.pitch.ball.y>75)){
  awardCorner(m,side);
 }else if(roll<.11&&Math.abs(m.pitch.ball.y-50)>34){
  awardThrowIn(m,side==='home'?'away':'home');
 }else if(roll<.11){
  const shooter=playerForSide(m,side,randomMatch(m)<.66?'DEL':'MED');
  if(shooter){
   const label=side===m.userSide?'user':'opponent';
   m.stats.shots[label]++;
   const onTarget=randomMatch(m)<clamp(.52+(shooter.stats.tiro-60)/180,.28,.82);
   if(onTarget)m.stats.target[label]++;
   const xg=clamp(.08+(shooter.stats.tiro/100)*.3+(shooter.stats.ataque/100)*.2,.08,.48);
   m.stats.xg[label]+=xg;
   const goal=onTarget&&randomMatch(m)<shotChance(m,side,shooter);
   if(goal){
    m.goals[side]++;
    addEvent(m,m.minute,`¡Gol de ${shooter.name}! ${team.club.name} convierte la ocasión.`,'Relato',true,'goal',side);
    showGoalCelebration(m,side,shooter);
    m.pitch.ball.x=50;
    m.pitch.ball.y=50;
    setBallOwner(m,side==='home'?'away':'home');
   }else{
    const inAttackingThird=side==='home'?m.pitch.ball.x>65:m.pitch.ball.x<35;
    if(onTarget){
     const text=`${shooter.name} prueba desde zona de remate; el portero responde.`;
     addEvent(m,m.minute,text,'Análisis',true,'shot',side);
     if(inAttackingThird&&randomMatch(m)<.22)awardCorner(m,side);
     else setBallOwner(m,side==='home'?'away':'home');
    }else{
     const text=`${shooter.name} busca el arco, pero el disparo se va desviado.`;
     addEvent(m,m.minute,text,'Relato',true,'shot',side);
     if(inAttackingThird&&randomMatch(m)<.13)awardCorner(m,side);
     else awardGoalKick(m,side==='home'?'away':'home');
    }
   }
  }
 }else if(roll<.31){
  const other=side==='home'?'away':'home';
  if(randomMatch(m)<.34){
   setBallOwner(m,other);
   const recovered=m.pitch.players.find(p=>p.id===m.pitch.ball.ownerId);
   const text=`${recovered?.name||'El rival'} recupera el balón y sale en transición.`;
   addEvent(m,m.minute,text,'Análisis',false,'tackle',other);
  }else{
   const candidates=m.pitch.players.filter(p=>p.team===side&&p.id!==owner?.id&&p.position!=='POR');
   const dir=side==='home'?1:-1;
   candidates.sort((a,b)=>{
    const score=p=>distance(p,m.pitch.ball)*.8-(p.x-m.pitch.ball.x)*dir*.22-(Number(p.stats?.vision)||55)*.025;
    return score(a)-score(b);
   });
   const receiver=pick(candidates.slice(0,Math.min(4,candidates.length)),()=>randomMatch(m));
   const defenders=m.pitch.players.filter(p=>p.team!==side&&p.position==='DEF');
   const lastDefender=defenders.reduce((best,p)=>!best||(side==='home'?p.x>best.x:p.x<best.x)?p:best,null);
   const offside=owner&&receiver&&lastDefender&&(side==='home'?receiver.x>lastDefender.x+2&&receiver.x>50:receiver.x<lastDefender.x-2&&receiver.x<50);
   if(offside&&randomMatch(m)<.08){
    m.pitch.ball.x=receiver.x;m.pitch.ball.y=receiver.y;
    setBallOwner(m,other);
    const text=`Fuera de juego de ${receiver.name}. Balón para ${m.teams[other].club.name}.`;
    addEvent(m,m.minute,text,'Árbitro',true,'offside',other);
    showMatchAction(m,'offside',other,text);
   }else if(owner&&receiver&&launchPass(m,owner,receiver)){
    if(m.minute%4===0||m.minute%5===0)addEvent(m,m.minute,`${owner.name} filtra el pase hacia ${receiver.name}.`,'Análisis',false,'pass',side);
   }
  }
 }else if(owner&&m.minute%6===0){
  addEvent(m,m.minute,`${owner.name} conduce y espera una opción de pase.`,'Análisis',false);
 }
 if(!m.injuryNames.length||m.injuryNames.length<2)injuryEvent(m);
}
function recoverDays(days){for(const [id,x] of Object.entries(career.injuries||{})){x.days=Math.max(0,x.days-days);if(x.days===0){delete career.injuries[id];const player=career.squad.find(p=>p.id===id);if(player)player.injured=false;const m=career.activeMatch;if(m?.events)addEvent(m,m.minute||0,`${player?.name||'Un jugador'} ya está disponible tras recuperarse.`,'Análisis',false)}}const recovery=Math.min(2,1.25*days);for(const p of career.squad)p.fitness=clamp(Number(p.fitness||90)+recovery,45,100);career.calendarDay=(career.calendarDay||1)+days}
function updateTableAfterMatch(m){if(career.friendlyMode)return;const fixture=currentFixture();if(!fixture){toast('No se pudo encontrar el partido de esta jornada en el calendario.');return}fixture.homeGoals=m.goals.home;fixture.awayGoals=m.goals.away;for(const scheduled of career.fixtures)if(scheduled.matchday===fixture.matchday&&scheduled.homeGoals===null)Object.assign(scheduled,simulatedFixtureScore(career,scheduled));syncStandingsFromFixtures(career);career.calendarRound=Math.min(fixture.matchday+1,seasonRoundCount(career.competitionId))}
function finishMatch(m){if(!m)return false;const matchId=String(m.matchId||m.id||'');if(!matchId)return false;career.processedMatchIds=Array.isArray(career.processedMatchIds)?career.processedMatchIds:[];if(career.processedMatchIds.includes(matchId)||career.history.some(x=>x.matchId===matchId)){if(!career.processedMatchIds.includes(matchId)){career.processedMatchIds.push(matchId);if(career.processedMatchIds.length>200)career.processedMatchIds=career.processedMatchIds.slice(-200)}const needsRecovery=m.status!=='FT'||!m.finalized;m.finalized=true;m.status='FT';m.running=false;if(needsRecovery){persist(true);stopTimer();renderCareer()}return false}const u=m.userSide,opp=u==='home'?'away':'home',userGoals=m.goals[u],oppGoals=m.goals[opp],userHome=u==='home';const summary={matchId,matchday:career.friendlyMode?'A':career.matchday+1,opponentId:m.opponent.id,opponentName:m.opponent.name,userGoals,oppGoals,home:userHome,dateDay:career.calendarDay,shotsUser:m.stats.shots.user,shotsOpp:m.stats.shots.opponent};if(!career.history.some(x=>x.matchId===matchId)){career.history.push(summary);if(career.history.length>40)career.history.shift()}updateTableAfterMatch(m);const userTeam=m.teams[u];for(const p of userTeam.squad){const canonical=career.squad.find(x=>x.id===p.id);if(canonical){canonical.fitness=clamp(Number(p.fitness??canonical.fitness),35,100);canonical.injured=!!career.injuries[p.id]}}recoverDays(7);if(!career.friendlyMode)career.matchday++;m.finalized=true;m.status='FT';m.running=false;m.finishedAt=new Date().toISOString();career.processedMatchIds.push(matchId);if(career.processedMatchIds.length>200)career.processedMatchIds=career.processedMatchIds.slice(-200);addEvent(m,90,'Final del partido. El marcador, la tabla y el historial se guardaron.','Relato',false);persist(true);stopTimer();renderCareer();return true}
function tickMinute(){if(!career?.activeMatch)return;const m=career.activeMatch;if(!m.running)return;m.minute=Math.min(90,m.minute+1);minuteEngine(m);if(m.minute===45){m.status='HT';m.running=false;stopTimer();addEvent(m,45,'Descanso. Puedes cambiar táctica y hacer sustituciones.','Relato');persist(true);renderCareer();return}if(m.minute>=90){finishMatch(m);return}persist(true);const clock=$('matchClock');if(clock)clock.textContent=`${h(m.minute)}' · EN JUEGO`;const score=document.querySelector('.match-score');if(score)score.textContent=`${h(m.goals.home)} : ${h(m.goals.away)}`;const log=$('matchLog');if(log)log.innerHTML=renderLogs(m);showLiveScoreboard(m)}
function stopTimer(){if(liveTimer){clearInterval(liveTimer);liveTimer=null}if(raf){cancelAnimationFrame(raf);raf=0}if(career?.activeMatch)career.activeMatch.running=false}
function startAnimation(){if(raf)return;lastFrame=0;aiElapsed=0;const frame=time=>{if(!career?.activeMatch?.running){raf=0;return}if(!lastFrame)lastFrame=time;const dt=Math.min(80,time-lastFrame);lastFrame=time;aiElapsed+=dt;if(aiElapsed>=50){updateAI(career.activeMatch,aiElapsed*(Number(career.gameSpeed)||2)/2);aiElapsed=0}paintPitch(career.activeMatch);raf=requestAnimationFrame(frame)};raf=requestAnimationFrame(frame)}
function startTimer(){const m=career?.activeMatch;if(!m||!['1H','2H'].includes(m.status))return;m.running=true;persist(true);stopTimer();m.running=true;const interval=Math.round(1500/Math.max(1,career.gameSpeed||2));liveTimer=setInterval(tickMinute,interval);startAnimation();updateMatchButtons()}
function updateMatchButtons(){const root=$('careerContent');if(!root)return;const m=career?.activeMatch;if(!m)return;const log=$('matchLog');if(log)log.innerHTML=renderLogs(m);const clock=$('matchClock');if(clock)clock.textContent=`${h(m.minute)}' · ${m.running?'EN JUEGO':'PAUSADO'}`;const actions=$('liveMatchActions');if(actions)actions.innerHTML=matchActions(m)+`<button class="secondary-button" type="button" data-action="voice-toggle">${career.voice?'Voz activada':'Voz apagada'}</button>`;const press=$('pressingNote');if(press)paintPitch(m);showLiveScoreboard(m)}
function pauseMatch(){if(!career?.activeMatch)return;career.activeMatch.running=false;stopTimer();persist(true);renderCareer();toast('Partido pausado y guardado.')}
function resumeMatch(){const m=career?.activeMatch;if(!m)return;if(m.status==='HT'){toast('Haz los ajustes del descanso antes de volver.');return}startTimer()}
function openSubstitutions(){const m=career?.activeMatch;if(!m||!['1H','2H'].includes(m.status)||m.pendingInjury){toast('Resuelve primero la lesión pendiente.');return}if(m.running){m.running=false;stopTimer()}substitutionOpen=true;persist(true);renderCareer()}
function closeSubstitutions(){substitutionOpen=false;renderCareer()}
function continueSecondHalf(){const m=career?.activeMatch;if(!m||m.status!=='HT')return;m.status='2H';m.tactic=career.tactic;m.formation=career.formation;rebuildPitch(m);addEvent(m,45,'Empieza el segundo tiempo con los ajustes del cuerpo técnico.','Relato');persist(true);renderCareer();startTimer()}
function applyFormationOrTactic(field,value){
 if(!career)return;
 if(field==='speed'){
  career.gameSpeed=clamp(Number(value)||2,1,4);
  const m=career.activeMatch,wasRunning=!!m?.running;
  if(wasRunning){
   stopTimer();
   m.running=true;
   liveTimer=setInterval(tickMinute,Math.round(1500/career.gameSpeed));
   startAnimation();
   updateMatchButtons();
  }
  persist(true);
  return;
 }
 if(field==='formation'&&formations[value]){
  career.formation=value;
  if(career.activeMatch&&career.activeMatch.status==='HT'){
   career.activeMatch.formation=value;
   rebuildPitch(career.activeMatch);
  }
 }
 if(field==='tactic'&&['balanced','attack','defense'].includes(value)){
  career.tactic=value;
  if(career.activeMatch&&career.activeMatch.status==='HT')career.activeMatch.tactic=value;
 }
 persist(true);
 renderCareer();
}
function applySubstitution(injury){
 const m=career?.activeMatch;
 if(!m)return;
 const inId=$('subIn')?.value;
 if(!inId){toast('Elige un suplente disponible.');return}
 const side=m.userSide,team=m.teams[side],incoming=team.squad.find(p=>p.id===inId);
 if(!incoming||team.lineup.includes(inId)){toast('Ese jugador no está disponible.');return}
 if(m.subsUsed>=5){toast('Ya usaste las cinco sustituciones.');return}
 let outgoingName=injury?m.pendingInjury?.name||'Jugador lesionado':'';
 if(injury&&m.pendingInjury){
  team.lineup.push(inId);
  incoming.injured=false;
  m.pendingInjury=null;
 }else{
  const outId=$('subOut')?.value;
  if(!outId){toast('Elige quién sale.');return}
  const idx=team.lineup.indexOf(outId);
  if(idx<0){toast('El jugador seleccionado no está en cancha.');return}
  outgoingName=team.squad.find(p=>p.id===outId)?.name||'Jugador';
  team.lineup[idx]=inId;
 }
 m.subsUsed++;
 incoming.fitness=clamp(Number(incoming.fitness??90),35,100);
 rebuildPitch(m);
 const text=`Sale ${outgoingName}; entra ${incoming.name} (${h(m.subsUsed)}/5).`;
 addEvent(m,m.minute,text,'Análisis',true,'substitution',side);
 substitutionOpen=false;
 persist(true);
 renderCareer();
 showMatchAction(m,'substitution',side,text);
 const entering=$('pp-'+incoming.id);
 if(entering){
  entering.classList.add('substitution-enter');
  setTimeout(()=>entering.classList.remove('substitution-enter'),900);
 }
 toast('Sustitución guardada.');
}
function restThreeDays(){if(!career)return;recoverDays(3);persist(true);renderCareer();toast('Tres días de recuperación simulados.')}
function addTeamPlayer(p){const originId=playerOrigin(p);if(career.squad.some(x=>playerOrigin(x)===originId)||(career.acquiredMarketIds||[]).includes(originId)){career.market=career.market.filter(x=>playerOrigin(x)!==originId);persist(true);renderCareer();toast('Este jugador ya fue fichado; se retiró la oferta repetida.');return}if(career.squad.length>=25){toast('La plantilla ya tiene 25 jugadores.');return}if(career.budget<p.value){toast('Saldo ficticio insuficiente para ese fichaje.');return}career.budget-=p.value;const copy=JSON.parse(JSON.stringify(p));copy.market=false;copy.originId=originId;career.acquiredMarketIds=[...(career.acquiredMarketIds||[]),originId];const usedIds=new Set([...career.squad,...career.market].map(x=>x.id));let suffix=0,candidate;do{candidate=`${career.clubId}-signed-${Date.now().toString(36)}-${suffix++}`}while(usedIds.has(candidate));copy.id=candidate;copy.number=Math.max(1,...career.squad.map(x=>x.number))+1;career.squad.push(copy);career.market=career.market.filter(x=>playerOrigin(x)!==originId);persist(true);renderCareer();toast(`${p.name} fichado por ${h(formatMoney(p.value))}.`)}
function newMarketMatch(){const old=career.activeMatch;if(old&&old.status!=='FT'){toast('Termina o pausa la partida actual antes de iniciar otro encuentro.');return}kickOff(career);startTimer()}
function nextMatch(){if(career.activeMatch&&career.activeMatch.status!=='FT')return;career.activeMatch=null;persist(true);renderCareer()}
function createSaveFile(){if(!career)return;const payload={app:'Cancha Libre',version:3,exportedAt:new Date().toISOString(),career};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`cancha-libre-${career.clubId}.json`;a.click();URL.revokeObjectURL(url);toast('Respaldo JSON descargado en tu dispositivo.')}
function importSaveFile(file){if(!file)return;if(!Number.isSafeInteger(file.size)||file.size>2*1024*1024){toast('No se pudo importar: el respaldo supera el límite de 2 MB.');return}const reader=new FileReader();reader.onerror=()=>toast('No se pudo leer el archivo de respaldo.');reader.onload=()=>{let oldState=null,oldCareer=null;try{const raw=String(reader.result);if(raw.length>2*1024*1024)throw new Error('Archivo demasiado grande.');const data=JSON.parse(raw);if(!hasKeys(data,['app','version','exportedAt','career'])||data.app!=='Cancha Libre'||data.version!==3||!validTimestamp(data.exportedAt)||!validCareer(data.career))throw new Error('Archivo no compatible o con campos inválidos.');const c=sanitizeCareer(data.career);oldState=saveState;oldCareer=career;const careers={...saveState.careers,[c.id]:c};if(Object.keys(careers).length>D.clubs.length)throw new Error('Demasiadas carreras.');saveState={version:3,activeId:c.id,careers};career=c;if(!persist(true))throw new Error('No se pudo guardar la carrera importada.');setView('career');toast('Partida importada y guardada localmente.')}catch(_){if(oldState){saveState=oldState;career=oldCareer}toast('No se pudo importar: el archivo no es un respaldo válido de Cancha Libre.')}};reader.readAsText(file)}
function deleteCurrentCareer(){if(!career)return;if(!window.confirm('¿Borrar esta carrera guardada de este navegador? Esta acción no se puede deshacer.'))return;stopTimer();delete saveState.careers[career.id];saveState.activeId=Object.keys(saveState.careers)[0]||null;career=saveState.careers[saveState.activeId]||null;try{localStorage.setItem(SAVE_KEY,JSON.stringify(saveState))}catch(_){}renderCareer();updateResumeBanner();toast('Carrera borrada de este navegador.')}
function handleGlobalAction(e){const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;if(a==='start-career'){if(selectedClub)newCareer(selectedClub)}else if(a==='resume-career'){if(career)setView('career')}else if(a==='continue-specific'){const x=saveState.careers[b.dataset.career];if(x){career=x;saveState.activeId=x.id;persist(true);setView('career')}}else if(a==='open-clubs'){setView('clubs')}else if(a==='export-save')createSaveFile();else if(a==='import-save')$('importFile')?.click();else if(a==='delete-career')deleteCurrentCareer();else if(a==='start-match')newMarketMatch();else if(a==='resume-match')resumeMatch();else if(a==='pause-match')pauseMatch();else if(a==='open-substitutions')openSubstitutions();else if(a==='close-substitutions')closeSubstitutions();else if(a==='second-half')continueSecondHalf();else if(a==='next-match')nextMatch();else if(a==='apply-sub')applySubstitution(b.dataset.injury==='true');else if(a==='rest-days')restThreeDays();else if(a==='voice-toggle'){if(!speechReady){toast('La voz del navegador no está disponible; los subtítulos siguen activos.');return}career.voice=!career.voice;if(!career.voice)window.speechSynthesis.cancel();persist(true);renderCareer();toast(career.voice?'Narración activada.':'Narración apagada.')}else if(a==='sign-player'){const p=career.market.find(x=>x.id===b.dataset.player);if(p)addTeamPlayer(p)}}
$('careerRoot').addEventListener('click',e=>{const tab=e.target.closest('[data-career-tab]');if(tab&&career){career.tab=tab.dataset.careerTab;persist(true);renderCareer();return}handleGlobalAction(e)});
$('careerRoot').addEventListener('change',e=>{const field=e.target.dataset.field;if(field==='calendar-round'&&career){career.calendarRound=clamp(Number(e.target.value)||1,1,seasonRoundCount(career.competitionId));career.tab='calendar';persist(true);renderCareer();return}if(field)applyFormationOrTactic(field,e.target.value);if(e.target.id==='importFile'&&e.target.files?.[0])importSaveFile(e.target.files[0])});
$('careerRoot').addEventListener('keydown',e=>{if(e.key==='Escape'&&career?.activeMatch?.running)pauseMatch()});
function pauseForBackground(){if(career?.activeMatch?.running){career.activeMatch.running=false;stopTimer();persist(true)}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseForBackground()});window.addEventListener('pagehide',()=>{if(career){if(career.activeMatch)career.activeMatch.running=false;stopTimer();persist(true)}});
$('statParticipations').textContent=D.clubs.length.toLocaleString('es-MX');$('statComps').textContent=D.competitions.length.toLocaleString('es-MX');countryOptions();leagueOptions();renderClubList();renderClubPanel();updateResumeBanner();renderCareer();renderEvidence();
 $('graphicsFromClub').disabled=!selectedClub;
 window.CANCHA_GRAPHICS.load().then(()=>{refreshClubLogos();renderEvidence()}).catch(error=>toast(`No se pudo acceder al almacenamiento de escudos: ${error.message}`));
})();
