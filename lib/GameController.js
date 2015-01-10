
this.Direction = function(rowOffset, colOffset) {
	var self = this;
	self.rowOffset = rowOffset;
	self.colOffset = colOffset;
};

_.extend(Direction.prototype, {
	projectOne: function(row, col) {
		return {
			row: row + this.rowOffset,
			col: col + this.colOffset
		};
	}
});

this.DIRECTIONS = {
	NORTH: new Direction(-1, 0),
	NORTHEAST: new Direction(-1, 1),
	EAST: new Direction(0, 1),
	SOUTHEAST: new Direction(1, 1),
	SOUTH: new Direction(1, 0),
	SOUTHWEST: new Direction(1, -1),
	WEST: new Direction(0, -1),
	NORTHWEST: new Direction(-1, -1),
}

this.Command = function(priority, robot, type, direction, number) {
	var self = this;
	self.priority = priority;
	self.robot = robot;
	self.type = type;
	self.direction = direction;
	self.number = number;
}


this.GameController = function(robots, map) {
	var self = this;
	self.robots = robots;
	self.map = map;
	self.commands = [
		new Command(0, robots[0], 'move', DIRECTIONS.SOUTH, 3),
		new Command(0, robots[0], 'move', DIRECTIONS.WEST, 1)
	];
	
	self.DELAY = 1000;
}

_.extend(GameController.prototype, {
	
	executeCommands: function() {
		this.executeNextCommand();
	},
	
	executeNextCommand: function() {
		if (this.commands.length > 0)
			this.execute(this.commands.shift());
	},
	
	execute: function(command) {
		if (command.type === 'move') {
			console.log('executing command');
			
			// Put a stop to the recursion!
			if (command.number == 0) {
				this.executeNextCommand();
				return;
			}

			// Find the new location
			var newCoords = command.direction.projectOne(
				command.robot.cell.row, 
				command.robot.cell.col
			);
			
			// Prevent movement out-of-bounds
			if (newCoords.row < 0 || newCoords.row >= ROW_COUNT
				|| newCoords.col < 0 || newCoords.col >= COL_COUNT)
				return;
				
			// Move the robot ONE space
			command.robot.cell = this.map.getCell(newCoords.col, newCoords.row);
			
			// Recursively finish up this move
			// (this process breaks the move into individual steps)
			--command.number;
			var self = this;
			//Meteor.setTimeout(function() {
				self.execute(command);
				//}, self.DELAY);
		} else if (command.type === 'shoot') {
			
			// TODO damage an enemy
			
			this.executeNextCommand();
		}
	}
	
});