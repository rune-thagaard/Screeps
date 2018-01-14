var maxHitPoints = 200000;

var roleTower = {


    /** @param {Creep} creep **/
    run: function() {
        
        var tower: StructureTower = Game.getObjectById('5e023cf9fc4ea90');
        
        if(tower) {
            
            var closestHostile = tower.room.find(FIND_HOSTILE_CREEPS);
            
            if(closestHostile.length > 0) {
                var response = tower.attack(closestHostile[0]);
                console.log("Tower attack: " + response);
            } else {
            
                var targetStructureToRepair = null;
            
                var targets = tower.room.find(FIND_STRUCTURES);
                
                if(targets.length) {
                    var targetFound = false;
                    var i = 0;
                    
                    while (!targetFound && i < targets.length) {
                        if (targets[i].id != '57894d01e1fe9dea7686305a' && targets[i].structureType != STRUCTURE_WALL && targets[i].structureType != STRUCTURE_RAMPART && targets[i].hitsMax - targets[i].hits > 0)
                        {
                            targetStructureToRepair = targets[i];
                            targetFound = true;
                        }
                        i++;
                    }
                    
                    if (!targetFound) {
                        i = 0;
                        while (!targetFound && i < targets.length) {
                            if (targets[i].structureType == STRUCTURE_RAMPART && targets[i].hits < maxHitPoints)
                            {
                                targetStructureToRepair = targets[i];
                                targetFound = true;
                            }
                            i++;
                        }
                    }
                    
                    if (!targetFound) {
                        i = 0;
                        while (!targetFound && i < targets.length) {
                            if (targets[i].structureType == STRUCTURE_WALL && targets[i].hits < maxHitPoints)
                            {
                                targetStructureToRepair = targets[i];
                                targetFound = true;
                            }
                            i++;
                        }
                    }
                    
                    if (targetStructureToRepair != null) {
                        tower.repair(targetStructureToRepair);
                    }
                    
                } else {
                    
                    // Check if any creeps need healing
                    let targets: Creep[] = tower.room.find(FIND_MY_CREEPS, {
                        filter: function(object) {
                            return object.hits < object.hitsMax;
                        }
                    });
                    
                    if(targets.length) {
                        tower.heal(targets[0]);
                    }
                    
                }
            
            }
            
        }
        
        tower = Game.getObjectById('5dad3f9a248e49e');
        
        if(tower) {
            
            var closestHostile = tower.room.find(FIND_HOSTILE_CREEPS);
            if(closestHostile.length > 0) {
                var response = tower.attack(closestHostile[0]);
                console.log("Tower attack: " + response);
            } else {
            
                var targetStructureToRepair = null;
            
                var targets = tower.room.find(FIND_STRUCTURES);
                
                if(targets.length) {
                    var targetFound = false;
                    var i = 0;
                    
                    while (!targetFound && i < targets.length) {
                        if (targets[i].id != '57894d01e1fe9dea7686305a' && targets[i].structureType != STRUCTURE_WALL && targets[i].structureType != STRUCTURE_RAMPART && targets[i].hitsMax - targets[i].hits > 0)
                        {
                            targetStructureToRepair = targets[i];
                            targetFound = true;
                        }
                        i++;
                    }
                    
                    if (!targetFound) {
                        i = 0;
                        while (!targetFound && i < targets.length) {
                            if (targets[i].structureType == STRUCTURE_RAMPART && targets[i].hits < maxHitPoints)
                            {
                                targetStructureToRepair = targets[i];
                                targetFound = true;
                            }
                            i++;
                        }
                    }
                    
                    if (!targetFound) {
                        i = 0;
                        while (!targetFound && i < targets.length) {
                            if (targets[i].structureType == STRUCTURE_WALL && targets[i].hits < maxHitPoints)
                            {
                                targetStructureToRepair = targets[i];
                                targetFound = true;
                            }
                            i++;
                        }
                    }
                    
                    if (targetStructureToRepair != null) {
                        tower.repair(targetStructureToRepair);
                    }
                    
                } else {
                    
                    // Check if any creeps need healing
                    let targets: Creep[] = tower.room.find(FIND_MY_CREEPS, {
                        filter: function(object) {
                            return object.hits < object.hitsMax;
                        }
                    });
                    
                    if(targets.length) {
                        tower.heal(targets[0]);
                    }
                    
                }
            
            }
            
        }
	    
	}
};

module.exports = roleTower;