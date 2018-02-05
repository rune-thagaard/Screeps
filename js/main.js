"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var Creeper = require("./Creeper");
var SpawnHandler = require("./SpawnHandler");
var TowerHandler = require("./TowerHandler");
// Name of the main base, used for room reference
var mainBase = "MainBase";
// Whether or not to build structures.
// This can be used to limit the amount of resources used on building in the early game
// TODO: Add a method to check for current room energy and based on that decide whether or not to build.
var doBuildConstructionSites = true;
// TODO: Numbers below go fine for early game - When they creeps get to a decent size (when having 20 extension) it is not required with several upgraders.
// Spawn controller - Amount of units created can be controlled through inputs given here.
//let SpawnController = new SpawnHandler(1, 0, 1, 1, 3, 0);
var SpawnController = new SpawnHandler(1, 0, 1, 1, 2, 0);
// Tower controller - Provice value for maxDefenseHitPoints to repair for walls and ramparts to prevent huge amounts of energy to be wasted on strengthen ramparts and walls.
var TowerController = new TowerHandler(35000);
// Only renew creeps if room controller is above level 3
var doRenewCreeps = (Game.spawns[mainBase].room.controller.level > 3);
// TODO: Find these automatically instead of through hardcoded id's
var harvesterSource = Game.getObjectById("59f1a60c82100e1594f3f6e4");
var harvesterDestination = Game.getObjectById("5a5a44db111a065fc1c92308");
var upgraderHarvesterSource = Game.getObjectById("59f1a60c82100e1594f3f6e5");
var upgraderHarvesterDestination = Game.getObjectById("59f1a60c82100e1594f3f6e6");
var mineralStorage;
var mineralSource1;
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
        var typeToSpawn = SpawnController.isSpawnRequired();
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
    if (_.sum(Game.creeps, function (c) { return c == c; }) < 3)
        Game.notify("Creeps are vanishing!!!");
    // Command creeps
    for (var name_1 in Game.creeps) {
        var creep = Game.creeps[name_1];
        if (creep.ticksToLive < 150 && !creep.memory['needHealing'])
            creep.memory['needHealing'] = true;
        if (creep.ticksToLive > 1400 && creep.memory['needHealing'])
            creep.memory['needHealing'] = false;
        if (creep.memory['needHealing'] && doRenewCreeps)
            creep.moveTo(Game.spawns[mainBase]);
        else {
            var creeper = new Creeper(creep);
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
                case 'attacker':
                    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    /*if (creep.pos.x != 27 && creep.pos.y != 17)
                    {
                        creep.moveTo(27, 17);
                    }
                    else
                    {*/
                    if (target) {
                        var result = creep.rangedAttack(target);
                        if (result == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                            console.log("Out of range - move closer to target!");
                        }
                        else {
                            console.log(result);
                        }
                    }
                    //}
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
