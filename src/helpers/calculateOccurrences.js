export const calculateOccurrences = (startDate, endDate, periodInDays, time) => {
    const startDateTime = new Date(startDate);
    startDateTime.setHours(time.split(':')[0], time.split(':')[1], 0, 0);
  
    const startTimeMillis = startDateTime.getTime();
    const endTime = endDate.getTime();
    const periodMillis = periodInDays * 24 * 60 * 60 * 1000;
  
    if (startDate.getTime() < startTimeMillis) {
        startDateTime.setTime(startTimeMillis - periodMillis);
    }
  
    const occurrences = Math.floor((endTime - startDateTime.getTime()) / periodMillis);
  
    return occurrences + 1;
  }