package com.minesweeper.api.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;


import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Document(collection = "game")
public class Game {
	
	@Id
	private long _id;
	private String gameId;
	private String playerName;
	private String gameStatus;
	private String timeTaken;
    private int rowsNumber;
    private int columnsNumber;
    private int minesNumber;
    private Fields[][] fields;
    
    private static final String GAME_WIN = "Congratulations!! You won :D.";
    private static final String GAME_LOST = "GAME OVER";
    private static final String GAME_PAUSED = "PAUSED";
    
    public void startGame() {
       this.fields = buildBoard();
       setAdjacentFieldsCount();
    }
    
    
    public Fields[][] buildBoard() {
    	Fields[][] board = new Fields[this.rowsNumber][this.columnsNumber];
        populateBoardWithCells(board);
        populateBoardWithMines(board);
        return board;
    }

    private void populateBoardWithCells(Fields[][] board) {
        for (int row = 0; row < this.rowsNumber; row++) {
            for (int col = 0; col < this.columnsNumber; col++) {
                board[row][col] = new Fields();
            }
        }
    }

    private void populateBoardWithMines(Fields[][] board) {
        int mines = 0;
        for (int row = 0; row < this.rowsNumber; row++) {
            for (int col = 0; col < this.columnsNumber; col++) {
                if (mines < minesNumber) {
                    board[row][col].setMine(true);
                    mines++;
                }
            }
        }
        shuffleBoard(board);
    }
    
    
    private void shuffleBoard(Fields[][] board) {
        Random ran = new Random();

        for (int row = board.length - 1; row > 0; row--) {
            for (int col = board[row].length - 1; col > 0; col--) {
                int rowRandom = ran.nextInt(row + 1);
                int colRandom = ran.nextInt(col + 1);

                Fields temp = board[row][col];
                board[row][col] = board[rowRandom][colRandom];
                board[rowRandom][colRandom] = temp;
            }
        }
    }
    
    
    private void setAdjacentFieldsCount() {
        for (int row = 0; row < rowsNumber; row++) {
            for (int col = 0; col < columnsNumber; col++) {
            	Fields field = getField(row, col);
            	
            	field.setCountOfNeighbourMines(!field.isMine() ? getCountOfAdjacentMines(field) : 0);
            }
        }
    }
    
    public void checkSelectedField(int row, int column) {
    	Fields currentField = this.getField(row, column);
    	
    	this.setGameStatus("PLAYING");
    	
    	if(currentField.isMine()) {
    		this.setGameStatus(GAME_LOST);
    		return;
    	}
    	
    	if(currentField.isVisited() || this.getCountOfAdjacentMines(currentField) == 0) {
    		checkFieldRecursively(currentField);
    	}else {
    		currentField.setVisited(true);
    	}
    	
    	
    	 if (gameIsWon()) {
    		 this.setGameStatus(GAME_WIN);
         }
    }
    
    
    public List<Fields> getAdjacentCells(Fields field) {
        for (int row = 0; row < rowsNumber; row++) {
            for (int col = 0; col < columnsNumber; col++) {
                if (getField(row, col) == field) {
                    return getAdjacentCells(row, col);
                }
            }

        }
        return Collections.emptyList();
    }

    private List<Fields> getAdjacentCells(int row, int col) {
        List<Fields> adjacents = new ArrayList<>();
        if (isValidPosition(row - 1, col - 1)) {
        	adjacents.add(fields[row - 1][col - 1]);
        }
        if (isValidPosition(row - 1, col)) {
        	adjacents.add(fields[row - 1][col]);
        }
        if (isValidPosition(row - 1, col + 1)) {
        	adjacents.add(fields[row - 1][col + 1]);
        }
        if (isValidPosition(row, col - 1)) {
        	adjacents.add(fields[row][col - 1]);
        }
        if (isValidPosition(row, col + 1)) {
        	adjacents.add(fields[row][col + 1]);
        }
        if (isValidPosition(row + 1, col - 1)) {
        	adjacents.add(fields[row + 1][col - 1]);
        }
        if (isValidPosition(row + 1, col)) {
        	adjacents.add(fields[row + 1][col]);
        }
        if (isValidPosition(row + 1, col + 1)) {
        	adjacents.add(fields[row + 1][col + 1]);
        }
        return adjacents;
    }

    public int getCountOfAdjacentMines(Fields field) {
        int adjacentMines = 0;
        List<Fields> adjacentFields = getAdjacentCells(field);
        for (Fields adajacentField : adjacentFields) {
            if (adajacentField.isMine()) {
            	adjacentMines++;
            }
        }
        return adjacentMines;
    }
    
    private void checkFieldRecursively(Fields field) {
        List<Fields> adjacentFields = getAdjacentCells(field);
        for (Fields adjacentField : adjacentFields) {
            if (adjacentField.isVisited()) {
                continue;
            }

            if (field.isMine() && !field.isFlagged()) {
            	this.setGameStatus(GAME_LOST);
                return;
            } else {
            	adjacentField.setVisited(true);

                if (getCountOfAdjacentMines(adjacentField) == 0) {
                	checkFieldRecursively(adjacentField);
                }
            }
        }
    }
    
    public Fields getField(int row, int col) {
        if (!isValidPosition(row, col)) {
            return null;
        }
        return fields[row][col];
    }
  
    
    private boolean gameIsWon() {
        for (int row = 0; row < rowsNumber; row++) {
            for (int col = 0; col < columnsNumber; col++) {
                if (!getField(row, col).isMine() && !getField(row, col).isVisited()) {
                    return false;
                }
            }
        }
        return true;
    }
    
    public void flaggedField(int row, int col) {
        Fields field = getField(row, col);
        field.setFlagged(true);
    }
    
    public boolean checkIfGameOver() {
    	return GAME_LOST.equals(this.gameStatus);
    }
    
    public boolean checkIfWon() {
    	return GAME_WIN.equals(this.gameStatus);
    }
    
    private boolean isValidPosition(int row, int col) {
        if (row < 0 || row >= rowsNumber) {
            return false;
        }

        if (col < 0 || col >= columnsNumber) {
            return false;
        }

        return fields[row][col] != null;
    }
    
    public void togglePause() {
        if (this.checkIfPaused()) {
            this.setGameStatus("PLAYING");
        } else {
        	this.setGameStatus(GAME_PAUSED);
        }
    }
    
    public boolean checkIfPaused() {
        return GAME_PAUSED.equals(this.gameStatus);
    }
}
