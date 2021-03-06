function LoadSuccessError({ loading, success=null, errors=null }) {
    let resp;
    if (errors) resp = <small className={"text-error text-center m-auto"}>{errors[0]}</small>
    if (loading) resp = <span className="spinner-border spinner-border-sm m-auto text-primary" role="status" aria-hidden="true" />
    if (success) resp = <small className="text-success text-center m-auto">{success}</small>
    return (
        resp
    );
}

function SuccessError({ success=null, errors=null }) {
    let resp = <></>;
    if (errors) resp = <small className={"text-error text-center m-auto"}>{errors[0]}</small>
    if (success) resp = <small className="text-success text-center m-auto">{success}</small>
    return (
        resp
    );
}

const handleFormServerError = (serverErrorResponse, loadingCallback, setServerErrorsCallback) => {
    if (serverErrorResponse.response) {
        const {data} = serverErrorResponse.response;
        const {message} = data;
        const {statusText, status} = serverErrorResponse.response;

        if (message) {
            setTimeout(() => {
                loadingCallback(false)
                setServerErrorsCallback([message]);
            }, 2000);
        }

        if (statusText && status >= 500){
            setTimeout(() => {
                loadingCallback(false)
                setServerErrorsCallback([statusText]);
            }, 2000);
        }

        if (data) {
            setTimeout(() => {
                loadingCallback(false)
                setServerErrorsCallback(data);
            }, 2000);
        }
    }
}

export {SuccessError, LoadSuccessError, handleFormServerError}