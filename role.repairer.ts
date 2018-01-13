var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
            
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }
        
	    if(creep.memory.repairing) {
	        
	        var targetStructureToRepair = null;
        
            var targets = creep.room.find(FIND_STRUCTURES);
            
            if(targets.length) {
                var targetFound = false;
                var i = 0;
                
                while (!targetFound && i < targets.length) {
                    if (targets[i].structureType != STRUCTURE_WALL && targets[i].hitsMax - targets[i].hits > 0)
                    {
                        targetStructureToRepair = targets[i];
                        targetFound = true;
                    }
                    i++;
                }
                
                if (!targetFound) {
                    i = 0;
                    while (!targetFound && i < targets.length) {
                        if (targets[i].structureType == STRUCTURE_WALL && targets[i].hits < 1000000)
                        {
                            targetStructureToRepair = targets[i];
                            targetFound = true;
                        }
                        i++;
                    }
                }
                
                if (targetStructureToRepair != null) {
                    if (creep.repair(targetStructureToRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetStructureToRepair);
                    }
                }
                else
                {
                    creep.moveTo(36, 21);
                }
                
            } else {
                console.log('Nothing to repair');
            }
	    }
	    else {
	        
	        var container = Game.getObjectById('5787737f3a642b2e6a73468e');
            if(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
	    }
	    
	}
};

module.exports = roleRepairer;