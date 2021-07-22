import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/todolist/Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTask] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ]);

    const addTask = (newTask: string) => {
        let task = {id: v1(), title: newTask, isDone: false};
        setTask([...tasks, task])
    }

    const [filter, setFilter] = useState<FilterType>('all');

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(i => i.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(i => i.isDone === true)
    }

    const changeFilter = (filt: FilterType) => {
        setFilter(filt);
    };

    const removeTask = (id: number | string) => {
        let newArr = tasks;
        let result = newArr.filter(i => i.id !== id);
        return setTask([...result]);
    }

    const changeStatus = (id: number | string, isDone: boolean) => {
        let newArr = tasks.find(i => i.id === id);
        if (newArr) {
            newArr.isDone = isDone;
            setTask([...tasks])
        }

    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      changeFilter={changeFilter}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />


        </div>
    );
}

export default App;
