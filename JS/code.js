const deg = 6;
const hr = document.querySelector('#hr')
const sc = document.querySelector('#sc')

setInterval(() => {

    let day = new Date();
    let h = day.getHours() * 30;
    let m = day.getMinutes() * deg;
    let s = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(h) + (m / 12)}deg)`;
    mn.style.transform = `rotateZ(${(m)}deg)`;
    sc.style.transform = `rotateZ(${(s)}deg)`;
})

// -----------------digital.clock

const dgClock = document.querySelector('.dg-clock')

function hexClock() {
    let day = new Date();
    let h = day.getHours().toString();
    let m = day.getMinutes().toString();
    let s = day.getSeconds().toString();


    if (h.length < 2) {
        h = '0' + h;
    }
    if (m.length < 2) {
        m = '0' + m;
    }
    if (s.length < 2) {
        s = '0' + s;
    }

    let clockString = h + ':' + m + ':' + s;

    dgClock.textContent = clockString;

};

hexClock()
setInterval(hexClock, 100);


// ToDoList

// Находим элементы на странице
const form = document.querySelector('#form');
const taskNameInput = document.querySelector('.enter-name');
const taskInput = document.querySelector('.enter-task');
const tasksList = document.querySelector('#tasksList');
// const emptyList = document.querySelector('.card-title');
const sortBtn = document.querySelector('.sort-tasks');
const clock = document.querySelector('.clock')
const selectName = document.querySelector('#selectName')
const addNameBtn = document.querySelector('.add-Name')

let arr = [];
let arr2 = [];

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);
sortBtn.addEventListener("click", sortTasks);
clock.addEventListener("mouseover", changeColor);
// addNameBtn.addEventListener('onclick', nameAdd)

if (localStorage.getItem('tasks')) {
    arr = JSON.parse(localStorage.getItem('tasks'))
}
if (localStorage.getItem('nameGuests')) {
    arr2 = JSON.parse(localStorage.getItem('nameGuests'))
}

let tasks = arr;

tasks.forEach((tasks) => {
    renderTask(tasks)
});

window.onload = function () {
    shake()
    for (let i = 0; i < arr2.length; i++) {
        let optionElement = selectName.querySelector("option[value='" + arr2[i].name + "']")
        if (!optionElement) {
            optionElement = document.createElement('option');
            optionElement.value = arr2[i].name;
            optionElement.text = arr2[i].name;
            selectName.append(optionElement)
            optionElement.selected = true
            optionElement.style.color = getRandomColor()
        }
    }
};

function changeColor(e) {
    clock.style.border = "2px solid" + getRandomColor();
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function sortTasks() {

    let count = tasks.length - 1;
    let swapped;
    do {
        swapped = false
        for (let i = 0; i < count; i++) {
            if (tasks[i].text.length > tasks[i + 1].text.length) {
                let temp = tasks[i];
                tasks[i] = tasks[i + 1];
                tasks[i + 1] = temp;
                swapped = true
            };
        };
        count -= 1;
    } while (swapped);

    let li = document.getElementsByTagName('li');
    // debugger

    for (let i = 0; i < li.length; i++) {
        tasks[i].borderWhite == false;
        if (i % 2 == 0) {
            li[i].classList.add('border--white')
            tasks[i].borderWhite == true;
        }
    }

    saveLocalStorage();
    window.location.reload();
};

function shake() {
    let sortStatys = false;
    let clock = document.querySelector('.clock')

    clock.onanimationend = function () {
        clock.classList.remove("anim");
    };
    if (sortStatys) {
    } else {
        clock.classList.add("anim");
    }
};

addNameBtn.onclick = function nameAdd() {

    let inpName = taskNameInput.value;

    if (inpName == '') {
        return alert('Enter the name')
    }

    let optionElement = selectName.querySelector("option[value='" + inpName + "']")

    if (optionElement) {
        return alert('this member already exist')
    }
    if (!optionElement) {
        optionElement = document.createElement('option');
        optionElement.value = inpName;
        optionElement.text = inpName;
        selectName.append(optionElement)
        optionElement.selected = true
        optionElement.style.color = getRandomColor()
    }
    let selectedIndex = selectName.selectedIndex;
    let options = selectName.options;
    let text = options[selectedIndex].textContent;
    const nameGuest = {
        name: text,
        idGs: Date.now()
    };
    arr2.push(nameGuest)

    // for (let i = 0; i < arr2.length; i++) {
    //     if (arr2[i].name >= 3) {
    //         console.log('pawut')
    //     }
    // }

    // console.log(arr2)
    saveLocalStorage()
    taskNameInput.value = '';
    taskNameInput.focus()
};

function addTask(event) {

    event.preventDefault()

    let day = new Date();
    let h = day.getHours().toString();
    let m = day.getMinutes().toString();
    let s = day.getSeconds().toString();

    if (h.length < 2) {
        h = '0' + h;
    }
    if (m.length < 2) {
        m = '0' + m;
    }
    if (s.length < 2) {
        s = '0' + s;
    }

    let clockString = h + ':' + m + ':' + s;

    let hr = document.querySelector('.hr');
    let mn = document.querySelector('.mn');
    let sc = document.querySelector('.sc');

    function changeColorHand() {
        hr.style.setProperty('--beforeBack', getRandomColor());
        mn.style.setProperty('--beforeBack', getRandomColor());
        sc.style.setProperty('--beforeBack', getRandomColor());

    }
    changeColorHand()

    const taskText = taskInput.value;

    let selectedIndex = selectName.selectedIndex;
    let options = selectName.options;
    let text = options[selectedIndex].textContent;


    if (taskInput === '') {
        return alert('you are gay')
    }

    const newTask = {
        id: Date.now(),
        time: clockString,
        name: text,
        text: taskText,
        borderWhite: true,
        done: false
    };

    tasks.push(newTask);
    // for (let i = 0; i < arr2.length; i++) {
    //     if (arr2[i].name >= 3) {
    //         console.log('pawut')
    //     }
    // }
    renderTask(newTask);

    saveLocalStorage()

    taskNameInput.value = ''
    taskInput.value = ''
    taskInput.focus();
};

function deleteTask(event) {

    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);
        // const id2 = Number(arr2.id)
        tasks = tasks.filter((task) => task.id !== id);
        arr2 = arr2.filter((arr2) => arr2.idGs !== id);

        saveLocalStorage()

        parentNode.remove();
    }

};

function doneTask(event) {
    if (event.target.dataset.action === 'done') {

        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);
        const task = tasks.find((task) => task.id === id);
        task.done = !task.done

        saveLocalStorage()

        const taskTitle = parentNode.querySelector('.task-text');
        taskTitle.classList.toggle('task-title--done');

    }
};

function renderTask(tasks) {

    const cssDone = tasks.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `
    <li id ="${tasks.id}" class="list-group-item d-flex justify-content-between task-item ">
    <span class="visitor-name">${tasks.name}</span>
    <div class="timeTaskAdd">${tasks.time}</div>
    <span class="task-text ${cssDone}">${tasks.text}</span>
    <div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-addDelete add">
    <img class="mark" alt="done" src="/img/icons8-done-48.png" alt="checkmark"
    width="30" height="30">
    </button>
    <button type="button" data-action="delete" class="btn-addDelete delete">
    <img class="mark" src="/img/icons8-multiply-48.png" alt="crossmark" width="30"
    height="30">
    </button>
    </div>
    </li>
    `;
    // let newArr = [];
    let count = 0;
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr2[i].name === arr[j].name) {
                count++;
            }
            if (count >= 3) {
                // debugger
                let li = document.getElementsByClassName('list-group-item')
                for (let k = 0; k < li.length; k++) {
                    let span = document.getElementsByClassName('visitor-name');
                    if (span[k].innerHTML == arr[j].name) {
                        span[k].classList.add('border--5')
                    }
                }
                count = 0;
            }
            // if (j == arr.length - 1) {
            //     let obj = {
            //         name: arr[j].name,
            //         counter: count,
            //         border: false
            //     }
            //     newArr.push(obj)
            // }
        }
    }

    // for (let i = 0; i < newArr.length; i++) {
    //     if (newArr[i].counter >= 3) {

    //     }
    // }
    // console.log(newArr);
    // console.log(count)

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    let li = document.getElementsByTagName('li');


    // for (let i = 1; i < li.length; i += 2) {
    //     if (arr[i].borderWhite == true) {
    //         li[i].classList.add('border--white')
    //     }
    // }
};

function saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('nameGuests', JSON.stringify(arr2));
};

//                             - при прохождении минуты должен издаваться короткий звук
//                             - если человек  не меняет имя и добовляет дело - имя не меняеться
//  если имя изменили  то соответсвенно на деле которое добавили имя так же меняеться
//                             - у каждого имени свой цвет, при добавлении нового новый цвет(цвета не должны  поторяться
//  если у одного человека накапливаеться 3 дела  в списке все дела этого человека помещаються в  толстую  рамку  черного цвета 

