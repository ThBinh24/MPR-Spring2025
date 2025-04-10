import { useState } from "react";

function Board() {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("V");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  
  const checkWin = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (currentPlayer === "V") {
          if (j + 1 < 10 && board[i][j] === null && board[i][j + 1] === null) {
            return false; 
          }
        } else if (currentPlayer === "H") {
          if (i + 1 < 10 && board[i][j] === null && board[i + 1][j] === null) {
            return false; 
          }
        }
      }
    }
    return true; 
  };

  const handClicked = (row, col) => {
    // console.log(row, col);
    if (gameOver) {
      return;
    }
    const newBoard = board.map((rowArr) => [...rowArr]);
    if (currentPlayer === "V") {
      if (row + 1 < 10 && !newBoard[row][col] && !newBoard[row + 1][col] &&!checkWin()) {
        newBoard[row][col] = "V";
        newBoard[row + 1][col] = "V";
        setBoard(newBoard);
        setCurrentPlayer("H");
        setMessage("");
      } else {
        setMessage("Invalid move to player V");
      }
    }else if(currentPlayer === "H"){
        if (col + 1 < 10 && !newBoard[row][col] && !newBoard[row][col+1] && !checkWin()) {
            newBoard[row][col] = "H";
            newBoard[row][col+1] = "H";
            setBoard(newBoard);
            setCurrentPlayer("V");
            setMessage("");
          } else {
            setMessage("Invalid move to player H");
          }
    }

    if (checkWin()) {
      setGameOver(true);
      setMessage(`Player ${currentPlayer} wins!`);
    }
  };
  return (
    <div className="game-container">
      <h1>Domineering Game</h1>
      <p>
        Current Player:{" "}
        {currentPlayer === "V" ? "Vertical (V)" : "Horizontal (H)"}
      </p>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}`}
              className={`cell ${cell}`}
              onClick={() => handClicked(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Board;