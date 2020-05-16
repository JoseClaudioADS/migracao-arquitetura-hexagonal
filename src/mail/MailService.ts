export interface MailData {
    subject: string;
    to: string;
    from: string;
    html: string;
}

export default interface MailService {
    send(mailData: MailData): void;
}
