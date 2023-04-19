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
                <p style={{ fontStyle: "italic", textIndent: "30px" }}>
                  Là một tầm nhìn đã được đun nấu trong tâm hồn, được chăm sóc
                  bằng thời gian và kiên nhẫn, và được kích thích bởi đam mê và
                  quyết tâm. Đây là một giấc mơ đã được chế biến cẩn thận thông
                  qua kinh nghiệm, sáng tạo và niềm tin không dao động. Giống
                  như một món ăn ngon cần thời gian và công sức để chuẩn bị,
                  giấc mơ này đã được ướp chua, phát triển hương vị và độ phức
                  tạp, và giờ đây đã sẵn sàng được đưa ra thế giới. Đây là một
                  kết tinh của công việc chăm chỉ, sự kiên trì và tận tụy, và
                  đại diện cho sự hoàn thành của ước mơ từ lâu trong trái tim và
                  tâm trí.
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
              <p>39 Phạm Thị Liên, Kim Long, Huế</p>
              <div className="contact-info-content">
                <div className="open-hours">
                  <p>Mon - Fri: 12pm - 10pm</p>
                  <p>Saturday: 11am - 10pm​</p>
                  <p>Sunday: 11am - 11pm</p>
                </div>
                <div className="contact-info">
                  <p>nguyenduchieu112001@gmail.com</p>
                  <p>0912-7662-685</p>
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
