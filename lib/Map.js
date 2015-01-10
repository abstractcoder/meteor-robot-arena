
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
	
})