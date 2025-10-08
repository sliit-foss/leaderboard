import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "@primer/react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { ThemeToggle } from "../../ui/ThemeToggle";
import "../../../scss/_natbar.scss";

interface NavbarProps {
  theme: string;
  onToggle: () => void;
}

function Navbar({ theme, onToggle }: NavbarProps) {
  return (
    <>
      <Header className="sticky-header">
        <Header.Item>
          <Header.Link href="/" sx={{ display: "flex", alignItems: "center", fontSize: 2, gap: 2 }}>
            <MarkGithubIcon size={32} />
            <span>SLIIT FOSS GitHub Leaderboard</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full />
        <Header.Item>
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </Header.Item>
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

