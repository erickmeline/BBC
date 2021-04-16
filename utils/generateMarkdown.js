function renderLicenseBadge(license) {
  switch(license) {
    case 'Apache 2.0 License':
      return '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)\n\n';
      break;
    case 'The MIT License':
      return '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)\n\n';
      break;
    case 'Mozilla Public License 2.0':
      return '![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)\n\n';
      break;
    case 'Unlicense':
      return '![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)\n\n';
      break;
    default: return '\n';
  }
}

function renderLicenseLink(license) {
  switch(license) {
    case 'Apache 2.0 License':
      return 'https://opensource.org/licenses/Apache-2.0';
      break;
    case 'The MIT License':
      return 'https://opensource.org/licenses/MIT';
      break;
    case 'Mozilla Public License 2.0':
      return 'https://opensource.org/licenses/MPL-2.0';
      break;
    case 'Unlicense':
      return 'http://unlicense.org/';
      break;
    default: return '';
  }
}

function renderLicenseSection(license) {
  return license !== 'None' ?
  `## License\nLicensed under ${license}, (the "License");
You may obtain a copy of the License at:\n${renderLicenseLink(license)}\n`
  : '';
}

const generateToc = (data) => {
  let toc = '';
  if (data.installation) {
    toc += '- [Installation instructions](#Installation-instructions)\n';
  }
  if (data.instructions) {
    toc += '- [Usage information](#Usage-information)\n';
  }
  if (data.contribution) {
    toc += '- [Contribution guidelines](#Contribution-guidelines)\n';
  }
  if (data.tests) {
    toc += '- [Test instructions](#Test-instructions)\n';
  }
  if (data.github || data.email) {
    toc += '- [Questions](#Questions)\n';
  }
  return toc = toc ? `## Table of contents\n${toc}\n` : '';
}

function generateMarkdown(data) {
  let readme = '';
  if (data.title) {
    readme += `# ${data.title}\n`;
  }
  readme += renderLicenseBadge(data.license);
  if (data.description) {
    readme += `## Description\n${data.description}\n\n`;
  }
  readme += generateToc(data);
  if (data.installation) {
    readme += `## Installation instructions\n${data.installation}\n\n`;
  }
  if (data.instructions) {
    readme += `## Installation instructions\n${data.instructions}\n\n`;
  }
  if (data.information) {
    readme += `## Usage information\n${data.information}\n\n`;
  }
  if (data.contribution) {
    readme += `## Contribution guidelines\n${data.contribution}\n\n`;
  }
  if (data.tests) {
    readme += `## Test instructions\n${data.tests}\n\n`;
  }
  if (data.github || data.email) {
    readme += '## Questions\n';
    readme += 'Reach out with additional questions:\n\n';
    readme += `[${data.github}](${data.github})`;
    if (data.github && data.email) {
      readme += ' - ';
    }
    readme += `[${data.email}](mailto://${data.email})`;
    readme += '\n\n';
  }
  readme += renderLicenseSection(data.license);
  return readme;
}

module.exports = generateMarkdown;
