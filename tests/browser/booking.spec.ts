import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.goto('/');});
test('books, persists through reload, cancels and releases slot',async({page})=>{
 await page.getByRole('button',{name:'09:00',exact:true}).click();await page.getByLabel('Nome fictício').fill('Mercado Jardim (fictício)');await page.getByRole('button',{name:'Confirmar agendamento'}).click();
 await expect(page.getByRole('status')).toContainText('confirmado');await expect(page.getByRole('status')).toBeFocused();
 await page.reload();await expect(page.getByText('Mercado Jardim (fictício)',{exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'09:00 indisponível',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Cancelar agendamento de Mercado Jardim'}).click();await expect(page.getByRole('button',{name:'09:00',exact:true})).toBeEnabled();
});
test('duration blocks overlap, lunch and closing while allowing adjacent appointments',async({page})=>{
 await page.getByLabel('Serviço',{exact:true}).selectOption('configuracao');
 for(const time of ['09:30','11:30','17:30'])await expect(page.getByRole('button',{name:time+' indisponível',exact:true})).toBeDisabled();
 await expect(page.getByRole('button',{name:'11:00',exact:true})).toBeEnabled();
});
test('focuses validation error and allows keyboard selection',async({page})=>{
 await page.getByRole('button',{name:'Confirmar agendamento'}).click();await expect(page.getByRole('alert')).toBeFocused();
 await page.getByRole('button',{name:'09:00',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'09:00',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Confirmar agendamento'}).click();await expect(page.getByRole('alert')).toContainText('nome fictício');
});
test('recovers corrupted local storage with visible warning',async({page})=>{
 await page.evaluate(()=>localStorage.setItem('agenda-clara-v1','broken'));await page.reload();await expect(page.getByRole('alert')).toContainText('recuperar');await expect(page.getByText('Loja Aurora (fictício)',{exact:true})).toBeVisible();
});
test('changes date and keeps mobile page within viewport',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.getByLabel('Dia da demonstração').fill('2026-11-03');await expect(page.getByText('Agenda livre.',{exact:false})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
