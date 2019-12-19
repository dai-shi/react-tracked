import { TodoType, VisibilityFilterType, useTrackedState } from '../state';

const getVisibleTodos = (todos: TodoType[], filter: VisibilityFilterType) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const useVisibleTodos = () => {
  const state = useTrackedState();
  return getVisibleTodos(state.todos, state.visibilityFilter);
};

export default useVisibleTodos;
