const AggregationResults = require('../models/AggregationResults')

class AggregationResultsRepository {
    constructor(memoryStore) {
      this.store = memoryStore;
    }
  
    saveAggregationResults(aggregationResultsPayload) {
      const aggResObject = new AggregationResults(aggregationResultsPayload);
      const key = `AggregationResults_${aggResObject.aggregationName}`;
      this.store.set(key, aggResObject);
    }
  
    getData(key) {
      return this.store.get(key);
    }
  
    deleteData(key) {
      this.store.delete(key);
    }
  }
  
module.exports = AggregationResultsRepository;
  