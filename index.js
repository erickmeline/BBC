const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Full name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'Email address?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'Github profile?',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Project Title?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Description?',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Installation instructions?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Usage information?',
        name: 'instructions',
    },
    {
        type: 'list',
        message: 'What license modal covers this project?',
        name: 'license',
        choices: ['None', 'Apache 2.0 License', 'The MIT License', 'Mozilla Public License 2.0', 'Unlicense'],
        default: ['None']
    },
    {
        type: 'input',
        message: 'Contribution guidelines?',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'Test instructions?',
        name: 'tests',
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, 'utf8', (err) => {
        if (err) { console.log('error',err) }
    });
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((response) => {
        writeToFile('README.md', generateMarkdown(response));
    });
}

// Function call to initialize app
init();
