function UserProfile() {
  return (
    <div className="bg-gray-100 sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm mx-auto my-10 md:my-20 rounded-lg shadow-lg  hover:shadow-xl">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full mx-auto sm:w-24 sm:h-24 md:w-36 md:h-36 hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="sm:text-lg md:text-xl text-xl text-blue-800 my-4 hover:text-blue-500">
        John Doe
      </h1>
      <p className="sm:text-sm md:text-base  text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
