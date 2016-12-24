'use strict';
var builder = require('role.builder');
var defender = require('role.defender');
var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var helper = require('helper');

var spawner = {
  requiredCreeps: function() {
    // generate an object of creeps based on controller level
    return {
      1: {
        'harvester': 2,
        'upgrader': 1
      },
      2: {
        'harvester': 1,
        'upgrader': 2,
        'builder': 1
      },
      3: {
        'harvester': 1,
        'upgrader': 3,
        'builder': 2,
        'defender': 1
      },
      4: {
        'harvester': 1,
        'upgrader': 3,
        'builder': 3,
        'defender': 1
      },
      5: {
        'harvester': 1,
        'upgrader': 3,
        'builder': 2,
        'defender': 2
      },
      6: {
        'harvester': 1,
        'upgrader': 3,
        'builder': 2,
        'defender': 2
      },
      7: {
        'harvester': 1,
        'upgrader': 4,
        'builder': 2,
        'defender': 2
      },
      8: {
        'harvester': 2,
        'upgrader': 0,
        'builder': 3,
        'defender': 4
      }
    }
  },

  creepParts: function() {
    // generate an object of creep parts based on controller level
    return {
      1: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, WORK, CARRY]
      },
      2: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, WORK, CARRY],
        'builder': [WORK, WORK, CARRY, MOVE]
      },
      3: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        'builder': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
      },
      4: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        'builder': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
      },
      5: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        'builder': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
      },
      6: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        'builder': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
      },
      7: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        'builder': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
      },
      8: {
        'harvester': [MOVE, MOVE, WORK, CARRY],
        'upgrader': [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        'builder': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
      }
    }
  },

  spawnQueueManagement: function() {
    // manage Memory.spawnQueue array
    var neededCreeps = this.requiredCreeps();
    var neededParts = this.creepParts();

    var allCreeps = helper.allCreeps();
    var level = Game.spawns['Spawn1'].room.controller.level;

    // only manipulate the queue if it's empty
    if (Memory.spawnQueue.length === 0) {
      // set queue based on existing creeps and required creeps
      if (allCreeps.harvesters.length < neededCreeps[level].harvester) {
        Memory.spawnQueue.push({
          parts: neededParts[level].harvester,
          name: undefined,
          options: {role: 'harvester'}
        });
      }
      if (allCreeps.upgraders.length < neededCreeps[level].upgrader) {
        Memory.spawnQueue.push({
          parts: neededParts[level].upgrader,
          name: undefined,
          options: {role: 'upgrader'}
        });
      }
      if (allCreeps.builders.length < neededCreeps[level].builder) {
        Memory.spawnQueue.push({
          parts: neededParts[level].builder,
          name: undefined,
          options: {role: 'builder'}
        });
      }
      if (allCreeps.defenders.length < neededCreeps[level].defender) {
        Memory.spawnQueue.push({
          parts: neededParts[level].defender,
          name: undefined,
          options: {role: 'defender'}
        });
      }
    }
  },

  spawnStuff: function(spawner) {
    var firstCreep;
    var neededCreeps = this.requiredCreeps();
    var totalCreeps = 0;
    var totalNeededCreeps = 0;

    var allCreeps = helper.allCreeps();
    var level = Game.spawns['Spawn1'].room.controller.level;

    for (var type in allCreeps) {
      if (allCreeps.hasOwnProperty(type)) {
        totalCreeps += allCreeps[type].length;
      }
    }

    for (var type in neededCreeps[level]) {
      if (neededCreeps[level].hasOwnProperty(type)) {
        totalNeededCreeps += neededCreeps[level][type];
      }
    }

    if (totalCreeps < totalNeededCreeps) {
      this.spawnQueueManagement();
      firstCreep = Memory.spawnQueue[0];

      // if this spawner can make the next in the queue, do so and delete from queue
      if (spawner.canCreateCreep(firstCreep.parts) === OK) {
        spawner.createCreep(firstCreep.parts, firstCreep.name, firstCreep.options);
        Memory.spawnQueue.shift();
      }
    }
  }
};

module.exports = spawner;
