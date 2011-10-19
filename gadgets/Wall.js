/*
 * Wall
 * 
 * Prints lines sequentially;
 * 
 */


function Wall(id) {
	this.game = node.game;
	this.id = id || 'wall';
	this.name = 'Wall';
	this.version = '0.2.1';
	
	this.wall = null;
	
	this.buffer = [];
	
	this.counter = 0;
	// TODO: buffer is not read now
	
}

Wall.prototype.append = function (root, id) {
	var fieldset = nodeWindow.addFieldset(root, this.id+'_fieldset', 'Game Log');
	var idLogDiv = id || this.id;
	this.wall = nodeWindow.addElement('pre', fieldset, idLogDiv);
};

Wall.prototype.write = function(text) {
	if (document.readyState !== 'complete') {
        this.buffer.push(s);
    } else {
    	var mark = this.counter++ + ') ' + Utils.getTime() + ' ';
    	this.wall.innerHTML = mark + text + "\n" + this.wall.innerHTML;
        this.buffer = []; // Where to place it?
    }  
};

Wall.prototype.listeners = function() {
	var that = this;
//		this.game.on('in.say.MSG', function(p,msg){
//			that.write(msg.toSMS());
//		});
//	
//		this.game.on('out.say.MSG', function(p,msg){
//			that.write(msg.toSMS());
//		});
//	
//	
//		this.game.on('MSG', function(p,msg){
//			that.write(msg.toSMS());
//		});
	
	node.on('LOG', function(msg){
		that.write(msg);
	});
}; 