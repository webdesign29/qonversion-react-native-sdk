declare class QonversionError {
    code: string;
    description: string;
    additionalMessage: string;
    constructor(code: string, description: string, additionalMessage: string);
}
export default QonversionError;
