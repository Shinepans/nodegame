/*
 * StateDisplay
 * 
 * Sends STATE msgs
 */

function StateDisplay(id) {
	
	this.game = node.game;
	this.id = id || 'statedisplay';
	this.name = 'State Display';
	this.version = '0.2.1';
	
	this.fieldset = null;
	this.stateDiv = null;
}


StateDisplay.prototype.append = function (root, ids) {
	var that = this;
	var PREF = this.id + '_';
	
	var idFieldset = PREF + 'fieldset';
	var idPlayer = PREF + 'player';
	var idState = PREF + 'state'; 
	
	if (ids !== null && ids !== undefined) {
		if (ids.hasOwnProperty('fieldset')) idFieldset = ids.fieldset;
		if (ids.hasOwnProperty('player')) idPlayer = ids.player;
		if (ids.hasOwnProperty('state')) idState = ids.state;
	}
	
	this.fieldset = nodeWindow.addFieldset(root, idFieldset, 'Player Status');
	
	
	this.playerDiv = nodeWindow.addDiv(this.fieldset,idPlayer);
	
	var checkPlayerName = setInterval(function(idState,idPlayer){
			if(that.game.player !== null){
				clearInterval(checkPlayerName);
				that.updateAll();
			}
		},100);

	return this.fieldset;
	
};

StateDisplay.prototype.updateAll = function(idState,idPlayer) {
	var pName = document.createTextNode('Name: ' + this.game.player.name);
	var pId = document.createTextNode('Id: ' + this.game.player.id);
	
	this.playerDiv.appendChild(pName);
	this.playerDiv.appendChild(document.createElement('br'));
	this.playerDiv.appendChild(pId);
	
	this.stateDiv = nodeWindow.addDiv(this.playerDiv,idState);
	this.updateState(this.game.gameState);
};

StateDisplay.prototype.updateState =  function(state) {
	var that = this;
	var checkStateDiv = setInterval(function(){
		if(that.stateDiv){
			clearInterval(checkStateDiv);
			that.stateDiv.innerHTML = 'State: ' +  state.toString() + '<br />';
			// was
			//that.stateDiv.innerHTML = 'State: ' +  GameState.stringify(state) + '<br />';
		}
	},100);
};

StateDisplay.prototype.listeners = function () {
	var that = this;
	var say = node.actions.SAY + '.';
	var set = node.actions.SET + '.';
	var get = node.actions.GET + '.'; 
	var IN =  node.IN;
	var OUT = node.OUT;
	
	node.on( 'STATECHANGE', function(state) {
		that.updateState(state);
	}); 
}; 