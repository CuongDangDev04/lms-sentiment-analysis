
export interface User {
    id: number;
    userId: number;
    avt: string;
    name: string;

    // Chuyển các thuộc tính con (username, email, role) vào một đối tượng con có tên là `user`
    user: {
        id: number;
        username: string;
        email: string;
        fullname: string;
        password?: string;
        role: string;
    };
}
