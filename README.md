# minesweeper-API
API test

This game was built using java as backend and reactjs to built the client.

The api documentacion can be found here: https://minesweeper-api-java.herokuapp.com/swagger-ui.html#/app-controller.
The client to play the game is here: https://minesweeper-app-client.herokuapp.com/.

It is a basic game. The user history is taken just by user game. I did not want to take time building a whole login module so I based the history by user name. So if you want to see all you previous games, you will have to fill in inside the user field the same name you have been using.

You can pause and resume the game paused.

You can right click a field where you think it is a mine. The field will mark with this icon 🚩.

If you click a cell with a mine, you will lose the game and all the mines will be revealed with 💣.

If you revealed all the fields with no mine, you will win the game.

The first time you played the game, it might take a few seconds to start due to heroku starting up the server.
