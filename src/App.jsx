import { useState, useEffect, useCallback } from "react";

const ITEMS = [
{ id:'d1',  name:'Passports x4',                          category:'Documents',              note:'Check all expire after Nov 2025' },
{ id:'d2',  name:'ESTA visa waivers x4',                  category:'Documents',              note:'Apply online before travel' },
{ id:'d3',  name:'Travel insurance documents',            category:'Documents',              note:'Print and save to phone' },
{ id:'d4',  name:'Flight booking confirmations',          category:'Documents',              note:'' },
{ id:'d5',  name:'Accommodation confirmations',           category:'Documents',              note:'' },
{ id:'d6',  name:'Car hire booking',                      category:'Documents',              note:'Bring driving licence too' },
{ id:'d7',  name:'Driving licence (both adults)',         category:'Documents',              note:'Ireland licence valid in USA' },
{ id:'d8',  name:'European Health Insurance Cards',       category:'Documents',              note:'Backup to travel insurance' },
{ id:'d9',  name:'Emergency contact card',                category:'Documents',              note:'Keep separate from passports' },
{ id:'ac1', name:'T-shirts x10 (5 each)',                 category:'Adults - Clothing',      note:'Tucson averages 35C+ in summer' },
{ id:'ac2', name:'Shorts x6 (3 each)',                    category:'Adults - Clothing',      note:'' },
{ id:'ac3', name:'Light trousers x2',                     category:'Adults - Clothing',      note:'For restaurants and cooler evenings' },
{ id:'ac4', name:'Underwear x14 (7 each)',                category:'Adults - Clothing',      note:'' },
{ id:'ac5', name:'Socks x14 (7 each)',                    category:'Adults - Clothing',      note:'' },
{ id:'ac6', name:'Light evening layer / cardigan',        category:'Adults - Clothing',      note:'AC is strong indoors' },
{ id:'ac7', name:'Swimwear x2 each',                      category:'Adults - Clothing',      note:'' },
{ id:'ac8', name:'Comfortable walking shoes',             category:'Adults - Clothing',      note:'Closed-toe for desert hikes' },
{ id:'ac9', name:'Sandals / flip-flops',                  category:'Adults - Clothing',      note:'' },
{ id:'ac10',name:'Pyjamas',                               category:'Adults - Clothing',      note:'' },
{ id:'ac11',name:'Sun hat (wide brim)',                   category:'Adults - Clothing',      note:'Essential in Arizona sun' },
{ id:'ac12',name:'Sunglasses',                            category:'Adults - Clothing',      note:'' },
{ id:'ac13',name:'Smart outfit for dinner out',           category:'Adults - Clothing',      note:'' },
{ id:'cl1', name:'Scarf',                                 category:'Adults - Clothing',      note:'' },
{ id:'cl2', name:'Light jacket',                          category:'Adults - Clothing',      note:'' },
{ id:'cl3', name:'Sweater x5 (1 per 3 days)',             category:'Adults - Clothing',      note:'AC is cold indoors' },
{ id:'cl4', name:'Belt',                                  category:'Adults - Clothing',      note:'' },
{ id:'cl5', name:'Trousers x7 (1 per 2 days)',            category:'Adults - Clothing',      note:'' },
{ id:'cl6', name:'Casual shirts x14 (1 per day)',         category:'Adults - Clothing',      note:'' },
{ id:'cl7', name:'Watch',                                 category:'Adults - Clothing',      note:'' },
{ id:'k1',  name:'T-shirts x10',                          category:'Daughter (8) - Clothing',note:'' },
{ id:'k2',  name:'Shorts x5',                             category:'Daughter (8) - Clothing',note:'' },
{ id:'k3',  name:'Sundresses x3',                         category:'Daughter (8) - Clothing',note:'' },
{ id:'k4',  name:'Underwear x10',                         category:'Daughter (8) - Clothing',note:'' },
{ id:'k5',  name:'Socks x10',                             category:'Daughter (8) - Clothing',note:'' },
{ id:'k6',  name:'Light pyjamas x2',                      category:'Daughter (8) - Clothing',note:'' },
{ id:'k7',  name:'Swimsuit x2',                           category:'Daughter (8) - Clothing',note:'' },
{ id:'k8',  name:'Comfortable trainers',                  category:'Daughter (8) - Clothing',note:'Closed-toe for walking' },
{ id:'k9',  name:'Sandals',                               category:'Daughter (8) - Clothing',note:'' },
{ id:'k10', name:'Sun hat',                               category:'Daughter (8) - Clothing',note:'' },
{ id:'k11', name:'Light hoodie / fleece',                 category:'Daughter (8) - Clothing',note:'For heavy AC in restaurants' },
{ id:'s1',  name:'T-shirts x12',                          category:'Son (3) - Clothing',     note:'Pack extra for spills' },
{ id:'s2',  name:'Shorts x7',                             category:'Son (3) - Clothing',     note:'' },
{ id:'s3',  name:'Underwear / pull-ups x14',              category:'Son (3) - Clothing',     note:'Check which stage he is at' },
{ id:'s4',  name:'Socks x10',                             category:'Son (3) - Clothing',     note:'' },
{ id:'s5',  name:'Light pyjamas x3',                      category:'Son (3) - Clothing',     note:'' },
{ id:'s6',  name:'Swimwear x2',                           category:'Son (3) - Clothing',     note:'' },
{ id:'s7',  name:'Trainers (easy on/off)',                category:'Son (3) - Clothing',     note:'' },
{ id:'s8',  name:'Sandals',                               category:'Son (3) - Clothing',     note:'' },
{ id:'s9',  name:'Sun hat with neck flap',                category:'Son (3) - Clothing',     note:'Essential for toddler sun safety' },
{ id:'s10', name:'Light zip-up fleece',                   category:'Son (3) - Clothing',     note:'For AC and cooler evenings' },
{ id:'t1',  name:'Toothbrushes x4',                       category:'Toiletries',             note:'' },
{ id:'t2',  name:'Toothpaste',                            category:'Toiletries',             note:'' },
{ id:'t3',  name:'Shampoo and conditioner',               category:'Toiletries',             note:'Kids and adults' },
{ id:'t4',  name:'Body wash / soap',                      category:'Toiletries',             note:'' },
{ id:'t5',  name:'Deodorant x2',                          category:'Toiletries',             note:'' },
{ id:'t6',  name:'SPF 50+ sunscreen x3 bottles',          category:'Toiletries',             note:'You will use a lot in Arizona' },
{ id:'t7',  name:'Kids SPF 50 sunscreen',                 category:'Toiletries',             note:'Separate sensitive-skin formula' },
{ id:'t8',  name:'After-sun lotion',                      category:'Toiletries',             note:'' },
{ id:'t9',  name:'Lip balm with SPF',                     category:'Toiletries',             note:'Sun is intense at altitude' },
{ id:'t10', name:'Insect repellent',                      category:'Toiletries',             note:'Scorpions and mosquitoes in Tucson' },
{ id:'t11', name:'Moisturiser',                           category:'Toiletries',             note:'Desert air is very dry' },
{ id:'t12', name:'Hairbrush / comb',                      category:'Toiletries',             note:'' },
{ id:'t13', name:'Razor and shaving cream',               category:'Toiletries',             note:'' },
{ id:'t14', name:'Feminine hygiene products',             category:'Toiletries',             note:'' },
{ id:'t15', name:'Nappies / pull-ups (small supply)',     category:'Toiletries',             note:'Buy bulk at Walmart on arrival' },
{ id:'t16', name:'Baby wipes x4 packs',                   category:'Toiletries',             note:'' },
{ id:'t17', name:'Nail clippers',                         category:'Toiletries',             note:'' },
{ id:'h1',  name:'Paracetamol (adults and kids)',         category:'Health and Medicine',    note:'' },
{ id:'h2',  name:'Ibuprofen',                             category:'Health and Medicine',    note:'' },
{ id:'h3',  name:'Antihistamines (adults)',               category:'Health and Medicine',    note:'Pollen and desert dust' },
{ id:'h4',  name:'Antihistamine syrup (kids)',            category:'Health and Medicine',    note:'' },
{ id:'h5',  name:'Plasters assorted',                     category:'Health and Medicine',    note:'' },
{ id:'h6',  name:'Antiseptic cream',                      category:'Health and Medicine',    note:'' },
{ id:'h7',  name:'Rehydration sachets',                   category:'Health and Medicine',    note:'Easy to dehydrate in desert heat' },
{ id:'h8',  name:'Thermometer',                           category:'Health and Medicine',    note:'' },
{ id:'h9',  name:'Prescription medications',              category:'Health and Medicine',    note:'Bring extra supply + letter from GP' },
{ id:'h10', name:'Motion sickness tablets',               category:'Health and Medicine',    note:'For long car drives' },
{ id:'h11', name:'Insect bite cream',                     category:'Health and Medicine',    note:'' },
{ id:'h12', name:'Hand sanitiser x2',                     category:'Health and Medicine',    note:'' },
{ id:'x6',  name:'Tweezers',                              category:'Health and Medicine',    note:'Splinters and cactus spines in Tucson' },
{ id:'e1',  name:'Phones x2 + chargers',                  category:'Electronics',            note:'' },
{ id:'e2',  name:'US travel adapter x2',                  category:'Electronics',            note:'Ireland uses Type G, US uses Type A/B' },
{ id:'e3',  name:'Power bank (charged)',                   category:'Electronics',            note:'Essential for long days out' },
{ id:'e4',  name:'Tablet / iPad for kids',                category:'Electronics',            note:'Load with offline content' },
{ id:'e5',  name:'Tablet charger and cable',              category:'Electronics',            note:'' },
{ id:'e6',  name:'Earbuds / headphones (adults)',         category:'Electronics',            note:'For the long-haul flight' },
{ id:'e7',  name:'Kids headphones',                       category:'Electronics',            note:'Volume-limiting recommended' },
{ id:'e8',  name:'Camera + memory cards',                 category:'Electronics',            note:'' },
{ id:'e9',  name:'Camera charger / extra battery',        category:'Electronics',            note:'' },
{ id:'e10', name:'Portable Bluetooth speaker',            category:'Electronics',            note:'For pool / outdoor use' },
{ id:'x3',  name:'Nintendo Switch + charger',             category:'Electronics',            note:'Load games before travel' },
{ id:'x4',  name:'Nintendo Switch games / case',          category:'Electronics',            note:'' },
{ id:'ke1', name:'Colouring books and pencils',           category:'Kids - Entertainment',   note:'Great for the flight' },
{ id:'ke2', name:'Small activity book (daughter)',        category:'Kids - Entertainment',   note:'' },
{ id:'ke3', name:'Sticker books',                         category:'Kids - Entertainment',   note:'Age-appropriate for both' },
{ id:'ke4', name:'Favourite small toy (son)',             category:'Kids - Entertainment',   note:'Do not forget this!' },
{ id:'ke5', name:'Snack bag for flight',                  category:'Kids - Entertainment',   note:'Familiar snacks from home' },
{ id:'ke6', name:'Kids reusable water bottles x2',        category:'Kids - Entertainment',   note:'Stay hydrated in the heat' },
{ id:'x1',  name:'Night light / noise machine',           category:'Kids - Entertainment',   note:'Essential for son to sleep in new place' },
{ id:'x5',  name:'Uno card game',                         category:'Kids - Entertainment',   note:'Great for restaurants and downtime' },
{ id:'b1',  name:'Beach bag',                             category:'Beach and Pool',         note:'' },
{ id:'b2',  name:'Beach umbrella',                        category:'Beach and Pool',         note:'Also great for Arizona sun shade' },
{ id:'b3',  name:'Beach towels x4',                       category:'Beach and Pool',         note:'' },
{ id:'b4',  name:'Beach tent / pop-up shade',             category:'Beach and Pool',         note:'Brilliant for toddler in direct sun' },
{ id:'b5',  name:'Pool / beach toys',                     category:'Beach and Pool',         note:'For the kids' },
{ id:'tg1', name:'Main suitcases (checked)',              category:'Travel Gear',            note:'Weigh before leaving - 23kg limit' },
{ id:'tg2', name:'Carry-on bags x2',                      category:'Travel Gear',            note:'' },
{ id:'tg3', name:'Kids backpack (daughter)',               category:'Travel Gear',            note:'She can carry her own bits' },
{ id:'tg4', name:'Buggy / stroller (for son)',            category:'Travel Gear',            note:'Check airline gate-check policy' },
{ id:'tg5', name:'Buggy rain cover',                      category:'Travel Gear',            note:'Also doubles as sun shade' },
{ id:'tg6', name:'Luggage locks',                         category:'Travel Gear',            note:'TSA-approved locks' },
{ id:'tg7', name:'Luggage tags x4',                       category:'Travel Gear',            note:'With address and phone number' },
{ id:'tg8', name:'Packing cubes',                         category:'Travel Gear',            note:"Keeps everyone's stuff separate" },
{ id:'tg9', name:'Small day bag / backpack',              category:'Travel Gear',            note:'For day trips in Tucson' },
{ id:'tg10',name:'Reusable shopping bags x2',             category:'Travel Gear',            note:'' },
{ id:'x2',  name:'Ziplock bags (various sizes)',          category:'Travel Gear',            note:'Leaks, snacks, wet clothes, sand' },
{ id:'es1', name:'Reading glasses',                       category:'Essentials',             note:'' },
{ id:'es2', name:'Book / e-reader',                       category:'Essentials',             note:'For the flight' },
{ id:'es3', name:'Vitamins and supplements',              category:'Essentials',             note:'' },
{ id:'es4', name:'Wallet',                                category:'Essentials',             note:'' },
{ id:'es5', name:'House key (leave with neighbour)',      category:'Essentials',             note:'' },
{ id:'es6', name:'Umbrella',                              category:'Essentials',             note:'For Tucson monsoon season Jul-Sep' },
{ id:'m1',  name:'Notify bank of travel dates',           category:'Money and Finance',      note:'Both adults cards' },
{ id:'m2',  name:'US dollars - cash float',               category:'Money and Finance',      note:'200 EUR equivalent for tips' },
{ id:'m3',  name:'Travel credit card (no FX fees)',       category:'Money and Finance',      note:'' },
{ id:'m4',  name:'Back-up card (kept separate)',          category:'Money and Finance',      note:'' },
{ id:'by1', name:'Stop mail / arrange collection',        category:'Before You Leave',       note:'' },
{ id:'by2', name:'Ask neighbour to check house',          category:'Before You Leave',       note:'' },
{ id:'by3', name:'Set thermostat to low',                 category:'Before You Leave',       note:'' },
{ id:'by4', name:'Unplug non-essential appliances',       category:'Before You Leave',       note:'' },
{ id:'by5', name:'Download offline maps for Tucson',      category:'Before You Leave',       note:'Google Maps works offline' },
{ id:'by6', name:'Get US SIM or check roaming plan',      category:'Before You Leave',       note:'Data is expensive without a plan' },
{ id:'by7', name:'Check-in online 24hr before flight',    category:'Before You Leave',       note:'Select seats together' },
{ id:'by8', name:'Pre-book car hire child seats',         category:'Before You Leave',       note:'For 3-year-old - mandatory' },
{ id:'td1', name:'Book hotel / accommodation',            category:'Before You Leave',       note:'' },
{ id:'td2', name:'Close water and gas faucets',           category:'Before You Leave',       note:'' },
{ id:'td3', name:'Take out the trash',                    category:'Before You Leave',       note:'' },
{ id:'td4', name:'Close all windows and lock up',         category:'Before You Leave',       note:'' },
{ id:'td5', name:'Water the plants',                      category:'Before You Leave',       note:'Or ask a neighbour' },
{ id:'td6', name:'Empty and back up camera memory cards', category:'Before You Leave',       note:'' },
{ id:'td7', name:'Scan and email important documents',    category:'Before You Leave',       note:'Passports, insurance, ESTAs' },
{ id:'td8', name:'Increase credit card limit if needed',  category:'Before You Leave',       note:'' },
];

