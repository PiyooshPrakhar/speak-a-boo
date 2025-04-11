import React, { useState } from "react";
import { hashPassword } from "../../utils/PasswordUtil";

function Login({ isLogin, setIsLogin, setIsForgotPassword, handleLogin }) {
  const [email, setEmail] = useState("");
  const [pass_word, setPass_word] = useState("");

  return (
    <div>
      <div className="auth__title">
        <span>Login</span>
        <p>Welcome back, please login to your account</p>
      </div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass_word}
        onChange={(e) => setPass_word(e.target.value)}
      />
      <button
        className="btn-signin"
        onClick={async() =>
          handleLogin({
            emailAddress: email,
            password: await hashPassword(pass_word),
          })
        }
      >
        Login
      </button>
      <p className="btn-member" onClick={() => setIsLogin(!isLogin)}>
        Not a member yet?
      </p>
      <p className="btn-member" onClick={() => setIsForgotPassword(true)}>
        Recover your password
      </p>
    </div>
  );
}

export default Login;
