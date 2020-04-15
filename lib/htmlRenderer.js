const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager)).join("")
  );
  // Close Row and Col for Manager
  html.push("</div>");
  html.push("</div>");

  // Add Line to break up employee type
  html.push("<hr>")

  // Add New Row and Col for Engineers
  html.push("<div class='row'>");

  // Enginner Title
  html.push("<div class='col-1'>");
  html.push("<h2 class='employee-title'>Engineers</h2>");
  html.push("</div>");

  // Engineer Cards
  html.push("<div class='team-area col-11 d-flex flex-wrap engineer'>");
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer)).join("")
  );
  // Close Row and Col for Engineer
  html.push("</div>");
  html.push("</div>");

  // Add Line to break up employee type
  html.push("<hr>")

  // Add New Row and Col for Interns
  html.push("<div class='row'>");

  // Intern Title
  html.push("<div class='col-1'>");
  html.push("<h2 class='employee-title'>Interns</h2>");
  html.push("</div>");

  // Intern Cards
  html.push("<div class='team-area col-11 d-flex flex-wrap intern'>");
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern)).join("")
  );
  // Row and Col already closed for Interns
  console.log(html);
  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
