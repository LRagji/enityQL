class creteria {
    constructor() {
        this.createEqualsCondition = this.createEqualsCondition.bind(this);
        this.createNotEqualsCondition = this.createNotEqualsCondition.bind(this);
        this.createGreaterThanCondition = this.createGreaterThanCondition.bind(this);
        this.createLessThanCondition = this.createLessThanCondition.bind(this);
        this.createInCondition = this.createInCondition.bind(this);
        this.createNotInCondition = this.createNotInCondition.bind(this);
        this.combineConditionsWithLogicalAND = this.combineConditionsWithLogicalAND.bind(this);
        this.combineConditionsWithLogicalOR = this.combineConditionsWithLogicalOR.bind(this);
    }

    createEqualsCondition(attributeName, attributeValue) {
        return {
            "attribute": attributeName,
            "operator": "equal",
            "value": attributeValue,
        }
    }

    createNotEqualsCondition(attributeName, attributeValue) {
        return {
            "attribute": attributeName,
            "operator": "notequal",
            "value": attributeValue,
        }
    }

    createGreaterThanCondition(attributeName, attributeValue) {
        return {
            "attribute": attributeName,
            "operator": "gt",
            "value": attributeValue,
        }
    }

    createLessThanCondition(attributeName, attributeValue) {
        return {
            "attribute": attributeName,
            "operator": "lt",
            "value": attributeValue,
        }
    }

    createInCondition(attributeName, attributeValues) {
        if (!Array.isArray(attributeValues)) throw new Error("Parameter 'attributeValues' should be an array.")
        return {
            "attribute": attributeName,
            "operator": "in",
            "value": attributeValues,
        }
    }

    createNotInCondition(attributeName, attributeValues) {
        if (!Array.isArray(attributeValues)) throw new Error("Parameter 'attributeValues' should be an array.")
        return {
            "attribute": attributeName,
            "operator": "notin",
            "value": attributeValues,
        }
    }

    combineConditionsWithLogicalAND(conditionA, conditionB) {
        if (conditionA.and !== undefined) throw new Error("Parameter 'conditionA' is already coupled with another condition.")
        conditionA.and = conditionB;
        return conditionA
    }

    combineConditionsWithLogicalOR(conditionA, conditionB) {
        if (conditionA.or !== undefined) throw new Error("Parameter 'conditionA' is already coupled with another condition.")
        conditionA.or = conditionB;
        return conditionA
    }
}

module.exports = creteria;