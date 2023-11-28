"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { ThreadValidaton } from "@/lib/validations/thread";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

function Comment({
    threadId,
    currentUserImg,
    currentUserId,
}: Props) {
    const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname,
    );

    form.reset();
  };
  return (
    <Form {...form}>
      <form
        className='comment-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full gap-3'>
              <FormLabel >
                <Image 
                src={currentUserImg}
                alt="Current User"
                width={48}
                height={48}
                className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input 
                type="text" 
                placeholder="Comments..."
                className="no-focus text-light-1 outline-none"
                {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
            Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment