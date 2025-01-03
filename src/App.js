import "./App.css";
import TodoApp from "./components/TodoApp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div
            className=""
            style={{
                textAlign: "center",
                fontSize: "40px",
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                backgroundColor: "floralwhite",
            }}
        >
            <TodoApp />
        </div>
    );
}

export default App;
