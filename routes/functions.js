var express = require('express');

// generate random alpha-numeric code
module.exports.getRandomString = function(length, next){
  
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var code = "";
	
	if (length < 0){
	  return next("Error: cannot issue random code of negative length", null);
	}
	
	for(x=0;x<length;x++){
		i = Math.floor(Math.random() * 62);
		code += chars.charAt(i);
	}
	
	return next(null, code);
	
}

module.exports.getUniqueIndices = function(value, index, self) { 
    return self.indexOf(value) === index;
}

module.exports.getNiceDate = function(timeInMS){
	
	var date = new Date(timeInMS);
	
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
	
}

module.exports.getNiceTime = function(timeInS){
	
	var hours = timeInS / (60 * 60);
	var mins = (hours - Math.floor(hours)) * 60;
	var secs = (mins - Math.floor(mins)) * 60;
	
	hours = ("00" + Math.floor(hours)).slice(-2);
	mins = ("00" + Math.floor(mins)).slice(-2);
	secs = ("00" + Math.round(secs)).slice(-2);
	
	return hours + ":" + mins + ":" + secs;	
	
}

module.exports.getNiceSplit = function(timeInS){
	var hours = timeInS / (60 * 60);
	var mins = (hours - Math.floor(hours)) * 60;
	var secs = (mins - Math.floor(mins)) * 60;
	
	hours = ("00" + Math.floor(hours)).slice(-2);
	mins = ("00" + Math.floor(mins)).slice(-2);
	secs = ("00" + Math.round(secs * 10) / 10).slice(-4);
	
	if (Math.floor(timeInS / (60 * 60)) == 0) {
		return mins + ":" + secs;	
	} else {
		return hours + ":" + mins + ":" + secs;	
	}
	
}
