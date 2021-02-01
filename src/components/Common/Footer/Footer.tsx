import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Contact Us</h5>
            <ul>
              <li className="list-unstyled">
                <a href="https://github.com/sliit-foss">GitHub</a>
              </li>
              <li className="list-unstyled">
                <a href="https://www.facebook.com/sliitfoss">FaceBook</a>
              </li>
              <li className="list-unstyled">
                <a href="https://twitter.com/fosssliit">Twitter</a>
              </li>
              <li className="list-unstyled">
                <a href="https://www.instagram.com/sliitfoss">Instagram</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://sliitfoss.org/">SLIIT FOSS</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
