package com.minesweeper.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.minesweeper.api.model.Game;

@SpringBootApplication
public class MinesweeperApplication {

	public static void main(String[] args) {
		SpringApplication.run(MinesweeperApplication.class, args);
//		Game newGame = Game.builder()
//	            .gameStatus("NEW")
//	            .playerName("Osman")
//	            .rows(2)
//	            .columns(2)
//	            .mines(2)
//	            .countOfRows(2)
//	            .countOfColumns(2)
//	            .countOfMines(2)
//	            .build();
//	        newGame.startGame();
	}

}
