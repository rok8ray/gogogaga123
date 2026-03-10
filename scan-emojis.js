const fs = require("fs");
const path = require("path");

// Ensure the paths match your folder structure
const emojiDir = path.join(__dirname, "assets", "emojis");
const outputFile = path.join(__dirname, "assets", "emojis.json");

function scan() {
    // 1. Create directory if it doesn't exist
    if (!fs.existsSync(emojiDir)) {
        fs.mkdirSync(emojiDir, { recursive: true });
        console.log("Created assets/emojis folder.");
    }

    // 2. Read the directory
    try {
        const files = fs.readdirSync(emojiDir);

        // 3. Filter for images and strip extensions
        const emojiNames = [
            ...new Set(
                files
                    .filter((file) => /\.(png|gif|PNG|GIF)$/i.test(file))
                    .map((file) => path.parse(file).name),
            ),
        ];

        // 4. Write the JSON file
        fs.writeFileSync(outputFile, JSON.stringify(emojiNames, null, 2));
        console.log(
            `✅ Successfully scanned ${emojiNames.length} emojis into assets/emojis.json`,
        );
    } catch (err) {
        console.error("Error scanning directory:", err);
    }
}

scan();
