export interface FormValues {
    name: string;
    email: string;
    username: string,
    password: string,
    phone: string,
    country: string;
}

export interface LoginFormValues {
    username: string,
    password: string
}

export interface AddPostValues {
    title: string,
    price: string,
    description: string,
    bidEndDate: string,
    filePath: string,
}