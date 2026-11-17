import bcrypt from "bcrypt";

const saltRounds = 10

const hashPassword = (password: string) => {
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}

export { hashPassword, comparePassword };