var globals = require('globals');

var roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {
    globals.setWorkingStatus(creep);

    if (creep.memory.working) {
      this.build(creep);
    } else {
      globals.harvest(creep);
    }
  },

  /** @param {Creep} creep **/
  build: function(creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (targets.length) {
      if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], globals.lines.white);
      }
    }
  }
};

module.exports = roleBuilder;
