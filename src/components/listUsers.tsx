import { useState } from "react";
import { User, Repo } from "../types";
import { fetchData } from "../utills/fetch";

// icons
import { IoIosArrowUp, IoIosArrowDown, IoIosStar } from "react-icons/io";

export default function ListUsers({
  user,
}: {
  user: User;
}) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedUser, setSelectedUser] = useState<boolean>(false);

   const fetchRepos = async (username: string) => {
    const response = await fetchData("GET", `/users/${username}/repos`);
    if (response.success) {
      setRepos(response.data?.data);
    }
  };
  return (
    <>
      <div
        key={user.id}
        onClick={() => {
          fetchRepos(user?.login);
          setSelectedUser(!selectedUser);
        }}
        className="w-full flex  justify-between p-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
      >
        <p>{user.login}</p>
        {selectedUser ? (
          <IoIosArrowUp className="self-center" />
        ) : (
          <IoIosArrowDown className="self-center" />
        )}
      </div>
      {selectedUser && (
        <div className="space-y-2">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="rounded p-2 bg-gray-300 flex justify-between ml-5"
            >
              <div>
                <p className="font-semibold">{repo.name}</p>
                <p className="text-sm text-gray-600">
                  {repo.description || "No description"}
                </p>
              </div>
              <div className="flex items-center">
                <span className="mr-1">{repo.stargazers_count}</span>
                <IoIosStar className="self-center" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
