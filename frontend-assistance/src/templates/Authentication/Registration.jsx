import React, { useState } from "react";
import { hashPassword } from "../../utils/PasswordUtil";

function Registration({ isLogin, setIsLogin, handleRegistration }) 
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [pass_word, setPass_word] = useState("");
  return (
    <div>
      <div className="auth__title">
        <span>Sign Up</span>
        <p>Create your account</p>
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHERS">Other</option>
        </select>
      </div>
      <input
        type="email"
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
          handleRegistration({
            firstName,
            lastName,
            dob,
            gender,
            emailAddress: email,
            password: await hashPassword(pass_word),
          })
        }
      >
        Register
      </button>
      <p className="btn-member" onClick={() => setIsLogin(!isLogin)}>
        Already have an account? Log in
      </p>
    </div>
  );
}

export default Registration;
