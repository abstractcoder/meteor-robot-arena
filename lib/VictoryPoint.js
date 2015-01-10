this.VictoryPoint = function(cell) {
	var self = this;
	self.cell = cell;
};

_.extend(VictoryPoint.prototype, {
	radius: function() {
		return ROBOT_RADIUS;
	},
	x1: function() {
		return this.cell.x();
	},
	
	y1: function() {
		return this.cell.y() + this.cell.height() - STROKE_WIDTH;
	},
	x2: function() {
		return this.cell.x() + this.cell.width()/2;
	},
	y2: function() {
		return this.cell.y();
	},
	x3: function() {
		return this.cell.x() + this.cell.width() - STROKE_WIDTH;
	},
	y3: function() {
		return this.cell.y() + this.cell.height() - STROKE_WIDTH;
	},
	class_name: function() {
		return 'victory-point';
	}
});