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
        
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (result == OK) {
            return OK;
        }
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