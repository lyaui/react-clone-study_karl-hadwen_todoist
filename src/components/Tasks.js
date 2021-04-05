import React from 'react';
import Checkbox from './Checkbox';
import { useTasks } from '../hooks';

function Tasks() {
  const { tasks } = useTasks('1');
  console.log(tasks);
  let projectName = '';
  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>
      {tasks.map((task) => (
        <li key={task.id}>
          <Checkbox id={task.id}></Checkbox>
          <span>{task.task}</span>
        </li>
      ))}
    </div>
  );
}

export default Tasks;
