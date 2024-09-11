import React from 'react';

type PropsType = {
  title: string;
};

export const Todolist = (props: PropsType) => {
  return (
    <div>
      <div>
        {/* <h3>What to learn</h3> */}
        <h3>{props.title}</h3>
      </div>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <li>
          <input type="checkbox" checked={true} />
          <span> HTML&CSS</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span> JS</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span> React</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
