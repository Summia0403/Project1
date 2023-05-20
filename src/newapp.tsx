import { useState } from 'preact/hooks';
import './app.css';

interface Task {
  description: string;
  completed: boolean;
}

interface SearchTaskProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

function SearchTask(
  {
    searchText,
    setSearchText
  }: SearchTaskProps
  ) {
  
  const handleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setSearchText(target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search task"
      />
    </div>
  );
}


interface AddTaskProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

function AddTask({ setTasks, tasks }: AddTaskProps) {
  const [currentTask, setCurrentTask] = useState<string>("");

  const handleCurrentTask = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setCurrentTask(target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      description: currentTask,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setCurrentTask("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add task"
        value={currentTask}
        onChange={handleCurrentTask}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}
function TaskList({ tasks }: { tasks: Task[] }) {
  // TODO: Filter tasks based on search text
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  // Filter tasks based on search text
  const handleFilterTasks = (searchText: string) => {  
    const filteredTasks = tasks.filter(task =>
      task.description.includes(searchText)
    );
    setFilteredTasks(filteredTasks);
  };

  const handleSearchTextChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newSearchText = target.value;
    setSearchText(newSearchText);
    handleFilterTasks(newSearchText);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search task"
      />
      <ul>
        {filteredTasks.map(task => (
          <li key={task.description}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
}


export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  return (
    <>
      <SearchTask
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaskList tasks={tasks}/>
    </>
  )
}