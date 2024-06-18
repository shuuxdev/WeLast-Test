import React, { useState, useEffect } from 'react';

export const RepoList = () => {
    const [repos, setRepos] = useState([]);


    useEffect(() => {
        const fetchRepos = async () => {
            const response = await fetch('http://localhost:3000/repos').then(res => res.json())
            console.log(response);
            const repos = response;

            setRepos(repos)
        };

        fetchRepos();
    }, []);



    return (
        <div>
            <h1>GitHub Repositories</h1>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                        <p>Language: {repo.language}</p>
                        <p>Forks: {repo.forks}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
