import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import "../Reservations/Reservation.css";
import "./Home.css";
import ReservationAPI from "../Reservations/ReservationAPI";

function Home() {
  return (
    <div className="restaurant">
      <NavBar/>
      <main>
        <section className="section__home">
          <div className="wrap">
            <div className="ele-50 center">
              <div className="wrap-logo">
                <div className="logo">
                  <img
                    src="https://static.wixstatic.com/media/0b340f_c45f5ee70e5c4e4b90997847adce700e~mv2_d_1358_1646_s_2.png/v1/fill/w_300,h_363,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0b340f_c45f5ee70e5c4e4b90997847adce700e~mv2_d_1358_1646_s_2.png"
                    alt=""
                  />
                  <h1>
                    <span>ZIA SONIA</span>
                  </h1>
                </div>
                <div>
                  <p>There is a Place like Home</p>
                </div>
                <div>
                  <Link to="/menu" className="btn__home menu">
                    See Menu
                  </Link>
                </div>
              </div>
            </div>
            <div className="ele-50">
              <div className="img-fixed" />
            </div>
          </div>
        </section>
        <section className="section__home">
          <div className="wrap">
            <div className="ele-50 bg-red">
              <img
                src="https://static.wixstatic.com/media/0b340f_5ec66082eda149cab4b521d424cc3381~mv2_d_3290_4689_s_4_2.jpg/v1/crop/x_0,y_437,w_3290,h_4252/fill/w_614,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0b340f_5ec66082eda149cab4b521d424cc3381~mv2_d_3290_4689_s_4_2.jpg"
                alt=""
                className="person"
              />
            </div>
            <div className="ele-50">
              <div className="wrap-content">
                <h2>
                  A Dream That has
                  <br />
                  Been Cooking for Years
                </h2>
                <p>
                  I'm a paragraph. Click here to add your own text and edit me.
                  It’s easy. Just click “Edit Text” or double click me to add
                  your own content and make changes to the font. Feel free to
                  drag and drop me anywhere you like on your page. I’m a great
                  place for you to tell a story and let your users know a little
                  more about you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-85 section__home">
          <div className="wrap-grid">
            <div className="ele-50-grid">
              <img
                src="https://s3.r29static.com/bin/entry/318/0,0,2000,2400/720x864,85/1725179/image.webp"
                alt=""
              />
            </div>
            <div className="ele-50-grid">
              <img
                src="https://i.pinimg.com/564x/c9/36/24/c93624040468e8f0adfe5aa42a8e6095.jpg"
                alt=""
              />
            </div>
            <div className="ele-50-grid">
              <img
                src="https://s3.r29static.com/bin/entry/318/0,0,2000,2400/720x864,85/1725179/image.webp"
                alt=""
              />
            </div>
            <div className="ele-50-grid">
              <div className="wrap-content-grid">
                <h2>Opening Hours</h2>
                <p>Mon - Fri: 12pm - 10pm</p>
                <p>Saturday: 11am - 10pm</p>
                <p>Sunday: 11am - 11pm</p>
              </div>
            </div>
            <div className="ele-50-grid">
              <img
                src="https://s3.r29static.com/bin/entry/318/0,0,2000,2400/720x864,85/1725179/image.webp"
                alt=""
              />
            </div>
            <div className="ele-50-grid">
              <img
                src="https://i.pinimg.com/564x/c9/36/24/c93624040468e8f0adfe5aa42a8e6095.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
        <div className="mt-85 bg-red section__home" id="reservation">
          <ReservationAPI />
        </div>

        <div id="contact"  className="mt-85 section__home">
          <div className="wrap-form-contact">
            <div className="form-contact-info">
              <h2>Contact Us</h2>
              <p>500 Terry Francine Street San Francisco, CA 94158</p>
              <div className="contact-info-content">
                <div className="open-hours">
                  <p>Mon - Fri: 12pm - 10pm</p>
                  <p>Saturday: 11am - 10pm​</p>
                  <p>Sunday: 11am - 11pm</p>
                </div>
                <div className="contact-info">
                  <p>info@mysite.com</p>
                  <p>123-456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
