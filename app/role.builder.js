'use strict';
var helper = require('helper');

var roleBuilder = {
  run: function(creep) {
    this.buildingStatus(creep);

    if (creep.memory.building) {
      this.buildStuff(creep);
    } else {
      helper.harvestStuff(creep);
    }
  },

  buildingStatus: function(creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('Harvesting');
    }
    if (!creep.memory.building && creep.carry.energy >= creep.carryCapacity * .75) {
      creep.memory.building = true;
      creep.say('Building');
    }
  },

  buildStuff: function(creep) {
    var sites = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (sites.length) {
      if (creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
        helper.walk(creep, sites[0]);
      }
    } else {
      this.repairStuff(creep);
    }
  },

  repairStuff: function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: function(structure) {
        return structure.hits < structure.hitsMax;
      }
    });

    if (targets.length) {
      if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        helper.walk(creep, targets[0]);
      }
    }
  }
};

module.exports = roleBuilder;
