async function getPosts() {
  const res = await fetch("https://www.reddit.com/r/startups.json");

  const data = await res.json();

  return data.data.children;
}

export default async function Dashboard() {
  const posts = await getPosts();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Founder OS</h1>
      <p className="text-gray-600">Opportunity Radar</p>

      <div className="mt-8 space-y-6">
        {posts.slice(0, 10).map((post: any) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}