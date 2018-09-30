var globals = {
  structures: {
    tower: require('structure.tower')
  },

  lines: {
    yellow: {
      visualizePathStyle: {
        stroke: '#ffaa00'
      }
    },
    white: {
      visualizePathStyle: {
        stroke: '#ffffff'
      }
    }
  },

  /** @param {Creep} creep **/
  harvest: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);

    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], this.lines.yellow);
    }
  },

  /** @param {Creep} creep **/
  setWorkingStatus: function(creep) {
    if (creep.memory.working && creep.carry.energy === 0) {
      creep.memory.working = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('🚧 work');
    }
  }
};

module.exports = globals;
