function update_clock() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  
  var clock = document.getElementById("clock");
  clock.innerHTML = hour + "h" + min + "m" + sec;
}

var t = setInterval(update_clock, 1000);
