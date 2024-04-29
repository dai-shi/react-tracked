import {
  useDispatch,
  // useUntrackedDispatch as useDispatch, // for unwrapping proxy
} from './store';
import type { TodoType } from './store';

type Props = {
  todo: TodoType;
};

const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
      />
      <input
        value={todo.detail.title}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_TODO', id: todo.id, title: e.target.value })
        }
      />
      <button
        type="button"
        onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'DUPLICATE_TODO', todo })}
      >
        Duplicate
      </button>
    </li>
  );
};

export default TodoItem;
