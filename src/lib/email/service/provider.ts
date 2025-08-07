export default interface Provider {
    sendMail(to: string, subject: string, text: string): Promise<void>;
}
