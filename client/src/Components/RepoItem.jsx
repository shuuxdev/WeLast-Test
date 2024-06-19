import React, { useState } from "react";
import { LoadingIcon } from "./LoadingIcon.jsx";
export const RepoItem = ({ repo }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [commitDetails, setCommitDetails] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const handleClick = async () => {
        //Show loading icon whenever user click on the repository
        if (!showDetails)
            setShowLoading(true);

        try {
            //Fetch commit details
            const response = await fetch(`https://api.github.com/repos/freeCodeCamp/${repo.name}/commits`);
            const commits = await response.json();
            if (commits.length > 0) {
                //Display the most recent commits 
                const mostRecentCommit = commits[0];
                setShowDetails(true);
                setCommitDetails({
                    date: mostRecentCommit.commit.author.date,
                    author: mostRecentCommit.commit.author.name,
                    message: mostRecentCommit.commit.message
                });
            } else {
                //Goes back to the reposotory
                setShowDetails(false);
            }
        } catch (error) {
            console.error('Error fetching commits:', error);
            setShowDetails(false);
        } finally {
            //Close loading icon after done with fetching data
            setShowLoading(false);
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
        //Stop the handleClick function from being called
        event.stopPropagation();
        setShowDetails(false);
    };

    return (
        <li onClick={handleClick} className="p-4 min-h-[200px] bg-white relative border border-solid border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            {showLoading ?
                (
                    <div className="w-full h-full flex justify-center items-center">
                        <LoadingIcon />
                    </div>
                ) : renderRepoBody()
            }

        </li>
    )
};