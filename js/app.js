/**
 * What do we want to do?
 * 
 * Input tasks
 * Mark as completed
 * List the tasks
 * award
 * count completed tasks
 */

// grab each element

const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskList = document.getElementById('taskList')
const completedBtn = document.getElementById('completedBtn')
const completedList = document.getElementById('completedList')
const completedTasks = document.getElementById('completedTasks')

// array of tasks

let taskArray = []

/**
 * let task = {
 *      id: 1,
 *      task: 'clean bathroom'
 *      dateCreated: '12-03'
 *      isComplete: true
 * }
 */

let task = {
    id: taskArray.length,
    task: '',
    dateCreated: '',
    dateCompleted: '',
    isComplete: false
}

// addTaskBtn
addTaskBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    validateInput()
})

// take input
const validateInput =()=> {
    

    if (taskInput.value === '') {
        alert('Please enter a task before submitting')
    } else {

        for (let i = 0; i < taskArray.length; i++) {
            if (taskInput.value == taskArray[i].task) {
                alert('Task has already been added')
                taskInput.value = ''
                return
            }
        }
        makeTask(taskInput.value)
    }
    // if (taskInput.value === '') {
    //     alert('Please enter a task before submitting')
    // } else {
    //     makeTask(taskInput.value)
    // }

    // These two do the same thing. ^ v

    // taskInput.value === '' ? alert('Please enter a task before submitting') : makeTask(taskInput.value)

    taskInput.value = ''
}

// make task
const makeTask =(chore)=> {

    const timeStamp = new Date()

    task = {
        id: taskArray.length + 1,
        task: chore,
        isCompleted: false,
        dateAdded: timeStamp.toString(),
        dateCompleted: ''
    }

    addTask(task)
}

const addTask =(obj)=> {

    taskArray = [...taskArray, obj]

    // console.log(taskArray)
    makeTaskItem(taskList, obj)
}

// make li for each task
const makeTaskItem =(el, item)=> {

    const li = document.createElement('li')
    li.classList.add('list-group-item')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', `taskId-${item.id}`)
    checkbox.setAttribute('data-id', `${item.id}`)
    checkbox.classList.add('form-check-input', 'checkbox')

    const label = document.createElement('label')
    label.setAttribute('for', `taskId-${item.id}`)
    label.classList.add('form-check-label', 'text-capitalize', 'mx-2', 'task-label')

    //label.innerText = `${item.task} - Date Created: ${item.dateAdded}`
    const taskSpan = document.createElement('span')
    taskSpan.classList.add('task-span')
    taskSpan.innerText = item.task

    const dateAddedSpan = document.createElement('span')
    dateAddedSpan.classList.add('date-added')
    dateAddedSpan.innerText = ` | ${item.dateAdded}`

    label.appendChild(taskSpan)
    label.appendChild(dateAddedSpan)

    li.appendChild(checkbox)
    li.appendChild(label)

    el.appendChild(li)
}

completedBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    // console.log('clicked')
    validateCompletedTasks()
})

// validate checked tasks
const validateCompletedTasks =()=> {
    let completedArray = []
    const checkboxes = document.querySelectorAll('.checkbox')
    
    // testing...
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked && (checkboxes[i].getAttribute('data-id') == taskArray[i].id)) {
                taskArray[i] = {
                    ...taskArray[i],
                    isCompleted: true,
                    dateCompleted: new Date().toString()
                }
            }
        }

        for (let i = 0; i < taskArray.length; i++) {

            if (taskArray[i].isCompleted) {
                completedArray = [...completedArray, taskArray[i]]
            }
        }

    // end testing...

    completedTasks.innerText = completedArray.length
    makeCompleteItem(completedArray)
}

// make li for completedList
const makeCompleteItem =(arr)=> {

    arr.forEach(item => {
        const task = item.task
        const dateCompleted = item.dateCompleted

        const completedItem = document.createElement('li')
        completedItem.classList.add('list-group-item', 'text-success', 'text-capitalize', 'completed-item')
        completedItem.innerText = `${task} | completed: ${dateCompleted}`
        
        completedList.appendChild(completedItem)
    })
}