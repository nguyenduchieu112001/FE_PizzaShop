import React from "react";
import { Link } from "react-router-dom";

function Login({
  handleSubmit,
  userRef,
  errRef,
  errMsg,
  username,
  password,
  setUsername,
  setPassword,
}) {
  return (
    <>
      <section className="section__register">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form className="form__register" onSubmit={handleSubmit}>
          <label className="label__register" htmlFor="username">
            <b>Username:</b>
          </label>
          <input
            className="input__resigter"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <label className="label__register" htmlFor="password">
            <b>Password:</b>
          </label>
          <input
            className="input__resigter"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="button__register button__form input__resigter">
            Sign In
          </button>
        </form>
        <div>
          <span className="line" style={{ float: "left" }}>
            <Link to="/send-mail">Change password</Link>
          </span>
          <span className="line" style={{ float: "right" }}>
            <Link to="/sign-up">Sign Up</Link>
          </span>
        </div>
      </section>
    </>
  );
}

export default Login;
