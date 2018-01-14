var roleTowerFeeder = require('role.towerFeeder');
var builderSource = "5a59e73d4df4166fbf201cfe";
var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep, doBuildConstructionSites, energySource) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length && doBuildConstructionSites) {
            // If creeps energy capacity is empty, get more energy
            if (this.creep.carry.energy < this.creep.carryCapacity)
                if (creep.withdraw(energySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(energySource);
            // If creeps energy capacity is full, go build
            if (this.creep.carry.energy == this.creep.carryCapacity)
                if (creep.build(targets[0]) != ERR_NOT_IN_RANGE)
                    creep.moveTo(targets[0]);
        }
        else {
            // Repair structures
            if (!creep.memory.building && creep.carry.energy > 0) {
                creep.memory.building = true;
            }
            if (creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
            }
            if (creep.memory.building) {
                var targets = creep.room.find(FIND_STRUCTURES);
                var i = 0;
                var targetFound = false;
                var targetStructureToRepair = null;
                while (!targetFound && i < targets.length) {
                    if ((targets[i].structureType == STRUCTURE_ROAD && targets[i].hits < 5000) || (targets[i].structureType == STRUCTURE_CONTAINER && targets[i].hits < 250000)) {
                        targetStructureToRepair = targets[i];
                        targetFound = true;
                    }
                    i++;
                }
                if (targetFound) {
                    var result = creep.repair(targetStructureToRepair);
                    if (result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetStructureToRepair);
                    }
                }
            }
            else {
                var container = Game.getObjectById(builderSource);
                var attemptTransfer = creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity);
                if (attemptTransfer == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
                else if (attemptTransfer == ERR_NOT_ENOUGH_RESOURCES)
                    creep.withdraw(container, RESOURCE_ENERGY, container.store[RESOURCE_ENERGY]);
            }
        }
    }
};
module.exports = roleBuilder;
