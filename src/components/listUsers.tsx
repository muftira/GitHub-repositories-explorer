import { useState } from "react";
import { Items, Repos } from "../types";
import { fetchData } from "../utills/fetch";

// icons
import { IoIosArrowUp, IoIosArrowDown, IoIosStar } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ListUsers({
  user,
  onClick,
  isExpanded,
}: {
  user: Items;
  onClick: () => void;
  isExpanded: boolean;
}) {
  const [repos, setRepos] = useState<Repos>({
    status: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRepos = async (username: string): Promise<void> => {
    setIsLoading(true);
    const response = await fetchData("GET", `/users/${username}/repos`);
    if (response.success) {
      console.log("response==>", response.data);

      setIsLoading(false);
      setRepos(response.data ?? { status: 0, data: [] });
      onClick();
    }
  };
  return (
    <>
      <div
        key={user.id}
        onClick={() => {
          fetchRepos(user?.login);
        }}
        className="w-full flex  justify-between p-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
      >
        <p>{user.login}</p>
        {isExpanded ? (
          <IoIosArrowUp className="self-center" />
        ) : (
          <IoIosArrowDown className="self-center" />
        )}
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
        </div>
      )}
      {repos.status === 0 && ""}
      {repos.status === 200 && (
        <>
          {isExpanded && (
            <div className="space-y-2">
              {repos.data.map((repo) => (
                <div
                  key={repo.id}
                  className="rounded p-2 bg-gray-300 flex flex-col justify-center ml-5 cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://github.com/${user.login}/${repo.name}`,
                      "_blank"
                    )
                  }
                >
                  <div className="w-full flex justify-between">
                    <p className="font-semibold">{repo.name}</p>
                    <div className="flex items-center">
                      <span className="mr-1">{repo.stargazers_count}</span>
                      <IoIosStar className="self-center" />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    {repo.description || "No description"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {repos.status === 200 && repos.data.length === 0 && (
        <>
          <div className="w-full flex justify-center items-center">
            <p className="text-black">No repos found</p>
          </div>
        </>
      )}
    </>
  );
}
