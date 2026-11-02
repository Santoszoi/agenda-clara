import {chromium} from '@playwright/test';
const browser=await chromium.launch();
const context=await browser.newContext({locale:"pt-BR",viewport:{width:1440,height:1180},recordVideo:{dir:'media/raw',size:{width:1440,height:1180}}});
const page=await context.newPage();await page.goto('http://127.0.0.1:5173');await page.waitForTimeout(2200);
await page.getByLabel('Serviço',{exact:true}).selectOption('configuracao');await page.waitForTimeout(2800);
await page.getByRole('button',{name:'11:00',exact:true}).click();await page.getByLabel('Nome fictício').fill('Mercado Jardim (fictício)');await page.waitForTimeout(2200);
await page.getByRole('button',{name:'Confirmar agendamento'}).click();await page.getByRole('status').filter({hasText:'confirmado'}).waitFor();await page.screenshot({path:'media/desktop.png',fullPage:true});await page.waitForTimeout(3500);
await page.reload();await page.waitForTimeout(2200);await page.getByRole('button',{name:'Cancelar agendamento de Mercado Jardim'}).click();await page.waitForTimeout(2800);await context.close();
const mobile=await browser.newPage({locale:"pt-BR",viewport:{width:390,height:844}});await mobile.goto('http://127.0.0.1:5173');await mobile.screenshot({path:'media/mobile.png',fullPage:true});await browser.close();
