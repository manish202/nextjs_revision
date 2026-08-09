import AllArticles from "@/components/AllArticles";

export const getServerSideProps = async () => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!res.ok) throw new Error('failed to get data');
        const data = await res.json();
        return { props: { data: { status: true, data } } }
    }catch(error){
        return { props: { data: { status: false, message: error.message } } }
    }
}

const ArticlesPage = ({data}) => {
    console.log('Pages router - server side data fetching (on demand (SSR)) - client component - dynamic page');
    return (
        <section>
            <h1>Pages router - server side data fetching (on demand (SSR)) - client component - dynamic page</h1>
            <AllArticles article={data} />
        </section>
    )
}

export default ArticlesPage;