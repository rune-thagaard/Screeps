var numberOfHarvesters = 1;
var numberOfUpgradeHarvesters = 3;
var numberOfMineralHarvester = 0;
var numberOfSpawnFeeders = 0;
var numberOfUpgraders = 0;
var numberOfBuilders = 0;
var numberOfRoomClaimers = 0;

var doBuildConstructionSites = false;
var doRenewCreeps = false;

var spawner = require('spawner');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleUpgradeHarvester = require('role.upgradeHarvester');
var roleBuilder = require('role.builder');
var roleSpawnFeeder = require('role.spawnFeeder');

/*
var roleTower = require('role.tower');
var roleUpgraderLink = require('role.upgraderLink');
var roleSorceKeeperAttacker = require('role.sorceKeeperAttacker');
var roleMineralHarvester = require('role.mineralHarvester');

var mineralStorage = Game.getObjectById('ff962531c42d6df');
var mineralSource1 = Game.getObjectById('96cb6164de3316e');
*/
module.exports.loop = function () {

    
    /*var controllerTarget = Game.getObjectById('55db345befa8e3fe66e05d8b');
    
    Game.flags.SourceKeeper1.pos
    
    var response = Game.creeps.Claim.claimController(controllerTarget);
    console.log(response);
    */
    //var response = Game.creeps.Claim.moveTo(26,33);
    /*
    var enemy = Game.getObjectById('578fac3d6df266007b1832ee');
    var response = Game.creeps.Attacker3.rangedAttack(enemy);
    if (response == ERR_NOT_IN_RANGE) {
        var response2 = Game.creeps.Attacker3.moveTo(enemy, {reusePath: 5});
        console.log(response2);
    } else {
        console.log(response);
    }
    */
    //var response = Game.creeps.Claim.moveTo(48,41);
    //var response = Game.creeps.Claim.moveTo(49,41); // End room
    // var response = Game.creeps.Claim.moveTo(0,41); //Start next room
    //var response = Game.creeps.Claim.moveTo(42,28); // Return to base
    //var response = Game.creeps.Claim.moveTo(9,48);
    //var response = Game.creeps.Claim.moveTo(26,32);
    
    /*
    var target = Game.creeps.Colton.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(target) {
        if(Game.creeps.Colton.attack(target) == ERR_NOT_IN_RANGE) {
            Game.creeps.Colton.moveTo(target);
        }
    } else {
        
    }
    */
    
    
    // IMPORTANT: Always place this memory cleaning code at the very top of main loop
    spawner.cleanDeadCreepsFromMemory();
    
    if (!spawner.renewCreepsInRange()) {
        var typeToSpawn = spawner.isSpawnRequired(numberOfHarvesters, numberOfUpgraders, numberOfBuilders, numberOfSpawnFeeders, numberOfUpgradeHarvesters, numberOfMineralHarvester);
    
        if (typeToSpawn != "")
            spawner.spawn(typeToSpawn);
    }
    
    /*
    for(var name in Game.rooms)
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    */

    /*
    if (Game.rooms.length == 0)
        Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: "spawnFeeder"});
    */
    // Command creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.ticksToLive < 150 && !creep.memory.needHealing)
            creep.memory.needHealing = true;
        
        if (creep.ticksToLive > 1400 && creep.memory.needHealing)
            creep.memory.needHealing = false;
        
        if (creep.memory.needHealing && doRenewCreeps)
            creep.moveTo(Game.spawns.Spawn1);
        else {
        
            switch (creep.memory.role) {
                case 'harvester':
                    roleHarvester.run(creep);
                    break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'upgradeHarvester':
                roleUpgradeHarvester.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep, doBuildConstructionSites);
                break;
            case 'spawnFeeder':
                roleSpawnFeeder.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            /*
            case 'dismantler':
                roleDismantler.run(creep);
                break;

            case 'mineralHarvester':
                roleMineralHarvester.run(creep, mineralSource1, mineralStorage);
                break;
            */
            }
        
        }
        
    }
    
    //roleTower.run();
    //roleUpgraderLink.run();
    
}

// Memory.energyContainers = Memory.energyContainers + ',5788ea501886f8121bfa107b';
// Game.spawns.Spawn1.createCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH]);
// Game.creeps.Colton.moveTo(46,20);
// Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Attacker');
// Game.spawns.Spawn1.createCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], 'Claim');