const STORAGE_KEY = 'packit-tucson-packed';
const CIRC = 2 * Math.PI * 22;

export default function App() {
  const [packed, setPacked] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPacked(new Set(JSON.parse(raw)));
    } catch(e) {}
    setLoading(false);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }, []);

  const save = useCallback((newPacked) => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newPacked)));
    } catch(e) {}
    setSaving(false);
  }, []);

  const toggleItem = useCallback((id) => {
    setPacked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      save(next);
      return next;
    });
  }, [save]);

  const resetTicks = useCallback(() => {
    if (!window.confirm('Reset all ticked items?')) return;
    const next = new Set();
    setPacked(next);
    save(next);
    showToast('All ticks reset');
  }, [save, showToast]);

  const total = ITEMS.length;
  const doneCount = ITEMS.filter(it => packed.has(it.id)).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const offset = CIRC - (pct / 100) * CIRC;

  const unpacked = ITEMS.filter(it => !packed.has(it.id));
  const packedItems = ITEMS.filter(it => packed.has(it.id));
  const categories = {};
  unpacked.forEach(it => {
    if (!categories[it.category]) categories[it.category] = [];
    categories[it.category].push(it);
  });
  const packedCats = {};
  packedItems.forEach(it => {
    if (!packedCats[it.category]) packedCats[it.category] = [];
    packedCats[it.category].push(it);
  });

  if (loading) {
    return (
      <div style={{minHeight:'100vh',background:'#f5f0e8',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif',color:'#8a7d6a',flexDirection:'column',gap:16}}>
        <div style={{width:32,height:32,border:'3px solid #d6ccb8',borderTopColor:'#c8432a',borderRadius:'50%',animation:'spin 0.8s linear infinite'}} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{fontSize:'0.8rem',letterSpacing:'0.1em'}}>LOADING YOUR LIST…</div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',background:'#f5f0e8',fontFamily:'"DM Mono",monospace',paddingBottom:100,position:'relative'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@300;400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{background:#f5f0e8;} .item-row{display:flex;align-items:flex-start;gap:12px;padding:10px 16px;border-bottom:1px solid #d6ccb8;cursor:pointer;transition:background 0.12s;user-select:none;} .item-row:last-child{border-bottom:none;} .item-row:hover{background:#faf6ed;} .packed-row{display:flex;align-items:center;gap:10px;padding:7px 10px;background:#e8f0e8;border-radius:3px;margin-bottom:3px;cursor:pointer;user-select:none;transition:background 0.12s;} .packed-row:hover{background:#d4e8d4;} .packed-row:hover .unpack{opacity:1!important;} @keyframes slideIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Header */}
      <div style={{position:'sticky',top:0,zIndex:100,background:'#1a1208',color:'#f5f0e8',padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 4px 24px rgba(0,0,0,0.2)'}}>
        <div>
          <div style={{fontFamily:'"Playfair Display",serif',fontSize:'1.8rem',fontWeight:900,letterSpacing:'-1px',lineHeight:1}}>Pack It</div>
          <div style={{fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'#8a7d6a',marginTop:2}}>Tucson 2025</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {saving && <div style={{width:8,height:8,borderRadius:'50%',background:'#f5bc42',animation:'spin 1s linear infinite',border:'2px solid transparent',borderTopColor:'#f5bc42'}} />}
          <div style={{position:'relative',width:52,height:52}}>
            <svg width="52" height="52" viewBox="0 0 52 52" style={{transform:'rotate(-90deg)'}}>
              <circle cx="26" cy="26" r="22" fill="none" stroke="#333" strokeWidth="4"/>
              <circle cx="26" cy="26" r="22" fill="none"
                stroke={pct===100?'#5bc45b':'#c8432a'} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={CIRC} strokeDashoffset={offset}
                style={{transition:'stroke-dashoffset 0.4s ease'}}/>
            </svg>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#f5f0e8'}}>
              <span style={{fontSize:'0.85rem',fontWeight:700,lineHeight:1}}>{pct}%</span>
              <span style={{fontSize:'0.55rem'}}>done</span>
            </div>
          </div>
          <button onClick={resetTicks} style={{fontFamily:'"DM Mono",monospace',fontSize:'0.62rem',letterSpacing:'0.1em',textTransform:'uppercase',border:'1.5px solid #8a7d6a',padding:'6px 10px',cursor:'pointer',background:'transparent',color:'#f5f0e8',borderRadius:2}}>Reset</button>
        </div>
      </div>

      {/* Body */}
      <div style={{maxWidth:680,margin:'0 auto',padding:'20px 14px'}}>

        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20,fontSize:'0.68rem',color:'#8a7d6a'}}>
          <div style={{width:7,height:7,borderRadius:'50%',background: doneCount===total?'#5bc45b':'#8a7d6a'}} />
          <span>{doneCount} of {total} packed</span>
        </div>

        {unpacked.length === 0 && packedItems.length > 0 && (
          <div style={{textAlign:'center',padding:32,fontFamily:'"Playfair Display",serif',fontSize:'1.4rem',color:'#5bc45b'}}>
            All packed! Have an amazing trip!
          </div>
        )}

        {Object.keys(categories).map(cat => {
          const items = categories[cat];
          const catTotal = ITEMS.filter(it => it.category === cat).length;
          const catDone  = ITEMS.filter(it => it.category === cat && packed.has(it.id)).length;
          const allDone  = catDone === catTotal;
          return (
            <div key={cat} style={{marginBottom:18,background:'#fffdf7',border:'1.5px solid #d6ccb8',borderRadius:4,overflow:'hidden',boxShadow:'3px 3px 0 #d6ccb8',animation:'slideIn 0.2s ease both'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',background:'#1a1208',color:'#f5f0e8'}}>
                <span style={{fontFamily:'"Playfair Display",serif',fontSize:'0.95rem',fontWeight:700}}>{cat}</span>
                <span style={{background:allDone?'#5bc45b':'#c8432a',color:'white',padding:'2px 8px',borderRadius:10,fontSize:'0.58rem',fontWeight:600}}>{catDone}/{catTotal}</span>
              </div>
              <div>
                {items.map(it => (
                  <div key={it.id} className="item-row" onClick={() => toggleItem(it.id)}>
                    <div style={{width:18,height:18,border:'2px solid #d6ccb8',borderRadius:2,flexShrink:0,marginTop:2,background:'white',display:'flex',alignItems:'center',justifyContent:'center'}} />
                    <div>
                      <div style={{fontSize:'0.82rem',fontWeight:500,lineHeight:1.3}}>{it.name}</div>
                      {it.note && <div style={{fontSize:'0.65rem',color:'#8a7d6a',marginTop:2}}>{it.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {packedItems.length > 0 && (
          <div style={{marginTop:28}}>
            <div style={{fontFamily:'"Playfair Display",serif',fontSize:'1.1rem',color:'#4a7a4a',borderBottom:'2px solid #4a7a4a',paddingBottom:6,marginBottom:12,display:'flex',alignItems:'center',gap:10}}>
              Packed
              <span style={{fontFamily:'"DM Mono",monospace',fontSize:'0.65rem',background:'#4a7a4a',color:'white',padding:'2px 8px',borderRadius:10}}>{packedItems.length}</span>
            </div>
            {Object.keys(packedCats).map(cat => (
              <div key={cat} style={{marginBottom:12}}>
                <div style={{fontSize:'0.6rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'#8a7d6a',marginBottom:4,paddingLeft:4}}>{cat}</div>
                {packedCats[cat].map(it => (
                  <div key={it.id} className="packed-row" onClick={() => toggleItem(it.id)}>
                    <span style={{color:'#5bc45b',fontSize:'0.85rem'}}>✓</span>
                    <span style={{fontSize:'0.78rem',textDecoration:'line-through',color:'#4a7a4a',opacity:0.7,flex:1}}>{it.name}</span>
                    <span className="unpack" style={{fontSize:'0.6rem',color:'#8a7d6a',opacity:0,transition:'opacity 0.15s'}}>unpack</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div style={{position:'fixed',bottom:24,left:'50%',transform:`translateX(-50%) translateY(${toastVisible?0:20}px)`,background:'#1a1208',color:'#f5f0e8',fontSize:'0.72rem',padding:'10px 20px',borderRadius:2,letterSpacing:'0.06em',transition:'all 0.25s',zIndex:300,opacity:toastVisible?1:0,whiteSpace:'nowrap'}}>
          {toast}
        </div>
      )}
    </div>
  );
}
