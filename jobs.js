// people
var mom  = {name:'mom',  jobs:{}},
    dad  = {name:'dad',  jobs:{}},
    billy= {name:'billy',jobs:{}},
    sally= {name:'sally',jobs:{}};

// chores
var wash=   {job:'wash',who:{}},
    dry =   {job:'dry', who:{}},
    mop =   {job:'mop', who:{}},
    cook=   {job:'cook',who:{}};

var people = {
    mom:mom,
    dad:dad,
    billy:billy,
    sally:sally
};

var jobs = {
    mop:mop,
    cook:cook,
    wash:wash,
    dry:dry
};

wash.who = {mom:mom,billy:billy};
dry.who  = {dad:dad,billy:billy,sally:sally};
cook.who = {dad:dad,sally:sally};
mop.who  = {dad:dad,mom:mom};

mom.jobs  = {wash:wash,mop:mop};
dad.jobs  = {dry:dry,cook:cook,mop:mop};
sally.jobs= {dry:dry,cook:cook};
billy.jobs= {wash:wash,dry:dry};

function hasJob(person,job) {
  var testJob;
  var testPerson;
  if (typeof person === "string" && typeof job === "string") {
    // if string parameters, use var job as is but convert person to property name and then look in that jobs property
    testJob = job;
    testPerson = people[person].jobs;
} else {
    // if object parameters, get the key of the job (provides a string) and look in the person object for the job parameter
    testJob = job.job;
    testPerson = person.jobs;
  }
  return (testJob in testPerson);
}


// console.log(hasJob(mom, mop));

function peopleDoing(job) {
  var peopleArr = [];
  for (var names in job.who) {
    peopleArr.push(people[names]);
  }
  return peopleArr;
} //--> Array of people-objects


// Write a function peopleDoing(job) which returns an array of people-objects

function jobsDoneBy(person) {
  var jobsArr = [];
  for (var doneJobs in person.jobs) {
    jobsArr.push(jobs[doneJobs]);
  }
  return jobsArr;
}
console.log(jobsDoneBy(billy));


// Write a function jobsDoneBy(person) which returns an array of job-objects
