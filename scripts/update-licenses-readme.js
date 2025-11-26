// Dependencies - Vendor.
import { promises as fs } from 'node:fs';

const START_MARKER = '<!-- DEPENDENCY_LICENSES_START -->';
const END_MARKER = '<!-- DEPENDENCY_LICENSES_END -->';

try {
    // Read the generated licenses
    const licensesContent = (await fs.readFile('./licenses.md', 'utf8')).trim();

    // Read the README
    let readmeContent = await fs.readFile('./README.md', 'utf8');

    // Find marker positions
    const startIdx = readmeContent.indexOf(START_MARKER);
    const endIdx = readmeContent.indexOf(END_MARKER);

    if (startIdx === -1 || endIdx === -1) {
        console.error('Error: Markers not found in README.md');
        process.exit(1);
    }

    // Replace content between markers
    const newContent = readmeContent.substring(0, startIdx + START_MARKER.length) + '\n' + licensesContent + '\n' + readmeContent.substring(endIdx);

    // Write updated README
    await fs.writeFile('README.md', newContent);

    console.log('✓ README.md updated with license information');
} catch (error) {
    console.error('Error updating README:', error);
    process.exit(1);
}
