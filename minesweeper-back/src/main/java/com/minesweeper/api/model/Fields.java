package com.minesweeper.api.model;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Document(collection = "fields")
public class Fields {
	
	@Id
	private long id;
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
