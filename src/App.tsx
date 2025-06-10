import { useState } from "react";
import { User, Repo } from "./types";
import { fetchData } from "./utills/fetch";

// components
import ListUsers from "./components/listUsers";

export default function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const searchUsers = async () => {
    const response = await fetchData("GET", `/search/users?q=${query}`);
    if (response.success) {
      setUsers(response.data?.data.items);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <input
          type="text"
          placeholder="Enter username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={searchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Search
        </button>

        {/* User list */}
        {users.length > 0 && (
          <div className="space-y-2">
            <p className="text-gray-600">Showing users for "{query}"</p>
            {users
              .filter((_, index) => index < 5)
              .map((user) => (
                <ListUsers
                  user={user}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
