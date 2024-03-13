const Booking = require('../models/Booking');
const Invoice = require('../models/Invoice');

async function addBookings (req, res) {

  const { 
    room,
    user,
    invoiceID,
    dates // format = day/month/year
  } = req.body;

  try {

    const bookings = [];

    const invoice = await Invoice.findOne({ _id: invoiceID });

    if(!invoice) return res.status(400).json({ message: 'Invoice not found' });

    dates.forEach(async(item)=>{

      const array = item.split("/"); // return ['day','month','year']
      
      let day = array[0];
      let month = array[1];
      
      if(Number(day)<10) day = "0"+day;
      if(Number(month)<10) month = "0"+month;
      
      const date = new Date(`${array[2]}-${month}-${day}T00:00:00.000Z`);

      const booking = Booking({
        room,
        user,
        date,
        invoice: invoice._id
      });

      const newBooking = await booking.save();
      
      bookings.push(newBooking);

      console.log("newBooking: ",newBooking);
    
    });

    return res.status(201).json({ message: "Bookings created successfully"});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error create bookings' });
  }

}

async function getBookings (req, res) {

  const { limit, page } = req.query;

  const options = {
    limit: limit || 10,
    page: page || 1,
    populate: ["room","user","invoice"]
  };

  const bookings = await Booking.paginate({}, options);

  return res.status(200).json({ bookings });

}

async function checkAvailability (req,res) {
  
  // dateformat = year-month-day
  const { room, dateinit , dateend } = req.params;

  console.log("room: ",room)

  const date1 = dateinit.split("-"); // return [year, month, day]
  const date2 = dateend.split("-");
  
  const loopDates = async(date1, date2)=>{
    // year month day
    const d1 = new Date(`${date1[0]}-${(date1[1])}-${date1[2]}T00:00:00.000Z`);
    const d2 = new Date(`${date2[0]}-${(date2[1])}-${date2[2]}T00:00:00.000Z`);

    console.log("d1: ",d1)
    console.log("d2: ",d2)

    for (let currentD = d1; currentD <= d2; currentD.setDate(currentD.getDate() + 1)) {
      
      console.log("currentD: ",currentD)

      const bookingFound = await Booking.findOne({ room, date: currentD });

      if(bookingFound){
        console.log("foundDate: ",bookingFound)

        console.log(currentD.getTime()===bookingFound.date.getTime())
        return bookingFound;
      }

    }
  }

  const dateFound = await loopDates(date1,date2);
  
  if(dateFound) return res.status(403).json({ message: "No availability", dateFound }); // 403 Forbidden - Prohibido

  return res.status(200).json({ message: "Room availability" });
  
}

module.exports = {
  addBookings,
  getBookings,
  checkAvailability
}