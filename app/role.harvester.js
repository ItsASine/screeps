'use strict';
var helper = require('helper');

var roleHarvester = {
  run: function(creep) {
    if (this.needsEnergy(creep)) {
      this.pickupLitter(creep);
    } else {
      this.storeStuff(creep);
    }
  },

  needsEnergy: function(creep) {
    return creep.carry.energy < creep.carryCapacity;
  },

  pickupLitter: function(creep) {
    var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);

    if (droppedEnergy.length) {
      if (creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
        helper.walk(creep, droppedEnergy[0])
      }
    } else {
      helper.harvestStuff(creep);
    }
  },

  storeStuff: function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: function(structure) {
        return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER ||
            structure.structureType === STRUCTURE_CONTAINER) &&
            structure.energy < structure.energyCapacity;
      }
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        helper.walk(creep, targets[0]);
      }
    }
  }
};

module.exports = roleHarvester;
