import React from 'react';
import {Header , Avatar , StyledOcticon} from '@primer/components';
import Logo from '../../../asserts/FOSS.png';
import './Navbar.css';

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
            <Header.Item mr={0}>
                <Avatar
                src="https://github.com/octocat.png"
                size={20}
                square
                alt="@octocat"
                />
            </Header.Item>
        </Header>
        </>
    );
}

export default Navbar;
