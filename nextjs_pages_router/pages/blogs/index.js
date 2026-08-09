import AllBlogs from "@/components/AllBlogs";

const BlogsPage = () => {
    console.log('Pages router - client side data fetching - client component - static page');
    return (
        <section>
            <h1>Pages router - client side data fetching - client component - static page</h1>
            <AllBlogs />
        </section>
    )
}

export default BlogsPage;