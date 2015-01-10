this.Map = function(cols, rows) {
	var self = this;
	self.ROWS = rows;
	self.COLS = cols;
	self.cells = [];
	
	for (var row = 0; row<rows; ++row) {
		for (var col = 0; col<cols; ++col) {
			self.cells.push(new Cell(col, row, 'normal'));
		}
	}
};

_.extend(Map.prototype, {
	getCell: function(col, row) {
		return this.cells[col + row * this.COLS];
	},
	
	moveRobot: function(robot, newCell) {
		robot.cell.robot = null;
		robot.cell = newCell;
		newCell.robot = robot;
	},
	
	/**
	 * Whether the given robot can move (or push)
	ONE square in the given direction
	 */
	canMoveOrPush: function(robot, direction) {
		var newCoords = direction.projectOne(
			robot.cell.row, 
			robot.cell.col
		);
		
		// Prevent movement out-of-bounds
		if (newCoords.row < 0 || newCoords.row >= this.ROWS
			|| newCoords.col < 0 || newCoords.col >= this.COLS)
			return false;
			
		var newCell = this.getCell(newCoords.col, newCoords.row);
		if (newCell.robot) {
			return this.canMoveOrPush(newCell.robot, direction);
		}
		
		return true;
		
	},
	
})