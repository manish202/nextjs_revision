'use server';
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import {revalidatePath} from 'next/cache';
import { redirect } from 'next/navigation';

const userActionForServerCompo = async () => {
    try{
        await connectDB();
        const fname = "manish " + Math.random();
        const lname = "pro " + Math.random();
        const email = "manish" + Math.random() + "@mail.com";
        const city = "mumbai " + Math.random();
        await User.create({fname,lname,email,city});
        // /server_actions_crud/revalidatepath_test ye ek static page hai jo build time pe generate ho jata hai.
        // user jab button pe click karega tab ye server function call hoga.
        // server action mai hamne revalidatePath call kiya hai is se serverside cache + client side router cache
        // clear ho jate hai. isliye ui refresh ho jata hai bina manually page reload kiye.
        // Once the database has been updated, the /server_actions_crud/revalidatepath_test path will be revalidated, and fresh data will be
        // fetched from the server.
        revalidatePath('/server_actions_crud/revalidatepath_test'); // old cache remove karta hai.
        return redirect('/server_actions_crud/revalidatepath_test');
    }catch(error){
        console.log(error);
        if(error.message === "NEXT_REDIRECT") throw error;
        return redirect('/server_actions_crud/revalidatepath_test');
    }
}

const userActionForClientCompo = async () => {
    try{
        await connectDB();
        const fname = "manish " + Math.random();
        const lname = "pro " + Math.random();
        const email = "manish" + Math.random() + "@mail.com";
        const city = "mumbai " + Math.random();
        await User.create({fname,lname,email,city});
        // /server_actions_crud/revalidatepath_test ye ek static page hai jo build time pe generate ho jata hai.
        // user jab button pe click karega tab ye server function call hoga.
        // server action mai hamne revalidatePath call kiya hai is se serverside cache + client side router cache
        // clear ho jate hai. isliye ui refresh ho jata hai bina manually page reload kiye.
        // Once the database has been updated, the /server_actions_crud/revalidatepath_test path will be revalidated, and fresh data will be
        // fetched from the server.
        // revalidatePath('/server_actions_crud/revalidatepath_test'); // old cache remove karta hai.
        return redirect('/server_actions_crud/revalidatepath_test');
    }catch(error){
        console.log(error);
        if(error.message === "NEXT_REDIRECT") throw error;
        return redirect('/server_actions_crud/revalidatepath_test');
    }
}

export {userActionForServerCompo,userActionForClientCompo}