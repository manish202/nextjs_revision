import Link from "next/link";

const SingleArticle = ({article}) => {
    const {status, message, data} = article;
    if(!status) return <h1>{message}</h1>
    return (
        <ul className="container">
            <li>ID: {data.id}</li>
            <li>ID: {data.title}</li>
            <li>ID: {data.body}</li>
            <li>
                <Link href={`/articles`}>Go to All articles</Link>
            </li>
        </ul>
    )
}

export default SingleArticle;