import React from "react";
import {Header} from "@primer/components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"
import "./Navbar.css";

function Navbar() {
    return (
        <>
            <Header>
                <Header.Item>
                    <Header.Link href="#" fontSize={2}>
                        <span>SLIIT FOSS GitHub Leaderboad</span>
                    </Header.Link>
                </Header.Item>
                <Header.Item full>About</Header.Item>
                <Header.Link href="https://github.com/sliit-foss" mr={2}>
                    <FontAwesomeIcon icon={faGithub}/>
                </Header.Link>
                <Header.Link mr={2}>
                    <FontAwesomeIcon icon={faFacebook}/>
                </Header.Link>
                <Header.Link mr={2}>
                    <FontAwesomeIcon icon={faTwitter}/>
                </Header.Link>
                <Header.Link mr={2}>
                    <FontAwesomeIcon icon={faInstagram}/>
                </Header.Link>
            </Header>
        </>
    );
}

export default Navbar;
