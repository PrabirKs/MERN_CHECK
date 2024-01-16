import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const nagigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth // from this auth, the { user, isLoading, isError, isSuccess, message } are fetched
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      nagigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, nagigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData)); //send to the authslice) login function, an asyncThunk  -> call to the authService login() -> axios post request to backend with userData.
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goal</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="from-group">
            <button type="submit" className="btn btn-block">
              submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
//have to get the formdata from the user and store it in the usestate and, them destructure this data to extract the "email" and "password"
//this data then to be send through the dispatcher to the login function
