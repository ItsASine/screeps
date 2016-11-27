'use strict';
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var helper = require('helper');

if (!Memory.stuckCount) {
  Memory.stuckCount = 0;
}

module.exports.loop = function() {
  var harvesters = [];
  var upgraders = [];
  var builders = [];

  Memory.tickCount = 0;

  for (var memoryCreep in Memory.creeps) {
    if (Memory.creeps.hasOwnProperty(memoryCreep) && !Game.creeps[memoryCreep]) {
      delete Memory.creeps[memoryCreep];
      console.log('Clearing non-existing creep memory:', memoryCreep);
    }
  }

  for (var name in Game.creeps) {
    if(Game.creeps.hasOwnProperty(name)) {
      var creep = Game.creeps[name];

      switch (creep.memory.role) {
        case 'harvester':
          harvesters.push(creep);
          roleHarvester.run(creep);
          break;
        case 'upgrader':
          upgraders.push(creep);
          roleUpgrader.run(creep);
          break;
        case 'builder':
          builders.push(creep);
          roleBuilder.run(creep);
          break;
        default:
          console.log('Unknown role:', creep.memory.role);
      }
    }
  }

  helper.spawnStuff(harvesters.length, upgraders.length, builders.length);

  /*var tower = Game.getObjectById('d6e1e71c84900a1a1596f2e8'); //read this in smartly
   if (tower) {
   var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
   filter: function(structure) {
   return structure.hits < structure.hitsMax;
   }
   });
   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

   if (closestDamagedStructure) {
   tower.repair(closestDamagedStructure);
   }

   if (closestHostile) {
   tower.attack(closestHostile);
   }
   }*/
};
