import {useRef,useState,type FormEvent} from 'react';
import {createRoot} from 'react-dom/client';
import {addBooking,duration,services,slots,time,type ServiceId} from './schedule';
import {readBookings,saveBookings} from './storage';
import './style.css';
function App(){
 const [initial]=useState(readBookings);const [bookings,setBookings]=useState(initial.bookings);
 const [warning,setWarning]=useState(initial.warning);const [date,setDate]=useState('2026-11-02');
 const [service,setService]=useState<ServiceId>('diagnostico');const [selected,setSelected]=useState<number|null>(null);
 const [customer,setCustomer]=useState('');const [error,setError]=useState('');const [notice,setNotice]=useState('');
 const errorRef=useRef<HTMLDivElement>(null);const confirmation=useRef<HTMLDivElement>(null);
 const available=slots(bookings,date,service);const day=bookings.filter(b=>b.date===date).sort((a,b)=>a.start-b.start);
 const persist=(next:typeof bookings)=>{setBookings(next);setWarning(saveBookings(next)?'':'Não foi possível salvar neste navegador. As alterações existem apenas nesta sessão.');};
 function fail(message:string){setError(message);requestAnimationFrame(()=>errorRef.current?.focus());}
 function submit(e:FormEvent){e.preventDefault();setNotice('');if(selected===null){fail('Selecione um horário disponível.');return;}
  try{const next=addBooking(bookings,{id:crypto.randomUUID(),date,start:selected,service,customer});persist(next);setError('');setNotice(`Agendamento demonstrativo confirmado para ${date.split('-').reverse().join('/')} às ${time(selected)}. Duração: ${duration(service)} minutos.`);setSelected(null);setCustomer('');requestAnimationFrame(()=>confirmation.current?.focus());}
  catch(e){fail(e instanceof Error?e.message:'Não foi possível agendar.');}
 }
 return <div className="shell"><header><a href="#main" className="brand"><span>MS</span> Marcos Solutions</a><span className="pill">LAB / REACT + TYPESCRIPT</span></header><main id="main"><div className="hero"><div><p className="eyebrow">AGENDA CLARA · ESTUDO 04</p><h1>Um horário.<br/><em>Um compromisso.</em></h1><p>Organize atendimentos sem sobrepor a agenda.<br/>Escolha o serviço e veja os horários que cabem no dia.</p></div><aside><span className="dot"/> DEMONSTRAÇÃO LOCAL<p>Profissional: <strong>Marcos</strong><br/>09h–12h · 13h–18h</p><small>Dados fictícios. Sem reservas reais.</small></aside></div>
 {warning&&<p role="alert" className="warning">{warning}</p>}
 <div className="columns"><section className="card"><div className="heading"><div><p className="eyebrow">01 / DISPONIBILIDADE</p><h2>Novo agendamento</h2></div><span className="mini">{duration(service)} min</span></div>
 <form noValidate onSubmit={submit}><div className="fields"><label>Dia da demonstração<input type="date" value={date} onChange={e=>{setDate(e.target.value);setSelected(null);setNotice('');setError('');}}/></label><label>Serviço<select aria-label="Serviço" value={service} onChange={e=>{setService(e.target.value as ServiceId);setSelected(null);setError('');setNotice('');}}>{services.map(s=><option key={s.id} value={s.id}>{s.name} · {s.duration} min</option>)}</select></label></div>
 <fieldset><legend>Horários de início</legend><p className="hint">Horários indisponíveis incluem almoço, ocupação ou duração que ultrapassa o expediente.</p><div className="slots">{available.map(s=><button type="button" key={s.start} disabled={!s.available} aria-pressed={selected===s.start} aria-label={`${time(s.start)}${!s.available?' indisponível':''}`} onClick={()=>{setSelected(s.start);setError('');setNotice('');}}>{time(s.start)}<small>{!s.available?'indisponível':selected===s.start?'selecionado':'livre'}</small></button>)}</div></fieldset>
 <label>Nome fictício do cliente<input id="customer" autoComplete="off" maxLength={60} value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="Ex.: Mercado Jardim (fictício)"/></label>
 <p className="summary">{selected===null?'Escolha um horário para conferir o intervalo.':`${time(selected)} → ${time(selected+duration(service))} · ${services.find(s=>s.id===service)?.name}`}</p>
 {error&&<div role="alert" tabIndex={-1} ref={errorRef} className="error">{error}</div>}
 <button className="primary" type="submit">Confirmar agendamento <span aria-hidden="true">↗</span></button>
 </form><div role="status" tabIndex={-1} ref={confirmation} className={notice?'confirmation':''}>{notice}</div></section>
 <section className="card agenda" aria-labelledby="day-title"><div className="heading"><div><p className="eyebrow">02 / COMPROMISSOS</p><h2 id="day-title">Agenda do dia</h2></div><span className="count">{day.length.toString().padStart(2,'0')}</span></div><p className="hint">{date?date.split('-').reverse().join('/'):'Escolha uma data'} · Horário local de Brasília</p>
 {day.length===0?<p className="empty">Agenda livre. Comece escolhendo um horário ao lado.</p>:<ul>{day.map(b=><li key={b.id}><div className="appointment-time">{time(b.start)}<small>{time(b.start+duration(b.service))}</small></div><div><strong>{b.customer}</strong><p>{services.find(s=>s.id===b.service)?.name}</p><button className="cancel" onClick={()=>{persist(bookings.filter(x=>x.id!==b.id));setError('');setNotice(`Agendamento das ${time(b.start)} cancelado. Horário liberado.`);requestAnimationFrame(()=>confirmation.current?.focus());}} aria-label={`Cancelar agendamento de ${b.customer}`}>Cancelar</button></div></li>)}</ul>}
 <div className="note"><strong>O tempo também é uma regra.</strong><p>Um serviço de 60 minutos precisa de todo o intervalo livre. O próximo atendimento pode começar exatamente quando o anterior termina.</p></div></section></div>
 <footer><span>ESTUDO DE PORTFÓLIO · MARCOS SOLUTIONS</span><span>Armazenamento local · Sem servidor ou sincronização entre abas</span></footer></main></div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
