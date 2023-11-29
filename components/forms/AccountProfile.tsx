"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

// import { userValidaton } from "@/lib/validations/user";
import { UserValidation } from "@/lib/validations/user";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;


// "use client"

// import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// // import { Form } from "../ui/form";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { userValidaton } from "@/lib/validations/user";
// import * as z from "zod"
// import { Button } from "../ui/button";
// import Image from "next/image";
// import { ChangeEvent } from "react";
// import { Textarea } from "../ui/textarea";
// import { useState } from "react";
// import { isBase64Image } from "@/lib/utils";
// import { useUploadThing } from "@/lib/uploadthing"; //beware of this in future
// import { updateUser } from "@/lib/actions/user.actions";
// import { usePathname, useRouter } from "next/navigation";

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

// function AccountProfile({user, btnTitle}:Props) {
//   const [files, setFiles] = useState<File[]>([]);
//   const { startUpload } = useUploadThing('media');
//   const router = useRouter();
//   const pathname = usePathname();

//   const form = useForm({
//     resolver: zodResolver(userValidaton),
//     defaultValues: {
//       profile_photo: user?.image || '',
//       name: user?.name || '',
//       username: user?.username || '',
//       bio: user?.bio || '',
//     }
//   });

//   const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
//     e.preventDefault();
//     const fileReader = new FileReader();

//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];

//       setFiles(Array.from(e.target.files));

//       if (!file.type.includes('image')) return;
      
//       fileReader.onload = async (event) => {
//         const imageDataUrl = event.target?.result?.toString() || '';

//         fieldChange(imageDataUrl);
//       }

//       fileReader.readAsDataURL(file);
//     }
//   }

//   async function onSubmit(values: z.infer<typeof userValidaton>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.

//     const blob = values.profile_photo;

//     const hasImageChanged = isBase64Image(blob);

//     if (hasImageChanged) {
//       const imgRes = await startUpload(files)

//       // if (imgRes && imgRes[0].fileUrl) {
//       //   values.profile_photo = imgRes[0].fileUrl; // this may pose some issues
//       // }
//       if (imgRes && imgRes[0].url) {
//         values.profile_photo = imgRes[0].url; // this may pose some issues
//       }
//     }

//     // Now we are ready to submit all our data to the backend
//     // we can do that by calling the back end function to update the user profile
//     await updateUser({
//       userId: user.id,
//       username: values.username,
//       name: values.name,
//       bio: values.bio,
//       image: values.profile_photo,
//       path: pathname
//     })

//     if (pathname === 'profile/edit') {
//       router.back();
//     } else {
//       router.push('/')
//     }
//     console.log(values)

//   }

//   return (
//     <Form {...form}>
//       <form 
//       onSubmit={form.handleSubmit(onSubmit)} 
//       className="flex flex-col justify-start gap-10"
//       >
//         <FormField
//           control={form.control}
//           name="profile_photo"
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-4">
              
//               <FormLabel className="account-form_image-label">
//                 {field.value ? (
//                   <Image 
//                   src={field.value}
//                   alt="profile photo"
//                   width={96}
//                   height={96}
//                   priority
//                   className="rounded-full object-contain"
//                   />
//                 ) : (
//                   <Image 
//                   src={`/assets/profile.svg`}
//                   alt="profile photo"
//                   width={24}
//                   height={24}
//                   className="object-contain"
//                   />
//                 )}
//               </FormLabel>

//               <FormControl className="flex-1 text-base-semibold text-gray-200">
//                 <Input 
//                 type="file"
//                 accept="image/*"
//                 placeholder="Upload a photo"
//                 className="account-form_image-input"
//                 onChange={(e) => handleImage(e, field.onChange)}
//                 />
//               </FormControl>
              
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-3 w-full">
              
//               <FormLabel className="text-base-semibold text-light-2">
//                 Name
//               </FormLabel>

//               <FormControl className="">
//                 <Input 
//                 type="text"
//                 placeholder="Your name"
//                 className="account-form_input no-focus "
//                 {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-3 w-full">
              
//               <FormLabel className="text-base-semibold text-light-2">
//                 Username
//               </FormLabel>

//               <FormControl className="">
//                 <Input 
//                 type="text"
//                 placeholder="Your name"
//                 className="account-form_input no-focus "
//                 {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-3 w-full">
              
//               <FormLabel className="text-base-semibold text-light-2">
//                 Your Bio
//               </FormLabel>

//               <FormControl className="">
//                 <Textarea 
//                 rows={3}

//                 placeholder="Your name"
//                 className="account-form_input no-focus "
//                 {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="bg-primary-500">Submit</Button>
//       </form>
//     </Form>
//   )
// }

// export default AccountProfile