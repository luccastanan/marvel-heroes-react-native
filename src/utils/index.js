const prepareAction = str => {
    return {
        ACTION: str,
        SUCCESS: `SUCCESS_${str}`,
        FAILED: `FAILED_${str}`,
    };
};

const handleRes = res => {
    if (!res.ok) {
        console.log(`Error ${res.status}: ${res.statusText}`);
        if (res.status == 400) {
            throw new Error('Chave de segurança inválida');
        } else {
            throw new Error(res.statusText);
        }
    }
    return res.json();
};

export {prepareAction, handleRes};
