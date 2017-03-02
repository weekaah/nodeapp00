const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents
}
  
  
// show all events ====================
function showEvents(req, res) {
  // get all events
  
  // return a view with data
  res.render('pages/events', {events: events});
}

// show a single event ================
function showSingle(req, res) {
  // get a signle events
  const event = {name: 'Basketball', slug: 'basketball', description: 'Throwing the ball in the basket'};
  
  // return a view with data
  res.render('pages/single', {event: event});
}

// seed our database ==================
function seedEvents(req, res) {
  // seed some events
  const events = [
    {name: 'Basketball', description: 'Throwing the ball in the basket'},
    {name: 'Swimming', description: 'Trying not to drown'},
    {name: 'Weightlifting', description: 'Lifteing heavy stuff'},
    {name: 'Handball', description: 'Handball <stuff></stuff>'}
  ];
  
  // use the Event model to insert/save
  Event.remove({}, () => {      
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });
  
  
  // seeded!
  res.send('Database seeded');
}
