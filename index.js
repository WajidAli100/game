import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => new Promise((res, rej) => setTimeout(res, 4000));
async function welcome() {
    const chalkTitle = chalkAnimation.pulse("Lets Start the Game.:");
    await sleep();
    chalkTitle.stop();
}
//welcome();
let PlayerLife = 3;
async function askQuestion() {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    do {
        console.log(`Player life left ${PlayerLife}`);
        PlayerLife--;
        var que = await inquirer
            .prompt([
            {
                type: "number",
                name: "user_name",
                message: "Select any number between 1-10",
                // validate: (answer: number)=>{
                //     if(isNaN(answer)){
                //         return chalk.red("please enter a valide number");
                //     }
                //     return true;
                // }
            }
        ]);
        if (que.user_name === randomNumber) {
            console.log(chalk.yellow(`Congratulations! you guess the right number ${randomNumber}`));
        }
        else if (que.user_name < randomNumber) {
            console.log(chalk.red(`your number ${que.user_name} is less than guess number`));
        }
        else if (que.user_name > randomNumber) {
            console.log(chalk.red(`your number ${que.user_name} is greater than guess number`));
        }
    } while (PlayerLife > 0 && randomNumber !== que.user_name);
    if (PlayerLife == 0 && randomNumber !== que.user_name) {
        console.log(chalk.redBright("Your Game is Over!"));
    }
}
async function startAgain() {
    do {
        console.clear();
        await welcome();
        PlayerLife = 3;
        await askQuestion();
        var restart = await inquirer.prompt([
            {
                type: "input",
                name: "start_again",
                message: "Do You want to start the Game again? press Y or N"
            }
        ]);
    } while (restart.start_again === 'y');
}
startAgain();
