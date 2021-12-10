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




//getting the data for each continent API
let oceania = [];
let europe= [];
let asia = [];
let americas =[];
let africa = [];
let covInf = [];


function getRegion (array, region) {
    try{
    fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region}`)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        return data.forEach(el=>array.push(el))
    })
    return array
    }
    catch(e){
        console.log('oh no', e)
        }
}

getRegion(asia, 'asia')
getRegion(europe, 'europe')
getRegion(americas, 'americas')
getRegion(oceania, 'oceania')
getRegion(africa, 'africa')


//getting all the data from Covid API
async function getCovData ()  {
    try{
    let inf = await (await fetch ('https://corona-api.com/countries')).json()
    return  inf.data.forEach(el=>covInf.push(el))
    }
    catch(e){
        console.log('oh no', e)
    }
}
//get latest data for each continent
let latestData = []
let countryName =[]
async function regionCases(region, strRegion){
    await getRegion(region, strRegion)
    await getCovData()
    for(let i=0; i<covInf.length; i++){
        for(let j=0; j<region.length; j++){
            if(region[j].cca2 === covInf[i].code){
                latestData.push(covInf[i].latest_data);
                countryName.push(region[j].name.common);
            }
        } 
    } return countryName, latestData
}

setTimeout(()=>{
    regionCases(africa, 'africa')
}, 500)

//counting all cases per country & per continent
let deaths= [];
let totalDeaths = 0;
(function countDeaths (){
setTimeout(()=>{
    for (let i=0; i<latestData.length; i++){
        deaths.push(latestData[i].deaths)
        totalDeaths += latestData[i].deaths
        } return totalDeaths, deaths
}, 1000)
})()
let confirmed= [];
let totalConfirmed = 0;
(function countConfirmed (){
setTimeout(()=>{
    for (let i=0; i<latestData.length; i++){
        confirmed.push(latestData[i].confirmed)
        totalConfirmed += latestData[i].confirmed
        } return totalConfirmed, confirmed
}, 1000)
})()
let recovered= [];
let totalRecovered = 0;
(function countRecovered  (){
setTimeout(()=>{
    for (let i=0; i<latestData.length; i++){
        recovered.push(latestData[i].recovered)
        totalRecovered += latestData[i].recovered
        } return totalRecovered, recovered
}, 1000)
})()
let critical= [];
let totalCritical = 0;
(function countCritical  (){
setTimeout(()=>{
    for (let i=0; i<latestData.length; i++){
        critical.push(latestData[i].critical)
        totalCritical += latestData[i].critical
        } return totalCritical, critical
}, 1000)
})()

setTimeout(()=>{
console.log(deaths)
console.log(totalDeaths)
console.log(critical)
console.log(totalCritical)
console.log(recovered)
console.log(totalRecovered)
console.log(confirmed)
console.log(totalConfirmed)
}, 1000)


// getting started with html
let canvas = document.querySelector('canvas');
setTimeout(()=>{
const myChart = new Chart(canvas, {
    type: 'pie',
    data: {
        labels: countryName,
        datasets: [{
            label: 'Deaths',
            data: deaths,
            backgroundColor: [
                'rgb(218, 112, 214)',
                'orchid',
                'pink',
                'orange',
                'yellow',
                'green',
                'blue',
                'purple',
            ],
            borderWidth: 1
        }]
    },

    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        scales: {
            x: {
                ticks:{
                    autoSkip: false
                }
            }
        }
        
    }
});
}, 1500)