import ActivityTracker from "./ActivityTracker.js";

const descInputEl = document.querySelector('#description-input');
const timeInputEl = document.querySelector('#time-input');
const intensityEl = document.querySelector('#intensity-input');
const submitBtn = document.querySelector('form').lastElementChild;
const tBodyEl = document.querySelector('tbody');
const tracker = new ActivityTracker();


submitBtn.addEventListener('click', function() {
  tracker.addActivity(
    descInputEl.value, 
    timeInputEl.value, 
    intensityEl.options[intensityEl.selectedIndex].value);
  descInputEl.value = '';
  timeInputEl.value = '';
});


tBodyEl.addEventListener('click', function(e) {
  if(e.target.className === 'las la-times') {
    tracker.removeActivity(e);
  };
});

// tracker.addActivity('something light', 96, 8.5)
// tracker.addActivity('very hard', 25, 1)
// tracker.addActivity('very hard', 45, 3)
// tracker.addActivity('very hard', 15, 2)
// console.log(tracker.manageUI())
// console.log(0.21.toFixed())