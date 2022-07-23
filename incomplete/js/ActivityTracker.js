import Activity from "./Activity.js";
export default class ActivityTracker {
  constructor() {
    this.activities = []; // stores all activities
    this.totalTime = 0; // tracks the total time (in mins) of every activity
    this.timeInHrs = 0; // gets the absolute integer in hour format of totalTime

    // gets the absolute integer in minutes format for each hour of total time, 
    // or just minutes if less than an hour
    this.minsOfTime = 0;

    this.totalCalories = 0; // tracks the computed total calories 
    this.averageCalories = 0; // tracks the computed averageCalories
    this.activity_id = 0; // unique identifier for each activity item
  };

  // gets a separate absolute integer for both hour and minutes of a time 
  getTime() {
    this.timeInHrs = this.totalTime / 60;
    this.minsOfTime = this.totalTime - (60 * Math.trunc(this.timeInHrs));
  };

  // computes the average calories from totalCalories
  getAverageCal() {
    this.averageCalories = this.totalCalories / this.activities.length;
    if(this.activities.length < 1) {
      this.averageCalories = 0;
      return this.averageCalories;
    }
    return this.averageCalories.toFixed();
  };

  // performs the add function for an activity
  addActivity(description, lengthOfTime, intensity) {
    // 1. instantiate new Activity
    const newAct = new Activity(description, lengthOfTime, intensity);

    // 2. generate new ID
    this.activity_id += newAct.id;
    newAct.id = this.activity_id;

    // 3. add the new item to the activities array
    this.activities.push(newAct);

    // 4. update totalTime, totalCalories, calculate averageCalories
    this.totalTime += parseInt(lengthOfTime);
    this.totalCalories += newAct.calories;
    this.getTime();
    this.getAverageCal();
    
    // 5. update the DOM accordingly
    this.manageUI(newAct);
  };

  // performs the remove function for an item
  removeActivity(e) {
    const itemEl = e.target.closest('tr');
    for(const activity of this.activities) {
      if(activity.id === parseInt(itemEl.id)) {
        const index = this.activities.findIndex(item => item.id === activity.id);
        this.activities.splice(index, 1);
        this.totalTime -= activity.lengthOfTime;
        this.totalCalories -= activity.calories;

        // update the DOM accordingly
        itemEl.remove();
        console.log('REMOVE SUCCESS');
      };
      this.manageUI({}, activity);
    };
  };

  // updates the UI regularly, whether called in an addActivity or removeActivity method
  manageUI(itemToAdd, itemToRemove) {
    const activitiesEl = document.querySelector('#activities-total');
    const actText = activitiesEl.querySelector('h3');
    
    const totalTimeEl = document.querySelector('#time-total');
    const totalTimeText = totalTimeEl.querySelector('h3');

    const avgCalEl = document.querySelector('#average-calories-total');
    const avgCalText = avgCalEl.querySelector('h3');

    const totalCalEl = document.querySelector('#calories-total');
    const totalCalText = totalCalEl.querySelector('h3');

    actText.textContent = this.activities.length;

    // split the whole number and decimal of timeInHrs
    // If there are 0 hours, then only minutes should be displayed.
    this.getTime();    
    if(this.totalTime < 60) {
      totalTimeText.textContent = 
      `${this.minsOfTime}min(s).`;
    } else {
    totalTimeText.textContent = 
     `${Math.trunc(this.timeInHrs)}hr(s).
      ${this.minsOfTime}min(s).`;
    };
    avgCalText.textContent = Math.abs(this.getAverageCal());
    totalCalText.textContent = Math.abs(this.totalCalories.toFixed());

    // Activity Entries
    const tableSec = document.querySelector('.activities');
    const tbodyEl = tableSec.querySelector('tbody');
    // set conditional statement for time
    // if less than an hour, display only the mins
    if(itemToAdd !== undefined && itemToRemove === undefined) {
      let timeStr = '';
      if(itemToAdd.lengthOfTime < 60) {
        timeStr = `${itemToAdd.lengthOfTime} min(s).`;
      } else if(itemToAdd.lengthOfTime >= 60) {
        itemToAdd.getTime();
        timeStr = `${Math.trunc(itemToAdd.timeInHrs)}hr(s). 
        ${itemToAdd.getTime()}min(s).`;
      }; 

      // const index = this.activities.length - 1;
      tbodyEl.insertAdjacentHTML("afterbegin", 
      `<tr id="${itemToAdd.id}" class="activity">
        <td class="description">${itemToAdd.description}</td>
        <td class="calories">${itemToAdd.calories.toFixed()}</td>
        <td class="time">${timeStr}</td>
        <td class="date">${itemToAdd.date}</td>
        <td class="close"><i class="las la-times"></i></i></td>
      </tr>`);

    } else if(itemToRemove !== undefined) {
      let timeStr = '';
      if(itemToRemove.lengthOfTime < 60) {
        timeStr = `${itemToRemove.lengthOfTime} mins.`;
      } else if(itemToRemove.lengthOfTime >= 60) {
        timeStr = `${this.timeInHrs.toString().split('.')[0]}hr(s). 
        ${this.timeInHrs.toFixed(2).toString().split('.')[1]}min(s).`;
      };
    };
  };
};