package com.minesweeper.api.model.request;

import lombok.Data;
import lombok.ToString;
import io.swagger.annotations.ApiModelProperty;

@Data
@ToString
public class BeginGame {
	
	@ApiModelProperty(notes = "User name playing")
	private String userName;
	@ApiModelProperty(notes = "Rows to add to the game")
	private Integer rowsNumber;
	@ApiModelProperty(notes = "Columns to add to the game")
	private Integer columnsNumber;
	@ApiModelProperty(notes = "Mines in game")
	private Integer minesNumber;

}
