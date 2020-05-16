import { getLogger } from 'log4js';
import app from './app';

app.listen(4000, () => {
    const logger = getLogger('SERVER');
    logger.level = 'debug';
    logger.info('Server started on port 4000!');
});
