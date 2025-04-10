import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cellSize = (screenWidth - 20) / 10; 

function Board() {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('V');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const checkWin = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (currentPlayer === 'V') {
          if (j + 1 < 10 && board[i][j] === null && board[i][j + 1] === null) {
            return false;
          }
        } else if (currentPlayer === 'H') {
          if (i + 1 < 10 && board[i][j] === null && board[i + 1][j] === null) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleClick = (row, col) => {
    if (gameOver) return;

    const newBoard = board.map((rowArr) => [...rowArr]);

    if (currentPlayer === 'V') {
      if (row + 1 < 10 && !newBoard[row][col] && !newBoard[row + 1][col] && !checkWin()) {
        newBoard[row][col] = 'V';
        newBoard[row + 1][col] = 'V';
        setBoard(newBoard);
        setCurrentPlayer('H');
        setMessage('');
      } else {
        setMessage('Invalid move for player V');
      }
    } else if (currentPlayer === 'H') {
      if (col + 1 < 10 && !newBoard[row][col] && !newBoard[row][col + 1] && !checkWin()) {
        newBoard[row][col] = 'H';
        newBoard[row][col + 1] = 'H';
        setBoard(newBoard);
        setCurrentPlayer('V');
        setMessage('');
      } else {
        setMessage('Invalid move for player H');
      }
    }

    if (checkWin()) {
      setGameOver(true);
      setMessage(`Player ${currentPlayer} wins!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Domineering Game</Text>
      <Text style={styles.playerText}>
        Current Player: {currentPlayer === 'V' ? 'Vertical (V)' : 'Horizontal (H)'}
      </Text>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.cell,
                  cell === 'V' ? styles.cellV : cell === 'H' ? styles.cellH : null,
                ]}
                onPress={() => handleClick(rowIndex, colIndex)}
              >
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1, 
  },
  cellV: {
    backgroundColor: 'cadetblue',
  },
  cellH: {
    backgroundColor: 'brown',
  },
  cellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    color: 'red',
  },
});

export default Board;