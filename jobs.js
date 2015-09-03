var lodash = require('lodash');

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
    peopleArr.push(names);
  }
  return peopleArr;
} //--> Array of people-objects


function jobsDoneBy(person) {
  var jobsArr = [];
  for (var doneJobs in person.jobs) {
    jobsArr.push(jobs[doneJobs]);
  }
  return jobsArr;
} //--> Array of objects
// console.log(jobsDoneBy('billy'));

// maxLength(strings) --> number
// Write a function maxLength(strings) which returns the length of the longest string in the array strings
function maxLength(strings){
return strings.sort(function (a, b) { return b.length - a.length; })[0].length;
}


// sizeColumns(rowNames, colNames) --> array of ints
// Write a function sizeColumns(rowNames, colNames) which returns an array of widths, one per column. The width of the first column should depend on the longest string in rowNames; the width of all other columns depends on the longest string in colNames. There should be one leading column (for all rowNames) plus one column for each of colNames.
// For example: var cols = sizeColumns(['wash','dry','cook','mop'],['mom','dad','sally','billy']) should return [4,5,5,5,5].

function sizeColumns(rowNames, colNames) {
   var arr = [];
   var colMax = maxLength(colNames); //Get Longest Col String
   for (var i = 0; i <= colNames.length; i++) {
     if (i === 0) { //Push longest row length first to array
       arr.push(maxLength(rowNames));
     }
     else { //Remaining items will be longest Col length
       arr.push(colMax);
     }
   }
   return arr;
}


// writeRow(colSizes, strings)
// Write a function writeRow(colSizes, strings) which console.logs a single string composed of strings, each padded with space to match the corresponding width in array colSizes.
// You may use the functions leftPad(string,totalWidth) and rightPad(string,totalWidth) included here:
// function leftPad(str,len) {
//     var padding = Array(len+1).join(' ');
//     return (padding+str).slice(-len);
// }
// function rightPad(str,len) {
//     var padding = Array(len+1).join(' ');
//     return (str+padding).slice(len);
// }

function writeRow(colSizes,strings){
  var straw = "";
  function rightPad(str,len){
    var padding = Array(len-str.length +1).join(' ');
    return (str+padding);
  }
  for(var i=0;i<colSizes.length;i++){
    straw += rightPad(strings[i],colSizes[i]);
  }
  return straw;
}



// writeJobsTable(people, jobs)
// Write a function writeJobsTable(people,jobs) which will console.log the following series of lines:
//        mom   dad   sally billy
// ------------------------------
// wash | X                 X
// dry  |       X     X     X
// cook |       X     X
// mop  | X     X
// The functions sizeColumns and writeRow will help you format the table.

function writeJobsTable(people, jobs) {
  var peopleArr = Object.keys(people);
  peopleArr.unshift(" ");
  var jobsArr = Object.keys(jobs);
  jobsArr.unshift(" ");
  var colsizes = sizeColumns(jobsArr, peopleArr);
  console.log(peopleArr);

  // var table = writeRow(colsizes, peopleArr);
  // console.log(table);
  // var data = [];
  // for (var i in people) {
  //   for (var j in jobs) {
  //     if (hasJob(somebody, somejob)) {
  //       data.push("X");
  //     } else {
  //       data.push(" ");
  //     }
  //
  //   }
  // }
}

// writeJobsTable(people, jobs);

/*----------------------------------
Data processing ====================
-----------------------------------*/


// intersectJobs(nameA,nameB) --> array of strings
// Write a function intersectJobs(nameA,nameB) to return an array of names of the jobs shared by the people named nameA and nameB. For example:
// intersectJobs('dad','sally') // should return either ['cook','dry'] or ['dry','cook']
// intersectJobs('mom','sally') // should return []
function intersectJobs(nameA, nameB) {
  // overload for both strings and objects
  var nA,
      nB;
  if (typeof nameA === "string") {
    nA = people[nameA];
  } else {
    nA = nameA;
  }
  if (typeof nameB === "string") {
    nB = people[nameB];
  } else {
    nB = nameB;
  }
  // actual intersection
  return (lodash.intersection(lodash.keys(nA.jobs), lodash.keys(nB.jobs)));
}

// console.log(intersectJobs(mom,dad));




// similarity(personA,personB) --> number 0..1
// Write a function similarity(personA,personB) which receives two person objects and calculates a number from 0 to 1 representing the similarity of their jobs. Use the following measure of similarity: the number of jobs they share as a fraction of the longer job list. Make use of your intersectJobs function.
// //person similarity matrix:
//     mom dad sal bil
// mom 1   .33 0   .50
// dad     1   .67 .33
// sal         1   .50
// bil             1
function similarity(personA, personB) {
  // overload for both strings and objects
  var pA,
      pB;
  if (typeof personA === "string") {
    pA = people[personA];
  } else {
    pA = personA;
  }
  if (typeof personB === "string") {
    pB = people[personB];
  } else {
    pB = personB;
  }
  // get intersected jobs
  var intersect = intersectJobs(pA, pB);
  //see whih person has more jobs and divide number of intersected jobs by that amount
  if (jobsDoneBy(pA).length > jobsDoneBy(pB).length) {
    return intersect.length/jobsDoneBy(pA).length;
  } else {
    return intersect.length/jobsDoneBy(pB).length;
  }
}

// console.log(similarity(dad,mom));


// score(job,person) --> number
// Write a function score(job,person) which generates a number representing the "compatibility" of that job and that person. Compatibility is calculated as follows: find all other people (excluding person) who have that job, then sum together the similarity each has to person.
// For example, sally is reasonably compatible with mopping because dad does similar jobs to sally but also mops:
// score(mop,sally) //--> (0 for mom + .67 for dad)  === .67
// But mom is super-compatible with drying, because everyone else does it already!
// score(dry,mom) //--> (.33 for dad + 0 for Sally + .50 for Billy) === .83

function score(job, person) {
  var j,
      p;
  if (typeof job === "string") {
    j = jobs[job];
  } else {
    j = job;
  }
  if (typeof person === "string") {
    p = people[person];
  } else {
    p = person;
  }
  var retScore = 0;
  var jobsDoing = peopleDoing(j);
  for (var name in jobsDoing) {
    if (jobsDoing[name] == p) {}
    else {
      retScore += similarity(p, people[jobsDoing[name]]);
    }
  }
  return retScore;
}


console.log(score(dry, mom));


// recommendJobsFor(person) --> array of objects
// Write a function recommendJobsFor(person) which returns an array of objects containing possible new jobs for person with compatibility scores for each. The objects in the array should be sorted in descending order of scores, so that the strongest recommendation is first. Omit any jobs which person is already doing or for which they have zero compatibility.
// For example, mom could do either of two new jobs, drying or cooking. Recommendations for her would be:
// recommendJobsFor(mom) //--> [{job:dry, score:.83},{job:cook, score:.33}]


module.exports = {
    maxLength:maxLength,
    sizeColumns:sizeColumns,
    writeRow:writeRow,
    writeJobsTable:writeJobsTable
  };
