const AggregationMeta = require('../models/AggregationMeta')

class AggregationMetaRepository {
    constructor(memoryStore) {
      this.store = memoryStore;
    }
  
    saveAggregationMeta(aggregationMetaPayload) {
      const aggMetaObject = new AggregationMeta(aggregationMetaPayload);
      const key = `AggregationMeta_${aggMetaObject.aggregationName}`;
      this.store.set(key, aggMetaObject);
    }
  
    getData(key) {
      return this.store.get(key);
    }
  
    deleteData(key) {
      this.store.delete(key);
    }
  }
  
module.exports = AggregationMetaRepository;
  