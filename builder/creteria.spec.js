let assert = require('assert');
let targetType = require('./creteria');
let target = new targetType();



describe('creteria', function () {
    describe('#createEqualsCondition()', function () {
        it('should create a equals condition object', function () {
            assert.deepEqual(target.createEqualsCondition("name", "value"), {
                "attribute": "name",
                "operator": "equal",
                "value": "value",
            });
        });
    });

    describe('#createNotEqualsCondition()', function () {
        it('should create a not equals condition object', function () {
            assert.deepEqual(target.createNotEqualsCondition("name", "value"), {
                "attribute": "name",
                "operator": "notequal",
                "value": "value",
            });
        });
    });

    describe('#createGreaterThanCondition()', function () {
        it('should create a greater than condition object', function () {
            assert.deepEqual(target.createGreaterThanCondition("name", "value"), {
                "attribute": "name",
                "operator": "gt",
                "value": "value",
            });
        });
    });

    describe('#createLessThanCondition()', function () {
        it('should create a less than condition object', function () {
            assert.deepEqual(target.createLessThanCondition("name", "value"), {
                "attribute": "name",
                "operator": "lt",
                "value": "value",
            });
        });
    });

    describe('#createInCondition()', function () {
        it('should create a in condition object', function () {
            assert.deepEqual(target.createInCondition("name", ["value"]), {
                "attribute": "name",
                "operator": "in",
                "value": ["value"],
            });
        });

        it('should throw an exception when non array value is passed.', function () {
            assert.throws(() => target.createInCondition("name", "value"), (err) => err.message === "Parameter 'attributeValues' should be an array.");
        });
    });

    describe('#createNotInCondition()', function () {
        it('should create a not in condition object', function () {
            assert.deepEqual(target.createNotInCondition("name", ["value"]), {
                "attribute": "name",
                "operator": "notin",
                "value": ["value"],
            });
        });

        it('should throw an exception when non array value is passed.', function () {
            assert.throws(() => target.createNotInCondition("name", "value"), (err) => err.message === "Parameter 'attributeValues' should be an array.");
        });
    });

    describe('#combineConditionsWithLogicalAND()', function () {
        it('should create a combined condition object with logical and', function () {
            let conditionA = target.createNotInCondition("nameA", ["valueA"]);
            let conditionB = target.createNotInCondition("nameB", ["valueB"]);
            assert.deepEqual(target.combineConditionsWithLogicalAND(conditionA, conditionB), {
                "attribute": "nameA",
                "operator": "notin",
                "value": ["valueA"],
                "and": {
                    "attribute": "nameB",
                    "operator": "notin",
                    "value": ["valueB"],
                }
            });
        });

        it('should throw an exception when LHS condition is already combined.', function () {
            let conditionA = target.createNotInCondition("nameA", ["valueA"]);
            let conditionB = target.createNotInCondition("nameB", ["valueB"]);
            let conditionC = target.combineConditionsWithLogicalAND(conditionA, conditionB);
            assert.throws(() => target.combineConditionsWithLogicalAND(conditionC, conditionA), (err) => err.message === "Parameter 'conditionA' is already coupled with another condition.");
        });
    });

    describe('#combineConditionsWithLogicalOR()', function () {
        it('should create a combined condition object with logical or', function () {
            let conditionA = target.createNotInCondition("nameA", ["valueA"]);
            let conditionB = target.createNotInCondition("nameB", ["valueB"]);
            assert.deepEqual(target.combineConditionsWithLogicalOR(conditionA, conditionB), {
                "attribute": "nameA",
                "operator": "notin",
                "value": ["valueA"],
                "or": {
                    "attribute": "nameB",
                    "operator": "notin",
                    "value": ["valueB"],
                }
            });
        });

        it('should throw an exception when LHS condition is already combined.', function () {
            let conditionA = target.createNotInCondition("nameA", ["valueA"]);
            let conditionB = target.createNotInCondition("nameB", ["valueB"]);
            let conditionC = target.combineConditionsWithLogicalOR(conditionA, conditionB);
            assert.throws(() => target.combineConditionsWithLogicalOR(conditionC, conditionA), (err) => err.message === "Parameter 'conditionA' is already coupled with another condition.");
        });
    });
});