//AggregationMetaService.js

class AggregationMetaService {
    constructor(aggregationMetaRepository, logger) {
      this.repository = aggregationMetaRepository;
      this.logger = logger;
    }
  
    createMeta(aggregationMetaPayload) {
      this.repository.saveAggregationMeta(aggregationMetaPayload);
      this.logger.log('Created aggregation meta successfully');
    }
  
    getData(key) {
      return this.repository.getData(key);
    }
  
    deleteData(key) {
      this.repository.deleteData(key);
    }
  }
  
module.exports = AggregationMetaService;
  