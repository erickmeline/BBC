// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
//['None', 'Apache 2.0 License', 'The MIT License', 'Mozilla Public License 2.0', 'Unlicense']
function renderLicenseBadge(license) {
  switch(license) {
    case 'Apache 2.0 License':
      return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]';
      break;
    case 'The MIT License':
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      break;
    case 'Mozilla Public License 2.0':
      return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)]';
      break;
    case 'Unlicense':
      return '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)]';
      break;
    default: return '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch(license) {
    case 'Apache 2.0 License':
      return '(https://opensource.org/licenses/Apache-2.0)';
      break;
    case 'The MIT License':
      return '(https://opensource.org/licenses/MIT)';
      break;
    case 'Mozilla Public License 2.0':
      return '(https://opensource.org/licenses/MPL-2.0)';
      break;
    case 'Unlicense':
      return '(http://unlicense.org/)';
      break;
    default: return '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  return license ?
  `Licensed under ${license}, (the "License");
  You may obtain a copy of the License at:
  ${renderLicenseLink(license)}`
  : '';
}

const generateToc = (data) => {
  let toc = '';
  if (data.installation) {
    toc += '- Installation instructions';
  }
  if (data.instructions) {
    toc += '- Usage information';
  }
  if (data.contribution) {
    toc += '- Contribution guidelines';
  }
  if (data.tests) {
    toc += '- Test instructions';
  }
  if (data.github || data.email) {
    toc += '- Questions';
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const toc = generateToc(data);
  let readme = '';
  if (data.title) {
    readme += `# ${data.title}`;
  }
  if (data.description) {
    readme += `${data.description}`;
  }
  readme += renderLicenseBadge(data.license);
  readme += generateToc(data);
  if (data.installation) {
    readme += `${data.installation}`;
  }
  if (data.instructions) {
    readme += `${data.instructions}`;
  }
  if (data.contribution) {
    readme += `${data.contribution}`;
  }
  if (data.tests) {
    readme += `${data.tests}`;
  }
  if (data.github || data.email) {
    readme += `${data.github}`;
    readme += `${data.github}`;
  }
  if (data.tests) {
    readme += `${data.tests}`;
  }
  readme += renderLicenseSection(license);
  return readme;
}

module.exports = generateMarkdown;
