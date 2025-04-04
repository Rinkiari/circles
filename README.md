# Circles

**Circles** — это веб-приложение для организации и участия в мероприятиях. Пользователи могут создавать события, просматривать список доступных мероприятий и присоединяться к ним.

### Главная страница
![Главная страница](https://i.imgur.com/x97ZVYF.png)

### Мой профиль
![Моя страница](https://i.imgur.com/nvsWtHB.png)

### Страница мероприятия
![Страница ивента](https://i.imgur.com/fORFW71.png)
## Проект разделён на две части:
- 🔧 **Бэкенд** — реализован на Java (Spring Boot) и использует базу данных **PostgreSQL**.  
  Репозиторий бэкенда: [CirclesApp](https://github.com/lenaevd/CirclesApp)
- 💻 **Фронтенд** — реализован на **React** и подключается к REST API бэкенда.

## 🧰 Используемые технологии

- **React**
- **React-router-dom**
- **Redux Toolkit**
- **JavaScript (ES6+)**
- **SASS / HTML5**
- **Node.js + npm**
- **Java Spring Boot** (бэкенд)
- **PostgreSQL** (база данных)


## 💾 Структура проекта

```plaintext
circles/
│
├── public/                      # Статические файлы, доступные в браузере
│   ├── index.html               # Главная страница, подключение скриптов
│   ├── favicon.ico              # Иконка для вкладки
│   └── ...
│
├── src/                         # Исходный код фронтенд-приложения (React)
│   ├── assets/                  # Ресурсы проекта (изображения)
│   ├── components/              # Компоненты React
│   │   ├── EventCard            # Компонент для отображения карточки события
│   │   ├── Header               # Шапка сайта
│   │   └── ...
│   ├── context/                 # Контексты для глобального состояния приложения
│   ├── pages/                   # Страницы приложения (главная, события и т.д.)
│   │   ├── Home.jsx             # Главная страница
│   │   └── Event.jsx            # Страница конкретного мероприятия
│   │   └── ...
│   ├── redux/                   # Логика redux toolkit
│   ├── App.js                   # Главный компонент, который рендерит страницы
│   ├── index.js                 # Точка входа для React-приложения
│   └── styles/                  # Стили для приложения
│       └── main.css             # Основные стили
│
├── .gitignore                   # Файл для игнорирования ненужных файлов в Git
├── package.json                 # Список зависимостей и скриптов проекта
└── README.md                    # Описание проекта
```

## ⚙️ Как запустить проект локально

### 1. Поднять бэкенд

Перейдите в репозиторий бэкенда и следуйте его инструкции по запуску:  
👉 [https://github.com/lenaevd/CirclesApp](https://github.com/lenaevd/CirclesApp)

Краткое изложение:
  1. Поднять базу данных запустив docker-compose.yml
  2. Стартануть сервер запустив класс CirclesApplication

Убедитесь, что:
- Бэкенд успешно запущен
- База данных PostgreSQL настроена и подключена
- API доступно

> ⚠️ **Важно**: фронтенд использует HTTP-запросы к API. Убедитесь, что CORS и порты настроены корректно. Бекэнд по умолчанию использует порт 8080.

### 2. Запустить фронтенд

Клонируйте репозиторий проекта на вашу локальную машину:

```bash
git clone https://github.com/Rinkiari/circles.git
```

После клонирования репозитория, установите все необходимые зависимости, выполнив следующую команду:

```bash
npm install
```

Теперь вы можете запустить проект в режиме разработки с помощью команды:

```bash
npm run start
```

После этого фронтенд по умолчанию будет доступен по адресу http://localhost:3000.
