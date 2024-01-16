import React from 'react';

function Task(props){
    return (
        <div className='task' onClick={() => props.handleClick(props.id, !props.isFinished, props.task, props.detail)}>
            <h3>{props.task}</h3>
            <p>{props.detail}</p>
        </div>
    )
}

export default Task;