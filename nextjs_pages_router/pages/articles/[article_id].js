import SingleArticle from "@/components/SingleArticle";

export const getServerSideProps = async ({params}) => {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.article_id}`);
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { props: { data: { status: true, data } } }
    }catch(error){
        return { props: { data: { status: false, message: error.message } } }
    }
}

const SingleArticlePage = ({data}) => {
    console.log('Pages router - server side data fetching (on demand (SSR)) - client component - dynamic page');
    return (
        <section>
            <h1>Pages router - server side data fetching (on demand (SSR)) - client component - dynamic page</h1>
            <SingleArticle article={data} />
        </section>
    )
}

export default SingleArticlePage;