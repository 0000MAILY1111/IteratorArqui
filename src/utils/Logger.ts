export class Logger {
    private getTimestamp(): string {
        return new Date().toISOString();
    }
    
    info(message: string): void {
        console.log(`[INFO] ${this.getTimestamp()} - ${message}`);
    }
    
    error(message: string): void {
        console.error(`[ERROR] ${this.getTimestamp()} - ${message}`);
    }
    
    success(message: string): void {
        console.log(`[SUCCESS] ${this.getTimestamp()} - ${message}`);
    }
}