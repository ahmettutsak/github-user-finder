import { gitRepos } from "@/lib/Octokit";
import Link from "next/link";

async function getRepos(name) {
  const repos = await gitRepos(name);
  return repos;
}

export default async function Repos({ username }) {
  if (username === undefined) {
    return null;
  }
  const data = await getRepos(username);

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-3xl font-bold p-12 mt-4">Repos</h2>
      {data.map((repo) => {
        return (
          <Link href={repo.html_url} target="blank">
            <div className="border-2 border-green-600 flex p-4 rounded justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-center">{repo.name}</h2>
                <h2 className="p-2 bg-purple-600 rounded text-center">
                  {repo.language}
                </h2>
              </div>
              <div className="flex gap-6">
                <div className="bg-green-600 rounded flex flex-col justify-center items-center p-4">
                  <h2>Stars</h2>
                  <h2>{repo.stargazers_count}</h2>
                </div>
                <div className="bg-green-600 rounded flex flex-col justify-center items-center p-4">
                  <h2>Watchers</h2>
                  <h2>{repo.watchers}</h2>
                </div>
                <div className="bg-green-600 rounded flex flex-col justify-center items-center p-4">
                  <h2>Forks</h2>
                  <h2>{repo.forks}</h2>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
