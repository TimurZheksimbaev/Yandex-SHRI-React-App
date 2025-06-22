# Межгалактическая Аналитика

React-приложение для анализа CSV файлов с данными о расходах различных цивилизаций в галактических кредитах.

## 🚀 Инструкции по запуску

### Требования
- Node.js (версия 16 или выше)
- npm или yarn

### Установка и запуск

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/TimurZheksimbaev/Yandex-SHRI-React-App.git
   cd Yandex-SHRI-React-App
   ```

2. **Установка зависимостей фронтенда**
   ```bash
   npm install
   ```

3. **Откройте новую вкладку терминала. Клонирование и Установка зависимостей бэкенда**
   ```bash
   git clone https://github.com/etozhenerk/shri2025-back.git
   cd shri2025-back
   npm install
   ```

4. **Запуск бэкенда**
   ```bash
   npm start
   ```
   Бэкенд будет на `http://localhost:3000`

5. **Запуск фронтенда**
   ```bash
   npm run dev
   ```
   Фронтенд будет доступен на `http://localhost:5173`

### Доступные скрипты

**Фронтенд:**
- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run preview` - предварительный просмотр сборки
- `npm run lint` - проверка кода линтером

**Бэкенд:**
- `npm run start` - запуск сервера

## 🏗️ Архитектура

### Общая структура

Проект состоит из двух основных частей:
- **Frontend** (React + TypeScript + Vite)
- **Backend** (Node.js + Fastify)

#### Технологический стек Frontend

- **React 18** - основная библиотека UI
- **TypeScript** - типизация
- **Vite** - сборщик и dev-сервер
- **CSS Modules** - изолированные стили
- **ESLint** - линтинг кода

#### Ключевые компоненты

1. **Header** - навигационная панель с логотипом и меню
2. **Home** - основная логика приложения, управление состоянием
3. **DropZone** - drag & drop загрузка файлов с различными состояниями
4. **AnalyticsResults** - отображение результатов в виде карточек
5. **LoadingDisplay** - индикатор загрузки с прогрессом
6. **CompletedDisplay** - состояние успешного завершения

#### Управление состоянием

Используется встроенный React useState для управления:
- Загруженный файл
- Состояние загрузки/завершения
- Результаты аналитики
- Прогресс обработки
- Ошибки

#### Кастомные хуки

- **useDragAndDrop** - обработка drag & drop функциональности

### Backend архитектура

```
shri2025-back/
├── src/
│   ├── cmd/            # Команды и плагины
│   │   ├── bootstrap.js
│   │   ├── serve.js
│   │   └── plugins/    # Fastify плагины
│   ├── pkg/            # Основная бизнес-логика
│   │   ├── aggregator/ # Агрегация данных
│   │   └── generateReport/ # Генерация отчетов
│   └── routes/         # API маршруты
│       ├── aggregate.js
│       └── report.js
└── index.js
```

#### Технологический стек Backend

- **Node.js** - серверная платформа
- **Fastify** - веб-фреймворк
- **CSV Parser** - обработка CSV файлов
- **Multipart** - обработка файлов
- **CORS** - поддержка кросс-доменных запросов

#### API Endpoints

1. **POST /aggregate** 
   - Обработка CSV файлов
   - Streaming JSON ответ с прогрессом
   - Параметры: `rows` (лимит обработки)

2. **GET /report**
   - Генерация тестовых CSV файлов
   - Параметры: `size`, `withErrors`, `maxSpend`

### Интеграция Frontend-Backend

#### API Service (`src/services/api.ts`)

- **ApiService.aggregateFile()** - отправка файла и получение результатов
- **ApiService.generateReport()** - генерация тестовых данных
- Поддержка streaming для real-time обновлений
- Типизация всех API ответов
