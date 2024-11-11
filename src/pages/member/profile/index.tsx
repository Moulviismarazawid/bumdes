import ProfileMemberViews from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilPage = () => {
    const [profile , setProfile] = useState({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session:any = useSession()
    useEffect(() => {
        const getProfile = async () => {
            const data = await userServices.getProfile(session.data?.accessToken)
            setProfile(data.data.data)
        }
        getProfile();
    },[session])
    return (
        <>
        <ProfileMemberViews profile ={profile}/>
        </>
    )
}

export default ProfilPage;