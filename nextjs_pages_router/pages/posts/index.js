import AllPosts from "@/components/AllPosts";

export const getStaticProps = async () => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { props: { data: { status: true, data } } }
    }catch(error){
        return { props: { data: { status: false, message: error.message } } }
    }
}

const PostsPage = ({data}) => {
    console.log('Pages router - server side data fetching (at build time (SSG)) - client component - static page');
    return (
        <section>
            <h1>Pages router - server side data fetching (at build time (SSG)) - client component - static page</h1>
            <AllPosts post={data} />
        </section>
    )
}

export default PostsPage;