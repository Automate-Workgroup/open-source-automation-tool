import axios from 'axios';

let orgInfo = [];

async function fetchOrgsAndRepos(username) {
  // Fetch organizations based on username
  const orgsResponse = await axios.get(`https://api.github.com/users/${username}/orgs`);
  const orgs = orgsResponse.data;
  console.log("orgs", orgs)

  for (const org of orgs) {
    // Fetch repositories for each organization
    const reposResponse = await axios.get(`https://api.github.com/orgs/${org.login}/repos`);
    const repos = reposResponse.data.map(repo => repo.name);
    console.log("repos", repos)

    // Add the org and its repos to orgInfo
    orgInfo.push({ org_name: org.login, repos, org_id: org.id, logo_url: org.avatar_url });
  }

  return orgInfo;
}

export async function getOrgs() {
  const username = 'Andre-Diamond'; // replace with the username you want to query
  await fetchOrgsAndRepos(username);

  return orgInfo;
}
