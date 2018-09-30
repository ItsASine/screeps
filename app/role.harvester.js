var globals = require('globals');

var roleHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      globals.harvest(creep);
    } else {
      this.transfer(creep);
    }
  },

  /** @param {Creep} creep **/
  transfer: function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity;
      }
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], globals.lines.white);
      }
    }
  }
};

module.exports = roleHarvester;
