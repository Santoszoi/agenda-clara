# Texto sugerido para LinkedIn

Um horário livre não significa que o serviço inteiro cabe nele.

Na Agenda Clara, preparei um estudo com React e TypeScript para explorar essa regra em uma agenda de atendimentos: serviços de 30 ou 60 minutos precisam respeitar os compromissos existentes, o almoço e o fim do expediente.

A disponibilidade é calculada a partir dos agendamentos. A confirmação verifica novamente o intervalo, e o cancelamento libera o horário. A demonstração também mantém os dados no navegador após atualizar a página.

Uma decisão importante foi separar as regras de horários da interface. Isso permite testar sobreposição, horários consecutivos e limites do expediente sem depender dos componentes React.

Foram executados 19 testes unitários e 5 testes no Chromium, além do build de produção. Os fluxos verificados incluem agendar, atualizar a página, cancelar, validar mensagens e operar uma seleção por teclado.

É um estudo com dados fictícios e armazenamento local, sem reservas reais. A garantia contra agendamentos simultâneos de vários usuários exigiria uma API e validação atômica no servidor. Essa parte não está implementada.

No vídeo: serviço de 60 minutos → horário disponível → confirmação → atualização da página → cancelamento.

#React #TypeScript #Frontend #TestesDeSoftware #DesenvolvimentoWeb

---
Antes de publicar: execute o projeto e ajuste o texto ao que consegue explicar. Adicione a URL real do repositório depois de criá-lo. Nenhuma publicação foi feita automaticamente.
