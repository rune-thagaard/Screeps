/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.dismantler');
 * mod.thing == 'a thing'; // true
 */
var roleDismantler = {
    
    /** @param {Creep} creep **/
    run: function(creep, doBuildConstructionSites) {
        
        if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
            var target = Game.getObjectById('578aa00cd5492b1c50499cda');
        
            if (creep.transfer(target, RESOURCE_ENERGY, creep.carry[RESOURCE_ENERGY]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            
        } else {
            var target = Game.getObjectById('57894d01e1fe9dea7686305a');
        
            if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        
    }
};

module.exports = roleDismantler;