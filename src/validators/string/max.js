const _ = require('lodash');
const Rule = require('../../rule.js');
const LogicDefinition = require('../../logicDefinition.js');

function maxAction(parentRule, actions, maxData) {
    if (!_.isFinite(maxData) && !_.isFunction(maxData)) {
        throw new Error('Must be a finite value or a setup function');
    }

    const logicDefinition = LogicDefinition((setupContext) => {
        setupContext.define('maxData', maxData);

        setupContext.onRun((runContext, value, params) => {
            if (_.isString(value) && value.length > params.maxData) {
                runContext.raise('schema', `Must be less than ${params.maxData + 1} characters long.`, 'error');
            } else {
                runContext.clear();
            }
        });
    }, true);

    delete actions.max; // eslint-disable-line no-param-reassign
    delete actions.length; // eslint-disable-line no-param-reassign

    return Rule(logicDefinition, actions, parentRule);
}

module.exports = maxAction;