import React from "react";

function InputEmail({ setEmail, errMsg, handleSendEmail, userRef, errRef, email }) {
  return (<>
    <section className="my-div">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
        </p>
        <h1>Validation Email</h1>
        <form onSubmit={handleSendEmail}>
            <label htmlFor="email">
                <b>Email:</b>
            </label>
            <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <button>Get code</button>
        </form>
    </section>
  </>);
}

export default InputEmail;
