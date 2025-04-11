import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Registration from "./Registration";
import Header from "../../components/header/Header";
import { authService } from "../../services";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { isObjectEmpty } from "../../utils/ObjectUtil";

function RegistrationPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (userProfile?.registrationStatus?.status) 
      setIsLogin(userProfile?.registrationStatus?.status);
  }, [userProfile?.registrationStatus?.status]);

  useEffect(() => {
    if (!isObjectEmpty(userProfile?.data)) {
      navigator("/home");
    }
  }, [userProfile?.data]);

  useEffect(() => {
    if (userProfile?.forgotPasswordStatus?.status) {
      setIsLogin(userProfile?.forgotPasswordStatus?.status);
      setIsForgotPassword(!userProfile?.forgotPasswordStatus?.status);
    }
  }, [userProfile?.forgotPasswordStatus?.status]);

  const handleForgotPassword = (userData, handleFlow = false) => {
    handleFlow
      ? dispatch(authService.performUserVerification(userData))
      : dispatch(authService.performForgotPassword(userData));
  };

  const handleRegistration = (userData) => {
    dispatch(authService.performRegistration(userData));
  };

  const handleLogin = (userData) => {
    dispatch(authService.performLogin(userData));
  };

  return (
    <>
      <Header />
      <div className="auth__wrapper">
        <div className="auth__sign-panels">
          {!isLogin && !isForgotPassword && (
            <Registration
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleRegistration={handleRegistration}
            />
          )}

          {isLogin && !isForgotPassword && (
            <Login
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setIsForgotPassword={setIsForgotPassword}
              handleLogin={handleLogin}
            />
          )}

          {isForgotPassword && (
            <ForgotPassword
              userProfile={userProfile}
              handleForgotPassword={handleForgotPassword}
              setIsForgotPassword={setIsForgotPassword}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;
