var roles = require('role');
// var globals = require('globals');

module.exports.loop = function() {
  /*
  var towers = Game.rooms[Room.name].find(
      FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
  */

  for (var name in Game.creeps) {
    if (Game.creeps.hasOwnProperty(name)) {
      var creep = Game.creeps[name];

      roles[creep.memory.role].run(creep);
    }
  }

  /*
  if (towers) {
    towers.forEach((tower) => globals.structures.tower.run(tower));
  }
  */
};
