import AuthCheck from "../components/AuthCheck";
import { firestore, auth, serverTimestamp } from "../libs/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PoweredBy from "../components/poweredby";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug);
  const [post] = useDocumentDataOnce(postRef);
  console.log(post);
  return (
    <main className='h-[calc(100vh-107px)]  md:w-[800px] md:mx-auto flex flex-col justify-between'>
      {post && (
        <>
          <div className='mt-5 ml-4'>
            <Link href='../posts'>
              <button className='flex font-CircularMedium bg-gray-200 rounded-full mt-2 py-2 w-32 mx-2 md:max-w-xs '>
                <AiOutlineArrowLeft className='text-lg mt-0.5 mr-5 ml-4' />
                Posts
              </button>
            </Link>
          </div>

          <section className='mt-4 mx-6'>
            <h1 className='font-CircularMedium font-bold text-3xl'>
              {post.title}
            </h1>
            <Link href={`/${post.username}/${post.slug}`}>
              <h4 className='mt-2 mb-2 font-CircularMedium text-sm hover:text-orange-600 cursor-pointer'>
                https://getme.pizza/{post.username}/{post.slug}
              </h4>
            </Link>
            <PostForm postRef={postRef} defaultValues={post} />
          </section>
        </>
      )}
      <PoweredBy />
    </main>
  );
}

function PostForm({ defaultValues, postRef }) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const updatePost = async (values) => {
    console.log(values);
    const context = values.context;
    const published = values.published;

    await postRef.update({
      context,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ context, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form
      className='   flex flex-col justify-between'
      onSubmit={handleSubmit(updatePost)}
    >
      <textarea
        className='flex-1 w-full px-4 rounded-xl'
        rows={22}
        placeholder={defaultValues.context}
        ref={register}
        {...register("context", {
          required: true,
          minLength: 20,
          maxLength: 128,
        })}
      />
      <div className='flex-2 mt-4 '>
        <div className='flex justify-between'>
          <button
            type='submit'
            className='py-2 px-4 font-CircularMedium bg-yellow-400 rounded-full md:max-w-xs'
          >
            Save Changes
          </button>
          <fieldset>
            <input
              id='published'
              className='peer  px-4 py-4 mt-1 rounded-full text-green-600 focus:ring-slate-50'
              type='checkbox'
              ref={register}
              {...register("published", {
                required: false,
              })}
            />
            <label className=' font-CircularMedium mx-3 align-middle hidden peer-checked:inline'>
              Live
            </label>
            <div className='inline font-CircularMedium mx-2 align-middle peer-checked:hidden'>
              Draft
            </div>
          </fieldset>
        </div>
      </div>
    </form>
  );
}
