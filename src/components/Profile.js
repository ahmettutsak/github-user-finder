import Image from "next/image";
import { gitDesc } from "@/lib/Octokit";
import Link from "next/link";

async function getProfile(name) {
  const desc = await gitDesc(name);
  return desc;
}

const Stats = ({ data }) => {
  return (
    <>
      <div
        className={`p-4 ml-6 ${
          data.hireable ? "bg-green-600" : "hidden"
        } rounded text-center`}
      >
        {data.hireable ? "Open to Work" : null}
      </div>
      <div className="flex gap-6 p-4 ml-6">
        <div className="flex flex-col justify-center items-center p-2 rounded border-green-600 border-2">
          <h2>Public Repos</h2>
          <h2>{data.public_repos}</h2>
        </div>
        <div className="flex flex-col justify-center items-center p-2 rounded border-green-600 border-2">
          <h2>Public Gists</h2>
          <h2>{data.public_gists}</h2>
        </div>
        <div className="flex flex-col justify-center items-center p-2 rounded border-green-600 border-2">
          <h2>Followers</h2>
          <h2>{data.followers}</h2>
        </div>
        <div className="flex flex-col justify-center items-center p-2 rounded border-green-600 border-2">
          <h2>Following</h2>
          <h2>{data.following}</h2>
        </div>
      </div>
    </>
  );
};

const Bio = ({ data }) => {
  var tarih = data.created_at;
  var tarihObjesi = new Date(tarih);

  var gun = tarihObjesi.getUTCDate();
  var ay = tarihObjesi.toLocaleString("default", { month: "long" });
  var yil = tarihObjesi.getUTCFullYear();
  var tarih = gun + " " + ay + " " + yil;

  return (
    <div className="flex flex-col ml-6">
      <h2 className="text-3xl p-4 font-bold">{data.name}</h2>
      <h2 className="text-2xl p-4 text-gray-400">{data.bio ? data.bio : ""}</h2>
      <div className="flex items-center gap-2 p-4">
        <h2 className="text-purple-600">Location:</h2>
        <h2>{data.location !== null ? data.location : "undefined"}</h2>
      </div>
      <div className="flex items-center gap-2 p-4">
        <h2 className="text-purple-600">Company:</h2>
        <h2>{data.company !== null ? data.company : "None"}</h2>
      </div>
      <div className="flex items-center gap-2 p-4">
        <h2 className="text-purple-600">Blog/Website:</h2>
        {data.blog !== null ? (
          <Link
            className="hover:text-purple-600 transition-all"
            href={data.blog}
            target="blank"
          >
            {data.blog}
          </Link>
        ) : (
          <h2>None</h2>
        )}
      </div>
      <div className="flex items-center gap-2 p-4">
        <h2 className="text-purple-600">Member Since:</h2>
        <h2>{tarih}</h2>
      </div>
    </div>
  );
};

export default async function Home({ username }) {
  if (username === undefined) {
    return null;
  }
  const data = await getProfile(username);
  return (
    <main className="flex">
      <div className="flex flex-col justify-center items-center gap-12 p-4">
        <Image
          src={data.avatar_url}
          alt={`${data.name} picture`}
          width={300}
          height={300}
          className="rounded-full h-[300px]"
        />
        <Link
          className="bg-green-600 p-4 rounded hover:bg-green-800 transition-colors"
          href={data.html_url}
          target="blank"
        >
          View Profile
        </Link>
      </div>
      <div>
        <Stats data={data} />
        <Bio data={data} />
      </div>
    </main>
  );
}
