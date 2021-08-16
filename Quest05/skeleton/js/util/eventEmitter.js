class EventEmitter {
  static emit(event, eventName, detail) {
    const customEvent = new CustomEvent(eventName, {bubbles: true, detail});
    event.target.dispatchEvent(customEvent);
  }
}