//Common methods across all creeps regardless of role
'use strict';

var common = {
  walk: function(creep, target) {
    var handleCreepClusters = function() {
      creep.say('Move!');

      // Increase number of creeps stuck in this tick
      Memory.tickCount++;

      // 3 is the magic number of how many creeps get stuck next to that stupid energy location if 1 other is harvesting
      if (Memory.tickCount >= 3) {
        // Increase count of stuck ticks
        Memory.stuckCount++;

        // If there have been 5 ticks where creeps are stuck, delete one
        if (Memory.stuckCount > 5) {
          console.log('Removing obstacle:', creep.name);

          creep.suicide();
          Memory.suicides++; // log suicide count for my own knowledge
          Memory.stuckCount = 0;
        }
      }
    };

    // Cached pathfinding is better for the CPU
    var move = creep.moveTo(target, {noPathFinding: true});

    switch (move) {
      case OK:
      case ERR_TIRED:
        break;
      case ERR_NOT_FOUND:
        // Cached pathfinding returns not found if no cache
        creep.moveTo(target);
        break;
      case ERR_NO_PATH:
        //handleCreepClusters();
        break;
      default:
        console.log('Path error:', move);
    }
  },

  chill: function(creep) {
    var flag = Game.flags.get(0);

    if (!creep.pos.inRangeTo(flag, 4)) {
      creep.walk(flag);
    }
  },

  spawnStuff: function() {
    var spawner = require('spawner');
    var spawn = Game.spawns['Spawn1']; // make this dynamic

    spawner.spawnStuff(spawn);
  },

  harvestStuff: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);

    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      this.walk(creep, sources[0]);
    }
  },

  allCreeps: function() {
    var harvesters = [];
    var upgraders = [];
    var builders = [];
    var defenders = [];
    var allCreeps = Game.creeps;

    for (var name in allCreeps) {
      if (allCreeps.hasOwnProperty(name)) {
        var creep = allCreeps[name];

        switch (creep.memory.role) {
          case 'harvester':
            harvesters.push(creep);
            break;
          case 'upgrader':
            upgraders.push(creep);
            break;
          case 'builder':
            builders.push(creep);
            break;
          case 'defender':
            defenders.push(creep);
            break;
          default:
            console.log('Unknown role:', creep.memory.role);
            creep.suicide();
        }
      }
    }

    return {
      'harvesters': harvesters,
      'upgraders': upgraders,
      'builders': builders,
      'defenders': defenders
    }
  }
};

module.exports = common;
