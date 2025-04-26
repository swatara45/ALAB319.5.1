# ALAB319.5.1

# Objectives
Refactor an application built with the MongoDB Node driver to use Mongoose.
Submission
Submit your completed lab using the Start Assignment button on the assignment page in Canvas.
Your submission should include:
A link to the GitHub repository for your project.
Instructions
You will begin with the example grades application that was explored during the lessons.
If you have already created a working local copy of that application, wonderful! Continue with that as the starting point for this assignment. You may use a copy of the completed application from ALAB 319.4.1 as well.
Otherwise, download the final example CodeSandbox using the top-left menu.
Once downloaded, rename the directory to an appropriate project name.
Run git init to establish a git repository within the directory.
Run npm install to install the application dependencies.
Add your own environment variables to enable connection to your database.
Test the application by running nodemon index.js and navigating to localhost:3000.
Throughout the assignment, commit frequently to your Git repository.

Part 1: Exploring Existing Operations
Take a few minutes to explore the existing code again. Make sure you are familiar with the structure and functionality of what you will be working with. Whenever you are given somebody else's code to work on, it is important to take the appropriate time to understand it before attempting modifications and improvements.

Part 2: Refactoring to Mongoose
Your task is to completely remove the MongoDB driver from the application, and instead, use Mongoose for all database interactions.
Remember, you are refactoring this code. You may add additional features along the way, but the application should still work as it originally did when you are finished.
During your process, think about what you should change first. You do not need to delete the MongoDB driver code immediately! Use it as a reference and code alongside it in order to ensure you have everything in place. Once you have successfully created working Mongoose code, you can begin removing the old code.

Part 3: Testing
Test your application! Make sure that everything works as expected.
If code does not work, leave comments for yourself explaining potential next steps, so you can revisit the application in the future and approach the problem again from a new perspective.
If code prevents the application from running, comment it out before submission.

Part 4: Completion
Upload your project to a GitHub repository, and submit it according to the submission instructions at the beginning of this document.
