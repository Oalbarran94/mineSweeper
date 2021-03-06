package com.minesweeper.api.controller;

import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.minesweeper.api.model.Game;
import com.minesweeper.api.model.History;
import com.minesweeper.api.model.request.BeginGame;
import com.minesweeper.api.service.AppService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/mines/api")
@Api(value = "Minesweeper API")
public class AppController {
	
	@Autowired
	private AppService appService;
	
	@PostMapping("/creategame")
	@ApiOperation(value = "Create a new game with given parameters", response = Game.class)
	public ResponseEntity<Game> createGame(@RequestBody BeginGame gameParams) {
		Game game = appService.createGame(gameParams);
		return new ResponseEntity<>(game, HttpStatus.OK);
	}
	
	@GetMapping("/checkgame/{gameId}/{row}/{column}/{timeTaken}")
	@ApiOperation(value = "Create a new game with given parameters", response = Game.class)
    public ResponseEntity<Game> checkGameById(@PathVariable(value = "gameId") String gameId,
    		@PathVariable(value = "row") int row, @PathVariable(value = "column") int column,
    		@PathVariable(value = "timeTaken") String timeTaken) throws Exception {
		try {
			System.out.println("HORA " + timeTaken);
			Game game = appService.checkSelectedField(row, column, gameId, timeTaken);
	        return ResponseEntity.ok(game);
		} catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
		
    }
	
	@GetMapping("/flaggedfield/{gameId}/{row}/{column}")
	@ApiOperation(value = "Mark field as a possible mine", response = Game.class)
	public ResponseEntity<Game> flaggedField(@PathVariable(value = "gameId") String gameId,
    		@PathVariable(value = "row") int row, @PathVariable(value = "column") int column){
		try {
			Game game = appService.flaggedField(row, column, gameId);
	        return ResponseEntity.ok(game);
		} catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
	
	@GetMapping("/playedgames/{user}")
	@ApiOperation(value = "Fetch played games by user", response = List.class)
	public ResponseEntity<List<History>> getPlayedGames(@PathVariable(value = "user") String user){
		try {
			List<History> history = appService.getPLayedGames(user);
	        return ResponseEntity.ok(history);
		} catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
	
	@GetMapping("/pausegame/{gameId}/{timeTaken}")
	@ApiOperation(value = "Fetch played games by user", response = Game.class)
	public ResponseEntity<Game> pauseGame(@PathVariable(value = "gameId") String gameId,
			@PathVariable(value = "timeTaken") String timeTaken){
		try {
			Game game = appService.pauseGame(gameId, timeTaken);
	        return ResponseEntity.ok(game);
		} catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

}
