"use strict";
module.exports = /** @class */ (function () {
    function Creeper(creep) {
        this.creep = creep;
    }
    Creeper.prototype.transferResource = function (target, resource) {
        var result = this.creep.transfer(target, resource);
        switch (result) {
            case ERR_NOT_IN_RANGE: {
                this.creep.moveTo(target);
                break;
            }
            case ERR_NOT_OWNER: // -1 You are not the owner of this creep.
            case ERR_BUSY: // -4 The creep is still being spawned.
            case ERR_NOT_ENOUGH_RESOURCES: // -6 The creep does not have the given amount of resources.
            case ERR_INVALID_TARGET: // -7 The target is not a valid object which can contain the specified resource.
            case ERR_INVALID_ARGS:// -10 The resources amount is incorrect.
                Game.notify("TransferResource failed with following result: " + result + " - Target: " + target.id);
                break;
            case ERR_FULL:// -8 The target cannot receive any more resources.
                break;
        }
        return result;
    };
    Creeper.prototype.withdrawResource = function (target, resource) {
        if (this.creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            this.creep.moveTo(target);
    };
    Creeper.prototype.feedSpawns = function (energySource) {
        // If creeps energy capacity is empty, get more energy
        if (this.creep.carry.energy == 0) {
            this.withdrawResource(energySource, RESOURCE_ENERGY);
            return;
        }
        // Find and fill spawn and extensions with energy
        var target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
        if (target) {
            var result = this.transferResource(target, RESOURCE_ENERGY);
            if (result == OK)
                this.creep.say("Transfered energy to spawn: " + result);
        }
    };
    Creeper.prototype.harvest = function (harvestSource, targetEnergyStorage) {
        // If creeps energy capacity is full, deliver energy to storage unit
        if (this.creep.carry.energy == this.creep.carryCapacity) {
            this.transferResource(targetEnergyStorage, RESOURCE_ENERGY);
            return;
        }
        // If any dropped energy is within range, pick it up.
        var droppedEnergy = this.creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if (droppedEnergy.length > 0) {
            var result = this.creep.pickup(droppedEnergy[0]);
            console.log("Picked up energy with result: " + result);
            return;
        }
        // If creeps energy capacity is empty, go harvest
        if (this.creep.carry.energy < this.creep.carryCapacity)
            if (this.creep.harvest(harvestSource) != OK)
                this.creep.moveTo(harvestSource);
    };
    Creeper.prototype.build = function (doBuildConstructionSites, energySource) {
        if (!this.creep.memory['building'] && this.creep.carry.energy > 0) {
            this.creep.memory['building'] = true;
        }
        if (this.creep.memory['building'] && this.creep.carry.energy == 0) {
            this.creep.memory['building'] = false;
        }
        var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (this.creep.memory['building'] && targets.length && doBuildConstructionSites) {
            // If creeps energy capacity is empty, get more energy
            if (this.creep.carry.energy < this.creep.carryCapacity)
                this.withdrawResource(energySource, RESOURCE_ENERGY);
            // If creeps energy capacity is full, go build
            if (this.creep.carry.energy == this.creep.carryCapacity)
                if (this.creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                    this.creep.moveTo(targets[0]);
        }
    };
    Creeper.prototype.repair = function (energySource) {
        // If creeps energy capacity is empty, get more energy
        if (this.creep.carry.energy == 0) {
            this.withdrawResource(energySource, RESOURCE_ENERGY);
            return;
        }
        var targets = this.creep.room.find(FIND_STRUCTURES);
        var i = 0;
        var targetStructureToRepair = null;
        var targetFound = false;
        while (!targetFound && i < targets.length) {
            if ((targets[i].structureType == STRUCTURE_ROAD && targets[i].hits < ROAD_HITS) || (targets[i].structureType == STRUCTURE_CONTAINER && targets[i].hits < 250000)) {
                targetStructureToRepair = targets[i];
                targetFound = true;
            }
            i++;
        }
        if (targetStructureToRepair != null)
            if (this.creep.repair(targetStructureToRepair) == ERR_NOT_IN_RANGE)
                this.creep.moveTo(targetStructureToRepair);
    };
    Creeper.prototype.dismantle = function (energySource) {
        /*
        if (this.creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
            var target = Game.getObjectById('578aa00cd5492b1c50499cda');

            if (this.creep.transfer(target, RESOURCE_ENERGY, creep.carry[RESOURCE_ENERGY]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target);
            }

        } else {
            var target = Game.getObjectById('57894d01e1fe9dea7686305a');

            if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        */
    };
    Creeper.prototype.mineralHarvest = function (mineralSource, storageContainer) {
        /*
        if(!this.creep.memory.returnHarvest &&  _.sum(this.creep.carry) == this.creep.carryCapacity) {
            this.creep.memory.returnHarvest = true;
        } else {
            this.creep.memory.returnHarvest = false;
        }

        if(!creep.memory.returnHarvest) {

            // Harvest resource
            if (mineralSource) {
                functionsCreep.HarvestResource(this.creep, mineralSource);
                return;
            }

        } else {

            // Store resource
            if (storageContainer && storageContainer.storeCapacity > _.sum(storageContainer.store)) {
                var result = functionsCreep.TransferResource(creep, storageContainer, RESOURCE_ENERGY);
                return;
            }

        }
        */
    };
    Creeper.prototype.upgrade = function (energySource) {
        if (this.creep.carry.energy == 0) {
            this.withdrawResource(energySource, RESOURCE_ENERGY);
            return;
        }
        var response = this.creep.upgradeController(this.creep.room.controller);
        if (response == ERR_NOT_IN_RANGE)
            this.creep.moveTo(this.creep.room.controller);
    };
    return Creeper;
}());
