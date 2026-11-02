import {parseSaved,seed,type Booking} from './schedule';
export const KEY='agenda-clara-v1';
export function readBookings():{bookings:Booking[];warning:string}{
 try{const raw=localStorage.getItem(KEY);return {bookings:raw===null?seed:parseSaved(raw),warning:''};}
 catch{return {bookings:seed,warning:'Não foi possível recuperar os dados locais. A demonstração inicial foi carregada.'};}
}
export function saveBookings(bookings:Booking[]):boolean{try{localStorage.setItem(KEY,JSON.stringify(bookings));return true;}catch{return false;}}
