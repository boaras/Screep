var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleSoldier = require('role.soldier');
var roleArcher = require('role.archer');
var roleWallRepairer = require('role.wallrepairer');

module.exports.loop = function () {

//Clean Memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

//Declaring Variables
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    var archers = _.filter(Game.creeps, (creep) => creep.memory.role == 'archer');
    var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
    var totalPopulation = (wallRepairers.length + harvesters.length + upgraders.length + builders.length + repairers.length + soldiers.length + archers.length) + 0;
    var maxPopulation = 10;
    var harvesterPopulationCap = .2;
    var upgraderPopulationCap = .2;
    var builderPopulationCap = .2;
    var repairerPopulationCap = .2;
    var soldierPopulationCap = .0;
    var archerPopulationCap = .1;
    var wallRepairerPopulationCap = .1;

    var tower = Game.getObjectById('TOWER_ID');

//Tower Controller
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

//Check Population Size and Spawn
    if(totalPopulation <= maxPopulation){
        if(harvesters.length < (maxPopulation * harvesterPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new harvester: ' + newName);
            }
        }
        else if(upgraders.length < (maxPopulation * upgraderPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new upgrader: ' + newName);
            }
        }
        else if(builders.length < (maxPopulation * builderPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new builder: ' + newName);
            }
        }
        else if(repairers.length < (maxPopulation * repairerPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new repairer: ' + newName);
            }
        }
        else if(soldiers.length < (maxPopulation * soldierPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([ATTACK,TOUGH,MOVE], undefined, {role: 'soldier'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new soldier: ' + newName);
            }
        }
        else if(archers.length < (maxPopulation * archerPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([RANGED_ATTACK,TOUGH,MOVE], undefined, {role: 'archer'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new archer: ' + newName);
            }
        }
        else if(wallRepairers.length < (maxPopulation * wallRepairerPopulationCap)) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'wallRepairer'});
            if(newName != -6 && newName != -4){
                console.log('Spawning new Wall Repairer: ' + newName);
            }
        }
    }

//Run creep actions
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        if(creep.memory.role == 'archer') {
            roleArcher.run(creep);
        }
        if(creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
    }
}
