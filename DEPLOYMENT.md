# Инструкция по запуску и развертыванию сайта

## 🚀 Запуск локально (на своем компьютере)

### Требования
- Node.js версии 18.17 или выше
- npm или yarn

### Шаги установки

1. **Скачайте проект**
   \`\`\`bash
   # Если у вас есть ZIP файл, распакуйте его
   # Или клонируйте из GitHub (если проект там размещен)
   \`\`\`

2. **Установите зависимости**
   \`\`\`bash
   npm install
   # или
   yarn install
   \`\`\`

3. **Запустите сервер разработки**
   \`\`\`bash
   npm run dev
   # или
   yarn dev
   \`\`\`

4. **Откройте браузер**
   - Перейдите по адресу: `http://localhost:3000`
   - Сайт будет автоматически обновляться при изменении файлов

### Команды разработки

\`\`\`bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка для продакшена
npm run start    # Запуск собранной версии
npm run lint     # Проверка кода
\`\`\`

---

## 🌐 Развертывание на сервере

### Вариант 1: Vercel (Рекомендуется - самый простой способ)

Vercel - это платформа от создателей Next.js, идеально подходит для этого проекта.

#### Через веб-интерфейс:

1. **Создайте аккаунт на Vercel**
   - Перейдите на https://vercel.com
   - Зарегистрируйтесь (можно через GitHub)

2. **Импортируйте проект**
   - Нажмите "Add New Project"
   - Загрузите ZIP файл или подключите GitHub репозиторий
   - Vercel автоматически определит Next.js проект

3. **Настройте проект**
   - Framework Preset: Next.js (определится автоматически)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Деплой**
   - Нажмите "Deploy"
   - Через 2-3 минуты сайт будет доступен по адресу `your-project.vercel.app`

#### Через командную строку:

\`\`\`bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Деплой проекта
vercel

# Для продакшен деплоя
vercel --prod
\`\`\`

#### Подключение своего домена в Vercel:

1. В панели Vercel откройте ваш проект
2. Перейдите в Settings → Domains
3. Добавьте ваш домен (например, `festival.ru`)
4. Vercel покажет DNS записи, которые нужно добавить:
   \`\`\`
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   \`\`\`
5. Добавьте эти записи у вашего регистратора доменов
6. Подождите 24-48 часов для распространения DNS
7. SSL сертификат установится автоматически

---

### Вариант 2: VPS сервер (Ubuntu/Debian)

Для более полного контроля можно развернуть на своем сервере.

#### 1. Подготовка сервера

\`\`\`bash
# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Установите PM2 для управления процессом
sudo npm install -g pm2

# Установите Nginx
sudo apt install -y nginx
\`\`\`

#### 2. Загрузите проект на сервер

\`\`\`bash
# Через SCP
scp -r /path/to/project user@your-server-ip:/var/www/festival

# Или через Git
cd /var/www
git clone your-repository-url festival
cd festival
\`\`\`

#### 3. Соберите проект

\`\`\`bash
cd /var/www/festival
npm install
npm run build
\`\`\`

#### 4. Запустите с PM2

\`\`\`bash
# Запустите приложение
pm2 start npm --name "festival" -- start

# Настройте автозапуск
pm2 startup
pm2 save

# Полезные команды PM2
pm2 status          # Статус приложений
pm2 logs festival   # Логи
pm2 restart festival # Перезапуск
pm2 stop festival   # Остановка
\`\`\`

#### 5. Настройте Nginx

Создайте конфигурацию:

\`\`\`bash
sudo nano /etc/nginx/sites-available/festival
\`\`\`

Добавьте конфигурацию:

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

Активируйте конфигурацию:

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/festival /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

#### 6. Установите SSL сертификат (Let's Encrypt)

\`\`\`bash
# Установите Certbot
sudo apt install -y certbot python3-certbot-nginx

# Получите сертификат
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автоматическое обновление
sudo certbot renew --dry-run
\`\`\`

#### 7. Настройте DNS

У вашего регистратора доменов добавьте A-запись:

\`\`\`
Type: A
Name: @
Value: IP
