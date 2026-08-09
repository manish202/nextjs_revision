import Link from "next/link";

const SinglePost = ({post}) => {
    const {status, message, data} = post;
    if(!status) return <h1>{message}</h1>
    return (
        <ul className="container">
            <li>ID: {data.id}</li>
            <li>ID: {data.title}</li>
            <li>ID: {data.body}</li>
            <li>
                <Link href={`/posts`}>Go to All posts</Link>
            </li>
        </ul>
    )
}

export default SinglePost;