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


//setting the initial chart
let initialChartLabels = ['Oceania','Europe','Asia','Americas','Africa',];
const data =  {
        labels: '',
        datasets: [{
            label: '',
            data: '',
            backgroundColor: [
                'rgb(218, 112, 214)',
                'pink',
                'orange',
                'yellow',
                'green',
                'blue',
                'purple',
            ],
            borderWidth: 1
        }]
}
const config = {
    type: 'bar',
    data,    
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
}
let myChart = new Chart(document.querySelector('canvas'), 
config)

function render (){
        myChart = new Chart (
        document.querySelector('canvas'),
        config) 
}
function destroy (){
    myChart.destroy()
}
//getting the data for each continent API
let oceania = [],  europe= [], asia = [], americas =[], africa = [], covInf = []


const getRegion = async function  (array, region) {
    let data = await( await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region}`)).json()
        return data.forEach(el=>array.push(el))
}

//getting all the data from Covid API
const getCovData = async function  ()  {
    let inf = await (await fetch ('https://corona-api.com/countries')).json()
    return  inf.data.forEach(el=>covInf.push(el))
}
//get latest data for each continent
let deaths= [];
let recovered= [];
let critical= [];
let confirmed= [];
let countryName =[]
async function regionCases(region, strRegion){
    funcOne = await getRegion(region, strRegion)
    funcTwo = await getCovData()
    for(let i=0; i<covInf.length; i++){
        for(let j=0; j<region.length; j++){
            if(region[j].cca2 === covInf[i].code){
                confirmed.push(covInf[i].latest_data.confirmed);
                critical.push(covInf[i].latest_data.critical);
                recovered.push(covInf[i].latest_data.recovered);
                deaths.push(covInf[i].latest_data.deaths);
                countryName.push(region[j].name.common);
            }
        } 
    }
}
async function activate (region, regionstr, dataArr){
    destroy()
    render()
    await regionCases(region, regionstr)
    let countryLabel = countryName
    let confirmedData = dataArr
    myChart.data.labels = countryLabel;
    myChart.data.datasets[0].data = confirmedData
    myChart.data.datasets[0].label = regionstr
    myChart.update()
    
}
// adding buttons 
let asiaBtn = document.querySelector('.asia-btn')
let africaBtn = document.querySelector('.africa-btn')
let americasBtn = document.querySelector('.americas-btn')
let europeBtn = document.querySelector('.europe-btn')
let oceaniaBtn = document.querySelector('.oceania-btn')
let recoveredBtn = document.querySelector('.recovered-btn')
let deathsBtn = document.querySelector('.deaths-btn')
let confirmedBtn = document.querySelector('.confirmed-btn')
let criticalBtn = document.querySelector('.critical-btn')

criticalBtn.addEventListener('click', (e) => {

    activate(asia, 'asia', critical)
})
confirmedBtn.addEventListener('click', (e) => {

    activate(asia, 'asia', confirmed)
})
deathsBtn.addEventListener('click', (e) => {

    activate(asia, 'asia', deaths)
})
recoveredBtn.addEventListener('click', (e) => {

    activate(asia, 'asia', recovered)
})
