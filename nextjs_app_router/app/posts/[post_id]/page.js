import SinglePost from "@/components/SinglePost";

// export const dynamicParams = true; // its a by default
// Jo paths build time par generate nahi hue, unhe user request ke time generate
// kiya ja sakta hai (Pages Router ke fallback: 'blocking' ke behavior ke kareeb).

export const dynamicParams = false; // will return 404
// ye Sirf generateStaticParams() se return hue paths valid honge (Pages Router ke fallback: false jaisa).

// generateStaticParams() App Router ka SSG mechanism hai dynamic route segments k liye.
// ye build time pe dynamic route ko static banata hai.
// ye pages router k getStaticPaths ka replacement hai.
export const generateStaticParams = async () => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return data.slice(0,5).map(post => ({post_id:post.id.toString()}));
    }catch(error){
        return [];
    }
}

const getApiData = async (post_id) => {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`,{
            next: {
                // Next.js will invalidate the cache when a request comes in, at most once every 60 seconds.
                revalidate: 60, // 60 sec baad page regenerate hoga // Its Enable ISR
            }
        });
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { status: true, data }
    }catch(error){
        return { status: false, message: error.message }
    }
}

const SinglePostPage = async ({params}) => {
    console.log('App router - server side data fetching (at build time (SSG)) - server component - static page');
    const {post_id} = await params;
    const data = await getApiData(post_id);
    return (
        <section>
            <h1>App router - server side data fetching (at build time (SSG)) - server component - static page</h1>
            <SinglePost post={data} />
        </section>
    )
}

export default SinglePostPage;