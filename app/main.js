'use strict';
var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var tower = require('tower');
var helper = require('helper');
var memory = require('memory');

memory.init();

module.exports.loop = function() {
  var allCreeps = Game.creeps;
  var names = Object.keys(allCreeps);

  Memory.tickCount = 0;

  memory.clearDeadStuff(allCreeps);

  for (var name in allCreeps) {
    if (allCreeps.hasOwnProperty(name)) {
      var creep = allCreeps[name];

      switch (creep.memory.role) {
        case 'harvester':
          harvester.run(creep);
          break;
        case 'upgrader':
          upgrader.run(creep);
          break;
        case 'builder':
          builder.run(creep);
          break;
        default:
          console.log('Unknown role:', creep.memory.role);
      }
    }
  }

  tower.run(allCreeps[names[0]]);

  helper.spawnStuff();
};
