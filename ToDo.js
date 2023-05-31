import { NoteList } from './NoteList.js'
import { Note } from './Note.js'

// Класс приложения ToDo
export class ToDo {
    _currentUser = 'todo'
    _users = []
    _notes = null

    // Конструктор, который вызывается при инициализации (создании копии) класса
    // container - DOM-элемент, в котором будут созданы элементы
    // currentTitle - название пользователя, который будет создан при создании экземпляра класса
    // currentKey - ключ пользователя, который будет создан при создании экземпляра класса
    // currentDef - список дел по умолчанию у пользователя, который будет создан при создании экземпляра класса
    constructor(container, currentTitle = 'Список дел', currentKey = 'todo', currentDef = []) {
        this.container = container

        this.nav = document.createElement("nav")
        this.title = document.createElement("h2");
        this.form = document.createElement("form");
        this.input = document.createElement("input");
        this.buttonWrapper = document.createElement("div");
        this.button = document.createElement("button");
        this.list = document.createElement("div");

        this.container.classList.add('pt-5', 'pb-5')
        this.nav.classList.add("mb-5", "btn-group");
        this.form.classList.add("input-group", "mb-3");
        this.input.classList.add("form-control");
        this.input.placeholder = "Введите название нового дела";
        this.buttonWrapper.classList.add("input-group-append");
        this.button.classList.add("btn", "btn-primary");
        this.button.textContent = "Добавить дело";
        this.button.disabled = true;

        this.buttonWrapper.append(this.button);
        this.form.append(this.input);
        this.form.append(this.buttonWrapper);
        this.container.append(this.nav)
        this.container.append(this.title)
        this.container.append(this.form)
        this.container.append(this.list)

        this.input.addEventListener("input", () => {
            this.button.disabled = false;
            if (this.input.value.length == 0) {
                this.button.disabled = true;
            }
        });

        // Добавляем нового пользователя при создании
        this.addUser(currentTitle, currentKey, currentDef)

        // Установить текущего (созданного) пользователя
        this.currentUser = currentKey

        // Отправка формы добавления новго дела
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!this.input.value) {
                return;
            }
            if (this._notes) {
                this._notes.add(this.input.value)
            }

            this.button.disabled = true;
            this.input.value = '';

        });
    }

    // Сеттер - установка текущего пользователя
    set currentUser(value) {
        this._currentUser = value

        // Переменная, в которую сохраняем найденного пользователя из массива
        let currentUser = null

        // Ищем пользователя и меняем класс кнопок
        for (const user of this._users) {
            if (user.key == value) {
                currentUser = user
                user.button.classList.add('active')
            } else {
                user.button.classList.remove('active')
            }
        }

        // Меняем заголовок
        this.title.textContent = currentUser.title

        // Создаем список
        this._notes = new NoteList(this.list, this.currentUser, currentUser.def)
    }

    // Геттер - получение текущего пользователя
    get currentUser() {
        return this._currentUser
    }

    // Добавление пользователя
    addUser(title, key, def = []) {
        // Создание кнопки пользователя
        let button = document.createElement("button")
        button.classList.add("btn", "btn-outline-primary");
        button.type = "button"
        button.textContent = title

        button.addEventListener('click', () => {
            this.currentUser = key;
        })

        // Добавление пользователея в массив пользователей
        this._users.push({
            title: title,
            key: key,
            def: def,
            button: button
        })
        this.nav.append(button)
    }

    // Удаление пользователя по ключу
    removeUser(key) {
        // Проверка на кол-во пользователей. Всегда должно быть больше 0
        if (this._users.length <= 1) {
            console.log('Количество пользователей должно быть больше нуля');
            return
        }

        // Поиск пользователя в массиве и удаление
        for (let i = 0; i < this._users.length; i++) {
            if (this._users[i].key == key) {
                this._users[i].button.remove()
                this._users.splice(i, 1)
            }
        }

        // Если удаляем активного пользователя, то активным будет первый в массиве
        if (this.currentUser == key) {
            this.currentUser = this._users[0].key
        }

    }
}