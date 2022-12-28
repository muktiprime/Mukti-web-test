export const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};


export const convertSeconds = (hms) => {
    const arr = hms.split(":");
    if (arr.length === 1){ return Number(arr[0]) }
    if (arr.length <= 2){ return Number(arr[0]*60+(+arr[1])) } 
    else { return Number(arr[0]*3600+arr[1]*60+(+arr[2])) }
}