// DOM
let form = document.querySelector(".search-box");
let searchInput = document.querySelector(".search_input");
let repoList = document.querySelector(".left-repos");
let usernameUI = document.querySelector(".left-header_username");

// Events
form.addEventListener("submit", handelSearsh);

// functions
function handelSearsh(e) {
  e.preventDefault();
  repoList.innerHTML = "";
  let userSearch = searchInput.value;
  if (userSearch) {
    getRepos(userSearch);
    searchInput.value = "";
  } else alert("Please enter a username");
}

function getRepos(user) {
  let url = `https://api.github.com/users/${user}/repos`;
  fetch(url)
    .then((res) => res.json())
    .then((Data) => {
      // console.log(Data);
      displayRepos(Data);
    })
    .catch((error) => console.error(error));
}

function displayRepos(repos) {
  // console.log("repos[0].owner : ", repos[0].owner.login);
  usernameUI.innerHTML = `Github : <a href="${repos[0].owner.html_url}" target="_blanck" >${repos[0].owner.login}</a>`;
  repos.map((repo) => {
    repoList.innerHTML += `
      <a href="${repo.html_url}" class="left-repos-repo">
        <div class="infos">
          <div class="infos-header">
            <span class="infos-repo_name">${repo.name}</span>
            <span class="infos-repo_visibility">${repo.visibility}</span>
          </div>
          <div>
            <span class="infos-repo_point"></span>
            <span class="infos-repo_lang">${
              repo.language ? repo.language : "ReadME"
            }</span>
          </div>
        </div>
        <div class="status">
          <div class="right-repo_star">
            <span>${repo.stargazers_count}</span>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
      </a>
    `;
  });
}
