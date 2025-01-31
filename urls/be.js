export const baseBeUrl = process.env.NEXT_PUBLIC_BASE_BE_URL || "http://localhost:8080";

export const urlPatterns = {
    VERIFY_ACCOUNT: `${baseBeUrl}/verify`,
};
