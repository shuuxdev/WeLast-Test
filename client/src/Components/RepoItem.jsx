import React, { useState } from "react";
export const RepoItem = ({ repo }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [commitDetails, setCommitDetails] = useState(null);
    const handleClick = async () => {

        try {
            const response = await fetch(`https://api.github.com/repos/freeCodeCamp/${repo.name}/commits`);
            const commits = await response.json();
            if (commits.length > 0) {
                const mostRecentCommit = commits[0];
                setShowDetails(true);
                setCommitDetails({
                    date: mostRecentCommit.commit.author.date,
                    author: mostRecentCommit.commit.author.name,
                    message: mostRecentCommit.commit.message
                });
            } else {
                setShowDetails(false);
            }
        } catch (error) {
            console.error('Error fetching commits:', error);
            setShowDetails(false);
        }
    };
    const renderRepoBody = () => {
        return (
            showDetails ? (
                <div>
                    <p className="text-sm text-gray-700 mb-2">Most Recent Commit:</p>
                    <p className="text-sm text-gray-700 mb-2">Date: {commitDetails.date}</p>
                    <p className="text-sm text-gray-700 mb-2">Author: {commitDetails.author}</p>
                    <p className="text-sm text-gray-700 mb-2">Message: {commitDetails.message}</p>
                    <button className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none" onClick={handleCloseDetails}>Close</button>
                </div>

            ) : (
                <div>
                    <h2 className="text-lg font-semibold">{repo.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                    <div className="flex items-center mb-2">
                        <p className="text-sm text-gray-700 mr-2">Language: {repo.language}</p>
                        <p className="text-sm text-gray-700">Forks: {repo.forks}</p>
                    </div>
                </div>
            )
        )
    }
    const handleCloseDetails = (event) => {
        event.stopPropagation();
        setShowDetails(false);
    };

    return (
        <li onClick={handleClick} className="p-4 min-h-[200px] bg-white relative border border-solid border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            {renderRepoBody()}
        </li>
    )
};