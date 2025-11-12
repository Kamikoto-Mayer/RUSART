# Festival Registration Form

Форма регистрации на фестиваль с отправкой данных на email и в Google Sheets.

## Настройка

1. Создайте файл `.env.local` и добавьте следующие переменные окружения:

\`\`\`env
RESEND_API_KEY=your_resend_api_key
RECIPIENT_EMAIL=your-email@example.com
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
GOOGLE_SHEET_ID=your_google_sheet_id
\`\`\`

2. Для отправки email:
   - Зарегистрируйтесь на [Resend](https://resend.com)
   - Получите API ключ
   - Добавьте его в `.env.local`

3. Для Google Sheets:
   - Создайте проект в [Google Cloud Console](https://console.cloud.google.com) RUSARTtest
   - Включите Google Sheets API
   - Создайте Service Account и получите API ключ
   - Создайте Google Sheet и поделитесь доступом с email Service Account
   - Скопируйте ID таблицы из URL (часть между `/d/` и `/edit`)

## Функции

- ✅ Валидация всех обязательных полей
- ✅ Очистка формы
- ✅ Отправка данных на email
- ✅ Добавление данных в Google Sheets
- ✅ Toast уведомления об успехе/ошибке
- ✅ Responsive дизайн















# Настройка отправки форм

Этот документ описывает, как настроить отправку форм на email и в Google Sheets.

## 1. Настройка отправки на Email

### Вариант A: Использование Resend (Рекомендуется)

1. Зарегистрируйтесь на [resend.com](https://resend.com)
2. Получите API ключ в панели управления
3. Добавьте переменные окружения в `.env.local`:

\`\`\`env
RESEND_API_KEY=re_ваш_api_ключ
ADMIN_EMAIL=admin@artprostranstvo.ru
\`\`\`

4. Верифицируйте ваш домен в Resend для отправки с вашего домена

### Вариант B: Использование SMTP (Gmail, Yandex, Mail.ru)

Если вы хотите использовать обычную почту вместо Resend, замените код в API routes на:

\`\`\`typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.gmail.com или smtp.yandex.ru
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: process.env.ADMIN_EMAIL,
  subject: 'Новая регистрация',
  html: '...',
})
\`\`\`

Переменные окружения для SMTP:
\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@artprostranstvo.ru
\`\`\`

**Важно для Gmail:** Используйте "App Password", а не обычный пароль. Создайте его в настройках безопасности Google.

## 2. Настройка Google Sheets

### Шаг 1: Создайте Google Sheets таблицу

1. Создайте новую таблицу в Google Sheets
2. Для регистраций создайте колонки:
   - Timestamp
   - First Name
   - Last Name
   - Email
   - Phone
   - Age
   - Dance Style
   - Experience
   - Group Name
   - Participants Count
   - Message

3. Для обратной связи создайте отдельную таблицу с колонками:
   - Timestamp
   - Name
   - Email
   - Message

### Шаг 2: Создайте Google Apps Script

1. В таблице откройте **Extensions → Apps Script**
2. Вставьте следующий код:

\`\`\`javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Для регистраций
    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.age,
      data.danceStyle,
      data.experience,
      data.groupName,
      data.participantsCount,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

3. Нажмите **Deploy → New deployment**
4. Выберите тип: **Web app**
5. Настройки:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Нажмите **Deploy** и скопируйте URL

### Шаг 3: Добавьте URL в переменные окружения

\`\`\`env
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/ваш_id/exec
GOOGLE_SHEETS_URL_FEEDBACK=https://script.google.com/macros/s/другой_id/exec
\`\`\`

## 3. Тестирование

После настройки:

1. Запустите сайт локально: `npm run dev`
2. Заполните форму регистрации
3. Проверьте:
   - Пришло ли письмо на указанный email
   - Появилась ли запись в Google Sheets

## 4. Деплой на продакшн

При деплое на Vercel:

1. Откройте настройки проекта в Vercel
2. Перейдите в **Settings → Environment Variables**
3. Добавьте все переменные окружения:
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `GOOGLE_SHEETS_URL`
   - `GOOGLE_SHEETS_URL_FEEDBACK`

## Альтернативные решения

### Использование Telegram Bot

Вместо email можно отправлять уведомления в Telegram:

\`\`\`typescript
await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: `Новая регистрация:\nИмя: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}`,
  }),
})
\`\`\`

### Использование баз данных

Для хранения заявок можно использовать базу данных (Supabase, PostgreSQL, MongoDB) вместо Google Sheets.
