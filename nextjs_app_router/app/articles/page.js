import AllArticles from "@/components/AllArticles";

const getApiData = async () => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { status: true, data }
    }catch(error){
        return { status: false, message: error.message }
    }
}

// by default this page is a static page. if you want to make it dynamic then do this.
// export const dynamic = 'force-dynamic';

const ArticlesPage = async () => {
    console.log('App router - server side data fetching (at build time (SSG)) - server component - static page');
    const data = await getApiData();
    return (
        <section>
            <h1>App router - server side data fetching (at build time (SSG)) - server component - static page</h1>
            <AllArticles article={data} />
        </section>
    )
}

export default ArticlesPage;