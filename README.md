# TalkBye

Plataforma de comunicação em Next.js + Supabase + LiveKit, pronta para a Vercel.

## O que está implementado
- **Conta:** cadastro/login por e-mail, confirmação de e-mail, recuperação de senha, troca de e-mail e senha, logout (e em todos os dispositivos), rotas privadas.
- **Ghost:** 2 horas, uso único, controle no servidor (hashes de dispositivo, IP + navegador + idioma), contador, aviso e tela final.
- **Perfil:** ID único gerado no banco (`TB-XXXXXXXX`), nome, bio, foto (Supabase Storage).
- **Amigos:** adicionar por ID, aceitar/recusar/cancelar, remover, bloquear/desbloquear (o bloqueio impede novas DMs e pedidos, aplicado no banco).
- **DMs e canais de texto em tempo real:** histórico com carregamento progressivo, responder, editar, apagar, denunciar.
- **Servidores:** criar (privado/público), canais de texto e voz, convites com validade, limite de usos e link copiável, cargos dono/admin/membro, expulsar, sair, apagar, Explorar comunidades públicas.
- **Chamadas (LiveKit):** voz, vídeo, compartilhar tela, silenciar microfone (sua transmissão) separado de silenciar áudio recebido, volume por participante, escolha de dispositivos, indicador de quem fala, qualidade, estados conectando/reconectando/encerrado. Em DMs e canais de voz.
- **Notificações** (pedidos de amizade, aceitos) em tempo real; **Memórias** pessoais privadas (só contas permanentes).

## Ainda NÃO implementado
Envio de imagens/arquivos, busca de mensagens, fixar mensagens, reações, menções, contador de não lidas, silenciar/arquivar na interface, indicadores de entrega/leitura, notificações do navegador, status online/ausente/ocupado/invisível, privacidade granular do perfil, redes sociais no perfil, cargos personalizados com permissões finas, reordenar canais, painel de sessões ativas por dispositivo, atalhos de teclado, limpeza automática de Ghost expirados, testes automatizados.

## 1. Rodar localmente
```bash
npm install
cp .env.example .env.local   # preencha (passos abaixo)
npm run typecheck && npm run build && npm run dev
```

## 2. Supabase
1. Crie o projeto em supabase.com.
2. **SQL Editor:** execute `supabase/migrations/0001_init.sql` e depois `0002_social.sql`.
3. **Authentication → Providers:** Email ligado; ligue **Allow anonymous sign-ins** (Ghost).
4. **Authentication → URL Configuration:** Site URL = seu domínio; Redirect URLs: `http://localhost:3000/auth/callback` e `https://SEU-DOMINIO/auth/callback`.
5. **Authentication → Attack Protection:** ative CAPTCHA (barra contas e sessões Ghost abusivas). Em produção, configure SMTP próprio.
6. **Project Settings → API:** copie URL, anon key e service_role key. Gere `GHOST_PEPPER` com `openssl rand -hex 32`.
7. Se `0002` acusar que as tabelas já estão na publicação `supabase_realtime`, apague só a última linha do arquivo.

## 3. LiveKit (chamadas)
1. Crie um projeto em livekit.io (plano gratuito serve para testar).
2. Copie a URL `wss://…`, a API key e o API secret para `NEXT_PUBLIC_LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`.
Sem essas variáveis, o botão de chamada mostra "não configurado" e o resto do app funciona.

## 4. Vercel
1. Suba o projeto no GitHub e importe em vercel.com → New Project.
2. Cadastre **todas** as variáveis do `.env.example`. `SUPABASE_SERVICE_ROLE_KEY`, `GHOST_PEPPER` e `LIVEKIT_API_SECRET` nunca podem ter prefixo `NEXT_PUBLIC_`.
3. `NEXT_PUBLIC_SITE_URL` = URL final. Deploy.
4. Domínio: Settings → Domains → Add, aponte o DNS como indicado e atualize as URLs no Supabase.

## Segurança em resumo
Toda escrita sensível (amizades, bloqueios, servidores, convites) passa por funções no banco que validam `auth.uid()`; o resto é protegido por RLS, inclusive o Realtime. Colunas imutáveis (ID, username) não são editáveis pelo cliente. Segredos ficam só no servidor. Ghost expirado perde o direito de escrever também no banco (`is_active_user`).

## Aviso importante
Este código foi escrito num ambiente **sem internet**: só consegui checar a sintaxe. `npm install`, o build, o RLS e o LiveKit **não foram executados**. Nas primeiras execuções é provável aparecerem ajustes (tipos, nomes de colunas, permissões). Rode `npm run typecheck && npm run build` e me envie os erros.
