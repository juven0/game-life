import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Toast from "./components/toast/toast";
import Login from "./pages/login/login";
import Main from "./pages/main/main";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/play/:roomId" element={<Main />} />
        </Routes>
      </Router>
      <Toast />
    </div>
  );
}

export default App;
