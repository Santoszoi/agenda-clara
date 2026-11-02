export const services = [{id:'diagnostico',name:'Diagnóstico técnico',duration:30},{id:'configuracao',name:'Configuração de equipamento',duration:60}] as const;
export type ServiceId = typeof services[number]['id'];
export type Booking = {id:string;date:string;start:number;service:ServiceId;customer:string};
export const windows = [[540,720],[780,1080]] as const;
export function validDate(date:string):boolean {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
 const d=new Date(date+'T12:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===date;
}
export function duration(service:ServiceId){return services.find(s=>s.id===service)!.duration;}
export function overlaps(a:number,b:number,c:number,d:number){return a<d&&c<b;}
export function canBook(bookings:Booking[], date:string,start:number,service:ServiceId):boolean {
 if(!validDate(date)||!Number.isInteger(start)||start%30!==0||!services.some(s=>s.id===service))return false;
 const end=start+duration(service);
 return windows.some(([a,b])=>start>=a&&end<=b)&&!bookings.some(b=>b.date===date&&overlaps(start,end,b.start,b.start+duration(b.service)));
}
export function slots(bookings:Booking[],date:string,service:ServiceId){return Array.from({length:18},(_,i)=>540+i*30).map(start=>({start,available:canBook(bookings,date,start,service)}));}
export function time(minutes:number){return `${Math.floor(minutes/60).toString().padStart(2,'0')}:${(minutes%60).toString().padStart(2,'0')}`;}
export function addBooking(bookings:Booking[],booking:Booking):Booking[]{
 if(!booking.id||bookings.some(b=>b.id===booking.id)||booking.customer.trim().length<2||booking.customer.trim().length>60)throw new Error('Informe um nome fictício entre 2 e 60 caracteres.');
 if(!canBook(bookings,booking.date,booking.start,booking.service))throw new Error('Este horário não está disponível. Escolha outro.');
 return [...bookings,{...booking,customer:booking.customer.trim()}];
}
export function parseSaved(raw:string):Booking[]{
 const value:unknown=JSON.parse(raw);
 if(!Array.isArray(value))throw new Error('Dados inválidos');
 return value.reduce<Booking[]>((acc,b)=>{
  if(!b||typeof b.id!=='string'||typeof b.date!=='string'||typeof b.customer!=='string'||typeof b.start!=='number'||!services.some(s=>s.id===b.service))throw new Error('Dados inválidos');
  return addBooking(acc,b);
 },[]);
}
export const seed:Booking[]=[{id:'demo-1',date:'2026-11-02',start:600,service:'configuracao',customer:'Loja Aurora (fictício)'},{id:'demo-2',date:'2026-11-02',start:840,service:'diagnostico',customer:'Café Horizonte (fictício)'}];
