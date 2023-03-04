import {Route,Routes,BrowserRouter} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
