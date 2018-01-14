/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions.creep');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    CheckForMissingEnergyInSpawn: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) && structure.energy < structure.energyCapacity;
            }
        });
        
        return target;
    },
    
    TransferResource: function(creep, target, resource) {
        var result = creep.transfer(target, RESOURCE_ENERGY);

        switch(result) {
            case ERR_NOT_IN_RANGE: { // -9 The target is too far away.
                creep.moveTo(target);
                break;
            }
            case ERR_NOT_OWNER: // -1 You are not the owner of this creep.
            case ERR_BUSY: // -4 The creep is still being spawned.
            case ERR_NOT_ENOUGH_RESOURCES: // -6 The creep does not have the given amount of resources.
            case ERR_INVALID_TARGET: // -7 The target is not a valid object which can contain the specified resource.
            case ERR_INVALID_ARGS: // -10 The resources amount is incorrect.
                Game.notify("TransferResource failed with following result: " + result + " - Target: " + target.id);
                break;
            case ERR_FULL: // -8 The target cannot receive any more resources.
                break;
        }

        return result;
    },
    
    WithdrawResource: function(creep, target, resource) {
        var result = creep.withdraw(target, RESOURCE_ENERGY);
        
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (result == OK) {
            return OK;
        }
    },
    
    HarvestResource: function(creep, target) {
        var result = creep.harvest(target);
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (result == OK) {
            return OK;
        }
    }
};