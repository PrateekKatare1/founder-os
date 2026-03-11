import { detectProblem } from "../../libs/ai";

async function getPosts() {
  const res = await fetch("https://www.reddit.com/r/startups.json");

  const data = await res.json();

  return data.data.children;
}

export default async function Dashboard() {
  const posts = await getPosts();

  const analyzedPosts = await Promise.all(
    posts.slice(0, 10).map(async (post: any) => {
      const title = post.data.title ?? "";
      const body = post.data.selftext ?? "";
      const text = body ? `${title}\n\n${body}` : title;

      const signal = await detectProblem(text);

      return { post, signal };
    })
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">DurovOS</h1>
      <p className="text-gray-600">Opportunity Radar</p>

      <div className="mt-8 space-y-6">
        {analyzedPosts.map(({ post, signal }: any) => (
          <div
            key={post.data.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="font-semibold">
              {post.data.title}
            </h2>

            <p className="text-sm text-gray-500">
              ↑ {post.data.ups} upvotes
            </p>

            <p className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Signal: {signal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}