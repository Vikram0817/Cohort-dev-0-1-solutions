import Task from './components/Tasks';
import { useState } from 'react';

function App() {
  const [taskData, setTaskData] = useState(
    {
      task:"", 
      detail:"",
    }
  );

  const [taskList, setTaskList] = useState([]);

  function handleChange(e){
    const {name, value} = e.target;
    setTaskData(prevValue => ({
      ...prevValue, [name]: value
    })
    );
  }

  function handleClick(){
    if(taskData.task == ""){
      alert("Add a task please!");
      return;
    }

    setTaskList(prevValue => [...prevValue, {
        task: taskData.task, 
        details: taskData.detail, 
        isFinished: false
      }]);
  }


  function handleTaskClick(id, newState, taskToUpdate, taskDetailsToUpdate){    
    setTaskList(prevList => prevList.map((taskDetails, idx) =>
      idx === id ? {...taskDetails, task: taskToUpdate, detail: taskDetailsToUpdate, isFinished: newState} : taskDetails 
      // here ...operater opens the object and then elemnts we specify are being updated in opend object
    ))
  }

  return (
    <>
      <div className='todo-container'>
        <div className='add-tasks'>
          <input name="task" value={taskData.task} onChange={handleChange} type="text" placeholder='add task'></input>
          <input name="detail" value={taskData.detail} onChange={handleChange} type="text" placeholder='add detail'></input>
          <button onClick={handleClick}>Add tasks</button>
        </div>
        <div className='task-lists'>
          <div className='left'>
            <h2>To - Do</h2>
            <div className='tasks'>
              {taskList.map((taskDetails, idx) => 
                taskDetails.isFinished === false && 
                <Task 
                  key={taskDetails.task} 
                  id={idx} 
                  task={taskDetails.task} 
                  detail={taskDetails.detail} 
                  isFinished={false}
                  handleClick={handleTaskClick} 
                />
              )}
            </div>
          </div>
          <div className='right'>
            <h2>Finished Tasks</h2>
            <div className='tasks'>
              {taskList.map((taskDetails, idx) => 
                taskDetails.isFinished === true && 
                <Task 
                  key={taskDetails.task} 
                  id={idx} 
                  task={taskDetails.task} 
                  detail={taskDetails.detail} 
                  isFinished={true}
                  handleClick={handleTaskClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

