import type { Request, Response } from "express";

const healthCheck = async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: ''
    })
};

export default healthCheck;