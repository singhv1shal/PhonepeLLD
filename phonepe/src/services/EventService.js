//EventService.js

class EventService {
    constructor(eventRepository) {
      this.repository = eventRepository;
    }
  
    createEvent(eventPayload) {
      this.repository.saveEvent(eventPayload);
    }
  
    getData(key) {
      return this.repository.getData(key);
    }
  
    deleteData(key) {
      this.repository.deleteData(key);
    }
  }
  
module.exports = EventService;
  