class AggregationMeta {
  constructor({ aggregationName, eventType, aggregationType, aggregationKey, aggregationField, timeInterval, slideInterval, filterRules }) {
    // this.id = id;
    this.aggregationName = aggregationName;
    this.eventType = eventType;
    this.aggregationType = aggregationType;
    this.aggregationKey = aggregationKey;
    this.aggregationField = aggregationField;
    this.timeInterval = timeInterval;
    this.slideInterval = slideInterval;
    this.filterRules = filterRules;
  }

}

module.exports = AggregationMeta;
