const form = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  searchUsers(searchValue);
});

async function searchUsers(searchValue) {
  const url = `https://api.github.com/search/users?q=${searchValue}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayUsers(data.items);
  } catch (err) {
    console.log(err);
  }
}

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src='${user.avatar_url}' alt='${user.login}' />
      <h4>${user.login}</h4>
      <button class='repos-btn' data-repos_url='${user.repos_url}'>Show Repos</button>
    `;
    userList.appendChild(li);
  });

  const reposBtns = document.querySelectorAll('.repos-btn');
  reposBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reposUrl = btn.getAttribute('data-repos_url');
      displayRepos(reposUrl);
    });
  });
}

async function displayRepos(reposUrl) {
  try {
    const res = await fetch(reposUrl);
    const repos = await res.json();
    displayRepoList(repos);
  } catch (err) {
    console.log(err);
  }
}

function displayRepoList(repos) {
  reposList.innerHTML = '';
  repos.forEach((repo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
    `;
    reposList.appendChild(li);
  });
}






































































// // Define variables for the search form and search results container
// const searchForm = document.getElementById('github-form');
// const searchResults = document.getElementById('search-results');

// // Attach an event listener to the search form
// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault(); // prevent form submission

//   // Get the search query from the form input
//   const query = document.getElementById('search-query').value.trim();

//   // Make an API request to search for users with the query
//   fetch(`https://api.github.com/search/users?q=${query}`)
//     .then(response => response.json())
//     .then(data => {
//       // Clear the previous search results
//       searchResults.innerHTML = '';

//       // Iterate over the search results and display each user's repositories
//       data.items.forEach(user => {
//         // Create a new element to display the user's repositories
//         const userElement = document.createElement('div');
//         userElement.classList.add('user');
//         userElement.innerHTML = `<h2>${user.login}</h2><ul></ul>`;
//         const repoList = userElement.querySelector('ul');

//         // Make an API request to get the user's repositories
//         fetch(`https://api.github.com/users/${user.login}/repos`)
//           .then(response => response.json())
//           .then(data => {
//             // Iterate over the user's repositories and add them to the list
//             data.forEach(repo => {
//               const repoElement = document.createElement('li');
//               repoElement.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`;
//               repoList.appendChild(repoElement);
//             });
//           });

//         // Add the user's repositories to the search results container
//         searchResults.appendChild(userElement);
//       });
//     });
// });
