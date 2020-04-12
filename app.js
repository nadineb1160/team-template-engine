const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var team = [];

retrieveUserData();

function retrieveUserData() {


    console.log("Please build your team");

    // Inquire about manager
    addManager();


}

function checkString(answer) {

    if (answer !== "" && typeof answer === "string") {
        return true;
    }
    return "Please type in at least one character";

}

function checkNumber(answer) {
    // Match returns if number
    const pass = answer.match(/^[0-9]\d*$/);

    if (pass) {
        return true;
    }
    return "Please type a valid number";
    
}

function checkEmail(answer) {
    // Match to email "john@gmail.com"
    const pass = answer.match(/\S+@\S+\.\S+/);

    if (pass) {
        return true;
    }
    return "Please type a valid email";
}


function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name",
            validate: checkString
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id?",
            validate: checkNumber
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            validate: checkEmail
        },
        {
            type: "input",
            name: "officeNum",
            message: "What is your manager's office number?",
            validate: checkNumber
        },

    ]).then(function (manager) {
        // Create New Manage Instance
        let newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNum);
        // Add Manager to Team
        team.push(newManager);

        addTeamMember();
    })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add? (Use arrow keys)",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then(function (teamMember) {
        if (teamMember.type === "Engineer") {
            addEngineer();
        }
        if (teamMember.type === "Intern") {
            addIntern();
        }
        if (teamMember.type === "I don't want to add any more team members") {
            console.log(team);

            var htmlBlock = render(team);

            fs.writeFile(outputPath, htmlBlock, function (error, data) {

                if (error) {
                    throw error;
                }

                console.log("Completed team roster");

            })
            return;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name",
            validate: checkString
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id?",
            validate: checkNumber
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
            validate: checkEmail
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?",
            validate: checkString
        },
    ]).then(function (engineer) {
        // Create New Engineer Instance
        let newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
        // Add Engineer to Team
        team.push(newEngineer);

        addTeamMember();

    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name",
            validate: checkString
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?",
            validate: checkNumber
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?",
            validate: checkEmail
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?",
            validate: checkString
        },
    ]).then(function (intern) {
        // Create New Intern Instance
        let newIntern = new Intern(intern.name, intern.id, intern.email, intern.school);
        // Add Intern to Team
        team.push(newIntern);

        addTeamMember();

    })
}




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
