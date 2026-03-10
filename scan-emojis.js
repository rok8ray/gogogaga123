const fs = require("fs");
const path = require("path");

const emojiDir = path.join(__dirname, "assets", "emojis");
const outputFile = path.join(__dirname, "assets", "emojis.json");

function scan() {
    try {
        if (!fs.existsSync(emojiDir)) {
            console.error("Emoji directory not found!");
            return;
        }

        const files = fs.readdirSync(emojiDir);

        // Get unique filenames without extensions
        const emojiNames = [
            ...new Set(
                files
                    .filter((file) => /\.(png|gif)$/i.test(file)) // Only png/gif
                    .map((file) => path.parse(file).name), // Get just the "name"
            ),
        ];

        fs.writeFileSync(outputFile, JSON.stringify(emojiNames, null, 2));
        console.log(`Scanned ${emojiNames.length} emojis into emojis.json`);
    } catch (err) {
        console.error("Error scanning emojis:", err);
    }
}

// Run once immediately
scan();

// Optional: Watch the folder for changes while the server is running
fs.watch(emojiDir, (eventType) => {
    if (eventType === "rename") {
        console.log("Changes detected in emojis folder. Rescanning...");
        scan();
    }
});
