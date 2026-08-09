import AllPosts from "@/components/AllPosts";
// import { cookies, headers } from "next/headers";

const getApiData = async () => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
            // cache: "no-store", // ye page ko dynamic page banata hai.
            // next: { revalidate: 0 }, // ye page ko dynamic page banata hai.
        });
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { status: true, data }
    }catch(error){
        return { status: false, message: error.message }
    }
}

// by default this page is a static page. if you want to make it dynamic then do this.
// export const dynamic = 'force-dynamic'; // ye page ko dynamic page banata hai.

// agar mai PostsPage({searchParams}) use karta hu to ye bhi page ko dynamic page bana sakta hai.
const PostsPage = async () => {
    console.log('App router - server side data fetching (at build time (SSG)) - server component - static page');
    const data = await getApiData();
    // const cookieStore = await cookies(); // ye page ko dynamic page banata hai.
    // return <h1>{cookieStore.get("theme")?.value}</h1>;
    // const headerStore = await headers(); // ye page ko dynamic page banata hai.
    // return <h1>{headerStore.get("user-agent")}</h1>;
    return (
        <section>
            <h1>App router - server side data fetching (at build time (SSG)) - server component - static page</h1>
            <AllPosts post={data} />
        </section>
    )
}

export default PostsPage;