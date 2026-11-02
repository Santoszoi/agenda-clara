# Roteiro de cinco dias

## Dia 1 — Entender o problema e executar
Execute npm ci e npm run dev. Agende um diagnóstico de 30 minutos e uma configuração de 60 minutos. Explique por que verificar somente o horário de início não basta. Entrega: desenho dos intervalos 09h–12h e 13h–18h.

## Dia 2 — Regras em TypeScript
Leia schedule.ts e rode npm test. Explique a expressão de sobreposição e a diferença entre horário ocupado e duração que ultrapassa o expediente. Exercício: acrescente um teste de horário negativo e confira o resultado real.

## Dia 3 — Estado do React
Siga o fluxo de seleção, confirmação e cancelamento em main.tsx. Identifique estado armazenado e informação derivada. Explique por que a seleção é limpa quando muda o serviço. Exercício: extraia a lista de compromissos para um componente tipado sem alterar o comportamento.

## Dia 4 — Persistência e uso por teclado
Rode npm run test:e2e. Agende, atualize a página e cancele. Teste Tab, Shift+Tab, Enter e foco no erro. Confira zoom de 200%; se possível use NVDA/VoiceOver e registre apenas o que observar. Explique por que localStorage não resolve concorrência entre usuários.

## Dia 5 — Apresentar e defender decisões
Demonstre o serviço de 60 minutos, o bloqueio das 09h30, o agendamento às 11h, o F5 e o cancelamento. Faça uma apresentação de 60 segundos: problema → implementação → testes → limites. Revise o texto para LinkedIn depois de compreender o código.

## Perguntas de entrevista
1. Por que dois compromissos consecutivos não conflitam?
2. Como evitar divergência entre a disponibilidade exibida e a validação do formulário?
3. Por que validar JSON se o projeto usa TypeScript?
4. O que acontece quando o armazenamento está indisponível?
5. Como seria a garantia real contra duas reservas simultâneas? Discuta validação e transação/lock no servidor, sem dizer que já estão implementados neste projeto.

## Preparação para GitHub
Crie manualmente um repositório chamado agenda-clara quando decidir publicar. Confira o conteúdo antes de enviar. Não envie node_modules, dist ou arquivos pessoais.

Descrição: “React and TypeScript service scheduling demo with interval validation, local persistence and browser tests.”
Topics: react typescript scheduling frontend vitest playwright portfolio.
