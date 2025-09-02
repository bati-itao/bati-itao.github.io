const { check } = require('linkinator');

console.log('Starting link check...');

const pathToCheck = 'docs'; // Change this if your output folder is different

async function runLinkCheck() {
  try {
    const result = await check({
      path: pathToCheck,
      timeout: 10000, // Optional: set a timeout per link to prevent hanging
      linksToSkip: [
        'https://www.canada.ca/etc/designs/canada/cdts/gcweb/rn/cdts/compiled/soyutils.js',
        'https://www.canada.ca/etc/designs/canada/cdts/gcweb/rn/cdts/compiled/wet-en.js',
        'https://forms.office.com/Pages/ResponsePage.aspx*' // Skip Office forms
      ]
    });

    let broken = 0;
    result.links.forEach(link => {
      if (link.state === 'BROKEN') {
        broken++;
        console.log(`BROKEN: ${link.url} on ${link.parent}`);
      }
    });

    console.log(`\nChecked ${result.links.length} links.`);
    if (broken > 0) {
      console.log(`Found ${broken} broken links.`);
      process.exitCode = 1;
    } else {
      console.log('No broken links found!');
    }
  } catch (err) {
    console.error('Error running link check:', err);
    process.exit(1);
  }
}

runLinkCheck();