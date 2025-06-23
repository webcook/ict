class GitHub {
  constructor() {
    this.api_url = 'https://api.github.com/users/';
  }

  async userInfo(username) {
    const profileRes = await fetch(`${this.api_url}${username}`);
    if (!profileRes.ok) throw new Error('사용자를 찾을 수 없습니다.');
    const profile = await profileRes.json();

    const reposRes = await fetch(`${this.api_url}${username}/repos?sort=created&per_page=5`);
    const repos = await reposRes.json();

    return { profile, repos };
  }
}

class UI {
  clearUI() {
    document.getElementById('profile1').innerHTML = '';
    document.getElementById('profile2').innerHTML = '';
    document.getElementById('contribution-graph').innerHTML = '';
  }

  showSpinner(show) {
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle('visible', show);
  }

  showProfile(user) {
    const createdDate = new Date(user.created_at).toLocaleDateString();
    const html = `
      <div class="profile-section">
        <img id="userImg" src="${user.avatar_url}" />
        <a href="${user.html_url}" target="_blank" id="userURL">View Profile</a>
        <div class="profile-stats">
          <p>Public Repos: ${user.public_repos}</p>
          <p>Followers: ${user.followers}</p>
          <p>Following: ${user.following}</p>
        </div>
        <ul class="profile-info">
          <li>Company: ${user.company || 'N/A'}</li>
          <li>Blog: <a href="${user.blog}" target="_blank">${user.blog || 'N/A'}</a></li>
          <li>Location: ${user.location || 'N/A'}</li>
          <li>Member Since: ${createdDate}</li>
        </ul>
      </div>
    `;
    document.getElementById('profile1').innerHTML = html;
  }

  showRepos(repos) {
    let html = '<h3>Latest Repos</h3>';
    repos.forEach(repo => {
      html += `
        <div class="repo">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>🌟 Stars: ${repo.stargazers_count} | 👀 Watchers: ${repo.watchers_count} | 🍴 Forks: ${repo.forks_count}</p>
        </div>`;
    });
    document.getElementById('profile2').innerHTML = html;
  }

  showContributionGraph(username) {
    const graphHTML = `
      <img src="https://ghchart.rshah.org/${username}" alt="${username}'s GitHub chart" style="width:100%; max-width: 700px;">
    `;
    document.getElementById('contribution-graph').innerHTML = graphHTML;
  }

  showError(message) {
    this.clearUI();
    document.getElementById('profile1').innerHTML = `<p style="color:red;text-align:center;">${message}</p>`;
  }
}

const github = new GitHub();
const ui = new UI();

document.getElementById('searchbtn').addEventListener('click', async () => {
  const username = document.getElementById('searchuser').value.trim();
  if (!username) {
    alert('GitHub 사용자명을 입력하세요.');
    return;
  }

  ui.clearUI();
  ui.showSpinner(true);

  try {
    const { profile, repos } = await github.userInfo(username);
    ui.showProfile(profile);
    ui.showRepos(repos);
    ui.showContributionGraph(username);
  } catch (err) {
    ui.showError(err.message);
  } finally {
    ui.showSpinner(false);
  }
});

document.getElementById('searchuser').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') document.getElementById('searchbtn').click();
});