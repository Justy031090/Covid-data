/*

Submitting instructions:
•Push the full folder hierarchy of the project to your own repository on 
Github.
Please add the following in hive:
•A link to the repository
•Free text – a description of the assignment. Stuff that you found 
hard to implement, known bugs and your review of this 
assignment
Our API’s:

!We will get the list of countries per continent from this api.

1. We want the ability for the user to choose statistics between continents.
Problem
We have a problem that our covid api does not give us the ability to choose 
statistics between continent countries. It only gives you statistics of the whole 
world. 
Solution
The solution is to call our countries api and choose from their the specific 
continent you want the list of countries from and compare those countries to 
our covid 19 countries.
!cca2 (country API && region API) === code(covid API)
2. The statistics we want from each country is the following:
- Confirmed Cases //!from covid API
- Number of Deaths  //!from covid API
- Number of recovered   //!from covid API
- Number of critical condition  //!from covid API

We want the ability to choose what statistics we want to see and display them
on a graph.  //!learn the library

3. When you click on a specific continent, you also have the ability to choose 
an individual countries statistics of that particular continent. Stats should 
include at least the following:
- total cases
- new cases
- total deaths
- new deaths
- total recovered
*/
let oceania = [];
let europe= [];
let asia = [];
let americas =[];
let africa = [];
let covInf = [];

//getting the data for each continent API
function getRegion (array, region) {
    fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region}`)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        return data.forEach(el=>array.push(el))
    })
    return array
}
getRegion(asia, 'asia')
getRegion(europe, 'europe')
getRegion(americas, 'americas')
getRegion(oceania, 'oceania')
getRegion(africa, 'africa')


//getting all the data from Covid API
async function getCovData ()  {
    let inf = await (await fetch ('https://corona-api.com/countries')).json()
    return  inf.data.forEach(el=>covInf.push(el))
}
getCovData()

//get latest data for each continent
function regionCases(region){
    let cases = {};
setTimeout(()=> {
    for(let i=0; i<covInf.length; i++){
        for(let j=0; j<region.length; j++){
            if(region[j].cca2 === covInf[i].code){
                let myString = JSON.stringify(region[j].name.common)
                cases[myString] = covInf[i].latest_data
            }
        } 
    } return cases
}, 500)
return cases
}

console.log(regionCases(africa))




