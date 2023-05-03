export function isTimeInRange(time, range) {
    const [start, end] = range.split(' - ');
  
    // Convert start and end times to minutes past midnight
    const startMinutes = convertToMinutes(start);
    const endMinutes = convertToMinutes(end);
    if(startMinutes == endMinutes){
      return true;
    }
  
    // Convert given time to minutes past midnight
    const timeMinutes = convertToMinutes(formatAMPM(time));
    // Check if time falls within range
    if (startMinutes <= endMinutes) {
      return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
    } else {
      return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
    }
  }
  function convertToMinutes(timeString) {
    const [hour, minute] = timeString.split(':');
    let minutes = parseInt(hour) * 60 + parseInt(minute);
  
    // Adjust for AM/PM
    if (timeString.endsWith('PM') && hour !== '12') {
      minutes += 12 * 60;
    } else if (timeString.endsWith('AM') && hour === '12') {
      minutes -= 12 * 60;
    }
  
    return minutes;
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }
  export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }