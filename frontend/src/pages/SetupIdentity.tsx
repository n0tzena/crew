import './SetupIdentity.css'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import defaultUser from '../assets/defaultuser.jpg'

export default function SetupIdentity()

{
    const navigate = useNavigate();

    const [pfp, setPfp] = useState(defaultUser);
    const [username, setUsername] = useState("");

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error); 
    })

    async function handleImage(e: React.ChangeEvent<HTMLInputElement>)
    {
        const file = e.target.files?.[0];
        if(!file) return;

        try {
            const base64String: string = await fileToBase64(file) as string;
            setPfp(base64String);
        } catch(e) {
            console.log(e);
        }
    }

    function defineIdentity(e: React.FormEvent)
    {
        e.preventDefault();
        if(username == "") return;

        console.log("teste")
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", pfp);

        navigate("/chat");
    }

    return (
        <div className='setupAccount'>
            <h1>definir identidade</h1>
            <form onSubmit={defineIdentity}>
                <label>
                    <div className='avatar'>
                        <img src={pfp}></img>    
                        <div className='avatarEdit'>trocar avatar</div>                    
                    </div>
                    <input 
                        type='file'
                        accept='image/*'
                        onChange={handleImage}
                        hidden
                    />
                </label>
                <input 
                    type='text' 
                    placeholder='nome de usuário'
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <button>confirmar</button>
            </form>
        </div>
    )
}