import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const STATIC_USER = "admin";
    const STATIC_PASS = "1234";

    if (userId === STATIC_USER && password === STATIC_PASS) {
      
      dispatch(
        login({
          id: "1",
          name: "Admin",
        })
      );

      navigate("/editor");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glowBg}></div>

      <div className={styles.box}>
        <div className={styles.header}>
          <h1>🎬 Video Editing Studio</h1>
          <p>Create, edit & transform your videos effortlessly</p>
        </div>

        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleLogin}>Start Editing</button>
      </div>
    </div>
  );
};

export default Login;