// Set the frequency and amplitude of the wiggle
var freq = 1;
var amp = 110;

// Set the duration of the loop in seconds
var loopTime = 3;

// Get the current time, and calculate the time within the loop
var t = time % loopTime;

// Get the value of the wiggle at the current time and at the end of the loop
var wiggle1 = wiggle(freq, amp, 1, 0.5, t);
var wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);

// Linearly interpolate between the two values based on the current time
linear(t, 0, loopTime, wiggle1, wiggle2);
