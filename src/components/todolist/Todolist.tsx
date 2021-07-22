import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import css from './todolist.module.css'
import {FilterType} from "../../App";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number | string) => void
    changeFilter: (filt: FilterType) => void
    addTask: (newTask: string) => void
    changeTaskStatus: (id: number | string, isDone: boolean) => void
    filter: FilterType
}

type TaskType = {
    id: number | string
    title: string
    isDone: boolean
}

function Todolist(props: PropsType) {
    let title = props.title;
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const addNewTask = () => {
        if (inputText.trim() !== '') {
            props.addTask(inputText);
            setInputText('');
        } else {
            setError('This is required');
        }

    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(inputText);
            setInputText('');
        }
    };
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    return (
        <>
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={inputText}
                           onKeyPress={onKeyPressHandler}
                           onChange={onChangeHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addNewTask}> +
                    </button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map(i => {
                        const removeTask = () => props.removeTask(i.id);

                        return <li key={i.id} className={`${css.rightPosition}`}>
                            <input type="checkbox"
                                   checked={i.isDone}
                                   onChange={(e) => {
                                       props.changeTaskStatus(i.id, e.currentTarget.checked);
                                   }}
                            />
                            <span className={i.isDone? 'is-done': ''}>{i.title}</span>
                            <button onClick={removeTask}>X
                            </button>
                        </li>
                    })}

                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'active-filter': ''}
                        onClick={onAllClickHandler}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter': ''}
                        onClick={onActiveClickHandler}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter': ''}
                        onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </>
    )
}

export default Todolist;