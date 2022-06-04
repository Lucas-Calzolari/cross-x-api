import dayjs from 'dayjs';
import { CrossAPI } from './crossAPI'
import {ArgumentParser} from 'argparse' 
import { exit } from 'process';


// console.log("Start process: " + dayjs().format("YYYY-MM-DDTHH:mm:ss:SSSZ"))

// const parser = new ArgumentParser({
//     description: "CLI cross X checkin"
// });
// parser.add_argument('-e', '--email', { help: 'Email for login' });
// parser.add_argument('-p', '--password', { help: 'Password for login' });
// parser.add_argument('--token', { help: 'Directly use token instead of credentials' });
// parser.add_argument('-t', '--time', { help: 'Class time format HH:mm', required: true });

// const args = parser.parse_args()

// const {time: targetTime, email, password, token} = args;

// if (!targetTime || !/[0-9]{2}:[0-9]{2}/) {
//     console.error("Class time must follow pattern \"HH:mm\"")
//     exit()
// }

// if (!token && (!email || !password)) {
//     console.error("Either pass auth credentials (email and password) or directly inform auth token")
//     exit()
// }

// const targetHour = parseInt(targetTime.split(":")[0]);
// const targetMinute = parseInt(targetTime.split(":")[1]);


// if (targetHour >= 24 || targetHour < 0) {
//     console.error("Invalid hour")
// }

// if (targetMinute >= 60 || targetMinute < 0) {
//     console.error("Invalid minute")
// }

// (async () => {

//     const crossAPI = new CrossAPI();
//     if (token) {
//         crossAPI.setToken(token)
//     } else {
//         await crossAPI.authenticate(email, password)
//     }
    
//     const classes = await crossAPI.getClassesForDate(dayjs()) 
    
//     const targetClass = classes.find(classItem => classItem.start_time == targetTime)
//     console.log(classes)
//     if (!targetClass) {
//         console.error("Class not found");
//         exit();
//     } else {
//         console.log("Found class id: " +  targetClass?.id)
//     }
    
//     let checkinTime = dayjs()
//     checkinTime = checkinTime.hour(targetHour);
//     checkinTime = checkinTime.minute(targetMinute);
//     checkinTime = checkinTime.second(0);
//     checkinTime = checkinTime.millisecond(0);
//     checkinTime = checkinTime.add(targetClass?.class_opening || 0, 'minutes')

//     const remainingTime = checkinTime.diff(dayjs(), 'millisecond');

//     console.log({remainingTime})
//     const success = await new Promise((s,f) => {
//         let success = false;
//         setTimeout(async () => {        
//             let attempts = 0;
//             console.log("attempt")
//             while(!(success = await crossAPI.checkin(targetClass?.id as number))) {
//                 attempts++;
//                 if ( attempts > 5) {
//                     console.log("Maximum attempts reached: " + attempts)
//                     break;
//                 }
//             }
//             s(success)
//         }, remainingTime);
//     })

//     if (success){
//         console.log("Success")
//     } else {
//         console.log("Fail")
//     }
//     console.log("End process: " + dayjs().format("YYYY-MM-DDTHH:mm:ss:SSSZ"))
// })()