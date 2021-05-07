package com.minesweeper.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.minesweeper.api.model.Game;
import com.minesweeper.api.model.request.BeginGame;

@Service
public class AppService {
	
	//Temporary variable to save games.. 
	//TODO - Change with real db
	private static List<Game> savedGames;
	
	public String createGame(BeginGame gameParams) {
		
		UUID uuid = UUID.randomUUID();
		
		Game newGame = Game.builder()
				.gameId(uuid.toString())
				.gameStatus("New Game")
				.playerName(gameParams.getUserName())
				.rowsNumber(gameParams.getRowsNumber())
	            .columnsNumber(gameParams.getColumnsNumber())
	            .minesNumber(gameParams.getMinesNumber())
				.build();
		
		newGame.startGame();
		
		
		//TODO - Change with real data base validation
		if(savedGames == null) {
			savedGames = new ArrayList<>();
			savedGames.add(newGame);
		}else {
			savedGames.add(newGame);
		}
		
		return uuid.toString();
	}
	
	public Game checkSelectedField(int row, int column, String gameId) throws Exception{

		//TODO - Get values from a real data base.. Testing porpuses for now
		Optional<Game> op = savedGames.stream().filter(field -> field.getGameId().equals(gameId)).findFirst();
		
		Game game = op.get();
		
		//game.checkSelectedField(row, column);
		game.checkSelectedFieldv2(row, column);
		
		return game;
	}

}
