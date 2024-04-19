import availabilityTimings from '../utils/availability.json' assert { type: "json" };

//function which can find which time the given time comes in between
const findAvailabilitySlot = (day,time,date)=>{
    const availabilityArr = availabilityTimings.availabilityTimings[day];
    for(let i =0;i<availabilityArr.length;i++){
        //Converting the time into date format as comparing between becomes far more easy and efficient
        const startDate = new Date(`${date}T${availabilityArr[i].start}:00`);
        const endDate = new Date(`${date}T${availabilityArr[i].end}:00`);
        const givenDate = new Date(`${date}T${time}:00`);
        //if any case given time become less than startTime we return that time
        if(givenDate<startDate){
            return {
                "isAvailable":false,
                "nextAvailableSlot": {
                    "date": date,
                    "time": availabilityArr[i].start
                }
                    
            }
        }
        //if the given time comes in between the startTime and the endTime
        else if(givenDate >= startDate && givenDate <= endDate){
            return {
                "isAvailable": true 
            };
        }
    }
    return false;
}

const handleAvailabilityTimeAndDate = async(req,res)=>{
    let {date,time} = req.query;
    let dateObject = new Date(date);
    if(!dateObject || !date || !time) return res.status(404).json({respData:"Enter valid date and time"})
    const day = dateObject.getDay();
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    //for handling the cases of time when its in the format of H:MM
    if(time.length ==4){
        time = "0"+time;
    }


    let respData = findAvailabilitySlot(weekdays[day],time,date);
    
    //handling the case if the availability slot is in the next day
    if(!respData){
        dateObject.setDate(dateObject.getDate()+1);
        if(dateObject.getDay()==0){
            dateObject.setDate(dateObject.getDate()+1);
        }
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;
        respData= {
            "isAvailable":false,
            "nextAvailableSlot": {
                "date": formattedDate,
                "time": availabilityTimings.availabilityTimings[weekdays[dateObject.getDay()]][0].start
            }
        }
    }
    
    //rendering the ejs which shows the respData on the page
    return res.status(200).render("Home",{respData});
}

export default handleAvailabilityTimeAndDate;