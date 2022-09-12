const { Octokit } = require('octokit');
const util = require('util');
const keys = require('./keys');

const args = process.argv;
const repoSource = args[2];
const [owner, repo] = repoSource.split('/');

if (!keys.githubKey) {
  return console.error('Github key not set');
}

if (!repoSource) {
  return console.error('Source repository must be provided');
}

if (!owner || !repo) {
  return console.error(
    "The repository must be in the format '{owner}/{repository}' ",
  );
}

const octokit = new Octokit({
  auth: keys.githubKey,
});

const getProjectsDetails = async () => {
  const { data: projects } = await octokit.rest.projects.listForRepo({
    owner,
    repo,
  });

  const details = await Promise.all(
    projects.map(async (project) => {
      const { data: columns } = await octokit.request(project.columns_url);

      return {
        name: project.name,
        columns: await Promise.all(
          columns.map(async (column) => {
            const { data: cards } = await octokit.request(column.cards_url);

            return {
              name: column.name,
              cards: await Promise.all(
                cards.map(async (card) => {
                  const { data: cardDetails } = await octokit.request(card.url);
                  const { data: issue } = await octokit.request(
                    cardDetails.content_url,
                  );

                  return issue.title;
                }),
              ),
            };
          }),
        ),
      };
    }),
  );
  console.log(util.inspect(details, { depth: null }));
};

try {
  getProjectsDetails();
} catch {
  console.error('There was a problem listing the projects');
}
