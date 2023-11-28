import { UserButton, currentUser } from "@clerk/nextjs";

import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";

 
export default async function Home() {

  const user = await currentUser();
  const result = await fetchPosts(1, 30);

  // console.log(result);
  return (
    <>
      {/* <UserButton afterSignOutUrl="/"/> */}
      <h1 className="head-text text-left">Threads</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Post Found</p>
        ) : (
          <>
          {result.posts.map((post) => (
            <ThreadCard 
            key={post.id}
            id={post.id}
            currentUserId={user?.id || ''}
            parentId={post.parentId}
            content={post.text}
            author={post.author}
            community={post.community}
            createdAt={post.createdAt}
            comments={post.children}
            />
          ))}
          </>
        )}
      </section>
    </>
  )
}