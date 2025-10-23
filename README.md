# 🚀 json-db-serve

<div align="center">

**Мгновенный REST API из JSON-файла**  
*Идеально для фронтенд-разработки и изучения API*

[![npm version](https://img.shields.io/npm/v/json-db-serve.svg?color=green)](https://www.npmjs.com/package/json-db-serve)
[![license](https://img.shields.io/npm/l/json-db-serve.svg)](https://github.com/your-username/json-db-serve/blob/main/LICENSE)

*«Подними API быстрее, чем успеешь заварить кофе»* ☕

</div>

## 🤔 Что это?

**json-db-serve** — это супер-простой локальный сервер, который превращает ваш обычный JSON-файл в полноценный REST API с возможностями CRUD.

### 🎯 Идеально для:
- ✅ **Фронтенд-разработки** (React, Vue, Angular) когда бэкенд ещё не готов
- ✅ **Изучения REST API** — лучший способ понять как работают запросы
- ✅ **Прототипирования** — быстро проверить идею
- ✅ **Демо-проектов** и презентаций
- ✅ **Тестирования** мобильных приложений

---

## ⚡ Быстрый старт (за 60 секунд)

### 1. Установка
```bash
npm install -g json-db-serve
```

### 2. Создайте базу данных
Создайте файл `db.json`:
```json
{
  "users": [
    { "id": 1, "name": "Вася Пупкин", "email": "vasya@test.ru" }
  ],
  "posts": [
    { "id": 1, "title": "Мой первый пост", "author": "Вася" }
  ]
}
```

### 3. Запустите сервер
```bash
json-db-serve --db ./db.json --port 3000
```

### 4. Проверьте работу
Откройте в браузере:  
`http://localhost:3000/users`

**Готово! 🎉 Ваш API работает!**

---

## 📚 Полное руководство

### 🗃️ Структура базы данных

Каждый ключ в JSON — это **коллекция** (как таблица в базе):

```json
{
  "users": [],
  "posts": [],
  "products": [],
  "comments": []
}
```
👥 users - пользователи, 📝 posts - посты, 🛍️ products - товары, 💬 comments - комментарии

### 🔌 Доступные эндпоинты

| Метод | URL | Действие |
|-------|-----|----------|
| `GET` | `/users` | Получить всех пользователей |
| `GET` | `/users/1` | Получить пользователя с id=1 |
| `POST` | `/users` | Создать нового пользователя |
| `PATCH` | `/users/1` | Обновить пользователя с id=1 |
| `PUT` | `/users/1` | Заменить пользователя с id=1 |
| `DELETE` | `/users/1` | Удалить пользователя с id=1 |

### 💻 Примеры использования API

#### 📥 Получение данных
```bash
# Получить всех пользователей
GET http://localhost:3000/users

# Получить конкретного пользователя
GET http://localhost:3000/users/1
```

#### 📤 Создание данных
```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Мария",
  "email": "maria@example.com",
  "age": 25
}
```
*✅ ID создастся автоматически!*

#### ✏️ Обновление данных
```bash
PATCH http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Новое имя"
}
```

#### 🔄 Полная замена
```bash
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Полностью новые данные",
  "email": "new@email.com"
}
```

#### 🗑️ Удаление данных
```bash
DELETE http://localhost:3000/users/1
```

---

## 🛠️ Использование во фронтенде

### 🌐 JavaScript (Fetch API)
```javascript
// Получить всех пользователей
async function getUsers() {
  const response = await fetch('http://localhost:3000/users');
  const users = await response.json();
  return users;
}

// Создать нового пользователя
async function createUser(userData) {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return await response.json();
}

// Обновить пользователя
async function updateUser(userId, updates) {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });
  return await response.json();
}

// Удалить пользователя
async function deleteUser(userId) {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE'
  });
  return response.ok;
}
```

### ⚡ React Hook пример
```jsx
import { useState, useEffect } from 'react';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка пользователей
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    const newUser = await createUser(userData);
    setUsers(prev => [...prev, newUser]);
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Пользователи ({users.length})</h2>
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### 🅰️ Angular Service пример
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, updates: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${id}`, updates);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
```

### ⚡ Vue 3 Composition API пример
```vue
<template>
  <div>
    <div v-for="user in users" :key="user.id" class="user">
      {{ user.name }} - {{ user.email }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const response = await fetch('http://localhost:3000/users')
  users.value = await response.json()
})
</script>
```

---

## ⚙️ Настройки и параметры

### 🔧 Параметры командной строки

```bash
# Базовый запуск
json-db-serve --db ./db.json

# Свои порт и хост
json-db-serve --db ./data.json --port 8080 --host localhost

# Запуск с задержкой (имитация реального сервера)
json-db-serve --db ./db.json --delay 1000

# Читаемый JSON в файле
json-db-serve --db ./db.json --pretty
```

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `--db` | `./db.json` | Путь к JSON-файлу |
| `--port` | `3000` | Порт сервера |
| `--host` | `localhost` | Хост сервера |
| `--delay` | `0` | Задержка ответа (мс) |
| `--pretty` | `false` | Читаемый JSON в файле |
| `--help` | - | Показать справку |

### 🗂️ Использование разных файлов

```bash
# Любое имя файла
json-db-serve --db ./src/data/api-data.json

# Файл в другой директории
json-db-serve --db ../shared/mock-data.json

# Относительные пути
json-db-serve --db data.json
```

---

## ❓ Частые вопросы (FAQ)

### 🤔 Коллекции создаются автоматически?
**Да!** Если вы отправите POST-запрос на несуществующую коллекцию, она создастся автоматически.

```bash
# Коллекции "categories" ещё нет - она создастся!
POST http://localhost:3000/categories
{
  "name": "Электроника"
}
```

### 💾 Сохраняются ли изменения?
**Да!** Все изменения (POST, PATCH, PUT, DELETE) сразу записываются в ваш JSON-файл.

### 🔄 Нужно перезапускать сервер при изменении файла?
**Нет!** Сервер автоматически отслеживает изменения в файле. Можно редактировать JSON вручную - изменения подхватятся.

### 🆔 Кто генерирует ID?
**Сервер автоматически** присваивает следующий доступный ID при создании новых записей.

### 🌐 Можно ли использовать с мобильными приложениями?
**Да!** Просто убедитесь, что устройство в той же сети, и используйте IP вместо localhost:

```javascript
// Вместо localhost используйте IP компьютера
const API_URL = 'http://192.168.1.100:3000';
```

---

## 🚀 Примеры реальных сценариев

### 🛒 Интернет-магазин
```json
{
  "products": [
    { "id": 1, "name": "iPhone", "price": 999, "category": "phones" },
    { "id": 2, "name": "MacBook", "price": 1999, "category": "laptops" }
  ],
  "categories": [
    { "id": 1, "name": "phones" },
    { "id": 2, "name": "laptops" }
  ],
  "orders": [
    { "id": 1, "productId": 1, "quantity": 2, "status": "completed" }
  ]
}
```

### 📱 Социальная сеть
```json
{
  "users": [
    { "id": 1, "name": "Анна", "avatar": "anna.jpg" }
  ],
  "posts": [
    { "id": 1, "userId": 1, "content": "Привет мир!", "likes": 15 }
  ],
  "comments": [
    { "id": 1, "postId": 1, "userId": 1, "text": "Отличный пост!" }
  ]
}
```

---

## 🔮 Планы развития

### 🎯 Скоро в новых версиях:
- 🔍 **Фильтрация и поиск** (`?_sort=name&_order=asc`)
- 📄 **Пагинация** (`?_page=1&_limit=10`)
- 🎲 **Генерация тестовых данных** (Faker.js)
- 🔐 **Мок-авторизация** (JWT tokens)
- 📁 **Раздача статических файлов** (`/uploads`)
- 🚀 **Команда `--init`** для быстрой настройки
- 🌐 **CORS настройки**
- 📊 **Статистика и логи**

---

## 🆘 Помощь и поддержка

### 🐛 Нашли ошибку?
[Создайте issue](https://github.com/itsisoev/json-db-serve/issues) с описанием проблемы.

### 💡 Есть идея?
Предложите новую функцию через Issues!

### ❓ Нужна помощь?
```bash
# Полная справка
json-db-serve --help

# Проверка версии
json-db-serve --version
```

---

## 📄 Лицензия

MIT © [itsisoev]

---

<div align="center">

**Сделано с ❤️ для разработчиков**

*Если проект помог вам - поставьте ⭐ на GitHub!*

</div>
