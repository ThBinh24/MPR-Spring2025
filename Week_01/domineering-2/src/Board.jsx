import { useState } from "react";
import "./Board.css";

function Board() {
  const [board, setBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill("empty"))
  );

  const [currentPlayer, setCurrentPlayer] = useState("V");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkValidatesMoves = (player) => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (player === "V" && row < 9) {
          if (board[row][col] === "empty" && board[row + 1][col] === "empty") {
            return true;
          }
        } else if ((player === "H") & (col < 9)) {
          if (board[row][col] === "empty" && board[row][col + 1] === "empty") {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleClick = (rowIndex, colIndex) => {
    if (gameOver) return;

    const newBoard = board.map((row) => [...row]);
    let nextPlayer;

    if (currentPlayer === "V") {
      if (
        rowIndex < 9 &&
        board[rowIndex][colIndex] === "empty" &&
        board[rowIndex + 1][colIndex] === "empty"
      ) {
        newBoard[rowIndex][colIndex] = "v";
        newBoard[rowIndex + 1][colIndex] = "v";
        setBoard(newBoard);
        nextPlayer = "H";
        setCurrentPlayer(nextPlayer);
      } else {
        return;
      }
    } else {
      if (
        colIndex < 9 &&
        board[rowIndex][colIndex] === "empty" &&
        board[rowIndex][colIndex + 1] === "empty"
      ) {
        newBoard[rowIndex][colIndex] = "h";
        newBoard[rowIndex][colIndex + 1] = "h";
        setBoard(newBoard);
        nextPlayer = "V";
        setCurrentPlayer(nextPlayer);
      } else {
        return;
      }
    }

    if (!checkValidatesMoves(nextPlayer)) {
      setGameOver(true);
      setWinner(currentPlayer);
      console.log(checkValidatesMoves(currentPlayer));
    }
  };

  const resetGame = () => {
    setBoard(
      Array(10)
        .fill()
        .map(() => Array(10).fill("empty"))
    );
    setCurrentPlayer("V");
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>Domineering Game</h1>
      {!gameOver ? (
        <>
          <p id="turn">Turn: Player {currentPlayer}</p>
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`cell ${cell}`}
                    onClick={() => handleClick(rowIndex, colIndex)}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={resetGame}>Reset Game</button>
        </>
      ) : (
        <div>
          <p>Game Over! Player {winner} wins!</p>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
    </div>
  );
}

export default Board;
