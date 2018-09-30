var globals = require('globals');

var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    globals.setWorkingStatus(creep);

    if (creep.memory.working) {
      this.upgrade(creep);
    } else {
      globals.harvest(creep);
    }
  },

  /** @param {Creep} creep **/
  upgrade: function(creep) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, globals.lines.white);
    }
  }
};

module.exports = roleUpgrader;
