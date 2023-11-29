import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

async function ThreadsTab({
    currentUserId,
    accountId,
    accountType,
}: Props) {
    // TODO: Fetch Profile threads
    let result = await fetchUserPosts(accountId);

    if (!result) redirect('/');
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard 
          key={thread.id}
          id={thread.id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === `User`
            ? {name: result.name, image: result.image, id: result.id}
            : {name: thread.author.name, image: thread.author.image, id: thread.author.id}
          } // TODO
          community={thread.community} // TODO
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  )
}

export default ThreadsTab