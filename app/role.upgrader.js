'use strict';
var helper = require('helper');

var upgrader = {
  run: function(creep) {
    this.upgradingStatus(creep);

    if (creep.memory.upgrading) {
      this.upgradeController(creep);
    } else {
      helper.harvestStuff(creep);
    }
  },

  upgradingStatus: function(creep) {
    if (creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('Harvesting');
    }
    if (!creep.memory.upgrading && creep.carry.energy >= creep.carryCapacity * .75) {
      creep.memory.upgrading = true;
      creep.say('Upgrading');
    }
  },

  upgradeController: function(creep) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      helper.walk(creep, creep.room.controller);
    }
  }
};

module.exports = upgrader;
