/* eslint-disable max-len */
/* eslint-disable no-restricted-properties */
const computeImpactCurrentlyInfected = (reportedCases) => reportedCases * 10;
const computeSevereImpactCurrentlyInfected = (reportedCases) => reportedCases * 50;
const computeInfectionsByRequestedTime = (currentlyInfected, requestedTime, periodType) => {
  let infectionsByRequestedTime = 0;
  switch (periodType.toLowerCase()) {
    case 'days':
      infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.trunc(requestedTime / 3)));
      break;
    case 'weeks':
      infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.trunc((requestedTime * 7) / 3)));
      break;
    case 'months':
      infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.trunc((requestedTime * 30) / 3)));
      break;
    default:
      throw new Error('Invalid argument, periodType must be either days, weeks or months');
  }

  return infectionsByRequestedTime;
};

const computeSevereCasesByRequestedTime = (infectionsByRequestedTime) => Math.trunc(infectionsByRequestedTime * (15 / 100));

// eslint-disable-next-line radix
const computeHospitalBedsByRequestedTime = (totalHospitalBeds, severeCasesByRequestedTime) => Math.trunc(totalHospitalBeds * (35 / 100) - severeCasesByRequestedTime);

const computeCasesForICUByRequestedTime = (infectionsByRequestedTime) => Math.trunc(infectionsByRequestedTime * (5 / 100));

const computeCasesForVentilatorsByRequestedTime = (infectionsByRequestedTime) => Math.trunc(infectionsByRequestedTime * (2 / 100));

const computeDollarsInFlight = (infectionsByRequestedTime, avgDailyIncomeInUSD, avgDailyIncomePopulation, period, periodType) => {
  let dollarsInFlight = 0;

  switch (periodType.toLowerCase()) {
    case 'days':
      dollarsInFlight = Math.trunc(infectionsByRequestedTime * avgDailyIncomePopulation * (avgDailyIncomeInUSD / period));
      break;
    case 'weeks':
      dollarsInFlight = Math.trunc(infectionsByRequestedTime * avgDailyIncomePopulation * (avgDailyIncomeInUSD / (period * 7)));
      break;
    case 'months':
      dollarsInFlight = Math.trunc(infectionsByRequestedTime * avgDailyIncomePopulation * (avgDailyIncomeInUSD / (period * 30)));
      break;
    default:
      throw new Error('Invalid argument, periodType must be either days, weeks or months');
  }

  return dollarsInFlight;
};


const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = computeImpactCurrentlyInfected(data.reportedCases);
  impact.infectionsByRequestedTime = computeInfectionsByRequestedTime(impact.currentlyInfected, data.timeToElapse, data.periodType);
  impact.severeCasesByRequestedTime = computeSevereCasesByRequestedTime(impact.infectionsByRequestedTime);
  impact.hospitalBedsByRequestedTime = computeHospitalBedsByRequestedTime(data.totalHospitalBeds, impact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = computeCasesForICUByRequestedTime(impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = computeCasesForVentilatorsByRequestedTime(impact.infectionsByRequestedTime);
  impact.dollarsInFlight = computeDollarsInFlight(impact.infectionsByRequestedTime, data.region.avgDailyIncomeInUSD, data.region.avgDailyIncomePopulation, data.timeToElapse, data.periodType);

  severeImpact.currentlyInfected = computeSevereImpactCurrentlyInfected(data.reportedCases);
  severeImpact.infectionsByRequestedTime = computeInfectionsByRequestedTime(severeImpact.currentlyInfected, data.timeToElapse, data.periodType);
  severeImpact.severeCasesByRequestedTime = computeSevereCasesByRequestedTime(severeImpact.infectionsByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = computeHospitalBedsByRequestedTime(data.totalHospitalBeds, severeImpact.severeCasesByRequestedTime);
  severeImpact.casesForICUByRequestedTime = computeCasesForICUByRequestedTime(severeImpact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = computeCasesForVentilatorsByRequestedTime(severeImpact.infectionsByRequestedTime);
  severeImpact.dollarsInFlight = computeDollarsInFlight(severeImpact.infectionsByRequestedTime, data.region.avgDailyIncomeInUSD, data.region.avgDailyIncomePopulation, data.timeToElapse, data.periodType);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
