import { DeleteForever, DoneAll } from '@material-ui/icons';

const Todo = ({ todo, onDoneTodo, onDeleteItem }) => {
  return (
    <div className="items">
      <div style={{ display: 'flex' }}>
        <DoneAll
          style={{ color: '#90c695', cursor: 'pointer', paddingRight: '10px' }}
          onClick={() => onDoneTodo(todo)}
        />
        <p>{todo.todo}</p>
      </div>
      <DeleteForever
        style={{ color: '#F88379', cursor: 'pointer' }}
        onClick={() => onDeleteItem('todo', todo)}
      />
    </div>
  );
};

export default Todo;
