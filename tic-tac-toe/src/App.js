import React from 'react';
import './index.css';

function Square(props) {
  const className = 'square' + (props.highlight ? ' highlight' : '');
  return (
    <button
      className={className}
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const winLine = this.props.winLine;
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={winLine && winLine.includes(i)}
      />
    );
  }

  render() {
    // su dung 2 vong lap tao square
    const boardSize = 10;
    let squares = [];
    for (let i = 0; i < boardSize; ++i) {
      let row = [];
      for (let j = 0; j < boardSize; ++j) {
        row.push(this.renderSquare(i * boardSize + j));
      }
      squares.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
      <div>{squares}</div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(100).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) { //O da nhan r hoac da co nguoi thang thi k nhan nua
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ //update board
      history: history.concat([
        {
          squares: squares,
          // Store the index of the latest moved square
          latestMoveSquare: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleSortToggle() {
    this.setState({
      isAscending: !this.state.isAscending
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const winInfo = calculateWinner(current.squares);
    const winner = winInfo.winner;

    let moves = history.map((step, move) => {
      const latestMoveSquare = step.latestMoveSquare;
      const col = 1 + latestMoveSquare % 3;
      const row = 1 + Math.floor(latestMoveSquare / 3);
      const desc = move ?
        `Go to move #${move} (${col}, ${row})` :
        'Go to game start';
      return (
        <li key={move}>
          {/* Bold the currently selected item */}
          <button
            className={move === stepNumber ? 'move-list-item-selected' : ''}
            onClick={() => this.jumpTo(move)}>{desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      if (winInfo.isDraw) {
        status = "Draw";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    const isAscending = this.state.isAscending;
    if (!isAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winLine={winInfo.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleSortToggle()}>
            {isAscending ? 'descending' : 'ascending'}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(<Game />)

// ReactDOM.render(<Game />, document.getElementById("root"));



function calculateWinner(squares) {

  // for(var i=0;i<9;i++){
  //   for(var j=0;j<9;j++){
  //     const line = [
  //       [[i],[j]]
  //     ]
  //   }
  // }
  const lines = [
    //Ngang
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7], [5, 6, 7, 8], [6, 7, 8, 9],
    [10, 11, 12, 13], [11, 12, 13, 14], [12, 13, 14, 15], [13, 14, 15, 16], [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19],
    [20, 21, 22, 23], [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27], [25, 26, 27, 28], [26, 27, 28, 29],
    [30, 31, 32, 33], [31, 32, 33, 34], [32, 33, 34, 35], [33, 34, 35, 36], [34, 35, 36, 37], [35, 36, 37, 38], [36, 37, 38, 39],
    [40, 41, 42, 43], [41, 42, 43, 44], [42, 43, 44, 45], [43, 44, 45, 46], [44, 45, 46, 47], [45, 46, 47, 48], [46, 47, 48, 49],
    [50, 51, 52, 53], [51, 52, 53, 54], [52, 53, 54, 55], [53, 54, 55, 56], [54, 55, 56, 57], [55, 56, 57, 58], [56, 57, 58, 59],
    [60, 61, 62, 63], [61, 62, 63, 64], [62, 63, 64, 65], [63, 64, 65, 66], [64, 65, 66, 67], [65, 66, 67, 68], [66, 67, 68, 69],
    [70, 71, 72, 73], [71, 72, 73, 74], [72, 73, 74, 75], [73, 74, 75, 76], [74, 75, 76, 77], [75, 76, 77, 78], [76, 77, 78, 79],
    [80, 81, 82, 83], [81, 82, 83, 84], [82, 83, 84, 85], [83, 84, 85, 86], [84, 85, 86, 87], [85, 86, 87, 88], [86, 87, 88, 89],
    [90, 91, 92, 93], [91, 92, 93, 94], [92, 93, 94, 95], [93, 94, 95, 96], [94, 95, 96, 97], [95, 96, 97, 98], [96, 97, 98, 99],
    //Doc
    [0, 10, 20, 30], [10, 20, 30, 40], [20, 30, 40, 50], [30, 40, 50, 60], [40, 50, 60, 70], [50, 60, 70, 80], [60, 70, 80, 90],
    [1, 11, 21, 31], [11, 21, 31, 41], [21, 31, 41, 51], [31, 41, 51, 61], [41, 51, 61, 71], [51, 61, 71, 81], [61, 71, 81, 91],
    [2, 12, 22, 32], [12, 22, 32, 42], [22, 32, 42, 52], [32, 42, 52, 62], [42, 52, 62, 72], [52, 62, 72, 82], [62, 72, 82, 92],
    [3, 13, 23, 33], [13, 23, 33, 43], [23, 33, 43, 53], [33, 43, 53, 63], [43, 53, 63, 73], [53, 63, 73, 83], [63, 73, 83, 93],
    [4, 14, 24, 34], [14, 24, 34, 44], [24, 34, 44, 54], [34, 44, 54, 64], [44, 54, 64, 74], [54, 64, 74, 84], [64, 74, 84, 94],
    [5, 15, 25, 35], [15, 25, 35, 45], [25, 35, 45, 55], [35, 45, 55, 65], [45, 55, 65, 75], [55, 65, 75, 85], [65, 75, 85, 95],
    [6, 16, 26, 36], [16, 26, 36, 46], [26, 36, 46, 56], [36, 46, 56, 66], [46, 56, 66, 76], [56, 66, 76, 86], [66, 76, 86, 96],
    [7, 17, 27, 37], [17, 27, 37, 47], [27, 37, 47, 57], [37, 47, 57, 67], [47, 57, 67, 77], [57, 67, 77, 87], [67, 77, 87, 97],
    [8, 18, 28, 38], [18, 28, 38, 48], [28, 38, 48, 58], [38, 48, 58, 68], [48, 58, 68, 78], [58, 68, 78, 88], [68, 78, 88, 98],
    [9, 19, 29, 39], [19, 29, 39, 49], [29, 39, 49, 59], [39, 49, 59, 69], [49, 59, 69, 79], [59, 69, 79, 89], [69, 79, 89, 99],
    //Cheo
    [0, 11, 22, 33], [11, 22, 33, 44], [22, 33, 44, 55], [33, 44, 55, 66], [44, 55, 66, 77], [55, 66, 77, 88], [66, 77, 88, 99],
    [1, 12, 23, 34], [12, 23, 34, 45], [23, 34, 45, 56], [34, 45, 56, 67], [45, 56, 67, 78], [56, 67, 78, 89],
    [2, 13, 24, 35], [13, 24, 35, 46], [24, 35, 46, 57], [35, 46, 57, 68], [46, 57, 68, 79],
    [3, 14, 25, 36], [14, 25, 36, 47], [25, 36, 47, 58], [36, 47, 58, 69], [3, 12, 21, 30],
    [4, 15, 26, 37], [15, 26, 37, 48], [26, 37, 48, 59], [4, 13, 22, 31], [13, 22, 31, 40],
    [5, 16, 27, 38], [16, 27, 38, 49], [5, 14, 23, 32], [14, 23, 32, 41], [23, 32, 41, 50],
    [6, 17, 28, 39], [6, 15, 24, 33], [15, 24, 33, 42], [24, 33, 42, 51], [33, 42, 51, 60],
    [7, 16, 25, 34], [16, 25, 34, 43], [25, 34, 43, 52], [34, 43, 52, 61], [43, 52, 61, 70],
    [8, 17, 26, 35], [17, 26, 35, 44], [26, 35, 44, 53], [35, 44, 53, 62], [44, 53, 62, 71], [53, 62, 71, 80],
    [9, 18, 27, 36], [18, 27, 36, 45], [27, 36, 45, 54], [36, 45, 54, 63], [45, 54, 63, 72], [54, 63, 72, 81], [63, 72, 81, 90],

    [10,21,32,43],[21,32,43,54],[32,43,54,65],[43,54,65,76],[54,65,76,87],[65,76,87,98],
    [20,31,42,53],[31,42,53,64],[42,53,64,75],[53,64,75,86],[64,75,86,97],
    [30,41,52,63],[41,52,63,74],[52,63,74,85],[63,74,85,96],
    [40,51,62,73],[51,62,73,84],[62,73,84,95],
    [50,61,72,83],[61,72,83,94],
    [60,71,82,93],

    [19,28,37,46],[28,37,46,55],[37,46,55,64],[46,55,64,73],[55,64,73,82],[64,73,82,91],
    [29,38,47,56],[38,47,56,65],[47,56,65,74],[56,65,74,83],[65,74,83,92],
    [39,48,57,66],[48,57,66,75],[57,66,75,84],[66,75,84,83],
    [49,58,67,76],[58,67,76,85],[67,76,85,94],
    [59,68,77,86],[68,77,86,95],
    [69,78,87,96],

    // [6, 7, 8],
    // [0, 3, 6],
    // [1, 4, 7],
    // [2, 5, 8],
    // [0, 4, 8],
    // [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i]; //lay theo index 3 ptu lien ke
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false,
      };
    }
  }

  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isDraw = false;
      break;
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: isDraw,
  };
}