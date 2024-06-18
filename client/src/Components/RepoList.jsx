import React, { useState, useEffect } from 'react';

export const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            const response = await fetch('http://localhost:3000/repos').then(res => res.json())
            console.log(response);
            const repos = response;

            // Sort repositories in reverse chronological order by creation date
            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setRepos(repos);
            setFilteredRepos(repos);

            // Get unique languages
            const uniqueLanguages = [...new Set(repos.map(repo => repo.language))];
            setLanguages(uniqueLanguages);
        };

        fetchRepos();
    }, []);

    const filterByLanguage = (language) => {
        if (language === 'All') {
            setFilteredRepos(repos);
        } else {
            setFilteredRepos(repos.filter(repo => repo.language === language));
        }
    };

    return (
        <div>
            <h1>GitHub Repositories</h1>
            <div>
                <button onClick={() => filterByLanguage('All')}>All</button>
                {languages.map(language => (
                    <button key={language} onClick={() => filterByLanguage(language)}>
                        {language}
                    </button>
                ))}
            </div>
            <ul>
                {filteredRepos.map(repo => (
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
