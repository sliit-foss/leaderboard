import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header, StyledOcticon } from "@primer/react";
import { MarkGithubIcon } from "@primer/octicons-react";
import React from "react";
import "../../../scss/_natbar.scss";

function Navbar() {
  return (
    <>
      <Header className="sticky-header">
        <Header.Item>
          <Header.Link href="/" fontSize={2}>
            <StyledOcticon icon={MarkGithubIcon} size={32} sx={{ mr: 2 }} />
            <span>SLIIT FOSS GitHub Leaderboard</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full />
        <Header.Link href="https://github.com/sliit-foss" target="blank" sx={{ mr: 2 }}>
          <FontAwesomeIcon icon={faGithub} />
        </Header.Link>
        <Header.Link
          href="https://www.facebook.com/sliitfoss"
          target="blank"
          sx={{ mr: 2 }}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Header.Link>
        <Header.Link href="https://twitter.com/fosssliit" target="blank" sx={{ mr: 2 }}>
          <FontAwesomeIcon icon={faTwitter} />
        </Header.Link>
        <Header.Link
          href="https://www.instagram.com/sliitfoss"
          target="blank"
          sx={{ mr: 2 }}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Header.Link>
      </Header>
    </>
  );
}

export default Navbar;
