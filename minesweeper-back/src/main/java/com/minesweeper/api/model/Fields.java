package com.minesweeper.api.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Fields {
	
	private boolean isVisited;
    private boolean isMine;
    private boolean isFlagged;
    private int countOfNeighbourMines;
    
    public Fields() {
        isVisited = false;
        isMine = false;
        isFlagged = false;
        countOfNeighbourMines = 0;
    }

}
