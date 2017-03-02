const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit
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
    res.render('pages/events', {
      events: events,
      success: req.flash('success')
    });
  });
}

// show a single event
// ====================================
function showSingle(req, res) {
  // get a signle event
  Event.findOne({slug: req.params.slug}, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Events not found');
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
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}

// proces the create form
// ====================================
function processCreate(req, res) {
  // validate info
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();
  
  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    
    return res.redirect('/events/create');
  }
  
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

// show the edit form
// ====================================
function showEdit(req, res) {
  // get a single event
  Event.findOne({slug: req.params.slug}, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Event not found');
    }
    
    // return a view with data
    res.render('pages/edit', {
      event: event,
      errors: req.flash('errors')
    });
  });
}

// process the edit form
// ====================================
function processEdit(req, res) {
  // validate info
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();
  
  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    
    return res.redirect(`/events/${req.params.slug}/edit`);
  }
  
  // find a current event
  Event.findOne({slug: req.params.slug}, (err, event) => {    
    // update the event
    event.name = req.body.name;
    event.description = req.body.description;
    
    event.save((err) => {
      if (err) throw err;
        
      // set a successful flash message
      req.flash('success', 'Successfully updated event');
        
      // redirect to new event
      res.redirect(`/events`);
    });
  })
  

}