package com.minesweeper.api.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class Game {
	
	private String playerName;
	private String gameStatus;
	private String gameId;
    private int moves;
    private int rowsNumber;
    private int columnsNumber;
    private int minesNumber;
    private Fields[][] fields;
    
    
    
    
    private static final String GAME_WIN = "Congratulations!! You won :D.";
    private static final String GAME_LOST = "BOOM!!!";
    
    public void startGame() {
       this.fields = buildBoard();
       setNeighbourCount();
       
       //TODO - DELETE THIS
       for(int i = 0; i < this.fields.length; i++) {
    	   for(int j = 0; j < this.fields[i].length; j++) {
    		   System.out.println("ELEMENT " + i + " " + j + " " + fields[i][j]);
    	   }
       }
    }
    
    
    public Fields[][] buildBoard() {
    	Fields[][] board = new Fields[this.rowsNumber][this.columnsNumber];
        populateBoardWithCells(board);
        populateBoardWithMines(board);
        return board;
    }

    private void populateBoardWithCells(final Fields[][] board) {
        for (int row = 0; row < this.rowsNumber; row++) {
            for (int col = 0; col < this.columnsNumber; col++) {
                board[row][col] = new Fields();
            }
        }
    }

    private void populateBoardWithMines(final Fields[][] board) {
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
    
    private void shuffleBoard(final Fields[][] board) {
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
    
    
    private void setNeighbourCount() {
        for (int row = 0; row < rowsNumber; row++) {
            for (int col = 0; col < columnsNumber; col++) {
            	Fields cell = getCell(row, col);
            	
                cell.setCountOfNeighbourMines(!cell.isMine() ? getCountOfNeighbourMines(cell) : 0);
            }
        }
    }
    
    public void checkSelectedFieldv2(int row, int column) {
    	Fields currentField = this.getCell(row, column);
    	
    	this.setGameStatus("Playing");
    	this.moves++;
    	
    	if(currentField.isMine()) {
    		this.setGameStatus(GAME_LOST);
    	}
    	
    	if(currentField.isVisited() || this.getCountOfNeighbourMines(currentField) == 0) {
    		checkCellRecursively(currentField);
    	}else {
    		currentField.setVisited(true);
    	}
    	
    	
    	 if (gameIsWon()) {
    		 this.setGameStatus(GAME_WIN);
         }
    }
    
    
    public List<Fields> getNeighbourCells(Fields cell) {
        for (int row = 0; row < rowsNumber; row++) {
            for (int col = 0; col < columnsNumber; col++) {
                if (getCell(row, col) == cell) {
                    return getNeighbourCells(row, col);
                }
            }

        }
        return Collections.emptyList();
    }

    private List<Fields> getNeighbourCells(final int row, final int col) {
        List<Fields> neighbours = new ArrayList<>();
        if (isValidPosition(row - 1, col - 1)) {
            neighbours.add(fields[row - 1][col - 1]);
        }
        if (isValidPosition(row - 1, col)) {
            neighbours.add(fields[row - 1][col]);
        }
        if (isValidPosition(row - 1, col + 1)) {
            neighbours.add(fields[row - 1][col + 1]);
        }
        if (isValidPosition(row, col - 1)) {
            neighbours.add(fields[row][col - 1]);
        }
        if (isValidPosition(row, col + 1)) {
            neighbours.add(fields[row][col + 1]);
        }
        if (isValidPosition(row + 1, col - 1)) {
            neighbours.add(fields[row + 1][col - 1]);
        }
        if (isValidPosition(row + 1, col)) {
            neighbours.add(fields[row + 1][col]);
        }
        if (isValidPosition(row + 1, col + 1)) {
            neighbours.add(fields[row + 1][col + 1]);
        }
        return neighbours;
    }

    public int getCountOfNeighbourMines(Fields cell) {
        int countOfNeighbourMines = 0;
        List<Fields> neighbours = getNeighbourCells(cell);
        for (Fields neighbour : neighbours) {
            if (neighbour.isMine()) {
                countOfNeighbourMines++;
            }
        }
        return countOfNeighbourMines;
    }
    
    
    
    
    
    private void checkCellRecursively(Fields cell) {
        List<Fields> neighbours = getNeighbourCells(cell);
        for (Fields neighbour : neighbours) {
            if (neighbour.isVisited()) {
                continue;
            }

            if (cell.isMine() && !cell.isMarkedAsBomb()) {
            	this.setGameStatus(GAME_LOST);
                return;
            } else {
                neighbour.setVisited(true);

                if (getCountOfNeighbourMines(neighbour) == 0) {
                	checkCellRecursively(neighbour);
                }
            }
        }
    }
    
    public Fields getCell(final int row, final int col) {
        if (!isValidPosition(row, col)) {
            return null;
        }
        return fields[row][col];
    }
  
    
    private boolean gameIsWon() {
        for (int row = 0; row < rowsNumber; row++) {
            for (int col = 0; col < columnsNumber; col++) {
                if (!getCell(row, col).isMine() && !getCell(row, col).isVisited()) {
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean isValidPosition(final int row, final int col) {
        if (row < 0 || row >= rowsNumber) {
            return false;
        }

        if (col < 0 || col >= columnsNumber) {
            return false;
        }

        return fields[row][col] != null;
    }
}
