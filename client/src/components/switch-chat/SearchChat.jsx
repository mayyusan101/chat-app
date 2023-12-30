// import "./sidebar-header.css";

export const SearchChat = () => {
  return (
    <div className="search__chat">
      <form action="#" className="search__chat__form">
        <input type="text" />
        <div className="search__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </form>
    </div>
  );
};
