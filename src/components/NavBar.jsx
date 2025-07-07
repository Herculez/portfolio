import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useState, useEffect } from 'react';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    });

    const onUpdateActiveLink = (value) => {
    setActiveLink(value);}


    return (
        <Navbar expand="lg" className={scrolled ? "Scrolled" : ""}>
            <Container>
                <Navbar.Brand href="#home">
                    {/*<img src={'public/assets/react.svg'} alt="Logo"></img>*/}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className={"navbar-toggler-icon"}/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            href="#banner"
                            className={activeLink === 'banner' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('banner')}
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            href="#project"
                            className={activeLink === 'project' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('project')}
                        >
                            Projects
                        </Nav.Link>
                    </Nav>
                    <span className={"navbar-text"}>
                        <div className={"social-icon"}>
                            <a href={"https://github.com/Herculez"}><img src={"public/assets/github-mark-white.svg"} alt={"GitHub"}/></a>
                            <a href={"https://au.linkedin.com/"}><img src={"public/assets/LinkedIn_icon.svg"} alt={"LinkedIn"}/></a>
                        </div>
                        <button className={"navbar-text"} onClick={() => window.location.href = "mailto:dion.jmarks@gmail.com"}>
                            <span>Contact Me!</span>
                        </button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}