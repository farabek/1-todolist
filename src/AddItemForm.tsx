import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';

type PropsType = {
  addItem: (title: string) => void;
};

const AddItemForm = ({ addItem }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      addItem(taskTitle.trim());
      setTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      addTaskHandler();
    }
  };

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
      />
      <Button title={'+'} onClick={addTaskHandler} />
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};
export default AddItemForm;
