
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
	
	// Only applied to pushed movement
	self.isPushed = false;
	self.pusher = null;
}


this.GameController = function(robots, map) {
	var self = this;
	self.robots = robots;
	self.map = map;
	self.commands = [
		// Suicide move
		new Command(0, robots[2], 'move', DIRECTIONS.WEST, 4),
		new Command(0, robots[2], 'move', DIRECTIONS.NORTH, 4), // Confirm death
		
		new Command(0, robots[1], 'move', DIRECTIONS.WEST, 4),
		new Command(0, robots[3], 'move', DIRECTIONS.SOUTH, 1),
		new Command(0, robots[3], 'move', DIRECTIONS.EAST, 4),
		
		// Big push move
		new Command(0, robots[0], 'move', DIRECTIONS.SOUTH, 5),
		
		// Lineup
		new Command(0, robots[1], 'move', DIRECTIONS.WEST, 2),
		new Command(0, robots[3], 'move', DIRECTIONS.NORTH, 1),
		new Command(0, robots[3], 'move', DIRECTIONS.WEST, 1),
		new Command(0, robots[0], 'move', DIRECTIONS.SOUTH, 1),
		new Command(0, robots[0], 'move', DIRECTIONS.WEST, 2),
	];
	
	self.DELAY = 500;
}

_.extend(GameController.prototype, {
	
	executeCommands: function() {
		this.executeNextCommand();
	},
	
	executeNextCommand: function() {
		if (this.commands.length > 0)
			this.execute(this.commands.shift());
	},
	
	delayExecute: function(func) {
		Meteor.setTimeout(func, this.DELAY);
	},
	
	execute: function(command) {
		if (command.type === 'move') {
			// Put a stop to the recursion!
			
			if (command.number == 0 || command.robot.isDead) {
				if (!command.isPushed)
					this.executeNextCommand();
				return;
			}
			
			if (!map.canMoveOrPush(command.robot, command.direction))
				return;

			// Find the new location
			var newCoords = command.direction.projectOne(
				command.robot.cell.row, 
				command.robot.cell.col
			);
			
			var newCell = map.getCell(newCoords.col, newCoords.row);
			
			// Check if new cell is occupied
			if (newCell.robot) {
				// Occupied - push
				var pushCommand = new Command(0, newCell.robot, 'move', command.direction, 1);
				pushCommand.isPushed = true;
				
				// This is either a chained push or an original move
				pushCommand.pusher = command.isPushed ? command.pusher : command.robot;
				
				this.execute(pushCommand);
			}
			map.moveRobot(command.robot, this.map.getCell(newCoords.col, newCoords.row));
			
			// Kill it if it dead
			if (command.robot.cell.type === 'pit') {
				command.robot.die();
				if (command.isPushed)
					++command.pusher.score;
			}

			robotDep.changed();
				
			// Recursively finish up this move
			// (this process breaks the move into individual steps)
			--command.number;
			var self = this;
			this.delayExecute(function() {
				self.execute(command);
			});
		} else if (command.type === 'shoot') {
			
			// TODO damage an enemy
			
			this.executeNextCommand();
		}
		
	}
	
});