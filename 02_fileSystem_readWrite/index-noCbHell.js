// CONTROLLING FS OPERATION ORDER WITHOUT NESTED CALLBACKS
const fsPromises = require("fs").promises;
const path = require("path");

// We can put all of our operations inside an async function
// and try/catch block to cause them to execute in the desired order:
const fileOps = async () => {
	try {
		//* Read starter.txt,save content to variable called data, log data.
		const data = await fsPromises.readFile(
			path.join(__dirname, "files", "starter.txt"), "utf8");
		console.log(data);

		//* Delete original starter.txt file
		await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

		//* Write saved content to a new file called promiseWrite.txt
		await fsPromises.writeFile(
			path.join(__dirname, "files", "promiseWrite.txt"), data);

		//* Append additional content to promiseWrite.txt
		await fsPromises.appendFile(
			path.join(__dirname, "files", "promiseWrite.txt"), "\n\nNice to meet you.");

		//* Rename promiseWrite.txt to promiseComplete.txt
		await fsPromises.rename(
			path.join(__dirname, "files", "promiseWrite.txt"),
			path.join(__dirname, "files", "promiseComplete.txt")
		);

		//* Read new data from promiseComplete.txt, save it to a variable called newData, and log the data.
		const newData = await fsPromises.readFile(
			path.join(__dirname, "files", "promiseComplete.txt"), "utf8");
		console.log(newData);
	} catch (err) {
		// Log uncaught errors and immediately end process when uncaught exception occurs:
		process.on("uncaughtException", (err) => {
			console.error(`There was an uncaught error: ${err}`);
			process.exit(1);
		});
	}


};

fileOps();
