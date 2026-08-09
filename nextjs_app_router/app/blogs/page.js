import AllBlogs from "@/components/AllBlogs";

const BlogsPage = () => {
    console.log('App router - client side data fetching - server component - static page');
    return (
        <section>
            <h1>App router - client side data fetching - server component - static page</h1>
            <AllBlogs />
        </section>
    )
}

export default BlogsPage;