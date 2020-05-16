import { getLogger, Logger } from 'log4js';
import MailService, { MailData } from './MailService';

export default class MailServiceImpl implements MailService {
    private logger: Logger;

    constructor() {
        this.logger = getLogger('MAIL_SENDER');
        this.logger.level = 'debug';
    }

    send(props: MailData): void {
        this.logger.info(` Send Mock EMAIL ${JSON.stringify(props)}`);
    }
}
