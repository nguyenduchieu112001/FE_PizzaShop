import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ChangePassword({
  errRef,
  form,
  setForm,
  valid,
  errMsg,
  focus,
  setFocus,
  handleSubmit,
}) {
  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">
            Password:
            <span className={valid.password ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={
              valid.password || !form.password ? "hide" : "valid"
            }>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            aria-invalid={valid.password ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setFocus({ ...focus, password:true})}
            onBlur={() => setFocus({ ...focus, password:false})}
          />
          <p
            id="pwdnote"
            className={
              focus.password && !valid.password ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and a special
            character. <br />
            Allowed special; characters:{" "}
            <span aria-label="exclamation mark">!</span>
            <span aria-label="st symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <span
              className={
                valid.confirm && form.confirm ? "valid" : "hide"
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                valid.confirm || !valid.confirm ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            required
            aria-invalid={valid.confirm ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setFocus({ ...focus, confirm:true})}
            onBlur={() => setFocus({ ...focus, confirm:false})}
          />
          <p
            id="confirmnote"
            className={
              focus.confirm && !valid.confirm
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first Password input field.
          </p>
          <label htmlFor="code">
            Code:
          </label>
          <input type="number" id="code" onChange={(e) => setForm({...form, code: e.target.value})}
          required aria-invalid={valid.code ? "false" : "true"}
          aria-describedby="codenote"
          onFocus={() => setFocus({ ...focus, code:true})}
          onBlur={() => setFocus({ ...focus, code:false})}
        />
        <button disabled={!valid.password || !valid.confirm || !valid.code  ? true : false}>Change password</button>
        </form>
      </section>
    </>
  );
}

export default ChangePassword;
