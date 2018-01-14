import Creeper = require('./Creeper');
import SpawnHandler = require("./SpawnHandler");
import TowerHandler = require("./TowerHandler");

// Name of the main base, used for room reference
let mainBase: string = "MainBase";

// Whether or not to build structures.
// This can be used to limit the amount of resources used on building in the early game
let doBuildConstructionSites: boolean = true;

// Spawn controller - Amount of units created can be controlled through inputs given here.
let SpawnController = new SpawnHandler(1, 0, 1, 1, 3, 0);

// Tower controller - Provice value for maxDefenseHitPoints to repair for walls and ramparts to prevent huge amounts of energy to be wasted on strengthen ramparts and walls.
let TowerController = new TowerHandler(3000);

// Only renew creeps if room controller is above level 3
let doRenewCreeps: boolean = (Game.spawns[mainBase].room.controller.level > 3);

// TODO: Find these automatically instead of through hardcoded id's
let harvesterSource: Mineral = Game.getObjectById("59f1a60c82100e1594f3f6e4");
let harvesterDestination: Structure = Game.getObjectById("5a5a44db111a065fc1c92308");
let upgraderHarvesterSource: Mineral = Game.getObjectById("59f1a60c82100e1594f3f6e5");
let upgraderHarvesterDestination: Structure = Game.getObjectById("59f1a60c82100e1594f3f6e6");
let mineralStorage: Structure;
let mineralSource1: Mineral;

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

    SpawnController.cleanDeadCreepsFromMemory();
    
    if (!SpawnController.renewCreepsInRange()) {
        let typeToSpawn: string = SpawnController.isSpawnRequired();
    
        if (typeToSpawn != "")
            SpawnController.spawn(typeToSpawn);
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
    for(let name in Game.creeps) {
        let creep: Creep = Game.creeps[name];

        if (creep.ticksToLive < 150 && !creep.memory['needHealing'])
            creep.memory['needHealing'] = true;

        if (creep.ticksToLive > 1400 && creep.memory['needHealing'])
            creep.memory['needHealing'] = false;

        if (creep.memory['needHealing'] && doRenewCreeps)
            creep.moveTo(Game.spawns[mainBase]);
        else {

            let creeper = new Creeper(creep);

            switch (creep.memory['role']) {
                case 'harvester':
                    creeper.harvest(harvesterSource, harvesterDestination);
                    break;
                case 'upgrader':
                    creeper.upgrade(harvesterDestination);
                    break;
                case 'upgradeHarvester':
                    creeper.harvest(upgraderHarvesterSource, upgraderHarvesterDestination);
                    break;
                case 'builder':
                    creeper.build(doBuildConstructionSites, harvesterDestination);
                    break;
                case 'spawnFeeder':
                    creeper.energyFeeder(harvesterDestination);
                    break;
                case 'repairer':
                    creeper.repair(harvesterDestination);
                    break;
                case 'dismantler':
                    creeper.dismantle(harvesterDestination);
                    break;
                case 'mineralHarvester':
                    creeper.mineralHarvest(mineralSource1, mineralStorage);
                    break;
            }

        }

    }

    TowerController.doWork();
    //roleUpgraderLink.run();
};