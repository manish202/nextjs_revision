import Link from "next/link";

const AllPosts = ({post}) => {
    const {status, message, data} = post;
    if(!status) return <h1>{message}</h1>
    return (
        <ul className="container">
            {data.map(item => {
                return (
                    <li key={item.id}><Link href={`/posts/${item.id}`}>{`${item.id}) ${item.title}`}</Link></li>
                )
            })}
        </ul>
    )
}

export default AllPosts;