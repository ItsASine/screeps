// Initialize Memory properties for other files and cleanup if needed

'use strict';

var memory = {
  init: function() {
    Memory.spawnQueue = [];
    //Memory.stuckCount = 0;
    //Memory.suicides = 0;
  },

  clearDeadStuff: function(allCreeps) {
    var creepsInMemory = Memory.creeps;

    for (var memoryCreep in creepsInMemory) {
      if (!allCreeps[memoryCreep] && creepsInMemory.hasOwnProperty(memoryCreep)) {
        delete Memory.creeps[memoryCreep];
        console.log('Clearing non-existing creep memory:', memoryCreep);
      }
    }
  }
};

module.exports = memory;
