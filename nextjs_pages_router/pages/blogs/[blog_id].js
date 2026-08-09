import SingleBlog from "@/components/SingleBlog";

const SingleBlogPage = () => {
    console.log('Pages router - client side data fetching - client component - static page');
    return (
        <section>
            <h1>Pages router - client side data fetching - client component - static page</h1>
            <SingleBlog />
        </section>
    )
}

export default SingleBlogPage;