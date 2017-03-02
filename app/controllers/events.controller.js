const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate
}
  
// show all events 
// ====================================
function showEvents(req, res) {
  // get all events
  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not send');
    }
    
    // return a view with data
    res.render('pages/events', {events: events});
  });
}

// show a single event
// ====================================
function showSingle(req, res) {
  // get a signle events
  Event.findOne({slug: req.params.slug}, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Events not send');
    }
    
    // return a view with data
    res.render('pages/single', {
      event: event,
      success: req.flash('success')
    });
  });
}

// seed our database
// ====================================
function seedEvents(req, res) {
  // seed some events
  const events = [
    {name: 'Basketball', description: 'Throwing the ball in the basket'},
    {name: 'Swimming', description: 'Trying not to drown'},
    {name: 'Weightlifting', description: 'Lifteing heavy stuff'},
    {name: 'Handball', description: 'Handball stuff'}
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

// show the create form
// ====================================
function showCreate(req, res) {
  res.render('pages/create');
}

// proces the create form
// ====================================
function processCreate(req, res) {
  // create a new event
  const event = new Event({
    name: req.body.name,
    description: req.body.description
  });
  
  // save event
  event.save((err) => {
    if (err) throw err;
      
    // set a successful flash message
    req.flash('success', 'Successfully created event');
      
    // redirect to new event
    res.redirect(`/events/${event.slug}`);
  });
}