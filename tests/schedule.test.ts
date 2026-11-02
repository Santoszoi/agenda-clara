import {describe,it,expect} from 'vitest';
import {canBook,addBooking,parseSaved,seed,validDate,slots} from '../src/schedule';
const day='2026-11-02';
describe('availability',()=>{
 it('accepts a free interval',()=>expect(canBook(seed,day,540,'diagnostico')).toBe(true));
 it('rejects overlap from before an appointment',()=>expect(canBook(seed,day,570,'configuracao')).toBe(false));
 it('rejects a start inside an appointment',()=>expect(canBook(seed,day,630,'diagnostico')).toBe(false));
 it('accepts an adjacent appointment',()=>expect(canBook(seed,day,660,'diagnostico')).toBe(true));
 it('rejects lunch crossing',()=>expect(canBook(seed,day,690,'configuracao')).toBe(false));
 it('rejects closing time crossing',()=>expect(canBook(seed,day,1050,'configuracao')).toBe(false));
 it('accepts ending exactly at closing',()=>expect(canBook(seed,day,1020,'configuracao')).toBe(true));
 it('separates calendar dates',()=>expect(canBook(seed,'2026-11-03',600,'configuracao')).toBe(true));
 it('rejects invalid dates and off-grid times',()=>{expect(validDate('2026-02-30')).toBe(false);expect(canBook(seed,day,541,'diagnostico')).toBe(false);});
 it('returns all visible start options',()=>expect(slots(seed,day,'diagnostico')).toHaveLength(18));
});
describe('booking and storage boundaries',()=>{
 it('adds immutably and trims names',()=>{const next=addBooking(seed,{id:'new',date:day,start:540,service:'diagnostico',customer:'  Cliente fictício  '});expect(next).toHaveLength(3);expect(seed).toHaveLength(2);expect(next[2].customer).toBe('Cliente fictício');});
 it('rejects short names',()=>expect(()=>addBooking(seed,{id:'new',date:day,start:540,service:'diagnostico',customer:' '})).toThrow());
 it('rejects duplicate IDs',()=>expect(()=>addBooking(seed,{...seed[0],start:540})).toThrow());
 it('restores valid records',()=>expect(parseSaved(JSON.stringify(seed))).toEqual(seed));
 it.each(['{}','null','[{}]','oops'])('rejects corrupted storage %s',raw=>expect(()=>parseSaved(raw)).toThrow());
 it('rejects overlapping saved records',()=>expect(()=>parseSaved(JSON.stringify([...seed,{...seed[0],id:'overlap'}]))).toThrow());
});
