package com.minesweeper.api.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.minesweeper.api.model.Game;
import com.minesweeper.api.model.History;
import com.minesweeper.api.model.request.BeginGame;
import com.mongodb.client.MongoCollection;


@Service
public class AppService {
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	private History historyGame = new History();
	
	public Game createGame(BeginGame gameParams) {
		
		UUID uuid = UUID.randomUUID();
		
		MongoCollection<Document> collection = mongoTemplate.getCollection("game");
		
		
		Game newGame = Game.builder()
				._id(collection.countDocuments())
				.gameId(uuid.toString())
				.gameStatus("PLAYING")
				.playerName(gameParams.getUserName())
				.rowsNumber(gameParams.getRowsNumber())
	            .columnsNumber(gameParams.getColumnsNumber())
	            .minesNumber(gameParams.getMinesNumber())
				.build();
		
		newGame.startGame();
		
		
		Game gameSaved = mongoTemplate.insert(newGame);
		
		
		return gameSaved;
	}
	
	public Game checkSelectedField(int row, int column, String gameId, String timeTaken) throws Exception{
		
		MongoCollection<Document> collection = mongoTemplate.getCollection("history");
		
		List<History> historySaved = mongoTemplate.findAll(History.class);		
		List<Game> gamesSaved = mongoTemplate.findAll(Game.class);
		
		Optional<Game> currentGame = gamesSaved.stream().filter(field -> field.getGameId().equals(gameId)).findFirst();
		Optional<History> historyGame = historySaved.stream().filter(field -> field.getHistoryGame().getGameId().equals(gameId)).findFirst();
		
		Game game = currentGame.get();
		
		
		if (game.checkIfGameOver()) {
			History history = historyGame.isPresent() ? updateHistory(game) : setNewHistory(collection.countDocuments(), game);
			if(historyGame.isPresent()) {
				mongoTemplate.save(history);
			}else {
				mongoTemplate.insert(history);
			}
            throw new RuntimeException("The Game is over");
        }
		
		game.checkSelectedField(row, column);
		
		game = mongoTemplate.save(game);
		
		if(game.checkIfWon()) {
			game.setTimeTaken(timeTaken);
			History history = historyGame.isPresent() ? updateHistory(game) : setNewHistory(collection.countDocuments(), game);
			if(historyGame.isPresent()) {
				mongoTemplate.save(history);
			}else {
				mongoTemplate.insert(history);
			}
		}
		
		if(game.checkIfGameOver()) {
			game.setTimeTaken(timeTaken);
			History history = historyGame.isPresent() ? updateHistory(game) : setNewHistory(collection.countDocuments(), game);
			if(historyGame.isPresent()) {
				mongoTemplate.save(history);
			}else {
				mongoTemplate.insert(history);
			}
		}
		
		return game;
	}
	
	public Game flaggedField(int row, int column, String gameId) {
		
		List<Game> gamesSaved = mongoTemplate.findAll(Game.class);
		Optional<Game> currentGame = gamesSaved.stream().filter(field -> field.getGameId().equals(gameId)).findFirst();
		
		Game game = currentGame.get();
		
		if (game.checkIfGameOver()) {
            throw new RuntimeException("The Game is over");
        }
		
		game.flaggedField(row, column);
		
		game = mongoTemplate.save(game);
		
		return game;
	}
	
	public List<History> getPLayedGames(String user) {
		List<History> gamesHistory = mongoTemplate.findAll(History.class);
		
		List<History> currentGames = gamesHistory.stream().filter(field -> field.getHistoryGame().getPlayerName().equals(user))
				.collect(Collectors.toList());
		
		return currentGames;
	}
	
	public Game pauseGame(String gameId, String timeTaken) {
		MongoCollection<Document> collection = mongoTemplate.getCollection("history");
		
		List<Game> gamesSaved = mongoTemplate.findAll(Game.class);
		List<History> historySaved = mongoTemplate.findAll(History.class);
		
		Optional<Game> currentGame = gamesSaved.stream().filter(field -> field.getGameId().equals(gameId)).findFirst();
		Optional<History> historyGame = historySaved.stream().filter(field -> field.getHistoryGame().getGameId().equals(gameId)).findFirst();
		
		Game game = currentGame.get();
		
		
		if (game.checkIfGameOver()) {
            throw new RuntimeException("The Game is over. You cannot pause it");
        }
		
		game.togglePause();
		game.setTimeTaken(timeTaken);
		
		game = mongoTemplate.save(game);
		
		History history = historyGame.isPresent() ? updateHistory(game) : setNewHistory(collection.countDocuments(), game);
		
		if(historyGame.isPresent()) {
			mongoTemplate.save(history);
		}else {
			mongoTemplate.insert(history);
		}
		
		return game;
	}
	
	public History setNewHistory(long id, Game game) {
		historyGame.set_id(id);
		historyGame.setHistoryGame(game);
		return historyGame;
	}
	
	public History updateHistory(Game game) {
		historyGame.setHistoryGame(game);
		return historyGame;
	}

}
