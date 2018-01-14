var _ = require('lodash');

export = class SpawnHandler {

    harvesterCount: number;
    upgraderCount: number;
    builderCount: number;
    spawnFeederCount: number;
    upgraderHarvesterCount: number;
    mineralHarvesterCount: number;

    constructor(noHarvester, noUpgrader, noBuilder, noSpawnFeeder, noUpgraderHarvester, noMineralHarvester)
    {
        this.harvesterCount = noHarvester;
        this.upgraderCount = noUpgrader;
        this.builderCount = noBuilder;
        this.spawnFeederCount = noSpawnFeeder;
        this.upgraderHarvesterCount = noUpgraderHarvester;
        this.mineralHarvesterCount = noMineralHarvester;

    }

    renewCreepsInRange() {
        var spawn = Game.spawns['MainBase'];

        var creepsToRenew = spawn.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: function(creep) {
                return creep.memory.needHealing == true;
            }
        });

        if (creepsToRenew.length > 0) {
            var result = spawn.renewCreep(creepsToRenew[0]);
            if (result == OK)
                return true;
            else if (result == ERR_NOT_ENOUGH_ENERGY && creepsToRenew[0].memory['role'] == 'spawnFeeder') {
                creepsToRenew[0].memory['needHealing'] = false;
            }

        }
        return false;
    }

    isSpawnRequired(): string {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < this.harvesterCount)
            return 'harvester';

        var spawnFeeders = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnFeeder');
        if(spawnFeeders.length < this.spawnFeederCount)
            return 'spawnFeeder';

        var upgradeHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgradeHarvester');
        if(upgradeHarvester.length < this.upgraderHarvesterCount)
            return 'upgradeHarvester';

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < this.upgraderCount)
            return 'upgrader';

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < this.builderCount)
            return 'builder';

        var mineralHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineralHarvester');
        if(mineralHarvester.length < this.mineralHarvesterCount)
            return 'mineralHarvester';

        //console.log(numberOfSpawnFeeders);

        return '';
    }

    spawn(creepRole) {

        var extensions = Game.spawns['MainBase'].room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        var numberOfExtensions = extensions.length;

        let newCreepName;

        if (numberOfExtensions >= 0 && numberOfExtensions < 5)
            newCreepName = Game.spawns['MainBase'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: creepRole});
        else if (numberOfExtensions >= 5 && numberOfExtensions < 10)
            newCreepName = Game.spawns['MainBase'].createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: creepRole});
        else if (numberOfExtensions >= 10 && numberOfExtensions < 20) {
            if (creepRole == 'harvester' || creepRole == 'upgradeHarvester')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], undefined, {role: creepRole});
            else if (creepRole == 'spawnFeeder')
                newCreepName = Game.spawns['MainBase'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: creepRole});

        } else if (numberOfExtensions >= 20 && numberOfExtensions < 30) {

            if (creepRole == 'harvester' || creepRole == 'upgradeHarvester')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: creepRole});
            else if (creepRole == 'spawnFeeder')
                newCreepName = Game.spawns['MainBase'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else if (creepRole == 'upgrader')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: creepRole});
            else
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});

        } else if (numberOfExtensions >= 30 && numberOfExtensions < 40) {

            if (creepRole == 'harvester' || creepRole == 'upgradeHarvester')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else if (creepRole == 'spawnFeeder')
                newCreepName = Game.spawns['MainBase'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else if (creepRole == 'upgrader')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});

        } else if (numberOfExtensions >= 40 && numberOfExtensions < 50) {
            // Need to make adjustments due to more extensions
            // This is just a copy from above

            if (creepRole == 'harvester' || creepRole == 'upgradeHarvester')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else if (creepRole == 'spawnFeeder')
                newCreepName = Game.spawns['MainBase'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else if (creepRole == 'upgrader')
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});
            else
                newCreepName = Game.spawns['MainBase'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: creepRole});

        }

        if (newCreepName == OK) {
            console.log('New creep: ' + newCreepName + " spawned with role: " + creepRole);
        }
    }

    cleanDeadCreepsFromMemory(): void {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

}