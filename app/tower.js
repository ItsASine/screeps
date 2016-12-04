'use strict';

var tower = {
  run: function(creep) {
    var towers = creep.room.find(FIND_STRUCTURES, {
      filter: function(structure) {
        return structure.structureType === STRUCTURE_TOWER;
      }
    });

    if (towers) {
      towers.forEach(function(tower) {
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
      });
    }
  }
};

module.exports = tower;
