const { createContainer, asValue, asClass, InjectionMode, Lifetime } = require('awilix');

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
    // Register MemoryStore as a singleton
    memoryStore: asClass(require('../drivers/store'), Lifetime.SINGELTON),
    logger: asValue(require('../drivers/logger')),
    constants: asValue(require('../utils/constants')),
    config: asValue(require('../config')),
});

//------------------ UTILITY -----------------------


//------------------ SERVICES -----------------------
container.register('aggregationMetaService', asClass(require('../services/AggregationMetaService')), Lifetime.SCOPED);
container.register('aggregationComputationService', asClass(require('../services/AggregationComputationService')), Lifetime.SCOPED);
container.register('eventService', asClass(require('../services/EventService')), Lifetime.SCOPED);

//------------------ REPOSITORY -----------------------
container.register('aggregationMetaRepository', asClass(require('../repository/AggregationMetaRepo')), Lifetime.SCOPED);
container.register('aggregationResultsRepository', asClass(require('../repository/AggregationResultsRepo')), Lifetime.SCOPED);
container.register('eventRepository', asClass(require('../repository/EventRepo')), Lifetime.SCOPED);

module.exports = container;
