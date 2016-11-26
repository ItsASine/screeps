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
        handleCreepClusters();
        break;
      default:
        console.log('Path error:', move);
    }
  },

  spawnStuff: function(harvesterCount, upgraderCount, builderCount) {
    var creepType;
    var newCreep;
    var spawn = Game.spawns['Spawn1'];

    var defaultParts = [WORK, CARRY, MOVE, MOVE];
    var params = {
      'harvester': [defaultParts, {role: 'harvester'}],
      'upgrader': [defaultParts, {role: 'upgrader'}],
      'builder': [defaultParts, {role: 'builder'}]
    };

    creepType =
        harvesterCount < 2 ? 'harvester' :
            (upgraderCount < 2 ? 'upgrader' :
                (builderCount < 2 ? 'builder' : null));
    newCreep = creepType ? params[creepType] : null;

    if (newCreep && spawn.canCreateCreep(newCreep[0]) == OK) {
      spawn.createCreep(newCreep[0], undefined, newCreep[1]);
    }
  },

  harvestStuff: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);

    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      this.walk(creep, sources[0]);
    }
  }
};

module.exports = common;
