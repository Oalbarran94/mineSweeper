package com.minesweeper.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.minesweeper.api.model.Game;

public interface AppRepository extends MongoRepository<Game, String>{

}
