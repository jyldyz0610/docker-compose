console.log("Todo Script läuft");
const apiUrl = "http://localhost:3000/";
// const apiUrl = "http://apigateway.awslambda.amazonaws.com/";

const container = document.getElementById('todo-container');
const tbody = document.getElementById('todo-tbody');
let list;


/* function getTodos() {
    // container.innerHTML = '';
    fetch(apiUrl + "todos")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let todos = data.todos;
            let table = document.getElementById('todo-table');
            let tbody = document.createElement('tbody');
            list = document.createElement('ul');
            list.setAttribute('class', 'list-group');
            todos.forEach((todo, index) => {
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.setAttribute('scope', 'row');
                th.innerHTML = index + 1;
                let firstTd = document.createElement('td');
                firstTd.innerHTML = todo.description;
                let secondaryTd = document.createElement('td');
                secondaryTd.innerHTML = todo.status;
                let thirdTd = document.createElement('td');


                let startButton = document.createElement('button');
                startButton.setAttribute('class', 'btn btn-primary btn-sm');
                startButton = updateButtonValue(startButton, todo.status);
                startButton.setAttribute('onclick', 'updateTodoStatus(' + todo.id + ');');
                let editButton = document.createElement('button');
                editButton.innerHTML = "Edit";
                editButton.setAttribute('onclick', 'editTodo(' + todo.id + ');');
                editButton.setAttribute('class', 'btn btn-info btn-sm');
                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = "Delete";
                deleteButton.setAttribute('onclick', 'deleteTodo(' + todo.id + ');');
                deleteButton.setAttribute('class', 'btn btn-danger btn-sm');

                thirdTd.appendChild(startButton);
                thirdTd.appendChild(editButton);
                thirdTd.appendChild(deleteButton);
                tr.appendChild(th);
                tr.appendChild(firstTd);
                tr.appendChild(secondaryTd);
                tr.appendChild(thirdTd);
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
        });
} */
function getTodos() {
    tbody.innerHTML = '';
    let source = document.getElementById('todo-item-template').innerHTML;
    let template = Handlebars.compile(source);
    fetch(apiUrl + "todos")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let todos = data.todos;
            todos.forEach((todo, index) => {
                todo.index = index + 1;
                todo.action = statusValue(todo.status);
                const html = template(todo);
                tbody.innerHTML += html;
            });
        });
}

function statusValue(status) {
    let text = "";
    if (status === 'open') {
        text = "Start";
    } else if (status === 'in progress') {
        text = "Beenden";
    } else {
        text = "Fertig";
    }
    return text;
}

function sendTodo() {
    // Value vom input auslesen und an die Api via POST senden
    const input = document.getElementById('todo-item');
    if (input.value) {
        console.log(input.value);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "todo": input.value })
        }
        fetch(apiUrl + "todo", options)
            .then(response => {
                console.log("Response: ", response);
                getTodos();
            })
    } else {
        alert("Todo Item darf nicht leer sein!");
    }

}

function updateTodoStatus(id) {
    console.log("Update Todo ", id);
    const options = {
        method: "PUT"
    }
    fetch(apiUrl + 'todo/' + id, options)
        .then(response => {
            getTodos();
            console.log("PUT Response", response);
        })
}

function updateTodoItem(description, id) {
    console.log("Update Todo ", id);
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "todo": description })
    }
    fetch(apiUrl + 'todo/' + id, options)
        .then(response => {
            console.log("PATCH Response", response);
            getTodos();
        })
}

function deleteTodo(id) {
    console.log("Delete Todo ", id);
    const options = {
        method: "DELETE"
    }
    fetch(apiUrl + 'todo/' + id, options)
        .then(response => {
            getTodos();
            console.log("DELETE Response", response);
        })
}

function editTodo(id) {
    fetch(apiUrl + 'todo/' + id)
        .then(response => response.json())
        .then(item => {
            console.log("ITEM", item.todo[0])
            let itemData = item.todo[0];
            const myModal = new bootstrap.Modal('#myModal', {});
            const iteminput = document.getElementById('item');
            const closebutton = document.getElementById('dialog-close');
            const savebutton = document.getElementById('dialog-save');
            closebutton.onclick = () => myModal.hide();
            savebutton.onclick = () => {
                myModal.hide();
                updateTodoItem(iteminput.value, id);
            }
            iteminput.value = itemData.description;
            myModal.show();
        });
}

getTodos();


