import { Logger } from './utils/Logger';
import { Calculator } from './utils/Calculator';

function main() {
    const logger = new Logger();
    const calc = new Calculator();
    
    logger.info('Iniciando aplicación...');
    
    const result = calc.add(5, 3);
    logger.info(`Resultado: 5 + 3 = ${result}`);
}

main();