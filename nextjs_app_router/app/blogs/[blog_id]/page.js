import SingleBlog from "@/components/SingleBlog";

const SingleBlogPage = () => {
    console.log('App router - client side data fetching - server component - dynamic page');
    return (
        <section>
            <h1>App router - client side data fetching - server component - dynamic page</h1>
            <SingleBlog />
        </section>
    )
}

export default SingleBlogPage;