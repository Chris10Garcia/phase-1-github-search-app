const GIT_API = "https://api.github.com/"
const SEARCH_API = "search/users?q="
const HEADER = {"Accept" : "application/vnd.github.v3+json"}
// users/octocat/repos
// , "Content" : "application/json"
// octocat
// gitSearchUser("octocat")


function gitSearchUser(text){

    fetch(`${GIT_API}${SEARCH_API}${text}`, {
        method: "GET",
        headers: HEADER  
    })
        .then(resp => resp.json())
        .then(data => buildSearchResult(data.items)
        )
        
// testing stuff 
//     fetch('http://localhost:3000/items')
//         .then(res => res.json())
//         .then(data => buildSearchResult(data))
// }
}

// builds HTML elements with search result data
function buildSearchResult(array){

    const ulUserList = document.getElementById('user-list')
    ulUserList.innerHTML = ''
    const ulRepoList = document.getElementById('repos-list')
    ulRepoList.innerHTML =''

    array.forEach(obj => {
        const button = document.createElement('button')
        button.innerText = obj.login
        button.dataset.userName = obj.login
        
        button.style.border = '2px solid black'
        button.style.margin = '5'
        
        button.addEventListener('click', gitUserRepo)

        const li = document.createElement('li')
        li.innerText = obj.url

        const img = document.createElement('img')
        img.setAttribute('src', obj.avatar_url)
        img.setAttribute('width', 150)
        img.setAttribute('height', 150)

        const div = document.createElement( 'div')
        div.append(button, li, img)
        div.className ='divBox'
        div.style.border = '1px solid black'
        div.style.margin = '10px'

        ulUserList.append (div)
    });
}

function buildRepoResults(array){
    
    const ulRepoList = document.getElementById('repos-list')
    ulRepoList.innerHTML =''

    const h2 = document.createElement('h2')
    h2.innerText = `GitHub User:  ${array[0].owner.login}`

    ulRepoList.append(h2)

    array.forEach(obj => {
        const h2 = document.createElement('h2')

        const h3 = document.createElement('h3')
        h3.innerText = `Repo Name: ${obj.name}`

        const p1 = document.createElement('p')
        p1.innerText = `Description: ${obj.description}`
        
        const p2 = document.createElement('p')
        p2.innerText = `URL to Repo: ${obj.html_url}`

        const div = document.createElement('div')
        div.append(h3, p1, p2)
        div.id = obj.owner.login

        ulRepoList.append (div)
    });
    
    ulRepoList.scrollIntoView({behavior: "smooth"})

}

function gitUserRepo(e){
    const searchName = e.target.dataset.userName

    fetch(`${GIT_API}users/${searchName}/repos`, {
        method: "GET",
        headers: HEADER  
    })
        .then(resp => resp.json())
        .then(data => buildRepoResults(data)
        )
        
    // testing stuff 
    // fetch('http://localhost:4000/repos')
    // .then(res => res.json())
    // .then(data => buildRepoResults(data))

}


// handles submiting search after DOM loads
document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('github-form').addEventListener('submit', e => {
        e.preventDefault()
        gitSearchUser(e.target[0].value)
    })
})