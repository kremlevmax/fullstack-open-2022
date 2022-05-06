import "./App.css";
import Greeting from "./components/Greeting";
import Login from "./components/Login";
import Popup from "./components/Popup";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className='App'>
      <Popup>
        <Login />
      </Popup>
      <Greeting />
      <TaskList />
    </div>
  );
}

export default App;
