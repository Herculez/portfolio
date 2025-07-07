import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";


export const Projects = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxSlides, setLightboxSlides] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (slides, index = 0) => {
        setLightboxSlides(slides);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section className="project" id="project">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} className="projectinner">
                        <h1>Projects</h1>
                        <p>Here are a list of my notable projects I have completed while
                            studying my Bachelors of Computer Science.</p>

                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first" className="first">2D Godot Game</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Minecraft Maze Builder</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">Food Wastage CRUD Web App</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <h3>Exfiltraitor</h3>
                                            <p>
                                                Exfiltraitor is a 2D Papers-Please inspired Godot game where you have to
                                                forge documents to help people escape
                                                from a hypothetical world where the soviet control of the East Berlin
                                                area extended to the French border.
                                            </p>
                                            <img
                                                src={"src/assets/Exfiltraitor.PNG"}
                                                alt="Exfiltraitor"
                                                style={{
                                                    maxWidth: "100%",
                                                    cursor: "pointer",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                                                }}
                                                onClick={() =>
                                                    openLightbox([
                                                        { src: "src/assets/Exfiltraitor.PNG" },
                                                        { src: "src/assets/CheckpointScene.png" },
                                                    ])
                                                }
                                            />
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="second">
                                            <h3>Minecraft Maze Builder</h3>
                                            <p>
                                                This is a Minecraft CLI application that allows users to build randomly generated mazes in Minecraft.
                                                The app was built in C++ using the mcpp library.
                                            </p>
                                            <p>It features recursive backtracking to build the randomly generated maze,
                                                a breadth-first search algorithm to solve the maze and keeps the games world state,
                                                to return it to pre-maze generation.</p>
                                            <img
                                                src={"src/assets/Minecraft3.png"}
                                                alt="Maze"
                                                style={{
                                                    maxWidth: "100%",
                                                    cursor: "pointer",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                                                }}
                                                onClick={() =>
                                                    openLightbox([
                                                        { src: "src/assets/Minecraft3.png" },
                                                        { src: "src/assets/Minecraft1.png" },
                                                        { src: "src/assets/Minecraft2.png" },
                                                        { src: "src/assets/Minecraft4.png" },
                                                        { src: "src/assets/Minecraft5.png" },

                                                    ])
                                                }
                                            />
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="third">
                                            <h3>Food Wastage CRUD Web App</h3>
                                            <p>
                                                This web application helps track food waste globally based off of multiple government databases.
                                                It features full CRUD operations and a multitude of data visualisation components.
                                            </p>
                                            <p>
                                                This web-app was built in Java using Javalin, Thymeleaf and pure Javascript,
                                                the database used for the project was SQlite.
                                            </p>
                                            <img
                                                src={"src/assets/FoodLoss.png"}
                                                alt="Food App"
                                                style={{
                                                    maxWidth: "100%",
                                                    cursor: "pointer",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                                                }}
                                                onClick={() =>
                                                    openLightbox([{ src: "src/assets/FoodLoss.png" }])
                                                }
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>

            {/* GLOBAL LIGHTBOX OUTSIDE OF TABS */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxSlides}
                index={lightboxIndex}
                plugins={[Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0 } } }}
                on={{
                    view: ({ index }) => setLightboxIndex(index),
                }}
            />
        </section>
    );
};
