# Manual Commands

The screeps UI allows for single commands to be executed from the command line. 

These commands cover quick fixes or non-automated things.

***

## Create Creep
```javascript
// Spawner, body  parts, name, options
// Nifty option is { dryRun: true } which does what canCreateCreep used to do
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', {
    memory: {role: 'harvester'}
});
```

## Create Tower
```javascript
// Spawner, coordinates, type of structure
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
```
