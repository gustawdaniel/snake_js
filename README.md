# snake_js
Snake game written in javascript using objects. 


# Instaltion

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

# Game

To game run

    firefox localhost:8080
    
Pres space to start and use arrows to control snake first snake or `WSAD` to control second one. 

[![Zrzut_ekranu_z_2018-02-18_04-36-10.png](https://i.imgur.com/fnkcp2e.png)](https://i.imgur.com/fnkcp2e.png)

# Multi player game

To run

    node index.js   

States of client for single palyer:

- paused
- active

States of client for multiplayer:

1) Select multiplayer or single player
2) If hi is in game then game can wait for second player or started.

Generally game can be created, active or finished.

So client can wait for game activation, join to existing created game, create new game or play,
when game finished he should see result and could join to existing game or create his own.






