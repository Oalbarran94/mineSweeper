package com.minesweeper.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minesweeper.api.model.Game;
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
	@ApiOperation(value = "Create a new game with given parameters", response = String.class)
	public ResponseEntity<String> createGame(@RequestBody BeginGame gameParams) {
		
		String gameId = appService.createGame(gameParams);
		return new ResponseEntity<>(gameId, HttpStatus.OK);
	}
	
	@GetMapping("/checkgame/{gameId}/{row}/{column}")
	@ApiOperation(value = "Create a new game with given parameters", response = Game.class)
    public ResponseEntity<Game> checkGameById(@PathVariable(value = "gameId") String gameId,
    		@PathVariable(value = "row") int row, @PathVariable(value = "column") int column) throws Exception
    {
		Game game = appService.checkSelectedField(row, column, gameId);
        return ResponseEntity.ok(game);
    }

}
