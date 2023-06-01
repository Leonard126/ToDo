import { NoteList } from './NoteList.js'

// Класс одной записи
export class Note {

    _name = ''
    _done = false

    // Конструктор создания одной записи
    // container - куда добавить запись DOM-элемент или экземпляр класса списка NoteList
    constructor(container, name = "", done = false) {
        this.item = document.createElement("div");
        this.buttonGroup = document.createElement("div");
        this.nameSpan = document.createElement("span");
        this.doneButton = document.createElement("button");
        this.deleteButton = document.createElement("button");

        this.item.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );

        this.buttonGroup.classList.add("btn-group", "btn-group-sm");
        this.doneButton.classList.add("btn", "btn-success");
        this.doneButton.textContent = "Готово";
        this.deleteButton.classList.add("btn", "btn-danger");
        this.deleteButton.textContent = "Удалить";

        // Привязка события к кнопке изменения статуса
        this.doneButton.addEventListener("click", () => {
            this.item.classList.toggle("list-group-item-success");
            this.done = !this.done

            // Если контейнером является экземпляр класса списка NoteList, то сохраняем там обновление
            if (container instanceof NoteList) {
                container.save()
            }
        });

        // Приявзка события к кнопке удаляения
        this.deleteButton.addEventListener("click", () => {
            if (confirm('Вы уверены?')) {

                // Удялем запись
                this.delete()

                // Если контейнером является экземпляр класса списка NoteList, то удаляем запись в классе списка
                if (container instanceof NoteList) {
                    container.remove(this)
                }
            }
        });

        this.buttonGroup.append(this.doneButton);
        this.buttonGroup.append(this.deleteButton);
        this.item.append(this.nameSpan);
        this.item.append(this.buttonGroup);

        this.name = name
        this.done = done
        this.container = container

        // Если контейнером является экземпляр класса списка NoteList, то добавляем элемент в список NoteList  
        if (container instanceof NoteList) {
            container.list.append(this.item)
        } else {
            // В противном случем в контейнер
            container.append(this.item)
        }
    }

    // Удаление записи
    delete() {
        this.item.remove();
    }

    // Сеттер установки имени записи
    set name(value) {
        this._name = value
        this.nameSpan.textContent = value
    }

    // Геттер получения имени записи
    get name() {
        return this._name
    }

    // Сеттер изменения статуса записи
    set done(value) {
        this._done = value
        if (value == true) {
            this.item.classList.add('list-group-item-success')
        } else {
            this.item.classList.remove('list-group-item-success')
        }
    }

    // Геттер получения статуса записи
    get done() {
        return this._done
    }
}
