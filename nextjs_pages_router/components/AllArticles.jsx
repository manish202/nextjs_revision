import Link from "next/link";

const AllArticles = ({article}) => {
    const {status, message, data} = article;
    if(!status) return <h1>{message}</h1>
    return (
        <ul className="container">
            {data.map(item => {
                return (
                    <li key={item.id}><Link href={`/articles/${item.id}`}>{`${item.id}) ${item.title}`}</Link></li>
                )
            })}
        </ul>
    )
}

export default AllArticles;