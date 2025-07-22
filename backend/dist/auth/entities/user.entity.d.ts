export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    hashPassword(): Promise<void>;
}
