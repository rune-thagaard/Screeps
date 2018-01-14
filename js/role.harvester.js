var roleBuilder = require('role.builder');
var harvesterSource = "59f1a60c82100e1594f3f6e4";
var harvesterDestination = "5a5a44db111a065fc1c92308";
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.returnHarvest && creep.carry.energy == 0) {
            creep.memory.returnHarvest = false;
        }
        if (!creep.memory.returnHarvest && creep.carry.energy == creep.carryCapacity) {
            creep.memory.returnHarvest = true;
        }
        if (!creep.memory.returnHarvest) {
            var source = Game.getObjectById(harvesterSource);
            // Send creep to closest source
            if (creep.harvest(source) != OK) {
                creep.moveTo(source);
            }
        }
        else {
            var container = Game.getObjectById(harvesterDestination);
            var result = creep.transfer(container, RESOURCE_ENERGY);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
            /*
            var harvesterContainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.usageType == 'harvesterEnergyStore';
                }
            });
            console.log(harvesterContainer.length);
            if(creep.transfer(harvesterContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(harvesterContainer);
            }
            */
            /*
            var tower = Game.getObjectById('57876169e244a1197eec793b');
            if (tower.energy < tower.energyCapacity) {
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                } else {
                    console.log('Energy stored: ' + targets2[0].store[RESOURCE_ENERGY]);
                }
            } else {
            */
            /*
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
            
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    var targets2 = creep.room.find(FIND_STRUCTURES,{
                        filter: (i)=> {
                            return i.structureType==STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity
                        }
                    });
                    
                    if(targets2.length > 0) {
                        if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets2[0]);
                        }
                    }
                    else
                    {
                        // If no room to store energy, build instead or upgrade controller if nothing to build
                        roleBuilder.run(creep);
                    }
                    
                }
            */
            //}
        }
    }
};
module.exports = roleHarvester;
