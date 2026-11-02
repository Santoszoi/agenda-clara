# Agenda Clara — Marcos Solutions

Estudo de React e TypeScript: agendamento com validação do intervalo completo.

1. Instale Node.js 24 e extraia este ZIP.
2. Abra o terminal na pasta agenda-clara.
3. Execute npm ci e npm run dev.
4. Acesse http://127.0.0.1:5173.
5. Escolha Configuração de equipamento (60 minutos). Veja 09h30 bloqueado pelo atendimento das 10h. Escolha 11h, informe um nome fictício e confirme.
6. Atualize a página e depois cancele para liberar o intervalo.

A data inicial é 02/11/2026 para uma demonstração repetível. Todos os dias podem ser selecionados: não há regras de feriados, fins de semana ou datas passadas. Use uma única aba. Nenhuma reserva real é feita.

## Materiais
- README.md: documentação em inglês e decisões técnicas.
- docs/ROTEIRO-5-DIAS.md: estudo e preparação para entrevistas.
- docs/LINKEDIN.md: publicação em português para revisar.
- docs/VALIDATION.md e logs: resultados reais e pendências.
- media/desktop.png e mobile.png: capturas reais.
- media/demo.mp4: vídeo curto sem áudio.

Para testar: npm test; npx playwright install chromium; npm run test:e2e.
O build é gerado com npm run build. A pasta dist não está incluída, pois pode ser recriada.

Não publicado no GitHub ou LinkedIn. O projeto usa dados fictícios e armazenamento local, sem backend ou proteção contra reservas simultâneas entre usuários.
