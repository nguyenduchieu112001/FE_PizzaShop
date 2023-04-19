import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import ".//Register-page.css";

const Register = ({
  userRef,
  errMsg,
  errRef,
  handleSubmit,
  formData,
  setFormData,
  validInput,
  inputFocus,
  setInputFocus,
}) => {
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
        <h1>Register</h1>
        <form className="form__register" onSubmit={handleSubmit}>
          <label className="label__register" htmlFor="fullName">
            Full Name:
            <span className={validInput.fullName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validInput.fullName || !formData.fullName ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="input__resigter"
            type="text"
            id="fullName"
            ref={userRef}
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
            aria-invalid={validInput.fullName ? "false" : "true"}
          />
          <label className="label__register" htmlFor="username">
            Username:
            <span className={validInput.user ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={validInput.user || !formData.user ? "hide" : "invalid"}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
          className="input__resigter"
            type="text"
            id="username"
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            required
            aria-invalid={validInput.user ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setInputFocus({ ...inputFocus, user:true})}
            onBlur={() => setInputFocus({ ...inputFocus, user:false})}
          />
          <p
            id="uidnote"
            className={
              inputFocus.user && formData.user && !validInput.user
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <label className="label__register" htmlFor="password">
            Password:
            <span className={validInput.pwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={validInput.pwd || !formData.pwd ? "hide" : "invalid"}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
          className="input__resigter"
            type="password"
            id="password"
            onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
            required
            aria-invalid={validInput.pwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setInputFocus({ ...inputFocus, pwd:true})}
            onBlur={() => setInputFocus({ ...inputFocus, pwd:false})}
          />
          <p
            id="pwdnote"
            className={
              inputFocus.pwd && !validInput.pwd ? "instructions" : "offscreen"
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
          <label className="label__register" htmlFor="confirm_pwd">
            Confirm Password:
            <span
              className={
                validInput.matchPwd && formData.matchPwd ? "valid" : "hide"
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validInput.matchPwd || !formData.matchPwd ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
          className="input__resigter"
            type="password"
            id="confirm_pwd"
            onChange={(e) => setFormData({ ...formData, matchPwd: e.target.value })}
            required
            aria-invalid={validInput.matchPwd ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setInputFocus({ ...inputFocus, matchPwd:true})}
            onBlur={() => setInputFocus({ ...inputFocus, matchPwd:false})}
          />
          <p
            id="confirmnote"
            className={
              inputFocus.matchPwd && !validInput.matchPwd
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first Password input field.
          </p>
          <label className="label__register" htmlFor="email">
            Email:
            <span className={validInput.email ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validInput.email || !formData.email ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
          className="input__resigter"
            type="email"
            id="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            aria-invalid={validInput.email ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setInputFocus({ ...inputFocus, email:true})}
            onBlur={() => setInputFocus({ ...inputFocus, email:false})}
          />
          <p
            id="emailnote"
            className={
              inputFocus.email && !validInput.email
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the email input field.
          </p>
          <label className="label__register" htmlFor="phoneNumber">
            Phone Number:
            <span className={validInput.phone ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validInput.phone || !formData.phone ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
          className="input__resigter"
            type="number"
            id="phoneNumber"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            aria-invalid={validInput.phone ? "false" : "true"}
            aria-describedby="phonenote"
            onFocus={() => setInputFocus({ ...inputFocus, phone:true})}
            onBlur={() => setInputFocus({ ...inputFocus, phone:false})}
          />
          <p
            id="phonenote"
            className={
              setInputFocus.phone && !validInput.phone
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Phone number must start with '+84' or '0' and must be 9 or 10 digits
            long.
          </p>
          <label className="label__register" htmlFor="address">
            Address:
            <span className={validInput.address ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validInput.address || !formData.address ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
          className="input__resigter"
            type="text"
            id="address"
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            aria-invalid={validInput.address ? "false" : "true"}
            aria-describedby="addressnote"
          />

          <button className="button__register button__form input__resigter" disabled={!validInput.fullName || !validInput.user || !validInput.pwd || !validInput.matchPwd || !validInput.email || !validInput.phone || !validInput.address ? true : false}>Sign Up</button>
        </form>
        <p>
          Already registered?
          <br />
          <span>
            <Link to="/sign-in">Sign In</Link>
          </span>
        </p>
      </section>
    </>

  );
};

export default Register;
