/* eslint-disable no-alert */
/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import estimator from '../estimator.js';

const form = document.getElementById('main-form');
const resultDiv = document.getElementById('est-view');

const nameElement = document.getElementById('name');
const avgAgeElement = document.getElementById('avg-age');
const avgDailyIncUsdElement = document.getElementById('avg-daily-inc-usd');
const avgDailyIncPopElement = document.getElementById('avg-daily-inc-pop');
const populationElement = document.getElementById('population');
const periodElement = document.getElementById('elapse');
const reportedElement = document.getElementById('reported');
const hospitalElement = document.getElementById('hospital-beds');
const periodTypeElement = document.getElementById('period-type');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(periodTypeElement.value);

  if (periodTypeElement.value === 'select') {
    alert('Must select a valid period type');
    return;
  }

  const name = nameElement.value;
  const avgAge = avgAgeElement.value;
  const avgDailyIncomeInUSD = avgDailyIncUsdElement.value;
  const avgDailyIncomePopulation = avgDailyIncPopElement.value;

  const periodType = periodTypeElement.value;
  const timeToElapse = periodElement.value;
  const reportedCases = reportedElement.value;
  const population = populationElement.value;
  const totalHospitalBeds = hospitalElement.value;

  const data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  const { impact, severeImpact } = estimator(data);
  console.log(impact);
  console.log(severeImpact);

  const impactDiv = document.createElement('div');
  const impactDivHeader = document.createElement('h3');
  const impactDivHeaderText = document.createTextNode('Impact data');
  impactDivHeader.appendChild(impactDivHeaderText);
  impactDiv.appendChild(impactDivHeader);

  const impactCurrentlyInfected = document.createTextNode(`Currently infected: ${new Intl.NumberFormat().format(impact.currentlyInfected)}`);
  const impactInfectionsInRequestedTime = document.createTextNode(`Infections in requested time: ${new Intl.NumberFormat().format(impact.infectionsByRequestedTime)}`);
  const impactSevereCasesInRequestedTime = document.createTextNode(`Severe cases in requested time: ${new Intl.NumberFormat().format(impact.severeCasesByRequestedTime)}`);
  const impactHospitalBedsInRequestedTime = document.createTextNode(`Hospital beds in requested time: ${new Intl.NumberFormat().format(impact.hospitalBedsByRequestedTime)}`);
  const impactCasesForICUInRequstedTime = document.createTextNode(`Cases for ICU in requested time: ${new Intl.NumberFormat().format(impact.casesForICUByRequestedTime)}`);
  const impactCasesForVentilatorsInRequestedTime = document.createTextNode(`Cases for ventilators in requested time: ${new Intl.NumberFormat().format(impact.casesForVentilatorsByRequestedTime)}`);
  const impactDollarsInFlight = document.createTextNode(`Dollars in flight: ${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(impact.dollarsInFlight)}`);

  const impactResultArray = [
    impactCurrentlyInfected,
    impactInfectionsInRequestedTime,
    impactSevereCasesInRequestedTime,
    impactHospitalBedsInRequestedTime,
    impactCasesForICUInRequstedTime,
    impactCasesForVentilatorsInRequestedTime,
    impactDollarsInFlight
  ];

  impactResultArray.forEach((item) => {
    impactDiv.appendChild(item);
    impactDiv.appendChild(document.createElement('br'));
  });

  const severeImpactDivHeader = document.createElement('h3');
  const severeImpactDivHeaderText = document.createTextNode('Severe impact data');
  severeImpactDivHeader.appendChild(severeImpactDivHeaderText);
  impactDiv.appendChild(document.createElement('br'));
  impactDiv.appendChild(severeImpactDivHeader);

  const severeImpactCurrentlyInfected = document.createTextNode(`Currently infected: ${new Intl.NumberFormat().format(severeImpact.currentlyInfected)}`);
  const severeImpactInfectionsInRequestedTime = document.createTextNode(`Infections in requested time: ${new Intl.NumberFormat().format(severeImpact.infectionsByRequestedTime)}`);
  const severeImpactSevereCasesInRequestedTime = document.createTextNode(`Severe cases in requested time: ${new Intl.NumberFormat().format(severeImpact.severeCasesByRequestedTime)}`);
  const severeImpactHospitalBedsInRequestedTime = document.createTextNode(`Hospital beds in requested time: ${new Intl.NumberFormat().format(severeImpact.hospitalBedsByRequestedTime)}`);
  const severeImpactCasesForICUInRequstedTime = document.createTextNode(`Cases for ICU in requested time: ${new Intl.NumberFormat().format(severeImpact.casesForICUByRequestedTime)}`);
  const severeImpactCasesForVentilatorsInRequestedTime = document.createTextNode(`Cases for ventilators in requested time: ${new Intl.NumberFormat().format(severeImpact.casesForVentilatorsByRequestedTime)}`);
  const severeImpactDollarsInFlight = document.createTextNode(`Dollars in flight: ${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(severeImpact.dollarsInFlight)}`);

  const severeImpactResultArray = [
    severeImpactCurrentlyInfected,
    severeImpactInfectionsInRequestedTime,
    severeImpactSevereCasesInRequestedTime,
    severeImpactHospitalBedsInRequestedTime,
    severeImpactCasesForICUInRequstedTime,
    severeImpactCasesForVentilatorsInRequestedTime,
    severeImpactDollarsInFlight
  ];

  severeImpactResultArray.forEach((item) => {
    impactDiv.appendChild(item);
    impactDiv.appendChild(document.createElement('br'));
  });

  resultDiv.innerHTML = '';
  resultDiv.appendChild(impactDiv);
  form.reset();
});

// const result = estimator({
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// });
// console.log(result);
// alert('Hi');
