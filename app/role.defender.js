'use strict';
var helper = require('helper');

var builder = {
  run: function(creep) {
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (creep.memory.attacking) {
      this.attack(creep, target);
    } else {
      if(target) {
        creep.memory.attacking = true;
        this.attack(creep, target);
      } else {
        helper.chill(creep);
      }
    }
  },

  attack: function(creep, target) {
    if (target) {
      if (creep.pos.isNearTo(target)) {
        creep.say('Die!');
        creep.attack(target);
      } else {
        if (target.pos.inRangeTo(creep.pos, 3)) {
          creep.say('Die!');
          creep.rangedAttack(target);
        } else {
          helper.walk(creep, target);
        }
      }
    } else {
      creep.memory.attacking = false;
    }
  }
};

module.exports = builder;
