this.Cell = function(col, row, type) {
	var self = this;
	self.col = col;
	self.row = row;
	self.type = type;	
	self.robot = null;
};

_.extend(Cell.prototype, {
	width: function() {
		return TILE_WIDTH;
	},
	height: function() {
		return TILE_HEIGHT;
	},
	x: function() {
		return this.col * this.width();
	},
	
	y: function() {
		return this.row * this.height();
	},
	class_name: function() {
		return 'cell-' + this.type;
	}
});