import { useEffect, useState } from "react";
import { User, Query } from "./types";
import { fetchData } from "./utills/fetch";

// components
import ListUsers from "./components/listUsers";

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function App() {
  const [query, setQuery] = useState<Query>({
    value: "",
    username: "",
  });
  const [users, setUsers] = useState<User>({
    status: 0,
    data: { total_count: 0, items: [] },
  });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchUsers = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetchData("GET", `/search/users?q=${query.value}`);
    if (response.success) {
      console.log("response==>", response.data);
      setIsLoading(false);
      setUsers(
        response.data ?? { status: 0, data: { total_count: 0, items: [] } }
      );
    } else {
      console.log("response==>", response.data);

      setIsLoading(false);
      setUsers({
        status: 404,
        data: { total_count: 0, items: [] },
      });
    }
    const username = localStorage.getItem("username") || "";
    setQuery({ ...query, username });
  };
  const handlelocalStorage = (): void => {
    localStorage.setItem("username", query.value);
  };

  useEffect(() => {
    handlelocalStorage();
  }, [query.value]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <form onSubmit={(e) => searchUsers(e)}>
          <input
            type="text"
            placeholder="Enter username"
            value={query.value}
            onChange={(e) => setQuery({ ...query, value: e.target.value })}
            className="w-full bg-gray-200 border border-gray-300 p-2 rounded mb-4"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
            Search
          </button>
        </form>
        {/* User list */}
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl mt-5" />
          </div>
        ) : (
          <div className="space-y-2">
            {users.status === 0 && ""}
            {users.data.total_count > 0 && (
              <>
                <p className="text-gray-600">
                  Showing users for "{query.username}"
                </p>
                {users.data.items
                  .filter((_, index) => index < 5)
                  .map((user) => (
                    <ListUsers
                      key={user.id}
                      user={user}
                      isExpanded={expandedId === user.id}
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === user.id ? null : user.id
                        )
                      }
                    />
                  ))}
              </>
            )}
            {users.status === 200 && users.data.total_count === 0 && (
              <>
                <p className="text-gray-600">
                  Showing users for "{query.username}"
                </p>
                <div className="w-full flex justify-center items-center">
                  <p className="text-black">No users found</p>
                </div>
              </>
            )}
            {users.status === 404 && (
              <>
                <p className="text-gray-600">
                  Showing users for "{query.username}"
                </p>
                <div className="w-full flex justify-center items-center">
                  <p className="text-black">No users found</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
