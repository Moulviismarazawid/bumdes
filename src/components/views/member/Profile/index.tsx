import MemberLayout from "@/components/layouts/MemberLayout"
import styles from './Profile.module.scss'
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import Image from "next/image"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileMemberViews = ({profile}:any) => {
    return (
        <MemberLayout>
            <h1 className={styles.profile__title}>Profil</h1>
            <div className={styles.profile__main}>
                <div className={styles.profile__main__avatar}>
                    <Image src={profile.image} alt="profile" width={150} height={150}  />
                    <label htmlFor="upload" className={styles.profile__main__avatar__label}>
                        <p>Upload a new avatar, large will be resaized automatically</p>
                        <p>Maximum upload is <b>1MB</b></p>
                    </label>
                    <input type="file" name="image" id="upload" className={styles.profile__main__avatar__input} />
                </div>
                <div className={styles.profile__main__detail}>
                    <form action="">
                        <Input type="text" label="Fullname" name="fullname" defaultValue={profile.fullname} disabled/>
                        <Input type= "email" label="Email" name="email" defaultValue={profile.email} disabled/>
                        <Input type="number" label="Phone" name="phone" defaultValue={profile.phone} disabled/>
                        <Button type="submit" variant="secondary">Update Profile</Button>
                    </form>
                </div>
            </div>
        </MemberLayout>
    )
}

export default ProfileMemberViews