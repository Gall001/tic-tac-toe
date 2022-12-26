import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.css';
import './css/styles.scss'
import Sidebar from 'react-bootstrap-sidebar-menu';
import Layout from "./components/Layout";
import Main from "./components/Main";
import { Navbar, Container } from "react-bootstrap";
import Game from "./components/TicTacToe";
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticTacToeActive: true,
            construction: false,
        }
    }

    displayTicTacToe(value) {
        this.setState({
            ticTacToeActive: value,
            construction: !value
        })
    }

    displayConstruction(value) {
        this.setState({
            ticTacToeActive: value,
            construction: !value
        })
    }

    render() {
        const theme = "dark";
        const title = "Home"
        return (

            <div className="game">
                <Layout>
                    <Navbar className="main-header" expand="lg" bg={theme} variant={theme}>
                        <Container fluid>
                            <Navbar.Brand href="#home">{title}</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Sidebar variant={theme} bg={theme} expand="sm">
                        <Sidebar.Collapse>
                            <Sidebar.Header>
                                <Sidebar.Brand>Gal Levy Site</Sidebar.Brand>
                                <Sidebar.Toggle />
                            </Sidebar.Header>
                            <Sidebar.Body>
                                <Sidebar.Nav>
                                    <Sidebar.Nav.Link eventKey="menu_title">
                                        <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon>
                                        <Sidebar.Nav.Title>Home</Sidebar.Nav.Title>
                                    </Sidebar.Nav.Link>
                                    <Sidebar.Sub eventKey={0}>
                                        <Sidebar.Sub.Toggle>
                                            <Sidebar.Nav.Icon />
                                            <Sidebar.Nav.Title>Submenu</Sidebar.Nav.Title>
                                        </Sidebar.Sub.Toggle>
                                        <Sidebar.Sub.Collapse>
                                            <Sidebar.Nav>
                                                <Sidebar.Nav.Link eventKey="tic-tac-toe" onClick={this.displayTicTacToe(true)}>
                                                    <Sidebar.Nav.Icon>1.1</Sidebar.Nav.Icon>
                                                    <Sidebar.Nav.Title>Tic-Tac-Toe</Sidebar.Nav.Title>

                                                </Sidebar.Nav.Link>
                                            </Sidebar.Nav>
                                            <Sidebar.Nav>
                                                <Sidebar.Nav.Link eventKey="construction" onClick={this.displayConstruction(true)}>
                                                    <Sidebar.Nav.Icon>1.2</Sidebar.Nav.Icon>
                                                    <Sidebar.Nav.Title>In construction</Sidebar.Nav.Title>
                                                </Sidebar.Nav.Link>
                                            </Sidebar.Nav>
                                        </Sidebar.Sub.Collapse>
                                    </Sidebar.Sub>
                                </Sidebar.Nav>
                            </Sidebar.Body>
                        </Sidebar.Collapse>
                    </Sidebar>
                    <Main>
                        {/* <Game /> */}
                        {this.ticTacToeActive ? (
                            <Game />
                        ) : (
                            'test'
                        )}
                    </Main>
                </Layout>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Menu />);