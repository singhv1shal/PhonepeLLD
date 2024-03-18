const Event = require('../models/Event')

class EventRepository {
    constructor(memoryStore) {
      this.store = memoryStore;
    }
  
    saveEvent(eventPayload) {
      const eventObject = new Event(eventPayload);
      const key = `Event_${eventObject.eventName}`;
      this.store.set(key, eventObject);
    }
  
    getData(key) {
      return this.store.get(key);
    }
  
    deleteData(key) {
      this.store.delete(key);
    }
  }
  
module.exports = EventRepository;
  