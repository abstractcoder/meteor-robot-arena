// Generate map
this.map = new Map(9, 9);

// Pits
map.getCell(0,8).type = 'pit';
map.getCell(0,0).type = 'pit';
map.getCell(8,8).type = 'pit';
map.getCell(8,0).type = 'pit';
map.getCell(6,1).type = 'pit';
map.getCell(3,3).type = 'pit';
map.getCell(6,6).type = 'pit';
map.getCell(1,6).type = 'pit';

// Repair
map.getCell(4, 4).type = 'repair';

// Starting areas
// cells[getCell(4,0)].type = 'player-start-1';
// cells[getCell(8,4)].type = 'player-start-2';
// cells[getCell(4,8)].type = 'player-start-3';
// cells[getCell(0,4)].type = 'player-start-4';


// Intialize robots
this.robots = [];

robots.push(new Robot(1, map.getCell(4,0)));
robots.push(new Robot(2, map.getCell(8,4)));		
robots.push(new Robot(3, map.getCell(4,8)));
robots.push(new Robot(4, map.getCell(0,4)));

this.robotDep = new Deps.Dependency();

// Create victor point
var startingVPIndex = Math.round(Math.random() * 5);
var startingVPCoords = VICTORY_POINT_POSITIONS[startingVPIndex];
var victoryPoint = new VictoryPoint(map.getCell(startingVPCoords[0], startingVPCoords[1]));

// Create game controller
var controller = new GameController(robots, map);
controller.executeCommands();

Template.grid.helpers({
	strokeWidth: STROKE_WIDTH,
	gridRealWidth: TILE_WIDTH * COL_COUNT + STROKE_WIDTH/2,
	gridRealHeight: TILE_HEIGHT * ROW_COUNT + STROKE_WIDTH/2,
	cells: map.cells,	
	robots: function() {
		robotDep.depend();
		return controller.robots;
	},
	victoryPoint: victoryPoint,
	time: Session.get('time')
});

Template.grid.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set("counter", Session.get("counter") + 1);
  }
});