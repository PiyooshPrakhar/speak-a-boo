import React, { useState, useEffect } from "react";
import { hashPassword } from '../../utils/PasswordUtil'
import { toast } from "react-toastify";

function ForgotPassword({
  handleForgotPassword,
  setIsForgotPassword,
  userProfile,
}) {
  const [emailAddress, setEmailAddress] = useState("");
  const [verifyUser, setVerifyUser] = useState(
    userProfile?.emailVerification?.status || false
  );
  const [pass_word, setPass_word] = useState("");
  const [confPass_word, setConfPass_word] = useState("");

  useEffect(() => {
    setVerifyUser(userProfile?.emailVerification?.status);
  }, [userProfile?.emailVerification?.status]);

  const performPasswordChange = async () => {
    if (pass_word === confPass_word) {
      handleForgotPassword(
        {
          emailAddress,
          password: await hashPassword(pass_word),
        },
        false
      );
    }
    else
      toast.error("Password and confirm password does not match", {
        position: toast.POSITION.TOP_RIGHT,
      });
  };

  return (
    <div>
      <div className="auth__title">
        <p className="main__title">Recover Password</p>
        {verifyUser ? (
          <p>Choose a new password and confirm</p>
        ) : (
          <p>Enter in the email associated with your account</p>
        )}
      </div>
      {!verifyUser ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <button
            className="btn-signin"
            onClick={() =>
              handleForgotPassword(
                {
                  emailAddress,
                },
                true
              )
            }
          >
            Submit
          </button>
          <p className="btn-member" onClick={() => setIsForgotPassword(false)}>
            Cancel and go back to Login page
          </p>
        </div>
      ) : (
        <div>
          <input
            type="password"
            placeholder="Password"
            value={pass_word}
            onChange={(e) => setPass_word(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confPass_word}
            onChange={(e) => setConfPass_word(e.target.value)}
          />
          <button className="btn-signin" onClick={performPasswordChange}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
