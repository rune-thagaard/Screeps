"use strict";
module.exports = /** @class */ (function () {
    function TowerHandler(maxDefenseHitPoints) {
        if (maxDefenseHitPoints === void 0) { maxDefenseHitPoints = 3000; }
        this.maxDefenseHitPoints = maxDefenseHitPoints;
        this.towers = Game.spawns['MainBase'].room.find(FIND_STRUCTURES, {
            filter: function (obj) {
                return obj.structureType == STRUCTURE_TOWER;
            }
        });
    }
    TowerHandler.prototype.doWork = function () {
        for (var i = 0; i < this.towers.length; i++) {
            var currentTower = this.towers[i];
            var closestHostile = currentTower.room.find(FIND_HOSTILE_CREEPS);
            if (closestHostile.length > 0) {
                var response = currentTower.attack(closestHostile[0]);
                console.log("Tower attack: " + response);
            }
            else {
                var targetStructureToRepair = null;
                var targets = currentTower.room.find(FIND_STRUCTURES);
                if (targets.length) {
                    var targetFound = false;
                    var e = 0;
                    while (!targetFound && e < targets.length) {
                        if (targets[e].id != '57894d01e1fe9dea7686305a' && targets[e].structureType != STRUCTURE_WALL && targets[e].structureType != STRUCTURE_RAMPART && targets[e].hitsMax - targets[e].hits > 0) {
                            targetStructureToRepair = targets[e];
                            targetFound = true;
                        }
                        e++;
                    }
                    if (!targetFound) {
                        e = 0;
                        while (!targetFound && e < targets.length) {
                            if (targets[e].structureType == STRUCTURE_RAMPART && targets[e].hits < this.maxDefenseHitPoints) {
                                targetStructureToRepair = targets[e];
                                targetFound = true;
                            }
                            e++;
                        }
                    }
                    if (!targetFound) {
                        e = 0;
                        while (!targetFound && e < targets.length) {
                            if (targets[e].structureType == STRUCTURE_WALL && targets[e].hits < this.maxDefenseHitPoints) {
                                targetStructureToRepair = targets[e];
                                targetFound = true;
                            }
                            e++;
                        }
                    }
                    if (targetStructureToRepair != null) {
                        currentTower.repair(targetStructureToRepair);
                    }
                }
                else {
                    // Check if any creeps need healing
                    var targets_1 = currentTower.room.find(FIND_MY_CREEPS, {
                        filter: function (object) {
                            return object.hits < object.hitsMax;
                        }
                    });
                    if (targets_1.length) {
                        currentTower.heal(targets_1[0]);
                    }
                }
            }
        }
    };
    return TowerHandler;
}());
