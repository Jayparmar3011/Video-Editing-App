import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Editor from "./components/Editor/Editor";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/editor"
        element={
          isLoggedIn ? <Editor /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;