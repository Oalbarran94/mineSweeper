package com.minesweeper.api.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Fields {
	
	private boolean isVisited;
    private boolean isMine;
    private boolean markedAsBomb;
    private int countOfNeighbourMines;
    private int rowNumber;
    private int columnNumber;
    
    public Fields() {
        isVisited = false;
        isMine = false;
        markedAsBomb = false;
        countOfNeighbourMines = 0;
    }

}
