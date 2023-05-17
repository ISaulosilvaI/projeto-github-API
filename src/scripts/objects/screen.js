const screen= {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML= `<div class="info">
                             <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                             <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado ☹'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😑'}</p>
                                <ul>
                                    <li>${user.followingUrl}
                                    <strong>Seguindo 👥</strong>
                                    <li>${user.followersUrl}
                                    <strong> Seguidores 👥</strong></li>
                                    </ul>
                           </div>
                        </div>`

        let repositoriesItens= ''
        user.repositories.forEach(repo => repositoriesItens +=
                                            `<a href= "${repo.html_url}" target= "_blank">${repo.name}
                                                <li href="${repo.html_url}" target= "_blank">
                                                    <div class="info-repo">
                                                        <span class="info-repositories">🍴 ${repo.stargazers_count}</span>
                                                        <span class="info-repositories">⭐ ${repo.stargazers_count}</span>
                                                        <span class="info-repositories">👀 ${repo.watchers_count}</span>
                                                        <span class="info-repositories">👨‍💻 ${repo.language ?? ''}</span>
                                                    </div>
                                                </li>
                                             </a>`)
        
        if (user.repositories.length> 0) {
            this.userProfile.innerHTML +=
                                        `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                        </div>`
        }
        let eventsItiens= ''

        user.events.forEach(event =>{
            if (event.type === 'PushEvents'){
                eventsItiens +=
                                `<li class="events-list">
                                    <a href="https://github.com/${event.repo.name}" target= "_blank">
                                        ${event.repo.name}
                                    </a>
                                    <span>- ${event.payload.commits[0].massage ?? ''}</span>
                                </li>`
            }else {
                if (event.type === 'CreateEvent'){
                    eventsItiens +=
                    `<li class="events-list">
                    <a href="https://github.com/${event.repo.name}" target= "_blank">
                        ${event.repo.name}
                    </a>
                    <span>- ${event.payload.description ?? event.type}</span>
                </li>`
                }
            }
        })
        if (user.events.length > 0){
            this.userProfile.innerHTML +=
                                        `<div class="events section">
                                            <h2>Eventos Recentes</h2>
                                            <ul>${eventsItiens}</ul>
                                        </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML= "<h3>Usuário não encontrado</h3>"
    }    
}

export { screen }