export const LanguageButton = ({ language, onClick }) => {


    return (
        <button className=" p-[5px]  bg-yellow-400 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none" onClick={onClick}>
            {language}
        </button>
    )
}