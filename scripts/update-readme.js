const fs = require("fs");

const getFormattedPackages = () => {
	const pkgContent = JSON.parse(fs.readFileSync("./package.json"));
	const extensions = pkgContent.extensionPack;

	let output = "";
	extensions.forEach(item => {
		output = output.concat([`* ${item}\n`]);
	});
	return output;
};

const updateReadMe = packages => {
	const readmeArray = fs
		.readFileSync("./README.md")
		.toString()
		.split("\n");
	const searchStringStart = "<!-- EXTENSION_LIST_START -->";
	const searchStringEnd = "<!-- EXTENSION_LIST_END -->";

	const sectionStart = readmeArray.indexOf(searchStringStart);
	const contentBefore = readmeArray.slice(0, sectionStart + 1);

	const sectionEnd = readmeArray.indexOf(searchStringEnd);
	const contentAfter = readmeArray.slice(sectionEnd, readmeArray.length);

	return (
		contentBefore.join("\n") + ("\n") + packages + contentAfter.join("\n")
	);
};

fs.writeFileSync("./README.md", updateReadMe(getFormattedPackages()));
