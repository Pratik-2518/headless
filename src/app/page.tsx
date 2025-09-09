// app/page.tsx

type WPPost = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export default async function Home() {
  // Fetch posts from WordPress REST API
  const res = await fetch("http://localhost/headless/wp-json/wp/v2/posts", {
    cache: "no-store", // prevents caching (like getServerSideProps)
  });
  const posts: WPPost[] = await res.json();

  return (
    <main style={{ padding: "20px" }}>
      <h1>My WordPress Blog (Headless)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
