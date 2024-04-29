import useVisibleTodos from '../hooks/useVisibleTodos';
import useToggleTodo from '../hooks/useToggleTodo';
import Todo from './Todo';

const VisibleTodoList = () => {
  const visibleTodos = useVisibleTodos();
  const toggleTodo = useToggleTodo();
  return (
    <ul>
      {visibleTodos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
