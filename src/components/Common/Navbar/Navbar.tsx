import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import FossLogo from "../../../assets/FOSS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header, StyledOcticon } from "@primer/components";
import { MarkGithubIcon } from "@primer/octicons-react";
import React from "react";

function Navbar() {
  return (
    <>
      <Header>
        <Header.Item>
          <Header.Link href="#" fontSize={2}>
            <StyledOcticon icon={MarkGithubIcon} size={32} mr={2} />
            <span>SLIIT FOSS GitHub Leaderboard</span>
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
