import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import { console } from "inspector";
import type { NextApiRequest, NextApiResponse } from "next";
import  Jwt  from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const users = await retrieveData('users');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = users.map((user: any) => {
            delete user.password;
            return user;
        })
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "success", 
            data
        })
    }else if(req.method === "PUT"){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const {user}:any = req.query;
        const {data} = req.body;
        const token = req.headers.authorization?.split(' ')[1] || '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err: any, decoded: any) => {
            if(decoded && decoded.role === 'admin'){
                await updateData('users', user[1], data, (result: boolean) => {
                if(result){
                    res.status(200).json({status: true, statusCode: 200, message: "success"});
                }else{
                    res.status(400).json({status: false, statusCode: 400, message: "failed"});
                }
                });
            }else{
                res.status(403).json({status: false, statusCode: 403, message: "Access Denied"});
            }
        })
       
        
    }else if(req.method === "DELETE"){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const {user}: any = req.query;
        const token = req.headers.authorization?.split(' ')[1] || '';
        console.log(token)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err: any, decoded: any) => {
            if(decoded && decoded.role === 'admin'){
                await deleteData('users',user[1], (result: boolean) => {
                    if(result){
                        res.status(200).json({status: true, statusCode: 200, message: "success"});
                    }else{
                        res.status(400).json({status: false, statusCode: 400, message: "failed"});
                    }
                })
            }else{
                res.status(403).json({status: false, statusCode: 403, message: "Access Denied"});
            }
        })
    }
}
