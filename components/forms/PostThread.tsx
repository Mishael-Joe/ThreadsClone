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
import { Textarea } from "@/components/ui/textarea";

// import { ThreadValidaton } from "@/lib/validations/thread";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;





// "use client"

// import * as z from "zod"
// import { useForm } from "react-hook-form";
// import { Button } from "../ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"

// import { Textarea } from "../ui/textarea";
// import { zodResolver } from '@hookform/resolvers/zod';

// import { usePathname, useRouter } from "next/navigation";

// // import { updateUser } from "@/lib/actions/user.actions";
// import { ThreadValidaton } from "@/lib/validations/thread";
// import { createThread } from "@/lib/actions/thread.actions";

// interface Props {
//     user: {
//         id: string;
//         objectId: string;
//         username: string;
//         name: string;
//         bio: string;
//         image: string;
//     }
//     btnTitle: string;
// }


  
  

// function PostThread({ userId }: { userId:string }) {
//     const router = useRouter();
//     const pathname = usePathname();

//     const form = useForm({
//         resolver: zodResolver(ThreadValidaton),
//         defaultValues: {
//             thread: '',
//             accountId: userId,
//         }
//     });

//     const onSubmit = async (values: z.infer<typeof ThreadValidaton>) => {
//         await createThread({
//             text: values.thread,
//             author: userId,
//             communityId: null,
//             path: pathname,
//         })

//         router.push('/');
//     }

//     return (
//         <Form {...form}>
//             <form 
//             onSubmit={form.handleSubmit(onSubmit)} 
//             className="flex flex-col justify-start gap-10"
//             >

//             <FormField
//             control={form.control}
//             name="thread"
//             render={({ field }) => (
//                 <FormItem className="flex flex-col gap-3 w-full">
                
//                 <FormLabel className="mt-10 text-base-semibold text-light-2">
//                     Content
//                 </FormLabel>

//                 <FormControl className="mt-10 no-focus border border-dark-4 bg-dark-3 text-light-1">
//                     <Textarea 
//                     rows={15}
//                     {...field}
//                     />
//                 </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )}
//             />
//             <Button type="submit" className="bg-primary-500">
//                 Post Thread
//             </Button>
//             </form>
//         </Form>
//     )
// }

// export default PostThread;