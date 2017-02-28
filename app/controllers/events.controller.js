module.exports = {
  // show all events
  showEvents: (req, res) => {
    // create dummy data
    const events = [
      {name: 'Basketball', slug: 'basketball', description: 'Throwing the ball in the basket'},
      {name: 'Swimming', slug: 'swimming', description: 'Trying not to drown'},
      {name: 'Weightlifting', slug: 'weightlifting', description: 'Lifteing heavy stuff'}
    ];
    
    // return a view with data
    res.render('pages/events', {events: events});
  },
  
  // show a single events
  showSingle: (req, res) => {
    // get a signle events
    const event = {name: 'Basketball', slug: 'basketball', description: 'Throwing the ball in the basket'};
    
    // return a view with data
    res.render('pages/single', {event: event});
  }
}