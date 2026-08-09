import { Suspense } from "react";
import AllUsers from "@/components/streaming_test/AllUsers";

const users = [
    {fname: "manish1",lname:"pro1"},
    {fname: "manish2",lname:"pro2"},
    {fname: "manish3",lname:"pro3"},
    {fname: "manish4",lname:"pro4"},
    {fname: "manish5",lname:"pro5"},
]

const getUsers = async () => {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res(users);
        }, 5000);
    });
}

// no-streaming, its taking more then 5 seconds to load full page.
const NoStreamingTestPage = async () => {
    const allUsers = await getUsers();
    return (
        <div className="container">
            <h1>Hello world</h1>
            <AllUsers />
            <ul>
                {allUsers.map((u,i) => <li key={i}>{u.fname} {u.lname}</li>)}
            </ul>
        </div>
    )
}

const StreamingTestPage = async () => {
    // NOTE: not awaited, will start here and await on the client.
    const allUsers = getUsers();
    return (
        <div className="container">
            <h1>Hello world</h1>
            <Suspense fallback={<h1>Loading...</h1>}>
                <AllUsers allUsers={allUsers} />
            </Suspense>
        </div>
    )
}

export default StreamingTestPage;