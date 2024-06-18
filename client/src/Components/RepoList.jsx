import React, { useState, useEffect } from 'react';
import { RepoItem } from './RepoItem.jsx';
import { LanguageButton } from './LanguageButton.jsx';

export const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            const response = await fetch('http://localhost:3000/repos').then(res => res.json())
            const repos = response;
            // Sort repositories in reverse chronological order by creation date
            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setRepos(repos);
            setFilteredRepos(repos);

            // Get unique languages
            const uniqueLanguages = [...new Set(repos.filter(repo => repo.language).map(repo => repo.language))];
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
        <div className='p-6'>
            <div className='flex gap-1 py-3'>
                <LanguageButton language={'All'} onClick={() => filterByLanguage('All')}>All</LanguageButton>
                {languages.map(language => (
                    <LanguageButton key={language} language={language} onClick={() => filterByLanguage(language)} />
                ))}
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredRepos.map(repo => (
                    <RepoItem key={repo.id} repo={repo} />
                ))}
            </ul>
        </div>
    );
};
