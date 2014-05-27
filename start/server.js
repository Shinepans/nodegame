/*
 * Launcher file for nodeGame server with conf.
 */

var ServerNode = require('nodegame-server').ServerNode;

var options = {
    confDir: './conf',
    // logDir: './log', // not working at the moment
    servernode: function (servernode) {
        // TODO: check if the verbosity property here correctly affects the verbosity of the games in channels
	servernode.verbosity = 100;
	servernode.gamesDirs.push('./games');
	return true;
    },
    http: function (http) {
	// Special configuration here
	return true;
    },
    sio: function (sio) {
	// Special configuration here
	return true;
    }
};
// Start server

// Option parameter is optional
var sn = new ServerNode(options);

//var mygame = sn.addChannel({
//    name: 'mygame',
//    admin: 'mygame/admin',
//    player: 'mygame',
//    verbosity: 100
//});

var facerank = sn.addChannel({
    name: 'facerank',
    admin: 'facerank/admin',
    player: 'facerank',
    verbosity: 100
});

// We can load a game here
var path = require('path');

//var mygamePath = path.resolve('./games/mygame/server/game.room.js');
//sn.startGame('mygame', mygamePath);

var logicPath = path.resolve('./games/facerank/server/game.room.js');
//sn.startGame('facerank', mygamePath);

var room = facerank.createWaitingRoom({
    logicPath: logicPath
});

module.exports = sn;
