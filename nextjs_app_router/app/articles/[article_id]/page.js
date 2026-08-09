import SingleArticle from "@/components/SingleArticle";

const getApiData = async (article_id) => {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${article_id}`);
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { status: true, data }
    }catch(error){
        return { status: false, message: error.message }
    }
}

const SingleArticlePage = async ({params}) => {
    console.log('App router - server side data fetching (on demand (SSR)) - server component - dynamic page');
    const {article_id} = await params;
    const data = await getApiData(article_id);
    return (
        <section>
            <h1>App router - server side data fetching (on demand (SSR)) - server component - dynamic page</h1>
            <SingleArticle article={data} />
        </section>
    )
}

export default SingleArticlePage;