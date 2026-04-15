# SENATIAN — Vercel-ready проект

## Запуск локально
```bash
npm install
npm run dev
```

## Деплой на Vercel
### Через веб-интерфейс
1. Загрузите проект в GitHub
2. Импортируйте репозиторий в Vercel
3. Нажмите Deploy

### Через CLI
```bash
npm i -g vercel
vercel
```

## Важно
- Замените `metadataBase` в `app/layout.tsx` на ваш реальный домен после публикации.
- Текущая форма использует `mailto:` и отправляет заявку на `info@senatian.ru`.
- Для полноценной серверной отправки можно позже подключить Formspree или backend.
