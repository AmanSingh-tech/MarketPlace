const Button = ({ type, handleClick, text }) => {
    return (
        <button
            onClick={handleClick}
            className={type == 'light' ? "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition" :
                "px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"}>
            {text}
        </button>
    )
}

export default Button;
