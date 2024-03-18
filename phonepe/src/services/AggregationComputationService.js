class AggregationComputationService {
    constructor(logger, aggregationResultsRepository) {
      this.logger = logger;
      this.aggregationResultsRepository = aggregationResultsRepository;
    }

    async getAvailableEventsForAggregation(availableEvents, aggregation){
        const filteredEvents = availableEvents.filter((event) => {
          const eventTimestamp = event.timestamp;
          const currentTime = Date.now();
      
          if (currentTime - eventTimestamp <= aggregation.timeInterval * 60 * 1000) {
            const filtered = true;
            for(let filterRule in aggregation.filterRules) {        
            const fieldValue = this.getValueInNestedObject(event, filterRule.field);
            switch (filterRule.op) {
              case "gt":
                filtered = filtered && (fieldValue > filterRule.value);
              case "eq":
                filtered = filtered && (fieldValue === filterRule.value);
              case "st":
                filtered = filtered && (fieldValue < filterRule.value);
            }
            }
            return filtered;
        }
          return false;

        });
      
        return filteredEvents;
    }

    getValueInNestedObject(object, key) {
        try {
            const keyParts = key.split(".");
            let value = object;
            for (const part of keyParts) {
                value = value[part];
            }
            return value;
        } catch(err){
            this.logger.log('Parsing error');
            return null;
        }
    }
      
    async getAggregatedEvents(filteredEvents, aggregation){
        let aggregationResults = {};
        filteredEvents.forEach((event) => {
          const aggregationKeyValue = this.getValueInNestedObject(event, aggregation.aggregationKey);
          const aggregationFieldValue = this.getValueInNestedObject(event, aggregation.aggregationField);
          
          switch(aggregation.aggregationType) {
            case "count": 
                aggregationResults[aggregationKeyValue] = aggregationResults[aggregationKeyValue] ? 1 : aggregationResults[aggregationKeyValue]+1;
            case "sum":
                aggregationResults[aggregationKeyValue] = aggregationResults[aggregationKeyValue] ? aggregationFieldValue :  aggregationResults[aggregationKeyValue]+aggregationFieldValue;
            }
        });
        return aggregationResults;
    }

    async computeAggregations() {
        for (const aggregation of availableAggregations) {
          const filteredEvents = getAvailableEventsForAggregation(
            availableEvents,
            aggregation
          );
          const aggregationResults = getAggregatedEvents(filteredEvents, aggregation);
          this.aggregationResultsRepository.saveAggregationResults({
            aggregationName: aggregation.aggregationName,
            results: aggregationResults
            });
        }
        this.logger.log('Computed Aggregation', new Date());
    }

    async getAggregation(aggregationName, key, value) {
        const keyName = `AggregaionResults_${aggregationName}`;
        const aggResults = this.aggregationResultsRepository.getData(keyName);
        const aggregations = aggResults.filter((aggregate) => aggregate[key]==value );
        this.logger.log(aggregations);
    }
  }
  
module.exports = AggregationComputationService;
  