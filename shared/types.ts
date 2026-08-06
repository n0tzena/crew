export type Message = {
    user: string,
    text: string,
    image: string
}
export type User = {
    username: string;
    avatar: string;
}
export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}