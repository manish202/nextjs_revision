import { useRouter } from "next/router";
import SinglePost from "@/components/SinglePost";

export const getStaticPaths = async () => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        const paths = data.slice(0,5).map((obj) => {
            return {
                params: { post_id: obj.id.toString() }
            }
        });
        return {
            paths,
            fallback: false, // will return 404
            // fallback: true, // will show loading and fetch data
            // fallback: 'blocking' // will reload and fetch data no loading.
        }
    }catch(error){
        return { paths: [], fallback: false }
    }
}

export const getStaticProps = async ({params}) => {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.post_id}`);
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return {
            props: { data: { status: true, data } },
            // Next.js will invalidate the cache when a request comes in, at most once every 60 seconds.
            // revalidate: 60, // 60 sec baad page regenerate hoga // Its Enable ISR
        }
    }catch(error){
        return { props: { data: { status: false, message: error.message } } }
    }
}

const SinglePostPage = ({data}) => {
    console.log('Pages router - server side data fetching (at build time (SSG)) - client component - static page');
    const router = useRouter();
    if(router.isFallback) return <h1>Loading...</h1>;
    return (
        <section>
            <h1>Pages router - server side data fetching (at build time (SSG)) - client component - static page</h1>
            <SinglePost post={data} />
        </section>
    )
}

export default SinglePostPage;