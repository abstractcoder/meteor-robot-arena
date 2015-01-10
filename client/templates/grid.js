// counter starts at 0
Session.setDefault("counter", 0);


this.getCell = function(col, row)  {
	return row * COL_COUNT + col;
}
	
Template.grid.helpers({
  counter: function () {
    return Session.get("counter");
  },
	
	strokeWidth: STROKE_WIDTH,
	gridRealWidth: TILE_WIDTH * COL_COUNT + STROKE_WIDTH/2,
	gridRealHeight: TILE_HEIGHT * ROW_COUNT + STROKE_WIDTH/2,
	
	cells: function () {
		var items = [];
		
		for (var y = 0; y < ROW_COUNT; y++) {
			for (var x = 0; x < COL_COUNT; x++) {
				items.push(new Cell(x, y, 'normal'));
			}
		}
		
		// Repair
		items[getCell(4,4)].type = 'repair';
		
		// Pits
		items[getCell(0,8)].type = 'pit';
		items[getCell(0,0)].type = 'pit';
		items[getCell(8,8)].type = 'pit';
		items[getCell(8,0)].type = 'pit';
		items[getCell(6,1)].type = 'pit';
		items[getCell(3,3)].type = 'pit';
		items[getCell(6,6)].type = 'pit';
		items[getCell(1,6)].type = 'pit';
		
		// Starting areas
		items[getCell(4,0)].type = 'player-start-1';
		items[getCell(8,4)].type = 'player-start-2';
		items[getCell(4,8)].type = 'player-start-3';
		items[getCell(0,4)].type = 'player-start-4';
		
		console.log(items);
		
		return items;
	}

});

Template.grid.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set("counter", Session.get("counter") + 1);
  }
});
