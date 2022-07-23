export default class Activity {
  constructor(description = '', lengthOfTime = 0, intensity) {
    this.description = description;
    this.date = new Date().toLocaleString('en-US', {
      month: 'long',  
      day: 'numeric', 
      year: 'numeric', 
    });
    
    
    this.lengthOfTime = lengthOfTime;
    this.timeInHrs = 0;
    this.minsOfTime = 0;

    this.intensity = intensity;
    this.id = 1;

    // calculate calories burned
    // Calories burned = kg x kcal/kg/hr x hr = kcals
    const kg = 65;
    const hrs = lengthOfTime / 60;
    const cal = kg * intensity * hrs;
    this.calories = cal;
  };

  getTime() {
    this.timeInHrs = this.lengthOfTime / 60;
    return this.minsOfTime = this.lengthOfTime - (60 * Math.trunc(this.timeInHrs));
  };
};