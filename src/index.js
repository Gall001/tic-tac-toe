import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.css';
import './styles.scss'
import Sidebar from 'react-bootstrap-sidebar-menu';
import Layout from "./components/Layout";
import Main from "./components/Main";
import { Navbar, Container } from "react-bootstrap";

function Square(props) {
    if (props.value == "X") {
        return (
            <button className="square border red" onClick={props.onClick}>
                {props.value}
            </button>
        )
    } else {
        return (
            <button className="square border blue" onClick={props.onClick}>
                {props.value}
            </button>
        )
    }

}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext : true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);  
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;    
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const theme = "dark";
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game Start';
            return(
                <li key={move}>          
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            
            <div className="game">
                <Layout>
                    <Navbar className="main-header" expand="lg" bg={theme} variant={theme}>
                    <Container fluid>
                        <Navbar.Brand href="#home">Tic Tac Toe</Navbar.Brand>
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
                            <Sidebar.Nav.Title>Menu Title</Sidebar.Nav.Title>
                            </Sidebar.Nav.Link>
                            <Sidebar.Sub eventKey={0}>
                            <Sidebar.Sub.Toggle>
                                <Sidebar.Nav.Icon />
                                <Sidebar.Nav.Title>Submenu</Sidebar.Nav.Title>
                            </Sidebar.Sub.Toggle>
                            <Sidebar.Sub.Collapse>
                                <Sidebar.Nav>
                                <Sidebar.Nav.Link eventKey="sum_menu_title">
                                    <Sidebar.Nav.Icon>1.1</Sidebar.Nav.Icon>
                                    <Sidebar.Nav.Title>Sub menu item</Sidebar.Nav.Title>
                                </Sidebar.Nav.Link>
                                </Sidebar.Nav>
                            </Sidebar.Sub.Collapse>
                            </Sidebar.Sub>
                        </Sidebar.Nav>
                        </Sidebar.Body>
                    </Sidebar.Collapse>
                    </Sidebar>
                    <Main>
                        <h1 className="title"> Welcome To Tic-Tac-toe</h1>
                        <div className="game-board">
                            <Board 
                            squares={current.squares}            
                            onClick={(i) => this.handleClick(i)}
                            />
                        </div>
                        <div className="game-info">
                            <div>{status}</div>
                            <ol>{moves}</ol>
                        </div>
                    </Main>
                </Layout>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);