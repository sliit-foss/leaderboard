import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import FossLogo from "../../../assets/FOSS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "@primer/components";
import React from "react";

function Navbar() {
  return (
    <>
      <Header>
        <Header.Item>
          <img
            className="position-absolute"
            src={FossLogo}
            width="80"
            height="80"
            alt=""
          />
          <Header.Link href="#" fontSize={2} pl={10}>
            <span>SLIIT FOSS GitHub Leaderboad</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full>About</Header.Item>
        <Header.Link href="https://github.com/sliit-foss" mr={2}>
          <FontAwesomeIcon icon={faGithub} />
        </Header.Link>
        <Header.Link mr={2}>
          <FontAwesomeIcon icon={faFacebook} />
        </Header.Link>
        <Header.Link mr={2}>
          <FontAwesomeIcon icon={faTwitter} />
        </Header.Link>
        <Header.Link mr={2}>
          <FontAwesomeIcon icon={faInstagram} />
        </Header.Link>
      </Header>
    </>
  );
}

export default Navbar;
